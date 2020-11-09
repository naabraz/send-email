import { createTransport } from 'nodemailer';
import { mocked } from 'ts-jest/utils';

import logger from 'helpers/logger';
import { sendEmail } from './index';

jest.mock('nodemailer');

describe('Given mail service', () => {
  const mockedCreateTransport = mocked(createTransport, true);

  mockedCreateTransport.mockReturnValue(({
    ...require('nodemailer'),
    sendMail: jest.fn((_, callback) => callback(null, 'response')),
    close: jest.fn(),
  }));

  const oAuth = {
    accessToken: new Promise((resolve) => resolve(true)),
    clientSecret: 'clientSecret',
    clientId: 'clientId',
    refreshToken: 'refreshToken',
  };

  const mail = {
    from: 'from',
    to: 'string',
    replyTo: 'string',
    subject: 'string',
    generateTextFromHTML: true,
    html: 'string',
  };

  it('Should call createTransport nodemailer method', () => {
  const mockedSmtpTransport = {
    auth: {
        clientId: 'clientId',
        clientSecret: 'clientSecret',
        refreshToken: 'refreshToken',
        type: 'OAuth2',
        user: 'OAUTH_USER'
      },
      service: 'EMAIL_SERVICE'
    };

    sendEmail(oAuth, mail);

    expect(mockedCreateTransport).toHaveBeenCalledWith(mockedSmtpTransport);
    expect(mockedCreateTransport().close).toHaveBeenCalled();
  });

  it('Should call logger method when createTransport returns error method', () => {
    mockedCreateTransport.mockReturnValue(({
      ...require('nodemailer'),
      sendMail: jest.fn((_, callback) => callback('error', null)),
      close: jest.fn(),
    }));

    sendEmail(oAuth, mail);

    expect(logger.error).toHaveBeenCalledWith('error');
    expect(mockedCreateTransport().close).toHaveBeenCalled();
  });
});
