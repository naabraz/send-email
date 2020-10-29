import { config } from 'dotenv';
import express from 'express';

config()

import { mail } from './src/controller';

const app: express.Application = express();
const port = 3000;

app.use(express.json());

mail(app);

app.listen(port, () => {
  console.log(`Server is running at port ${port} 🚀`);
});
