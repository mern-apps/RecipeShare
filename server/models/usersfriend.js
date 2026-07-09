import mongoose from 'mongoose';

const statusEnum = ['pending', 'declined', 'approved'];

const usersfriendSchema = new mongoose.Schema({
  // Reference to the user model for sender
  send: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'usermodel',
  },
  
  receive: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'usermodel',
  },
  
  // Status of the friend request
  status: {
    type: String,
    enum: statusEnum,
    required: true,

  }
}, {
  timestamps: true,
});


const usersfriendmodel = mongoose.model('usersfriendmodel', usersfriendSchema);

export default usersfriendmodel;
