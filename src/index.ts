import 'dotenv/config';
import 'module-alias/register';

import express from 'express';

import { mail } from 'controller/mail';
import logger from 'helpers/logger';

const app: express.Application = express();
const port = 3000;

app.use(express.json());

mail(app);

app.listen(port, () => logger.info(`Server is running at port ${port} 🚀`));
