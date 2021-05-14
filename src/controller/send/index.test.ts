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
      name: 'john doe',
      band: 'john doe band',
      email: 'john@doe.com',
      country: 'united stats',
      message: 'message from john doe',
    };

    const { name, band, email, country, message } = mockRequest.body;

    const html = `
    <strong>Name</strong>: ${name}<br><br>
    <strong>Band</strong>: ${band}<br><br>
    <strong>Email</strong>: ${email}<br><br>
    <strong>Country</strong>: ${country}<br><br>
    <strong>Message</strong>: ${message}<br><br>
  `;

    const mailOptions = {
      from: 'MAIL_SENDER',
      generateTextFromHTML: true,
      html,
      replyTo: email,
      subject: `CadiesArt Website Contact from: ${name}`,
      to: 'SEND_TO',
    };

    send(mockRequest, mockResponse);
    expect(sendEmail).toHaveBeenCalledWith('oAuth', mailOptions);
  });
});
