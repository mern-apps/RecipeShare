import mongoose from 'mongoose';

const blockSchema = new mongoose.Schema(
  {
    groups: {
      type: Boolean,
      default: false,
    },
    find: {
      type: Boolean,
      default: false,
    },
    match: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Boolean,
      default: false,
    },
    homepage: {
      type: Boolean,
      default: false,
    },
    
  },
  { timestamps: true }
);

const blockmodel = mongoose.model('blockmodel', blockSchema);

export default blockmodel;
