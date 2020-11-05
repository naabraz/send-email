import { createTransport } from 'nodemailer';

import config from 'config';
import { Mail, OAuth } from 'types';

const smtpTransport = (oauth: OAuth) => createTransport({
  service: config.EMAIL_SERVICE,
  auth: {
    type: 'OAuth2',
    user: config.OAUTH_USER,
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
