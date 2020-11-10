import { google } from 'googleapis';
import { mocked } from 'ts-jest/utils';

import createOAuth from './';

jest.mock('googleapis');

describe('Given OAuth service', () => {
  const { OAuth2 } = google.auth;
  const mockOAuth2 = mocked(OAuth2, true);

  mockOAuth2.mockImplementation(() => ({
    ...require('googleapis'),
    setCredentials: jest.fn(),
    getAccessToken: jest.fn().mockReturnValue('AccessTokenMock'),
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
