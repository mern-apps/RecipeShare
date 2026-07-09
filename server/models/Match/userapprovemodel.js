import mongoose from 'mongoose';

const userapproveSchema = new mongoose.Schema(
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

userapproveSchema.index({ user: 1, candidate: 1 });


const userapprovemodel = mongoose.model('userapprovemodel', userapproveSchema);

export default userapprovemodel;
