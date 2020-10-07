const { google } = require('googleapis');

const { OAuth2 } = google.auth;

const clientSecret = process.env.OAUTH_CLIENT_SECRET;
const clientId = process.env.OAUTH_CLIENT_ID;
const redirectUrl = process.env.OAUTH_REDIRECT_URL;
const refreshToken = process.env.OAUTH_REFRESH_TOKEN;

const client = new OAuth2(
  clientId,
  clientSecret,
  redirectUrl,
);

client.setCredentials({
  refresh_token: refreshToken,
});

const accessToken = client.getAccessToken();

module.exports = {
  accessToken,
  clientSecret,
  clientId,
  refreshToken,
};
