import { Application } from 'express';

import health from 'controller/health';
import send from 'controller/mail';

const mail = (app: Application): void => {
  app.post('/send', (req, res) => send(req, res));
  app.get('/health', (req, res) => health(req, res));
};

export default mail;
