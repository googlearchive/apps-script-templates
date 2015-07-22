/**
 *. Copyright 2015 Google Inc. All Rights Reserved.
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
* Return an OAuth service object to handle authorization for a specific
* data source (such as an API resource). Makes use of the OAuth2 Apps
* Script library:
*   https://github.com/googlesamples/apps-script-oauth2
* @return {Object} a service object associated with the specified
*   resource.
*/
function getService() {
 var service = OAuth2.createService(AUTH_SERVICE_NAME)
     .setAuthorizationBaseUrl(AUTH_BASE_URL)
     .setTokenUrl(AUTH_TOKEN_URL)
     .setClientId(AUTH_CLIENT_ID)
     .setClientSecret(AUTH_CLIENT_SECRET)
     .setCallbackFunction('authCallback')
     .setPropertyStore(PropertiesService.getUserProperties())
     .setScope(AUTH_SCOPES);

 /* TODO: Do any app-specific OAuth property setting here.
  * For details, see:
  *   https://github.com/googlesamples/apps-script-oauth2
  */

 return service;
}

/**
 * Return an array of potential columns (identifiers to locate them in
 * the data response object and the labels to use as column headers).
 * @return {Array} list of potential columns.
 */
function getColumnOptions() {

  // @TODO: Replace this section, adding a column entry for each data of
  // interest. id should be an identifier that can be used to locate
  // the data in the data request response, and label should be the name
  // to associate with that data in the UI.

  /**
   * Below is the column definition for the GitHub Issue search example.
   */
  /**
    return [
      {id: 'id', label: 'Issue ID'},
      {id: 'avatar_url', label: 'Avatar'},
      {id: 'login', label: 'User'},
      {id: 'url', label: 'Link'},
      {id: 'state', label: 'State'},
      {id: 'comments', label: 'Comments'},
    ];
   */

  return [
    {id: 'id', label: 'Some ID'},
  ];
}

/**
 * Return an array of param definitions, following the established schema
 * @return {Array} list of params.
 */
function getParams() {

  /**
   *  Params can be Text fields, Checkboxes, or Select dropdowns.
   *  Below is an example of how to implement each type.
   *
   *  // Text param.
   *  params.push({
   *    id: 'q', // required; reference this value in getDataPage as config.params[id]
   *    type: 'text', // required
   *    label: 'Search Term', // large h4 text describing the input
   *    helper: 'Search for Something on GitHub', // optional helper text below label
   *    value: 'shrugs', // optional default value
   *  });
   *
   *  // Checkbox param.
   *  params.push({
   *    id: 'sortByComments', // required
   *    type: 'checkbox', // required
   *    label: 'Sort by Followers', // large h4 text
   *    value: false, // default value
   *  });
   *
   *  // Select param.
   *  params.push({
   *    id: 'order', // Required.
   *    type: 'select', // Required.
   *    label: 'Sort Order', // Large h4 text.
   *    helper: 'Ascending or Descending', // Optional helper text.
   *    options: [ // A set of options for the select.
   *      {
   *        value: 'desc',
   *        label: 'Descending',
   *      },
   *      {
   *        value: 'asc',
   *        label: 'Ascending',
   *      },
   *    ],
   *    value: 'desc', // Default select value (one of the `value`s from the options).
   *  });
   */

  var params = [];

  /**
   * Below is the param configuration for the GitHub Issue search example.
   */
  /**
    params.push({
      id: 'q',
      type: 'text',
      label: 'Search Term',
      helper: 'Search for Something on GitHub',
      value: 'shrugs',
    });
    params.push({
      id: 'sortByComments',
      type: 'checkbox',
      label: 'Sort by Comment Count',
      value: false,
    });
    params.push({
      id: 'order',
      type: 'select',
      label: 'Sort Order',
      helper: 'Ascending or Descending',
      options: [
        {
          value: 'desc',
          label: 'Descending',
        },
        {
          value: 'asc',
          label: 'Ascending',
        },
      ],
      value: 'desc',
    });
   */

  return params;
}

/**
 * Return a page of results from the data source as a 2D array of
 * values (with columns corresponding to the columns specified). Return
 * null if no data exists for the specified pageNumber.
 * @param {Array} columns an array of Strings specifying the column ids
 *   to include in the output.
 * @param {Number} pageNumber a number indicating what page of data to
 *   retrieve from the data source.
 * @param {Number} pageSize a number indicating the maximum number of
 *   rows to return per call.
 * @param {Object} opt_settings optional object containing any additional
 *   information needed to retrieve data from the data source.
 */
