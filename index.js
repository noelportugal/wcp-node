const axios = require('axios');

class Wcp {
  constructor(tenantAlias, clientId, clientSecret, site = 'workday') {
    this.tenantAlias = tenantAlias;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.token = null;
    this.site = site;
  }

  async getToken() {
    try {
      const url = `https://auth.api.${this.site}.com/v1/token`;
      const reqBody = `grant_type=client_credentials&tenant_alias=${this.tenantAlias}`;
      const config = {
        headers: {
          withCredentials: true,
          'content-type': 'application/x-www-form-urlencoded',
        },
        auth: {
          username: this.clientId,
          password: this.clientSecret,
        },
      };
      const result = await axios.post(url, reqBody, config);
      this.token = result.data;
      return result.data;
    } catch (e) {
      throw new Error(`error retrieving access token:  please verify your tenant alias, client id, and client secret and ensure your Workday instance is up and running. ${e.toString()}`);
    }
  }

  async get(url, options = {}) {
    return this.execute('get', url, null, options);
  }

  async put(url, data, options = {}) {
    return this.execute('put', url, data, options);
  }

  async post(url, data, options = {}) {
    return this.execute('post', url, data, options);
  }

  async patch(url, data, options = {}) {
    return this.execute('patch', url, data, options);
  }


  async execute(method, url, data, options = {}, retry = 1) {
    let result;
    try {
      const config = {
        headers: {
          withCredentials: true,
          Authorization: `Bearer ${this.token.access_token}`,
        },
      };
      const completeUrl = `https://api.workday.com${url}`;
      console.log('url', url);
      console.log('completeUrl', completeUrl);
      console.log('data', data);
      // console.log('config', config);
      switch (method) {
        case 'get':
          result = await axios.get(completeUrl, config);
          break;
        case 'put':
          result = await axios.put(completeUrl, data, config);
          break;
        case 'post':
          result = await axios.post(completeUrl, data, config);
          break;
        case 'patch':
          result = await axios.patch(completeUrl, data, config);
          break;
        default:
          throw new Error(`no such method: ${method}`);
      }
    }  catch (e) {
      if (retry) {
        await this.getToken();
        console.log('retrieved token');
        return this.execute(method, url, data, options, retry - 1);
      } else {
        // console.log('error', e);
        throw e;
      }
    }
    return result.data;
  }
}

module.exports = Wcp;
