import mongoose from 'mongoose';

const habitLogSchema = new mongoose.Schema(
  {
    habitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Habit',
      required: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    date: {
      type: String, // Stored as 'YYYY-MM-DD' for simple, reliable comparisons
      required: true,
    },
    status: {
      type: String,
      enum: ['completed', 'skipped'],
      default: 'completed',
    },
  },
  { timestamps: true }
);

// Prevent duplicate check-ins for the same habit on the same day
habitLogSchema.index({ habitId: 1, date: 1 }, { unique: true });

const HabitLog = mongoose.model('HabitLog', habitLogSchema);

export default HabitLog;