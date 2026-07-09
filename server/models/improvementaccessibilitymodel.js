import mongoose from 'mongoose';

const improvementaccessibilitySchema = new mongoose.Schema(
  {

      message: {
        type: String,
        required: true,
        trim: true
      },
      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
      },


  },
  { timestamps: true }
);

const improvementaccessibilitymodel = mongoose.model('improvementaccessibilitymodel', improvementaccessibilitySchema);

export default improvementaccessibilitymodel;
