import express from 'express';
import { getallgroups } from '../controllers/groupcontroller.js';
import {getallrecipesgroup,getallbooksgroup,getallusersgroup} from '../controllers/groupcontroller.js';

import {removeuserfromgroup} from '../controllers/groupcontroller.js';
import {getallgroupsnewrecipeform} from '../controllers/groupcontroller.js';
import {forwardwardpaginationGroupsListPage,backwardpaginationGroupsListPage} from '../controllers/groupcontroller.js';
import {forwardpaginationactiongroup,backpaginationactiongroup} from '../controllers/groupcontroller.js';
import {getgroup} from '../controllers/groupcontroller.js';
import {addgroupowner,editgroup,deletegroupowner} from '../controllers/groupcontroller.js';
import {jointogroup,getoutfromgroup,getoutfromgroupadmin} from '../controllers/groupcontroller.js';
import {addrecipetogroup,addbooktogroup} from '../controllers/groupcontroller.js';
import {removerecipefromgroup,removebookfromgroup} from '../controllers/groupcontroller.js';

import auth from '../middleware/auth.js';

const router = express.Router();

//groups
router.get('/',auth, getallgroups);
//groups List Page
router.post('/groupslistpage/forwardwardpaginationGroupsListPage',auth, forwardwardpaginationGroupsListPage);
router.post('/groupslistpage/backwardpaginationGroupsListPage',auth, backwardpaginationGroupsListPage);
router.post('/fetchGroupById',auth, getgroup);
router.post('/editgroup',auth, editgroup);
router.post('/addgroupowner',auth, addgroupowner);
router.post('/getallrecipesgroup',auth, getallrecipesgroup);
router.post('/getallbooksgroup',auth, getallbooksgroup);
router.post('/getallusersgroup',auth, getallusersgroup);

router.post('/deletegroupowner',auth, deletegroupowner);
router.post('/jointogroup',auth, jointogroup);
router.post('/getoutfromgroup',auth, getoutfromgroup);
router.post('/getoutfromgroupadmin',auth, getoutfromgroupadmin);

router.post('/groupPage/addrecipetogroup',auth, addrecipetogroup);
router.post('/groupPage/addbooktogroup',auth, addbooktogroup);
router.post('/groupPage/removerecipefromgroup',auth, removerecipefromgroup);
router.post('/groupPage/removebookfromgroup',auth, removebookfromgroup);

//Group Page
//all sections
router.post('/grouppage/forwardpaginationactiongroup/:id',auth, forwardpaginationactiongroup);
router.post('/grouppage/backpaginationactiongroup/:id',auth, backpaginationactiongroup);

router.post('/newform', auth, getallgroupsnewrecipeform);

// PUT is used when completely replace an existing item,  PATCH is used when partially update an item

export default router;


