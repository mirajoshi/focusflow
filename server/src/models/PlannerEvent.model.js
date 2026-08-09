import mongoose from 'mongoose';

const plannerEventSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    date: {
      type: String, // 'YYYY-MM-DD', same reasoning as HabitLog
      required: true,
      index: true,
    },
    startTime: {
      type: String, // 'HH:MM', optional
      default: null,
    },
    endTime: {
      type: String,
      default: null,
    },
    category: {
      type: String,
      default: 'general',
    },
    color: {
      type: String,
      default: '#c97a3d',
    },
    recurrence: {
      type: {
        type: String,
        enum: ['none', 'daily', 'weekly', 'monthly'],
        default: 'none',
      },
      endDate: {
        type: String,
        default: null,
      },
    },
  },
  { timestamps: true }
);

const PlannerEvent = mongoose.model('PlannerEvent', plannerEventSchema);

export default PlannerEvent;