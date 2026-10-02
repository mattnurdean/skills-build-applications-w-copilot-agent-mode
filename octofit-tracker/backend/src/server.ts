import express from 'express';
import { connectDatabase } from './config/database.js';
import Activity from './models/Activity.js';
import Leaderboard from './models/Leaderboard.js';
import Team from './models/Team.js';
import User from './models/User.js';
import Workout from './models/Workout.js';
import { createResourceRouter } from './routes/resourceRoutes.js';

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'octofit-api', baseUrl });
});

app.use('/api/users', createResourceRouter('users', User));
app.use('/api/teams', createResourceRouter('teams', Team));
app.use('/api/activities', createResourceRouter('activities', Activity));
app.use('/api/leaderboard', createResourceRouter('leaderboard', Leaderboard));
app.use('/api/workouts', createResourceRouter('workouts', Workout));

async function startServer(): Promise<void> {
  try {
    await connectDatabase();
    app.listen(port, () => {
      console.log(`OctoFit API listening at ${baseUrl}`);
    });
  } catch (error) {
    console.error('Unable to start OctoFit API:', error);
    process.exitCode = 1;
  }
}

if (process.env.NODE_ENV !== 'test') {
  void startServer();
}

export { app, baseUrl };