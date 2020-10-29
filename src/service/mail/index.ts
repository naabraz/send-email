import { createTransport } from 'nodemailer';

import { Mail, OAuth } from '../../interfaces';

const user = process.env.OAUTH_USER;
const service = process.env.EMAIL_SERVICE;

const smtpTransport = (oauth: OAuth) => createTransport({
  service,
  auth: {
    type: 'OAuth2',
    user,
    ...oauth,
  },
});

export const sendEmail = (oauth: OAuth, mail: Mail) => {
  const transport = smtpTransport(oauth);

  transport.sendMail(mail, (error, response) => {
    error ? console.log(error) : console.log(response);

    return transport.close();
  });
};
