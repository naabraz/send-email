import 'dotenv/config';
import 'module-alias/register';

import express, { Application } from 'express';

import { mail } from 'controller/mail';

const app: Application = express();
const port = 3000;

app.use(express.json());

mail(app);

app.listen(port, () => console.log(`Server is running at port ${port} 🚀`));
