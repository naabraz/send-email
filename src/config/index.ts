export default ({
  MAIL_SENDER: process.env.MAIL_SENDER,
  SEND_TO: process.env.SEND_TO || '',
  REPLY_TO: process.env.REPLY_TO,
  OAUTH_USER: process.env.OAUTH_USER,
  EMAIL_SERVICE: process.env.EMAIL_SERVICE,
  OAUTH_CLIENT_SECRET: process.env.OAUTH_CLIENT_SECRET,
  OAUTH_CLIENT_ID: process.env.OAUTH_CLIENT_ID,
  OAUTH_REDIRECT_URL: process.env.OAUTH_REDIRECT_URL,
  OAUTH_REFRESH_TOKEN: process.env.OAUTH_REFRESH_TOKEN
});
