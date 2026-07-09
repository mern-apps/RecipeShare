import express from 'express';
import multer from 'multer'; // Import multer for handling file uploads

import { addnewrecipe1urlimage,addnewrecipe1fileimage,geteditrecipepage,updaterecipe } from '../controllers/recipecontroller.js';
import { editrecipepage } from '../controllers/recipecontroller.js';

import { generateRecipePrompt } from '../controllers/recipecontroller.js';
import { fetchUnsplashImages,apiAIImage } from "../controllers/recipecontroller.js";
import { addnewrecipe,addnewrecipeAdmin } from '../controllers/recipecontroller.js';
import { editrecipe } from '../controllers/recipecontroller.js';
import { fetchRecipeById } from '../controllers/recipecontroller.js';

import { addtofavoriterecipe,removefavoriterecipe } from '../controllers/recipecontroller.js';
import { deleterecipe } from '../controllers/recipecontroller.js';
import { copyrecipe } from '../controllers/recipecontroller.js';
import { PDFRecipe } from '../controllers/recipecontroller.js';

import authcookie from '../middleware/authcookie.js';

const router = express.Router();


const upload = multer({ storage: multer.memoryStorage() });

const logIncomingRequests = (req, res, next) => {
    console.log('Request Method:', req.method);
    console.log('Request URL:', req.originalUrl);
    console.log('Request Headers:', req.headers);
    console.log('Request Body:', req.body);
    console.log('Request Files:', req.file); // Use req.file for single file uploads
    next(); // Pass control to the next middleware or route handler
  };



  router.post('/generateRecipePromptcookie', authcookie, generateRecipePrompt); 
  router.post('/unsplashImagescookie',authcookie, fetchUnsplashImages);
  router.post('/apiAIImagecookie',authcookie, apiAIImage);
  router.post('/addnewrecipeAdmincookie',authcookie, addnewrecipeAdmin);
  router.post('/addnewrecipecookie',authcookie, addnewrecipe);
  router.post('/editrecipecookie',authcookie, editrecipe);
  router.post('/fetchRecipeByIdcookie',authcookie, fetchRecipeById);
  router.post('/addtofavoriterecipecookie',authcookie, addtofavoriterecipe);
  router.post('/removefavoriterecipecookie',authcookie, removefavoriterecipe);
  router.post('/deleterecipecookie',authcookie, deleterecipe);
  router.post('/copyrecipe',authcookie, copyrecipe);


  router.post('/PDFRecipe',authcookie, PDFRecipe);

  //
router.post('/addnewrecipe1fileimage', authcookie,  upload.single('image'),logIncomingRequests, addnewrecipe1fileimage);
router.post('/addnewrecipe1urlimage', authcookie, addnewrecipe1urlimage); 

router.post('/editrecipepage',authcookie, editrecipepage); 
router.post('/editrecipepagefileimage', authcookie,  upload.single('image'),logIncomingRequests, editrecipepage);


//router.post('/recipe1',authcookie, addrecipe1);


export default router;

