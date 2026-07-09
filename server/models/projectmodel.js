import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
  title: {
    type: String,
    required: true,
    trim: true
  },

  author: {
    type: String,
    trim: true
  },

  favorite: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'usermodel',
      default: [],
    }],

  image: {
    type: String,
    required: true,
  },
  
 type: {
  type: [Number],
  required: true,
  default: [10.1],
},
  
  //IsPublish: {
 //  type: String,
   // required: true,
  //  default: "no"
 // },
 
  /////// userId in the group model is an array, need to check if can be converted to be array
 owner: [
  {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "usermodel",
  },
],

  recipes: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'recipemodel',
  }],
  //groupOwner
 // group: {
   // type: mongoose.Schema.Types.ObjectId,
  //  ref: 'groupmodel', 
 // },
 
  //other groups
 groups: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'groupmodel',
  }],

}, 

{timestamps: true,}

);

const projectmodel = mongoose.model('projectmodel', projectSchema);

export default projectmodel;


