import mongoose from 'mongoose';

const habitSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Habit name is required'],
      trim: true,
    },
    icon: {
      type: String,
      default: '✓',
    },
    frequency: {
      type: {
        type: String,
        enum: ['daily', 'weekly', 'custom'],
        default: 'daily',
      },
      daysOfWeek: {
        type: [Number], // 0 = Sunday, 6 = Saturday
        default: [],
      },
    },
    currentStreak: {
      type: Number,
      default: 0,
    },
    longestStreak: {
      type: Number,
      default: 0,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Habit = mongoose.model('Habit', habitSchema);

export default Habit;