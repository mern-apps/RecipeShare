import express from 'express';

import { getallrecipesbest, forwardpaginationactionbest,backwardpaginationactionbest} from '../controllers/allrecipespagecontrollers.js';
import { getallrecipes,forwardpaginationmyrecipes,backwardpaginationmyrecipes} from '../controllers/allrecipespagecontrollers.js';
import {getallrecipesfavorite, forwardpaginationfavorite,backwardpaginationfavorite} from '../controllers/allrecipespagecontrollers.js';
import { getallrecipescuisine, forwardpaginationcuisine,backwardpaginationcuisine} from '../controllers/allrecipespagecontrollers.js';
import { getallrecipesbook,backwardpaginationbook,forwardpaginationbook} from '../controllers/allrecipespagecontrollers.js';

import { getallbooks} from '../controllers/projectcontroller.js';

import { getallgroups,getallbooksgroup} from '../controllers/allrecipespagecontrollers.js';





import authcookie from '../middleware/authcookie.js';

const router = express.Router();




router.post('/allrecipescookie',authcookie, getallrecipes);
router.post('/forwardpaginationmyrecipescookie',authcookie, forwardpaginationmyrecipes);
router.post('/backwardpaginationmyrecipescookie',authcookie, backwardpaginationmyrecipes);

router.post('/getallrecipesfavoritecookie',authcookie, getallrecipesfavorite);
router.post('/forwardpaginationfavoritecookie',authcookie, forwardpaginationfavorite);
router.post('/backwardpaginationfavoritecookie',authcookie, backwardpaginationfavorite);

router.post('/bestcookie',authcookie, getallrecipesbest);
router.post('/forwardpaginationbestcookie',authcookie, forwardpaginationactionbest);
router.post('/backwardpaginationbestcookie',authcookie, backwardpaginationactionbest);

router.post('/cuisinecookie',authcookie, getallrecipescuisine);
router.post('/forwardpaginationcuisinecookie',authcookie, forwardpaginationcuisine);
router.post('/backwardpaginationcuisinecookie',authcookie, backwardpaginationcuisine);

router.get('/allbookscookie',authcookie, getallbooks);
router.post('/forwardpaginationbookcookie',authcookie, forwardpaginationbook);
router.post('/backwardpaginationbookcookie',authcookie, backwardpaginationbook);
router.post('/recipesbookcookie',authcookie, getallrecipesbook);

router.get('/allgroupscookie',authcookie,getallgroups);
router.post('/allbooksgroupcookie',authcookie,getallbooksgroup);





//

export default router;


  