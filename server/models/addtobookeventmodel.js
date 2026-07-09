import mongoose from 'mongoose';

const addtobookeventmodelSchema = new mongoose.Schema(
  {
    owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'usermodel', 
  },
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'recipemodel', 
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'projectmodel', 
  },
 
  //addtoarrayk: [{ 
  //  type: mongoose.Schema.Types.ObjectId,
    //ref: 'recipemodel',
 // }],
  //default: [],
}, 

{timestamps: true,}

);

const addtobookeventmodel = mongoose.model('addtobookeventmodel', addtobookeventmodelSchema);

export default addtobookeventmodel;