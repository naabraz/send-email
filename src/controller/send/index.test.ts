import { request, response } from 'express';
import { mocked } from 'ts-jest/utils';

import sendEmail from 'service/mail';
import send from './index';

jest.mock('service/mail', () => jest.fn());
jest.mock('service/oauth', () => jest.fn().mockReturnValue('oAuth'));

describe('Given Mail controller', () => {
  const mockRequest = mocked(request, true);
  const mockResponse = mocked(response, true);

  it('Should call sendMail service with mail data', () => {
    mockRequest.body = {
      message: 'mail message',
      subject: 'mail subject'
    };

    const mailOptions = {
      from: 'MAIL_SENDER',
      generateTextFromHTML: true,
      html: 'mail message',
      replyTo: 'REPLY_TO',
      subject: 'mail subject',
      to: 'SEND_TO'
    };

    send(mockRequest, mockResponse);
    expect(sendEmail).toHaveBeenCalledWith('oAuth', mailOptions);
  });
});
