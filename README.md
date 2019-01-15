# wcp-node

Promise based Workday Cloud Platform helper library for node.js

## Features

- Makes [http](http://nodejs.org/api/http.html) requests to Workday Cloud Platform from node.js
- Supports the [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) API
- Automatically retrieves the bearer token for the first request or if the bearer token is expired


## Supported versions

This library works with node versions 8 and above.


## Installing

Using npm:

```bash
$ npm install wcp-node
```

## End User Docs

For detailed information about Workday Cloud Platform, head out here:

[https://cloud.workday.com/documentation/index.html](https://cloud.workday.com/documentation/index.html)

## Methods

##### .get(url)
##### .put(url, data)
##### .post(url, data)
##### .patch(url, data)


## Example

Acquire and setup the `wcp` object

```js
const Wcp = require('wcp-node');

const tenantAlias = '{tenantAlias}';
const clientId = '{clientId}';
const clientSecret = '{clientSecret}';
const wcp = new Wcp(tenantAlias, clientId, clientSecret);


```

(For Workday development only) If you are using a WCP server other than cloud.workday.com, use the following to create wcp instance instead

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
```
