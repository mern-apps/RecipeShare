import mongoose from 'mongoose';

const tripsSchema = new mongoose.Schema(
    { 
        countryandcity: {
          type: String,
          trim: true,
          unique: true,
        },

      },
      { timestamps: true }
);

const tripsmodel = mongoose.model('tripsmodel', tripsSchema);

export default tripsmodel;
