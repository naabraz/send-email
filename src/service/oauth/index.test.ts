import { OAuth2Client } from 'google-auth-library';
import { mocked } from 'ts-jest/utils';

import createOAuth from './';

jest.mock('google-auth-library');

describe('Given OAuth service', () => {
  const mockOAuth2 = mocked(OAuth2Client, true);

  mockOAuth2.mockImplementation(() => ({
    ...require('google-auth-library'),
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
    expect(OAuth2Client).toHaveBeenCalledWith(
      'OAUTH_CLIENT_ID',
      'OAUTH_CLIENT_SECRET',
      'OAUTH_REDIRECT_URL'
    );
  });
});
