const { createTransport } = require('nodemailer');

const user = process.env.OAUTH_USER;
const service = process.env.EMAIL_SERVICE;
const from = process.env.MAIL_SENDER;
const replyTo = process.env.REPLY_TO;

const smtpTransport = (oauth) => createTransport({
  service,
  auth: {
    type: 'OAuth2',
    user,
    ...oauth,
  },
});

const mailOptions = {
  from,
  to: 'naabraz@gmail.com',
  replyTo,
  subject: 'Node.js Email with Secure OAuth',
  generateTextFromHTML: true,
  html: '<b>test</b>',
};

const sendEmail = (oauth) => {
  const transport = smtpTransport(oauth);

  transport.sendMail(mailOptions, (error, response) => {
    error ? console.log(error) : console.log(response);

    return transport.close();
  });
};

module.exports = { sendEmail };
