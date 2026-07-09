import mongoose from 'mongoose';
const recipeAdminSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'usermodel',
  },
 type: {
  type: [Number],
  default: [],
},
 ingFont: {
    type: Number,
    default: 1.1,
  },
   insFont: {
    type: Number,
    default: 1.1,
  },
  title: {
    type: String,
    trim: true,
  },
  author: {
    type: String,
    trim: true,
  },
  ingredients: {
    type: String,
    trim: true,
  },
  instructions: {
    type: String,
    trim: true,
  },
  image: {
    type: String,  // For storing image URL
    default: null,
  },
  selectedCategories: {
    type: String,
  },
   country: {
    type: String,
  },
  selectedTags: {
    type: [String],
    default: [],
  },

  level: {
    type: String,
  },
  numserves: {
    type: String,
  },
  book: {
    type: String,
    default: null,
  },
  groups: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'groupmodel',
  }],
  favorite: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'usermodel',
    default: [],
  }],

  predecessor: {
  type: [
    {
      owner: { type: String },
      recipeID: { type: String },
      typeRec: { type: String },
    }
  ],
  default: [],
},

insFont: {
    type: Number,
    default: 25,
  },
  ingFont: {
    type: Number,
    default: 25,
  },
  

  best: {
    type: Number,
    default: 0,
  },
  numClick: {
    type: Number,
    default: 0,
  },

}, {
  timestamps: true,
});

const recipeAdminModel = mongoose.model('recipeAdminModel', recipeAdminSchema);

export default recipeAdminModel;

