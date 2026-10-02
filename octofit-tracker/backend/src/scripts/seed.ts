import { connectDatabase, disconnectDatabase } from '../config/database.js';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Team from '../models/Team.js';
import User from '../models/User.js';
import Workout from '../models/Workout.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        username: 'octocat',
        email: 'octocat@example.com',
        displayName: 'Mona Octocat',
        points: 420,
      },
      {
        username: 'fit-bot',
        email: 'fit-bot@example.com',
        displayName: 'Fit Bot',
        points: 315,
      },
    ]);

    await Team.insertMany([
      {
        name: 'Octo Athletes',
        description: 'A friendly team focused on consistent progress.',
        members: [users[0]._id, users[1]._id],
      },
    ]);

    await Activity.insertMany([
      {
        user: users[0]._id,
        type: 'Running',
        durationMinutes: 30,
        calories: 320,
        completedAt: new Date('2026-09-30T07:30:00Z'),
      },
      {
        user: users[1]._id,
        type: 'Cycling',
        durationMinutes: 45,
        calories: 410,
        completedAt: new Date('2026-09-29T17:00:00Z'),
      },
    ]);

    await Leaderboard.insertMany([
      { user: users[0]._id, points: 420, rank: 1, period: 'weekly' },
      { user: users[1]._id, points: 315, rank: 2, period: 'weekly' },
    ]);

    await Workout.insertMany([
      {
        name: 'Morning Cardio',
        description: 'A steady routine to build endurance and start the day.',
        difficulty: 'beginner',
        durationMinutes: 30,
        target: 'Cardio',
      },
      {
        name: 'Full Body Strength',
        description: 'Compound movements for a balanced strength session.',
        difficulty: 'intermediate',
        durationMinutes: 45,
        target: 'Strength',
      },
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await disconnectDatabase();
  }
}

void seedDatabase();
