import { Request, Response } from 'express';

const health = (_: Request, response: Response): Response  => response.send('alive 🚀');

export default health;
