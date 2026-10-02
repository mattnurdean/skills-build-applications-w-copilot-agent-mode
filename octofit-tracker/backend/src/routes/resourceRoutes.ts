import { Router } from 'express';
import type { Model } from 'mongoose';

type ResourceName = 'users' | 'teams' | 'activities' | 'leaderboard' | 'workouts';

export function createResourceRouter<T>(resource: ResourceName, resourceModel: Model<T>): Router {
  const router = Router();

  router.get('/', async (_request, response, next) => {
    try {
      const records = await resourceModel.find().lean().exec();
      response.json(records);
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async (request, response, next) => {
    const name = typeof request.body?.name === 'string' ? request.body.name.trim() : '';

    if (!name) {
      response.status(400).json({ error: 'name is required' });
      return;
    }

    try {
      const record = await resourceModel.create({ ...request.body, name });
      response.status(201).json(record);
    } catch (error) {
      next(error);
    }
  });

  return router;
}
