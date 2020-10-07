require('dotenv').config();

const { sendEmail } = require('./src/mail');
const oauth = require('./src/oauth');

sendEmail(oauth);
