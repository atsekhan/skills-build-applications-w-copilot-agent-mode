import express from 'express';
import mongoose from 'mongoose';
import db from './config/database.js';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models/index.js';

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

app.get('/api', (req, res) => {
  res.json({
    message: 'OctoFit Tracker backend is running',
    apiBaseUrl,
    routes: [
      '/api/users/',
      '/api/teams/',
      '/api/activities/',
      '/api/leaderboard/',
      '/api/workouts/',
    ],
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    env: process.env.NODE_ENV || 'development',
    database: db.readyState === 1 ? 'connected' : 'disconnected',
    apiBaseUrl,
  });
});

app.route('/api/users/')
  .get(async (req, res) => {
    const users = await User.find().populate('teamId');
    res.json(users);
  })
  .post(async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  });

app.route('/api/teams/')
  .get(async (req, res) => {
    const teams = await Team.find().populate('members');
    res.json(teams);
  })
  .post(async (req, res) => {
    try {
      const team = await Team.create(req.body);
      res.status(201).json(team);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  });

app.route('/api/activities/')
  .get(async (req, res) => {
    const activities = await Activity.find().populate('userId');
    res.json(activities);
  })
  .post(async (req, res) => {
    try {
      const activity = await Activity.create(req.body);
      res.status(201).json(activity);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  });

app.route('/api/leaderboard/')
  .get(async (req, res) => {
    const leaderboard = await LeaderboardEntry.find().populate('userId');
    res.json(leaderboard);
  })
  .post(async (req, res) => {
    try {
      const entry = await LeaderboardEntry.create(req.body);
      res.status(201).json(entry);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  });

app.route('/api/workouts/')
  .get(async (req, res) => {
    const workouts = await Workout.find();
    res.json(workouts);
  })
  .post(async (req, res) => {
    try {
      const workout = await Workout.create(req.body);
      res.status(201).json(workout);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  });

app.listen(port, '0.0.0.0', () => {
  console.log(`Backend listening on http://0.0.0.0:${port}`);
  console.log(`API base URL: ${apiBaseUrl}`);
});
