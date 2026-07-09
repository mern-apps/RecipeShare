import express from 'express';
import { deleteallrecipes } from '../controllers/recipecontroller.js';
import { deleteallprojects } from '../controllers/projectcontroller.js';
import { handledeleteAllgroups } from '../controllers/groupcontroller.js';


import auth from '../middleware/auth.js';

const router = express.Router();

router.delete('/deleteallrecipes',auth, deleteallrecipes);
router.delete('/deleteallprojects',auth, deleteallprojects);
router.delete('/handledeleteAllgroups',auth, handledeleteAllgroups);



export default router;
