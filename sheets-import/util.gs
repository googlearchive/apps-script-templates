/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Returns true if the given date string represents a date that is
 * more than 24 hours in the past; returns false otherwise.
 * @param {String} dateStr a date string.
 * @return {Boolean}
 */
function isOlderThanADay(dateStr) {
  var now = (new Date()).getTime();
  var then = Date.parse(dateStr);
  return (then + 24 * 60 * 60 * 1000) < now;
}

/**
 * Includes the given project HTML file in the current HTML project file.
 * Also used to include JavaScript.
 * @param {String} filename Project file name.
 */
function include(filename) {
  return HtmlService.createTemplateFromFile(filename)
    .evaluate()
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .getContent();
}

/**
 * Includes the standard add-on css.
 */
function includeAddonCSS() {
  return HtmlService.createHtmlOutput('<link rel="stylesheet" href="https://ssl.gstatic.com/docs/script/css/add-ons1.css">')
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .getContent();
}

/**
 * Includes the given template in the HTML file as content in a <template> tag
 * with the id as the filename. For use with ngAppsScript.js.
 * @param {String} filename Project file name.
 */
function template(filename) {
  var html = '<template id="' + filename + '"><?!= include("' + filename + '"); ?></template>';
  return HtmlService.createTemplate(html)
    .evaluate()
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .getContent();
}

/**
 * Return a query param string for use in get requests
 * @param {Object} obj params as a k:v hash
 * @return {String} the generated query string
 */
function toQueryString(param) {
  return '?' + _.map(param, function(v, k) {
    return k + '=' + encodeURIComponent(v);
  }).join('&');
}

/**
 * Save an object to the Document Properties given an id and the object
 * to the Document properties service as a JSONified string.
 * @param {String} id a unique id for the object.
 * @param {Object} obj a collection of key-values to save as
 *   user properties.
 */
function saveObjectToProperties(id, obj) {
  var properties = PropertiesService.getDocumentProperties();
  properties.setProperty(id, JSON.stringify(obj));
}

/**
 * Given an id, return the (JSON-parsed) object.
 * @param {String} id unique id of the object.
 * @return {Object} collection of key-value pairs taken from the
 *   properties service. Will return null if it doesn't exist.
 */
function getObjectFromProperties(id) {
  var properties = PropertiesService.getDocumentProperties();
  return JSON.parse(properties.getProperty(id));
}

/**
 * Given a string id, remove from the Document properties service
 * the corresponding object.
 * @param {String} id of the property to remove.
 */
function deleteObjectFromProperties(id) {
  PropertiesService.getDocumentProperties().deleteProperty(id);
}

/**
 * Generate a random alphanumeric string.
 * @param {int} l length of string to receive, up to 14
 * @return {String} unique string.
 */
function randomString(l) {
  l = l || 14;
  return Math.random().toString(36).substring(2, l + 2);
}

/**
 * Builds and returns the API authorization URL from the service object.
 * @return {String} the API authorization URL.
 */
function getAuthorizationUrl() {
  return getService().getAuthorizationUrl();
}

/**
 * Resets the API service, forcing re-authorization before
 * additional authorization-required API calls can be made.
 */
function signout() {
  getService().reset();
}

/**
 * The following functions are Sheets-specific utility functions.
 */

/**
 * Sheets-specific utility. Find a sheet within a spreadsheet with
 * the given id. If not present, return null.
 * @param {Object} ss a Spreadsheet object.
 * @param {Number} sheetId a Sheet id.
 * @return {Object} a Sheet object, or null if not found.
 */
function getSheetById(ss, sheetId) {
  if (sheetId === null) {
    return null;
  }
  var sheets = ss.getSheets();
  for (var i = 0; i < sheets.length; i++) {
    if (sheets[i].getSheetId() === sheetId) {
      return sheets[i];
    }
  }
  return null;
}

/**
 * Sheets-specific utility. Given a base title for a sheet, check
 * for that it is unique in the spreadsheet. If not, find an integer
 * suffix to append to it to make it unique and return. This function
 * is used to avoid name collisions while adding or renaming sheets
 * automatically.
 * @param {Object} spreadsheet a Spreadsheet.
 * @param {String} baseName the initial suggested title for a sheet.
 * @return {String} a unique title for the sheet, based on the
 *     given base title.
 */
function getUniqueSheetName(spreadsheet, baseName) {
  var sheetName = baseName;
  var i = 2;
  while (spreadsheet.getSheetByName(sheetName) !== null) {
      sheetName = baseName + ' ' + i++;
  }
  return sheetName;
}

/**
 * Sheets-specific utility. Given a spreadsheet and a triggerId string,
 * return the user trigger that corresponds to that ID. Returns null
 * if no such trigger exists.
 * @param {Spreadsheet} spreadsheet container of the user triggers.
 * @param {String} triggerId trigger ID string.
 * @return {Trigger} corresponding user trigger, or null if not found.
 */
function getUserTriggerById(spreadsheet, triggerId) {
  var triggers = ScriptApp.getUserTriggers(spreadsheet);
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getUniqueId() == triggerId) {
      return triggers[i];
    }
  }
  return null;
}

/**
 * Sheets-specific utility. Given a String sheet id, activate that
 * sheet if it exists.
 * @param {String} sheetId the sheet ID.
 */
function activateById(sheetId) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = getSheetById(ss, parseInt(sheetId));
  if (sheet !== null) {
    sheet.activate();
  }
}

/**
 * The following functions are import-sheets-specific utility functions that
 * deal with modifying reports and scheduling them to run.
 */

/**
 * Get the report configuration for the given report and, if a sheet
 * exists for it, activate that sheet.
 * @param {String} reportId a report ID.
 */
