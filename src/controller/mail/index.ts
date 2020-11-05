import { Application } from 'express';

import { sendEmail } from 'service/mail';
import oauth from 'service/oauth';

const from = process.env.MAIL_SENDER;
const replyTo = process.env.REPLY_TO;

export const mail = (app: Application) => {
  app.post('/send', (req, res) => {
    const { body } = req;
    const { message, subject } = body;

    const mailOptions = {
      from,
      to: 'naabraz@gmail.com',
      replyTo,
      subject,
      generateTextFromHTML: true,
      html: message,
    };

    sendEmail(oauth, mailOptions);

    res.send({ success: true });
  });

  app.get('/health', (_, res) => res.send('alive :)'))
};
