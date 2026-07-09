import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    matchref: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'matchmodel',
        required: true,
      },

    send: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usermodel',
        required: true,
      },

    receive: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usermodel',
        required: true,
      },
      
      readYesOrNo: {
        type: Boolean,
        required: true, 
        default: false,
      },

      text: {
        type: String,
        required: true, 
        trim: true, 
      },
  },
  { timestamps: true }
);


const messagemodel = mongoose.model('messagemodel', messageSchema);

export default messagemodel;
