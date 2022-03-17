import { Express } from 'express';
import { users } from './users';
import { posts } from './posts';

export const api = (app: Express): void => {
  users(app);
  posts(app);
};