function getDataPage(columns, pageNumber, pageSize, config) {
  var data = null;
  /**
   * TODO: This function needs to be implemented based on the particular
   * details of the data source you are extracting data from. For example,
   * you might request a page of data from an API using OAuth2 credentials
   * similar to this:
   *
   * var service = getService(); // Be sure to configure the getService code above
   *
   * // Build the appropriate API URL based on the parameters (pageNumber,
   * // pageSize, and config).
   * var url = '...';
   * var response = UrlFetchApp.fetch(url, {
   *   headers: {
   *     Authorization: 'Bearer ' + service.getAccessToken(),
   *     // Include any API-required headers needed for the call
   *   }
   * });
   *
   * // Given the response, construct the appropriate data output. Return
   * // null if there is no data for the specified page.
   * response = JSON.parse(response)
   * if (response.length === 0) {
   *   return null;
   * }
   * data = [];
   *
   * // Iterate over each relevant data item in the API response and build
   * // a data row for it containing the data specified by columns
   * // (in the same column order). Add each data row to data.
   *
   * // Your resulting data structure should be a 2 dimensional array of values
   * // like so:
   * [
   *   [1, 2, 3],
   *   [4, 5, 6],
   * ]
   *
   */


  /**
   * If you have more than one 'page' of data
   *    (i.e., multiple batches of data per report run)
   * remove the following block to have getDataPage() called repeatedly until
   * getDataPage returns `null`.
   *
   */

   if (pageNumber) {
     return null;
   }

  /**
   * The following is an implementation that returns
   * results for a GitHub Issue search.
   *
   */
  /**
    var service = getService();
    var url = 'https://api.github.com/search/issues';

    var params = {
      q: config.params.q,
      order: config.params.order,
    };

    if (config.params.sortByComments) {
      params.sort = 'comments';
    }

    var results = UrlFetchApp.fetch(url + toQueryString(params), {
      headers: {
        'Authorization': 'Bearer ' + service.getAccessToken()
      }
    });
    results = JSON.parse(results).items;

    if (ENABLE_INTELLIGENT_APPEND) {
      results = resultsAfterTriggerHead(results, config);
    }

    data = _.map(results, function(issue) {
      // Gor each user returned, create a result row with the same
      // order as the original columns.

      var fullDataRow = [
        issue.id,
        '=IMAGE("' + issue.user.avatar_url + '")',
        issue.user.login,
        issue.html_url,
        issue.state,
        issue.comments,
      ];

      // And then reorder it for the user's output.
      return arrangeDataRowForColumns(columns, fullDataRow);
    });

    return data.length ? data : null;
   */

  // For now, just return null, meaning no data.
  return data;
}

/**
 * Return the data row, ordered correctly.
 * @param {Array} columns an array of Strings specifying the column ids
 *   to include in the output (user provided).
 * @param {Array} row original data row, without reordering
 * @return {Array} the final row to be entered into the spreadsheet, reordered
 */
function arrangeDataRowForColumns(columns, row) {
  var originalColumns = getColumnOptions();

  return _.map(columns, function(cid) {
    // For each column id, look up original index and return correct value.
    var i = _.indexOf(_.pluck(originalColumns, 'id'), cid);
    return row[i];
  });
}

/**
 * Return the set of results after config.triggerHead.
 * @param {Array} results an array of arrays specifying the original results
 * @param {Object} config the report config
 * @return {Array} the results that occur after the config.triggerHead
 */
function resultsAfterTriggerHead(results, config) {
  var ids = _.map(results, function(r) {
    // @TODO: customize this function to return a unique ID for this row
    // This could also be a hash of the row contents, as a last resort.
    // The GitHub Issue search endpoint returns the user's ID.
    return r.id;
  });

  if (config.triggerHead) {
    var firstIndex = ids.indexOf(config.triggerHead);
    if (firstIndex !== -1) {
      results = results.slice(firstIndex + 1);
    }
  }
  config.triggerHead = ids[ids.length - 1];
  saveReportConfig(config);
  return results;
}
