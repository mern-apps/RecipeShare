import express from 'express';

import { getallrecipesbest, forwardpaginationactionbest,backwardpaginationactionbest} from '../controllers/allrecipespagecontrollers.js';
import { getallrecipes,forwardpaginationmyrecipes,backwardpaginationmyrecipes} from '../controllers/allrecipespagecontrollers.js';
import {getallrecipesfavorite, forwardpaginationfavorite,backwardpaginationfavorite} from '../controllers/allrecipespagecontrollers.js';
import { getallrecipescuisine, forwardpaginationcuisine,backwardpaginationcuisine} from '../controllers/allrecipespagecontrollers.js';
import { getallrecipesbook,backwardpaginationbook,forwardpaginationbook} from '../controllers/allrecipespagecontrollers.js';
import { getallbooks} from '../controllers/projectcontroller.js';

import { getallgroups,getallbooksgroup} from '../controllers/allrecipespagecontrollers.js';

import auth from '../middleware/auth.js';

const router = express.Router();


router.post('/allrecipes',auth, getallrecipes);
//router.post('/forwardpaginationmyrecipes',auth, forwardpaginationmyrecipes);
//router.post('/backwardpaginationmyrecipes',auth, backwardpaginationmyrecipes);

router.post('/getallrecipesfavorite',auth, getallrecipesfavorite);
//router.post('/forwardpaginationfavorite',auth, forwardpaginationfavorite);
//router.post('/backwardpaginationfavorite',auth, backwardpaginationfavorite);

router.post('/best',auth, getallrecipesbest);
//router.post('/forwardpaginationbest',auth, forwardpaginationactionbest);
//router.post('/backwardpaginationbest',auth, backwardpaginationactionbest);

//router.post('/cuisine',auth, getallrecipescuisine);
//router.post('/forwardpaginationcuisine',auth, forwardpaginationcuisine);
//router.post('/backwardpaginationcuisine',auth, backwardpaginationcuisine);



router.get('/allbooks',auth, getallbooks);
router.post('/forwardpaginationbook',auth, forwardpaginationbook);
router.post('/backwardpaginationbook',auth, backwardpaginationbook);
router.post('/recipesbook',auth, getallrecipesbook);

router.get('/allgroups',auth,getallgroups);
router.post('/allbooksgroup',auth,getallbooksgroup);


export default router;


  