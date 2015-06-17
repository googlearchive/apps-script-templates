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

var TESTING = true;

/**
 * @TODO: Replace the following with the name of the add-on you are building
 * and the title of your sidebar
 */

var ADDON_NAME = 'YOUR_ADDON_NAME_HERE';
var SIDEBAR_TITLE = 'My Super Awesome Sidebar';
/**
 * @AUTH @TODO: If you would like to integrate with a 3rd party service using oauth,
 * fill out the following constants and review the code in myService.js
 * along with the docs at https://developers.google.com/apps-script/guides/services/external
 *
 * If you would like to integrate with popular Google services, see
 * https://developers.google.com/apps-script/guides/services/advanced
 *
 */

var MY_SERVICE_NAME = 'Some 3rd Party'; // human readable name
var AUTH_SERVICE_NAME = ''; // unique name (i.e. 'GoogleDrive') for your service
var AUTH_BASE_URL = '';
var AUTH_TOKEN_URL = '';
var AUTH_CLIENT_ID = '';
var AUTH_CLIENT_SECRET = '';
var AUTH_SCOPES = [
  'email',
].join(', '); // @AUTH @TODO the separator differs per service. Google uses space-separated scopes


/**
 * Intelligent Append will look for an `id` column and only append values
 * that occur after it, ignoring values before
 *
 * For this to work, there must be a column with id: `id` in getColumnOptions
 */
var ENABLE_INTELLIGENT_APPEND = true;

var MAX_SCHEDULED_REPORTS = 24;
var IMPORT_PAGE_SIZE = 30;

var SCHEDULE_TRIGGER_ID = 'Import.scheduled.triggerId';
