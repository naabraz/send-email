import { Application } from 'express';

import config from 'config';
import sendEmail from 'service/mail';
import oauth from 'service/oauth';

const mail = (app: Application): void => {
  app.post('/send', (req, res) => {
    const { body } = req;
    const { message, subject } = body;

    const mailOptions = {
      from: config.MAIL_SENDER,
      to: config.SEND_TO,
      replyTo: config.REPLY_TO,
      subject,
      generateTextFromHTML: true,
      html: message,
    };

    sendEmail(oauth, mailOptions);

    res.send({ success: true });
  });

  app.get('/health', (_, res) => res.send('alive 🚀'));
};

export default mail;
