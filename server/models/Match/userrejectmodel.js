import mongoose from 'mongoose';

const userrejectSchema = new mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usermodel',
        required: true,
      },

    candidate : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usermodel',
        required: true,
      },
  },
  { timestamps: true }
);

userrejectSchema.index({ user: 1, candidate: 1 });


const userrejectmodel = mongoose.model('userrejectmodel', userrejectSchema);

export default userrejectmodel;
