import { Router, Express, Request, Response } from 'express';
import { authenticate } from './middlewares/authenticate';
const router = Router();

export const posts = (app: Express): void => {
  app.use('/api/posts', router);
  router.use(authenticate);

  router.post('/', async (req: Request, res: Response) => {
    const { user } = res.locals;
    const { body } = req.body;

    // TODO: create post

    res.send('ok');
  });
};
