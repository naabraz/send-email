import { Request, Response } from 'express';

import config from 'config';
import sendEmail from 'service/mail';
import createOAuth from 'service/oauth';

const send = async (request: Request, response: Response): Promise<Response> => {
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

  try {
    await sendEmail(oAuth, mailOptions);
    return response.send({ success: true });
  } catch(error) {
    return response.send({
      success: false,
      error
    });
  }
};

export default send;
