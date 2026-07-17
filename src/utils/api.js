import { DEFAULT_API_BASE } from '../../App';

class FFApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl || DEFAULT_API_BASE;
  }

  async makeRequest(endpoint, method = 'GET', params = {}, body = null) {
    try {
      let url = `${this.baseUrl}${endpoint}`;

      // Add query params for GET
      if (method === 'GET' && Object.keys(params).length > 0) {
        const queryString = new URLSearchParams(params).toString();
        url += `?${queryString}`;
      }

      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      };

      if (body && (method === 'POST' || method === 'PUT')) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(url, options);
      const data = await response.json();

      return {
        success: response.ok,
        status: response.status,
        data,
        url,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        url: `${this.baseUrl}${endpoint}`,
      };
    }
  }

  // Auto Ban (GET)
  async autoBan(token, version = 'OB54', autoBan = true) {
    return this.makeRequest('/ban', 'GET', { token, version, auto_ban: autoBan });
  }

  // Auto Ban (POST)
  async autoBanPost(token, version = 'OB54', autoBan = true) {
    return this.makeRequest('/api/process', 'POST', {}, { token, version, auto_ban: autoBan });
  }

  // EAT to JWT (GET)
  async eatToJwt(token) {
    return this.makeRequest('/eat-to-jwt', 'GET', { token });
  }

  // EAT to JWT (POST)
  async eatToJwtPost(token) {
    return this.makeRequest('/api/eat-to-jwt', 'POST', {}, { token });
  }

  // Ban Only (GET)
  async banOnly(jwt, version = 'OB54') {
    return this.makeRequest('/ban-only', 'GET', { jwt, version });
  }

  // Ban Only (POST)
  async banOnlyPost(jwt, version = 'OB54') {
    return this.makeRequest('/api/ban', 'POST', {}, { jwt, version });
  }

  // Decode JWT (GET)
  async decodeJwt(jwt) {
    return this.makeRequest('/decode-jwt', 'GET', { jwt });
  }

  // Inspect Token (GET)
  async inspectToken(token) {
    return this.makeRequest('/inspect-token', 'GET', { token });
  }

  // Inspect Token (POST)
  async inspectTokenPost(token) {
    return this.makeRequest('/api/inspect-token', 'POST', {}, { token });
  }

  // EAT to Access Token (GET)
  async eatToAccess(eat) {
    return this.makeRequest('/eat-to-access', 'GET', { eat });
  }

  // EAT to Access Token (POST)
  async eatToAccessPost(eat) {
    return this.makeRequest('/eat-to-access', 'POST', {}, { eat });
  }

  // Access Token Info (GET)
  async accessInfo(accessToken) {
    return this.makeRequest('/access-info', 'GET', { access_token: accessToken });
  }

  // Access Token Info (POST)
  async accessInfoPost(accessToken) {
    return this.makeRequest('/access-info', 'POST', {}, { access_token: accessToken });
  }

  // Bio Update (GET)
  async bioUpdate(bio, accessToken) {
    return this.makeRequest('/bio', 'GET', { bio, access_token: accessToken });
  }

  // Bio Update (POST)
  async bioUpdatePost(bio, accessToken) {
    return this.makeRequest('/bio', 'POST', {}, { bio, access_token: accessToken });
  }

  // Get Config
  async getConfig() {
    return this.makeRequest('/config', 'GET');
  }

  // Set Config
  async setConfig(apiBase, password) {
    return this.makeRequest('/config', 'POST', {}, { api_base: apiBase, password });
  }

  // Delete Config
  async deleteConfig(password) {
    return this.makeRequest('/config', 'DELETE', {}, { password });
  }
}

export default FFApi;
    
