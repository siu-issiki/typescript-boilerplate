import express from 'express';
import cors from 'cors';
import { api } from './api';

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/ping', (req, res) => {
  res.send('hello');
});

api(app);

export default app;
