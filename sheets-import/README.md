# Template: Import Data into Google Sheets

An Add-on Template for importing data from a third-party source into
Google Sheets.

**Features:**

- Rapid integration with third-party data sources like APIs or internal
  databases,
- Configurable options for each report;
  **add text fields, checkboxes, and selectboxes** and reference them in
  your API call,
- Scheduled reports that run every 24 hours,
- Collaborative reports shared between users,
- Update sheets in the background.

![A demo of Sheets-Import integrated with GitHub](media/demo.gif)

## Quickstart

#### 1. Create the Apps Script Project

1. Navigate to [https://script.google.com](https://script.google.com) and create
  a new `Blank Project`.
2. For each file in this repo, create a file of the
  correct type and paste in the contents.
  - For an HTML file, select `File` > `New` > `Html File` and enter the
    full name (i.e. `app.js.html`).
  - For a Script file, select `File` > `New` > `Script File` and enter the
    full name (i.e. `server.gs`).
  - The files you must copy over (descriptions of each at the bottom of the
    README) are:
    - [app.js.html](/raw/master/app.js.html),
    - [authorize.html](/raw/master/authorize.html),
    - [config.gs](/raw/master/config.gs),
    - [index.html](/raw/master/index.html),
    - [main.html](/raw/master/main.html),
    - [myService.gs](/raw/master/myService.gs),
    - [myServiceAuthCallbackView.html](/raw/master/myServiceAuthCallbackView.html),
    - [myServiceReauthorizationEmail.html](/raw/master/myServiceReauthorizationEmail.html),
    - [report.html](/raw/master/report.html),
    - [util.gs](/raw/master/util.gs).

#### 2. Add Required Libraries to the Project

  1. Click `Resources` > `Libraries`.
  2. Paste `MGwgKN2Th03tJ5OdmlzB8KPxhMjh3Sh48` (Underscore) into the
    `Find a Library` box and select it.
  3. Paste `MswhXl8fVhTFUH_Q3UOJbXvxhMjh3Sh48` (OAuth2) into the
    `Find a Library` box and select it.
  4. Select the most recent version of each library from the `Version` dropdown.
  5. Click the `Save` button.

#### 3. Configure Your Service

You can use this template to import data from pretty much any data source, be it
external APIs or internal databases. Because integrating with external APIs is
a frequent requirement, the **Sheets-Import** template is already configured with
[OAuth2](https://github.com/googlesamples/apps-script-oauth2) for the external
services which support it. Simply fill in the appropriate OAuth values and write
a function to query your datasource.

#### 3.1 Integrating with GitHub, as an Example

As an example, here is how to configure the **Sheets-Import** template to pull
Issues from GitHub based on a search term and ranking option.

**First, create a GitHub developer application.**

Go to [https://github.com/settings/developers](https://github.com/settings/developers)
and `Register a New Application`.

Fill out the name, homepage, and description as usual.
In *Authorization Callback URL*, put

```
https://script.google.com/macros/d/{PROJECT KEY}/usercallback
```

Where `{PROJECT KEY}` is your projects unique identifier found via
`File` > `Project Properties` in the Apps Script Editor.

**Second, fill out config.js with the GitHub-specific values.**

They should look similar to the following:

```js
var MY_SERVICE_NAME = 'GitHub';
var AUTH_SERVICE_NAME = 'github';
var AUTH_BASE_URL = 'https://github.com/login/oauth/authorize';
var AUTH_TOKEN_URL = 'https://github.com/login/oauth/access_token';
var AUTH_CLIENT_ID = '{CLIENT ID}';
var AUTH_CLIENT_SECRET = '{CLIENT SECRET}';
var AUTH_SCOPES = [
  'user:email'
].join(', ');
```

Where `{CLIENT ID}` and `{CLIENT SECRET}` are obtained from GitHub.

**Finally, customize myService.gs**

Simply uncomment the illustrative blocks of code in `getColumnOptions()`
and `getDataPage()`.

## Configuration

**Sheets-Import** provides easy configuration options for simple modifications.
Open up [config.gs](config.gs) and [myService.gs](myService.gs) to modify the
relevant code.

Options include:

- Changing the add-on name and sidebar title,
- Configuring a third-party OAuth service,
- Enabling/Disabling intelligent appending,
- Creating and modifying report parameters (more details below),
- Writing a function to pull data from an outside source.

### Report Parameters

Parameters let you accept user-input during report configuration, for example a
search term, a checkbox value, or a select option. These parameters are then
available in `getDataPage()` as `config.params[{PARAM ID}]` where `{PARAM ID}` is
a unique id for each parameter, described below. See [myService.gs](myService.gs)
for a comprehensive example.

To configure parameters for your service, follow the examples in
[myService.gs](myService.gs). The options are also documented here.

**Text Field**

<table>
  <tr><th>Property</th><th>Type</th><th>Description</th><th>Required?</th></tr>

  <tr>
    <td>id</td>
    <td>String</td>
    <td>A unique ID for this param.</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>type</td>
    <td>String</td>
    <td>Must be "text" for a Text Field.</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>label</td>
    <td>String</td>
    <td>The human-readable label above the param.</td>
    <td>No</td>
  </tr>
  <tr>
    <td>helper</td>
    <td>String</td>
    <td>The human-readable helper text below the label.</td>
    <td>No</td>
  </tr>
  <tr>
    <td>value</td>
    <td>String</td>
    <td>The default value of the text field.</td>
    <td>No</td>
  </tr>
</table>

**Checkbox**

<table>
  <tr><th>Property</th><th>Type</th><th>Description</th><th>Required?</th></tr>

  <tr>
    <td>id</td>
    <td>String</td>
    <td>A unique ID for this param.</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>type</td>
    <td>String</td>
    <td>Must be "checkbox" for a checkbox.</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>label</td>
    <td>String</td>
    <td>The human-readable label above the param.</td>
    <td>No</td>
  </tr>
  <tr>
    <td>helper</td>
    <td>String</td>
    <td>The human-readable helper text below the label.</td>
    <td>No</td>
  </tr>
  <tr>
    <td>value</td>
    <td>Bool</td>
    <td>The default value of the checkbox.</td>
    <td>No</td>
  </tr>
</table>

**Select Dropdown**

<table>
  <tr><th>Property</th><th>Type</th><th>Description</th><th>Required?</th></tr>

  <tr>
    <td>id</td>
    <td>String</td>
    <td>A unique ID for this param.</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>type</td>
    <td>String</td>
    <td>Must be "select" for a Select Dropdown.</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>label</td>
    <td>String</td>
    <td>The human-readable label above the param.</td>
    <td>No</td>
  </tr>
  <tr>
    <td>helper</td>
    <td>String</td>
    <td>The human-readable helper text below the label.</td>
    <td>No</td>
  </tr>
  <tr>
    <td>options</td>
    <td>Array</td>
    <td>Array of options where an option has the format <br/> "{value: "", label: ""}"</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>value</td>
    <td>String</td>
    <td>The default value of the select dropdown. Must be one of the `value`s from the `options` array.</td>
    <td>Yes</td>
  </tr>
</table>

## Extending the Template

The **Sheets-Import** template makes use of [AngularJS](https://angularjs.org).
If you're not familiar with Angular, we recommend working through this
[tutorial](https://docs.angularjs.org/tutorial).

`index.html` is loaded by the sidebar UI. It includes `main.html`,
`report.html`, and `authorize.html`, along with the add-on global css and
various libraries.

`app.js.html` handles the initialization of the Angular app along with
project-wide filters and constants.

`config.gs` contains the basic configuration options that you must modify.

`myService.gs` contains the implementation code for your third party service.

`myServiceAuthCallbackView.html` is the html loaded after an OAuth provider
redirects back to your add-on.

`myServiceReauthorizationEmail.html` contains the html sent to a user when they
must provide additional authorization to your add-on.

`server.gs` contains various operations around reports.

`util.gs` contains various utility functions and helpful snippets for the
template.

`ngAppsScript.js` contains an Angular module (`ngAppsScript`) that makes working
with Apps Script easier. It provides a Promise wrapper around
`google.script.run` as well as directives for toasts and common button types.
