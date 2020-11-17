import { createTransport } from 'nodemailer';

import config from 'config';
import logger from 'helpers/logger';
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

const sendEmail = (oauth: OAuth, mail: Mail): Promise<unknown> => {
  const transport = smtpTransport(oauth);

  return new Promise((resolve, reject) => {
    transport.sendMail(mail, (error, response) => {
      if (error) {
        reject(error);
        logger.error(error);
      }

      logger.info({ message: JSON.stringify(response) });
      resolve(response);

      return transport.close();
    });
  });
};

export default sendEmail;
