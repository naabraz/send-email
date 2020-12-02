import { createTransport } from 'nodemailer';
import { mocked } from 'ts-jest/utils';

import logger from 'helpers/logger';
import sendEmail from './index';

describe('Given mail service', () => {
  const mockedCreateTransport = mocked(createTransport, true);

  const mockTransport = {
    ...require('nodemailer'),
    sendMail: jest.fn((_, callback) => callback(null, 'response')),
    close: jest.fn(),
  };

  mockedCreateTransport.mockReturnValue(({ ...mockTransport }));

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
    sendEmail(oAuth, mail);

    expect(mockedCreateTransport).toHaveBeenCalled();
    expect(mockedCreateTransport().close).toHaveBeenCalled();
  });

  it('Should call logger method when createTransport returns error method', async () => {
    mockedCreateTransport.mockReturnValue(({
      ...mockTransport,
      sendMail: jest.fn((_, callback) => callback('error', null)),
    }));

    await expect(sendEmail(oAuth, mail)).rejects.toEqual('error');
    expect(logger.error).toHaveBeenCalledWith('error');
    expect(mockedCreateTransport().close).toHaveBeenCalled();
  });
});
