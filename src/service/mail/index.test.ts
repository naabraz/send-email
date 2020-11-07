import { createTransport } from 'nodemailer';
import { mocked } from 'ts-jest/utils';

import { sendEmail } from './index';

jest.mock('nodemailer');
jest.mock('config', () => ({
  EMAIL_SERVICE: 'EMAIL_SERVICE',
  OAUTH_USER: 'OAUTH_USER'
}))
jest.mock('helpers/logger', () => ({
  error: jest.fn(),
  info: jest.fn(),
}))

describe('Given mail service', () => {
  const mockedCreateTransport = mocked(createTransport, true)

  mockedCreateTransport.mockReturnValue(({
    ...require('nodemailer'),
    sendMail: jest.fn((_, callback) => callback()),
    close: jest.fn(),
  }))

  const oAuth = {
    accessToken: new Promise((resolve, _) => resolve(true)),
    clientSecret: 'clientSecret',
    clientId: 'clientId',
    refreshToken: 'refreshToken',
  }

  const mail = {
    from: 'from',
    to: 'string',
    replyTo: 'string',
    subject: 'string',
    generateTextFromHTML: true,
    html: 'string',
  }

  it('Should call createTransport nodemailer method', () => {
    const mockedSmtpTransport = {
      "auth": {
          clientId: "clientId",
          clientSecret: "clientSecret",
          refreshToken: "refreshToken",
          type: "OAuth2",
          user: "OAUTH_USER"
        },
        service: "EMAIL_SERVICE"
      }

    sendEmail(oAuth, mail)

    expect(mockedCreateTransport).toHaveBeenCalledWith(mockedSmtpTransport)
  })
})