import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema(
  {
    user1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usermodel',
        required: true,
      },

      user2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usermodel',
        required: true,
      },

      lastMessages: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'messagemodel', // Reference to the messagemodel
        },
      ],
      codes:[
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'codesmodel', // Reference to the messagemodel
        },
      ]
  },
  { timestamps: true }
);

matchSchema.index({ user1: 1, user2: 1 });


const matchmodel = mongoose.model('matchmodel', matchSchema);

export default matchmodel;