function switchToReport(reportId) {
  var config = getReportConfig(reportId);
  activateById(config.sheetId);
  return config;
}

/**
 * Return the report configuration for the report with the given
 * ID; returns an empty Object if no such report name exists.
 * @param {String} reportId a report ID.
 * @return {Object} a report configuration corresponding to that ID,
 *   or null if no such report exists.
 */
function getReportConfig(reportId) {
  var config = getObjectFromProperties(reportId);
  if (!config) {
    return null;
  }
  // Sheet name may have been changed manually, so
  // get the current one.
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = getSheetById(ss, parseInt(config.sheetId));
  config.sheetName = !sheet ? null : sheet.getName();
  return config;
}

/**
 * Given a report configuration, save it.
 * @param {Object} config the report configuration.
 * @param {Object} the updated report configuration.
 */
function saveReportConfig(config) {
  if (config.id === undefined) {
    config.id = randomString();
    config.lastRun = null;
    config.owner = Session.getEffectiveUser().getEmail();
  }
  saveObjectToProperties(config.id, config);
  return config;
}

/**
 * Delete the report specified by the given ID.
 * @param {String} reportId indicates the report to delete.
 */
function deleteReportConfig(reportId) {
  deleteObjectFromProperties(reportId);
}

/**
 * Returns true if the current user is allowed to edit the
 * report associated with the given config; returns
 * false otherwise.
 * @param {Object} config a report configuration.
 */
function canEditReport(config) {
  if (!config) {
    return false;
  }
  return (!config.scheduled) ||
         (Session.getEffectiveUser().getEmail() === config.owner);
}

/**
 * Given a new report configuration, return true if it saving
 * this report would mean the limit on scheduled reports would
 * be exceeded; return false otherwise.
 * @param {Object} config a report configuration to be saved.
 */
function isOverScheduleLimit(config) {
  var previous = getReportConfig(config.id);
  var currentUser = Session.getEffectiveUser().getEmail();
  var isScheduled = config === null ? false : config.scheduled;
  var wasScheduled = previous === null ? false : previous.scheduled;
  return (isScheduled && wasScheduled !== true &&
    getScheduledReports(currentUser).length >= MAX_SCHEDULED_REPORTS);
}


/**
 * Return a set of all saved reports
 * @return {Array}
 */
function getAllReports() {
  var props = PropertiesService.getDocumentProperties().getProperties();
  return _.map(props, function(v) {
    return JSON.parse(v);
  });
}

/**
 * Get a set of report configurations that all have been marked
 * for scheduled imports.
 * @param {String} opt_user optional user email; if provided, returned
 *   results will only include reports that user is the owner of.
 * @return {Array} collection of configuration object for scheduled
 *   reports.
 */
function getScheduledReports(opt_user) {
  return _.filter(getAllReports(), function(config) {
    return config && config.scheduled && (!opt_user || opt_user == config.owner);
  });
}

/**
 * Save the given report configuration.
 * @param {Object} config a report configuration to save.
 * @return {Object} the updated report configuration.
 */
function saveReport(config) {
  if (config.id) {
    var existingConfig = getReportConfig(config.id);
    if (existingConfig !== null) {
      activateById(existingConfig.sheetId);
      // Check: users are not allowed to save edits to reports
      // created by other users if those reports have been marked
      // for auto-update.
      if (!canEditReport(existingConfig)) {
        throw ERROR_CODES.ILLEGAL_EDIT;
      }
    }
  }
  // Check against max number of scheduled reports.
  if (isOverScheduleLimit(config)) {
    throw ERROR_CODES.AUTO_UPDATE_LIMIT;
  }

  var result = saveReportConfig(config);
  adjustScheduleTrigger();
  return result;
}

/**
 * Delete the given report configuration.
 * @param {String} reportId indicates the report to delete.
 * @return {String} the report ID deleted.
 */
function deleteReport(reportId) {
  // Check: users are not allowed to delete reports created by
  // other users if those reports have been marked for auto-update.
  if (!canEditReport(getReportConfig(reportId))) {
    throw ERROR_CODES.ILLEGAL_DELETE;
  }
  deleteReportConfig(reportId);
  adjustScheduleTrigger();
  return reportId;
}

/**
 * Update a report configuration with a sheetId and last runtime
 * information, save and return it. Include but do not save the
 * sheet name.
 * @param {Object} config the report configuration.
 * @param {Sheet} sheet the report's sheet.
 * @param {String} lastRun the datetime string indicating the last
 *   time the report was run.
 * @return {Object} the updated report configuration.
 */
function updateOnImport(config, sheet, lastRun) {
  var update = {
    sheetId: sheet.getSheetId().toString(),
    lastRun: lastRun
  };
  config = _.extend(config, update);
  saveObjectToProperties(config.id, config);
  config.sheetName = sheet.getName();
  return config;
}

/**
 * Return the saved trigger ID of the scheduling trigger for this
 * user. Returns null if the trigger is not set.
 @ @return {String} the trigger ID.
 */
function getTriggerId() {
  var properties = PropertiesService.getUserProperties();
  return properties.getProperty(SCHEDULE_TRIGGER_ID);
}

/**
 * Save the trigger ID of the scheduling trigger for this user.
 * @param {String} id the trigger ID that should be saved.
 */
function saveTriggerId(id) {
  var properties = PropertiesService.getUserProperties();
  properties.setProperty(SCHEDULE_TRIGGER_ID, id);
}

/**
 * Remove the saved trigger ID.
 */
function removeTriggerId() {
  var properties = PropertiesService.getUserProperties();
  properties.deleteProperty(SCHEDULE_TRIGGER_ID);
}
