import mongoose from 'mongoose';

const pomodoroSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    linkedTodoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Todo',
      default: null,
    },
    type: {
      type: String,
      enum: ['focus', 'short-break', 'long-break'],
      default: 'focus',
    },
    plannedDuration: {
      type: Number, // in minutes
      required: true,
    },
    actualDuration: {
      type: Number, // in minutes, set when the session ends
      default: null,
    },
    startedAt: {
      type: Date,
      required: true,
    },
    endedAt: {
      type: Date,
      default: null,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const PomodoroSession = mongoose.model('PomodoroSession', pomodoroSessionSchema);

export default PomodoroSession;