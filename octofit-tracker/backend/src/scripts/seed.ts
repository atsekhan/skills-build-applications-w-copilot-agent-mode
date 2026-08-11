import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const ava = await User.create({
      name: 'Ava',
      email: 'ava@example.com',
      teamId: null,
      fitnessLevel: 'advanced',
      age: 29,
    });

    const leo = await User.create({
      name: 'Leo',
      email: 'leo@example.com',
      teamId: null,
      fitnessLevel: 'intermediate',
      age: 31,
    });

    const maya = await User.create({
      name: 'Maya',
      email: 'maya@example.com',
      teamId: null,
      fitnessLevel: 'intermediate',
      age: 27,
    });

    const thunder = await Team.create({
      name: 'Thunder',
      members: [ava._id, maya._id],
      points: 210,
      sport: 'Running',
    });

    const river = await Team.create({
      name: 'River',
      members: [leo._id],
      points: 185,
      sport: 'Cycling',
    });

    await User.updateMany(
      { _id: { $in: [ava._id, maya._id] } },
      { $set: { teamId: thunder._id } },
    );

    await User.updateOne({ _id: leo._id }, { $set: { teamId: river._id } });

    const activities = await Activity.insertMany([
      {
        userId: ava._id,
        type: 'run',
        durationMinutes: 30,
        points: 60,
        date: new Date('2026-08-01T07:00:00Z'),
      },
      {
        userId: leo._id,
        type: 'strength',
        durationMinutes: 45,
        points: 75,
        date: new Date('2026-08-02T18:30:00Z'),
      },
      {
        userId: maya._id,
        type: 'bike',
        durationMinutes: 35,
        points: 70,
        date: new Date('2026-08-03T06:15:00Z'),
      },
    ]);

    await LeaderboardEntry.insertMany([
      { userId: ava._id, name: 'Ava', points: 210, teamName: 'Thunder' },
      { userId: leo._id, name: 'Leo', points: 185, teamName: 'River' },
      { userId: maya._id, name: 'Maya', points: 165, teamName: 'Thunder' },
    ]);

    await Workout.insertMany([
      {
        title: 'Cardio Blast',
        difficulty: 'medium',
        durationMinutes: 25,
        focus: 'Endurance',
        caloriesBurned: 240,
      },
      {
        title: 'Strength Circuit',
        difficulty: 'hard',
        durationMinutes: 40,
        focus: 'Power',
        caloriesBurned: 320,
      },
      {
        title: 'Recovery Mobility',
        difficulty: 'easy',
        durationMinutes: 20,
        focus: 'Mobility',
        caloriesBurned: 120,
      },
    ]);

    const userCount = await User.countDocuments();

    console.log('Database seeding complete');
    console.log('Inserted users:', userCount);
    console.log('Sample collections:', {
      users: userCount,
      teams: await Team.countDocuments(),
      activities: await Activity.countDocuments(),
      leaderboard: await LeaderboardEntry.countDocuments(),
      workouts: await Workout.countDocuments(),
    });

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
