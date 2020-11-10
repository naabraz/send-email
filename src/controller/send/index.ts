import { Request, Response } from 'express';

import config from 'config';
import sendEmail from 'service/mail';
import createOAuth from 'service/oauth';

const send = (request: Request, response: Response): Response => {
  const { body } = request;
  const { message, subject } = body;

  const mailOptions = {
    from: config.MAIL_SENDER,
    to: config.SEND_TO,
    replyTo: config.REPLY_TO,
    subject,
    generateTextFromHTML: true,
    html: message,
  };

  const oAuth = createOAuth();

  sendEmail(oAuth, mailOptions);

  return response.send({ success: true });
};

export default send;
