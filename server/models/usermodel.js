import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true, 
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: true,
    minlength: 1  // Updated minimum length for better security
  },
  favorite: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'recipemodel',
  }],

  favoriteAdmin: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'recipeAdminModel',
  }],

 favoritebook: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'projectmodel',
  }],

  useradmin: {
    type: Number,
    default: 1  // Default value set to 1
  },
  accessibility: {
    darkContrast: {
          type: Boolean,
          default: false,
        },
        lightContrast: {
          type: Boolean,
          default: false,
        },
        contrastMode: {
          type: Boolean,
          default: false,
        },
        fontSizeAdjustments: {
          type: Number,
          enum: [100, 133, 165, 200], // Example: only these specific values
          default: 100,
        },

        lowSaturation: {
          type: Boolean,
          default: false,
        },
        highSaturation: {
          type: Boolean,
          default: false,
        },

        characterKeyShortcuts: {
          type: Boolean,
          default: false,
        },
      },
        cookie: {
    type: Number,
    default: 0  //0 = No
  },
    creditImage: {
    type: Number,
    default: 10
  },

 image: {
    type: String,
    default: null,
  },

   codes: [
     {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'groupmodel',
     },
   ],
     servercount: {
             type: Number,
             default: 0,
           },
   


}, {
  timestamps: true  // Enables createdAt and updatedAt fields automatically
});

// Ensure email is unique with a MongoDB index
//userSchema.index({ email: 1 }, { unique: true });

const usermodel = mongoose.model('usermodel', userSchema);

export default usermodel;