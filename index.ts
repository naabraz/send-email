import 'dotenv/config';
import 'module-alias/register';

import express from 'express';

import mail from 'controller/index';
import logger from 'helpers/logger';

const app: express.Application = express();
const port = 3001;

app.use(express.json());

mail(app);

app.listen(port, () => logger.info(`Server is running at port ${port} 🚀`));
