# wcp-node

Promise based Workday Cloud Platform helper library for Node.js

## Features

- Makes [http](http://nodejs.org/api/http.html) requests to Workday Cloud Platform from Node.js
- Supports the [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) API
- Automatically retrieves the bearer token for the first request or if the bearer token is expired
- Currently supports authentication using the client credentials grant type (integration system users)


## Supported versions

This library works with Node.js versions 8 and above or support with async/await


## Installing

Using npm:

```bash
$ npm install @workdaylabs/wcp-node
```

## End User Docs

For detailed information about Workday Cloud Platform, head out here:

[https://cloud.workday.com/documentation/index.html](https://cloud.workday.com/documentation/index.html)

## Prerequisite

- Complete the Manage Workday Cloud Platform+TG task
- Register a Developer Tenant
- Create an API Client
- Complete the Create Client Credentials Mapping+TG task

Please refer to the Workday Cloud Platform documentation for more details.

## Methods

##### .get(url)
##### .put(url, data)
##### .post(url, data)
##### .patch(url, data)


## Example

Acquire and setup the `wcp` object

```js
const Wcp = require('@workdaylabs/wcp-node');

const tenantAlias = '{tenantAlias}';
const clientId = '{clientId}';
const clientSecret = '{clientSecret}';
const wcp = new Wcp(tenantAlias, clientId, clientSecret);


```

(For Workday internal development only) If you are using a WCP server other than cloud.workday.com, use the following to create wcp instance instead

```js
const wcpServer = 'workday';
const wcp = new Wcp(tenantAlias, clientId, clientSecret, wcpServer);


```

Performing a `GET` request

```js
const getWorkers = async () => {
	const url = '/performanceManagement/v1/workers';
	const result = await wcp.get(url);
	console.log('result', result);
}

getWorkers();
```

Performing a `POST` request

```js
const postFeedback = async () => {
  const data = {
    displayFeedbackGiverName: true,
    workerManagerAndMe: false,
    workerAndMe: false,
    comment: 'Great job!',
  };
  const workerId = '0e44c92412d34b01ace61e80a47aaf6d';
  const url = `/performanceManagement/v1/workers/${workerId}/anytimeFeedbackEntries?view=giveFeedbackDetail`;
  try {
    console.log('result', await wcp.post(url, data));
  } catch (e) {
    if (e.response && e.response.data && e.response.data.error) {
      console.log(e.response.data.error);
      console.log(e.response.data.errors);
    } else {
      console.log(e.toString());
    }
  }
}

postFeedback();
```

`PUT` and `PATCH` requests are similar to `POST`

## Problems?

Please log issues in [the github repository](https://github.com/anthonylai/wcp-node)
