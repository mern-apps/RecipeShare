import mongoose from 'mongoose';

const citiesSchema = new mongoose.Schema(
  {
    area: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
  },
  { timestamps: true }
);

const citiesmodel = mongoose.model('citiesmodel', citiesSchema);

export default citiesmodel;
