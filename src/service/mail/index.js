const { createTransport } = require('nodemailer');

const user = process.env.OAUTH_USER;
const service = process.env.EMAIL_SERVICE;

const smtpTransport = (oauth) => createTransport({
  service,
  auth: {
    type: 'OAuth2',
    user,
    ...oauth,
  },
});

const sendEmail = (oauth, mail) => {
  const transport = smtpTransport(oauth);

  transport.sendMail(mail, (error, response) => {
    error ? console.log(error) : console.log(response);

    return transport.close();
  });
};

module.exports = { sendEmail };
