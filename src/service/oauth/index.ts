import { google } from 'googleapis';

import config from 'config';
import { OAuth } from 'types';

const { OAuth2 } = google.auth;

const createOAuth = (): OAuth => {
  const clientSecret = config.OAUTH_CLIENT_SECRET;
  const clientId = config.OAUTH_CLIENT_ID;
  const redirectUrl = config.OAUTH_REDIRECT_URL;
  const refreshToken = config.OAUTH_REFRESH_TOKEN;

  const client = new OAuth2(
    clientId,
    clientSecret,
    redirectUrl,
  );

  client.setCredentials({ refresh_token: config.OAUTH_REFRESH_TOKEN });

  return {
    accessToken: client.getAccessToken(),
    clientSecret,
    clientId,
    refreshToken,
  };
};

export default createOAuth;
