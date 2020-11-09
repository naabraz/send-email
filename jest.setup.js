jest.mock('config', () => ({
  EMAIL_SERVICE: 'EMAIL_SERVICE',
  OAUTH_USER: 'OAUTH_USER'
}));

jest.mock('helpers/logger', () => ({
  error: jest.fn(),
  info: jest.fn(),
}));
