import express from 'express';

import {getgroup,getbook} from '../controllers/grouppagecontrollers.js';
import { forwardwardpaginationBooksgrouppage,backwardpaginationBooksgrouppage } from '../controllers/grouppagecontrollers.js';

import { forwardwardpaginationRecipesgrouppage,backwardpaginationRecipesgrouppage } from '../controllers/grouppagecontrollers.js';
import { getallrecipesgroupfilter } from '../controllers/grouppagecontrollers.js';

import { forwardwardpaginationUsersgrouppage,backwardpaginationUsersgrouppage } from '../controllers/grouppagecontrollers.js';

import authcookie from '../middleware/authcookie.js';

const router = express.Router();

//grouppage
router.post('/fetchGroupByIdcookie',authcookie, getgroup);
router.post('/fetchBookByIdcookie',authcookie, getbook);



router.post('/books/forwardwardpaginationBookscookie',authcookie, forwardwardpaginationBooksgrouppage);
router.post('/books/backwardpaginationBookscookie',authcookie, backwardpaginationBooksgrouppage);


router.post('/recipes/getallrecipesgroupfiltercookie',authcookie, getallrecipesgroupfilter);
router.post('/recipes/forwardwardpaginationRecipescookie',authcookie, forwardwardpaginationRecipesgrouppage);
router.post('/recipes/backwardpaginationRecipescookie',authcookie, backwardpaginationRecipesgrouppage);
router.post('/users/forwardwardpaginationUserscookie',authcookie, forwardwardpaginationUsersgrouppage);
router.post('/users/backwardpaginationUserscookie',authcookie, backwardpaginationUsersgrouppage);

export default router;
