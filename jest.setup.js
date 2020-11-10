jest.mock('express');

jest.mock('nodemailer');

jest.mock('config', () => ({
  EMAIL_SERVICE: 'EMAIL_SERVICE',
  OAUTH_USER: 'OAUTH_USER',
  OAUTH_CLIENT_SECRET: 'OAUTH_CLIENT_SECRET',
  OAUTH_CLIENT_ID: 'OAUTH_CLIENT_ID',
  OAUTH_REDIRECT_URL: 'OAUTH_REDIRECT_URL',
  OAUTH_REFRESH_TOKEN: 'OAUTH_REFRESH_TOKEN'
}));

jest.mock('helpers/logger', () => ({
  error: jest.fn(),
  info: jest.fn(),
}));
