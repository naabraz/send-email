require('dotenv').config();

const express = require('express');
const { mail } = require('./src/controller');

const app = express();
const port = 3000;

app.use(express.json());

mail(app);

app.listen(port, () => {
  console.log(`Server is running at port ${port} 🚀`);
});
