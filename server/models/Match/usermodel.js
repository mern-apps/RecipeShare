import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
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



  useradmin: {
    type: Number,
    default: 1  // Default value set to 1
  },

  cookie: {
    type: Number,
    default: 0  //0 = No
  },

  //image: {
   // type: String, // Store the picture as a URL pointing to the image location
    //default: '' // Default picture can be an empty string or a path to a default image
  //},

  birthday: {
    type: Date,
    default: Date.now
  },

  minBirthdate: {
    type: Date,
    default: null, 
  },
  maxBirthdate: {
    type: Date,
    default: null, 
  },
  //selectedLocations: {
  //  type: [String],
   // default: null, 
  //},
 // selectedMeetingLocations: {
   // type: [String],
  //  default: null, 
 // },
 images: {
  type: [String], 
  default: [], 
},

  description: {
    type: String,
    default: '',
    // Don't use trim here so we keep user's leading/trailing whitespace
    // Newline characters (\n) will be stored as-is
  },

  qnr: {
    type: [{ 
      questionId: { type: Number },
      answer: { type: Number },
      highlighted: { type: Boolean },
    }],
    default: [],
  },


  myGender: {
    type: String,
    trim: true
  },

  otherUserGender: {
    type: String,
    trim: true
  },

  codes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'codesmodel',
    },
  ],
  trips: [
    {
      countryandcity: {
        type: String,
        trim: true,
      },
      datestart: {
        type: Date,
        default: null,
      },
      datefinish: {
        type: Date,
        default: null,
      },
    },
  ],

        //for trips
        servercount: {
          type: Number,
          default: 0,
        },


  codespending: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'codesmodel',
    },
  ],
  //need to complete action sign up AND to ensure user auth redux is with this info.
  hasdata: 
  {
    type: Number,
    default: 0,
  },

  city: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'citiesmodel',
  },


    maxTimeMessage: {
      type: Date,
      default: Date.now, 
    },
    maxTimeMatch: {
      type: Date,
      default: Date.now, 
    },
    countlikes: 
    {
      type: Number,
      default: 0,
    },
}, {
  timestamps: true  
});

// Ensure email is unique with a MongoDB index
userSchema.index({ email: 1 }, { unique: true });

const usermodel = mongoose.model('usermodel', userSchema);

export default usermodel;




