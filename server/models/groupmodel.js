import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    //auther just for text in the screen
   owner: [
  {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "usermodel",
  },
],
    recipeUploadPermission: {
  type: Number,
  default: 1,
},
   image: {
    type: String,
    default: null,
  },
  category: {
    type: String,
  },
    userId: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'usermodel',
    }],
     usersNum: {
  type: Number,
  default: 0,
},
     pendingUserId: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'usermodel',
    }],
    recipes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'recipemodel',
    }],
    recipesNum: {
  type: Number,
  default: 0,
},
    books: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'projectmodel',
    }],
 booksNum: {
  type: Number,
  default: 0,
},
 ingFont: {
    type: Number,
    default: 1.1,
  },

password: {
      type: String,
      default: null,
      trim: true,
    },

    upperGroup: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "groupmodel",
      }
    ],

    lowerGroup: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "groupmodel",
      }
    ],

  },
  { timestamps: true }
);

const groupmodel = mongoose.model('groupmodel', groupSchema);

export default groupmodel;
