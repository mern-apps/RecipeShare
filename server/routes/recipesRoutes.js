import express from 'express';
import multer from 'multer'; // Import multer for handling file uploads

import { addnewrecipe1urlimage,addnewrecipe1fileimage,geteditrecipepage,updaterecipe } from '../controllers/recipecontroller.js';
import { editrecipepage } from '../controllers/recipecontroller.js';
//
import { generateRecipePrompt } from '../controllers/recipecontroller.js';
import { fetchUnsplashImages,apiAIImage } from "../controllers/recipecontroller.js";
import { addnewrecipe,addnewrecipeAdmin } from '../controllers/recipecontroller.js';
import { editrecipe } from '../controllers/recipecontroller.js';
import { fetchRecipeById } from '../controllers/recipecontroller.js';
import { addtofavoriterecipe,removefavoriterecipe } from '../controllers/recipecontroller.js';
import { deleterecipe } from '../controllers/recipecontroller.js';
import { copyrecipe } from '../controllers/recipecontroller.js';

import { PDFBook } from '../controllers/PDF/pdfcontrollers.js';
import auth from '../middleware/auth.js';
  
const router = express.Router();


const upload = multer({ storage: multer.memoryStorage() });


//New
router.post('/generateRecipePrompt', auth, generateRecipePrompt); 
router.post('/unsplashImages',auth, fetchUnsplashImages);
router.post('/apiAIImage',auth, apiAIImage);
router.post('/addnewrecipeAdmin',auth, addnewrecipeAdmin);
router.post('/addnewrecipe',auth, addnewrecipe);
router.post('/editrecipe',auth, editrecipe);
router.post('/fetchRecipeById',auth, fetchRecipeById);
  router.post('/addtofavoriterecipe',auth, addtofavoriterecipe);
  router.post('/removefavoriterecipe',auth, removefavoriterecipe);
  router.post('/deleterecipe',auth, deleterecipe);
    router.post('/copyrecipe',auth, copyrecipe);
  router.post('/PDFRecipe',auth, PDFBook);

//
const logIncomingRequests = (req, res, next) => {
    console.log('Request Method:', req.method);
    console.log('Request URL:', req.originalUrl);
    console.log('Request Headers:', req.headers);
    console.log('Request Body:', req.body);
    console.log('Request Files:', req.file); // Use req.file for single file uploads
    next(); // Pass control to the next middleware or route handler
  };

router.post('/addnewrecipe1fileimage', auth,  upload.single('image'),logIncomingRequests, addnewrecipe1fileimage);
router.post('/addnewrecipe1urlimage', auth, addnewrecipe1urlimage); 

router.post('/editrecipepage',auth, editrecipepage); 
router.post('/editrecipepagefileimage', auth,  upload.single('image'),logIncomingRequests, editrecipepage);


//router.post('/recipe1',auth, addrecipe1);


export default router;

