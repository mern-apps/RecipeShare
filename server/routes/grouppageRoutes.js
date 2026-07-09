import express from 'express';

//grouppage
import {getgroup,getbook} from '../controllers/grouppagecontrollers.js';
import { forwardwardpaginationBooksgrouppage,backwardpaginationBooksgrouppage } from '../controllers/grouppagecontrollers.js';
import { forwardwardpaginationRecipesgrouppage,backwardpaginationRecipesgrouppage } from '../controllers/grouppagecontrollers.js';
import {getallrecipesgroupfilter } from '../controllers/grouppagecontrollers.js';

import { forwardwardpaginationUsersgrouppage,backwardpaginationUsersgrouppage } from '../controllers/grouppagecontrollers.js';

import auth from '../middleware/auth.js';

const router = express.Router();


//groups List Page
router.post('/fetchGroupById',auth, getgroup);
router.post('/fetchBookById',auth, getbook);

router.post('/books/forwardwardpaginationBooks',auth, forwardwardpaginationBooksgrouppage);
router.post('/books/backwardpaginationBooks',auth, backwardpaginationBooksgrouppage);

router.post('/recipes/getallrecipesgroupfilter',auth, getallrecipesgroupfilter);
router.post('/recipes/forwardwardpaginationRecipes',auth, forwardwardpaginationRecipesgrouppage);
router.post('/recipes/backwardpaginationRecipes',auth, backwardpaginationRecipesgrouppage);


router.post('/users/forwardwardpaginationUsers',auth, forwardwardpaginationUsersgrouppage);
router.post('/users/backwardpaginationUsers',auth, backwardpaginationUsersgrouppage);



export default router;


