import { userCreate, userLogin } from '@/services/user_service';
import { Router, Express } from 'express';
const router = Router();

export const users = (app: Express): void => {
  app.use('/api/users', router);

  router.post('/', async (req, res) => {
    const { name, email, password } = req.body;
    const user = await userCreate(name, email, password);

    res.send({ sessionToken: user.sessionToken });
  });

  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await userLogin(email, password);

    res.send({ sessionToken: user.sessionToken });
  });
};
