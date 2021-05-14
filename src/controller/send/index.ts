import { Request, Response } from 'express';

import config from 'config';
import sendEmail from 'service/mail';
import createOAuth from 'service/oauth';

const send = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  const { body } = request;
  const { name, band, email, country, message } = body;

  const subject = `CadiesArt Website Contact from: ${name}`;

  const html = `
    <strong>Name</strong>: ${name}<br><br>
    <strong>Band</strong>: ${band}<br><br>
    <strong>Email</strong>: ${email}<br><br>
    <strong>Country</strong>: ${country}<br><br>
    <strong>Message</strong>: ${message}<br><br>
  `;

  const mailOptions = {
    from: config.MAIL_SENDER,
    to: config.SEND_TO,
    replyTo: email,
    subject,
    generateTextFromHTML: true,
    html,
  };

  const oAuth = createOAuth();

  try {
    await sendEmail(oAuth, mailOptions);
    return response.send({ success: true });
  } catch (error) {
    return response.send({
      success: false,
      error,
    });
  }
};

export default send;
