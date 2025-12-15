// src/services/api-config.js
const apiConfig = {
  baseUrl: process.env.REACT_APP_BASE_URL,
  endpoints: {
    login: "/connect/token",
    profile: "/api/app/user",
  },
  auth: {
    clientId: process.env.REACT_APP_AUTH_CLIENT_ID,
    clientSecret: process.env.REACT_APP_AUTH_CLIENT_SECRET,
    grantType: process.env.REACT_APP_AUTH_GRANT_TYPE,
    scope: process.env.REACT_APP_AUTH_SCOPE,
  },
};

export default apiConfig;
