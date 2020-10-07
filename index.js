const nodemailer = require("nodemailer");
const { google } = require("googleapis");

require('dotenv').config()

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.OAUTH_CLIENT_ID,
  process.env.OAUTH_CLIENT_SECRET,
  process.env.OAUTH_REDIRECT_URL
);

oauth2Client.setCredentials({
  refresh_token: process.env.OAUTH_REFRESH_TOKEN
});

const accessToken = oauth2Client.getAccessToken()

const smtpTransport = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
       type: "OAuth2",
       user: process.env.OAUTH_USER,
       clientId: process.env.OAUTH_CLIENT_ID,
       clientSecret: process.env.OAUTH_CLIENT_SECRET,
       refreshToken: process.env.OAUTH_REFRESH_TOKEN,
       accessToken,
  }
});

const mailOptions = {
  from: process.env.MAIL_SENDER,
  to: "naabraz@gmail.com",
  replyTo: process.env.REPLY_TO,
  subject: "Node.js Email with Secure OAuth",
  generateTextFromHTML: true,
  html: "<b>test</b>"
};

smtpTransport.sendMail(mailOptions, (error, response) => {
  error ? console.log(error) : console.log(response);
  smtpTransport.close();
});