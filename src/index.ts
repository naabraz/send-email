import 'dotenv/config';
import 'module-alias/register';

import express, { Application } from 'express';

import { mail } from 'controller/mail';
import logger from 'helpers/logger';

const app: Application = express();
const port = 3000;

app.use(express.json());

mail(app);

app.listen(port, () => logger.info(`Server is running at port ${port} 🚀`));
