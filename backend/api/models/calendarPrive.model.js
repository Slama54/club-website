import mongoose from 'mongoose';

const calendarPriveSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    
      calendarPriveDateStart: {
        type: Date,
        required: true,
      },
      calendarPriveDateEnd: {
        type: Date,
        required: true,
      },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    
    category: {
      type: String,
      default: 'uncategorized',
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const calendarPrive = mongoose.model('calendarPrive', calendarPriveSchema);

export default calendarPrive;