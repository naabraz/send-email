import { createTransport } from 'nodemailer';

import { Mail, OAuth } from 'types';

const user = process.env.OAUTH_USER;
const service = process.env.EMAIL_SERVICE;

const smtpTransport = (oauth: OAuth) => createTransport({
  service,
  auth: {
    type: 'OAuth2',
    user,
    refreshToken: oauth.refreshToken,
    clientId: oauth.clientId,
    clientSecret: oauth.clientSecret
  },
});

export const sendEmail = (oauth: OAuth, mail: Mail) => {
  const transport = smtpTransport(oauth);

  transport.sendMail(mail, (error, response) => {
    error ? console.log(error) : console.log(response);

    return transport.close();
  });
};
