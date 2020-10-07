const { sendEmail } = require('../../service/mail');
const oauth = require('../../service/oauth');

const from = process.env.MAIL_SENDER;
const replyTo = process.env.REPLY_TO;

const mail = (app) => {
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

    res.send('hello world');
  });
};

module.exports = { mail };
