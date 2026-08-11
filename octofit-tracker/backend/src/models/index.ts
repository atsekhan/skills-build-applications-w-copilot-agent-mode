import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
    fitnessLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    age: { type: Number, min: 13 },
  },
  { timestamps: true },
);

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    points: { type: Number, default: 0 },
    sport: { type: String, default: 'Fitness' },
  },
  { timestamps: true },
);

const activitySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    points: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const leaderboardSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    points: { type: Number, default: 0 },
    teamName: { type: String, default: 'Solo' },
  },
  { timestamps: true },
);

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium',
    },
    durationMinutes: { type: Number, required: true },
    focus: { type: String, default: 'General fitness' },
    caloriesBurned: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const User = mongoose.model('User', userSchema);
export const Team = mongoose.model('Team', teamSchema);
export const Activity = mongoose.model('Activity', activitySchema);
export const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardSchema);
export const Workout = mongoose.model('Workout', workoutSchema);
