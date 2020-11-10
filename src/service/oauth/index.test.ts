import { google } from 'googleapis';
import { mocked } from 'ts-jest/utils';

import createOAuth from './';

jest.mock('googleapis');

describe('Given OAuth service', () => {
  const { OAuth2 } = google.auth;
  const mockOAuth2 = mocked(OAuth2, true);

  const setCredentialsMock = jest.fn();
  const getAccessTokenMock = jest.fn().mockReturnValue('AccessTokenMock');

  mockOAuth2.mockImplementation(() => ({
    ...require('googleapis'),
    setCredentials: setCredentialsMock,
    getAccessToken: getAccessTokenMock,
  }));

  it('Should call OAuth2 from Google Auth to create client', () => {
    const oAuthMock = {
      accessToken: 'AccessTokenMock',
      clientId: 'OAUTH_CLIENT_ID',
      clientSecret: 'OAUTH_CLIENT_SECRET',
      refreshToken: 'OAUTH_REFRESH_TOKEN'
    };

    expect(createOAuth()).toEqual(oAuthMock);
    expect(OAuth2).toHaveBeenCalledWith(
      'OAUTH_CLIENT_ID',
      'OAUTH_CLIENT_SECRET',
      'OAUTH_REDIRECT_URL'
    );
  });
});
