import mongoose from 'mongoose';

const qnrSchema = new mongoose.Schema(
  {
    id: {
      type: Number,   // Define id as a number, but it could also be a string if needed
      required: true,
      unique: true     // Ensures that each question has a unique id
    },
    text: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      required: true,
      enum: ['scale', 'yesno'], // Valid types
    },
    labels: {
      type: [String],
      default: [] // Only for scale type questions
    }
  },
  { timestamps: true }
);

const qnrmodel = mongoose.model('qnrmodel', qnrSchema);

export default qnrmodel;

