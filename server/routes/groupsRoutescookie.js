import express from 'express';
import { getallgroups } from '../controllers/groupcontroller.js';
import {forwardwardpaginationGroupsListPage,backwardpaginationGroupsListPage} from '../controllers/groupcontroller.js';
import {getgroup} from '../controllers/groupcontroller.js';
import {addgroupowner,editgroup,deletegroupowner} from '../controllers/groupcontroller.js';
import {jointogroup,getoutfromgroup,getoutfromgroupadmin} from '../controllers/groupcontroller.js';
import {getallrecipesgroup,getallbooksgroup,getallusersgroup} from '../controllers/groupcontroller.js';
import {addrecipetogroup,addbooktogroup} from '../controllers/groupcontroller.js';
import {removerecipefromgroup,removebookfromgroup} from '../controllers/groupcontroller.js';

import authcookie from '../middleware/authcookie.js';

const router = express.Router();

router.get('/',authcookie, getallgroups);
router.post('/groupslistpage/forwardwardpaginationGroupsListPagecookie',authcookie, forwardwardpaginationGroupsListPage);
router.post('/groupslistpage/backwardpaginationGroupsListPagecookie',authcookie, backwardpaginationGroupsListPage);
router.post('/fetchGroupByIdcookie',authcookie, getgroup);
router.post('/editgroupcookie',authcookie, editgroup);
router.post('/addgroupownercookie', authcookie, addgroupowner);

router.post('/getallrecipesgroupcookie',authcookie, getallrecipesgroup);
router.post('/getallbooksgroupcookie',authcookie, getallbooksgroup);
router.post('/getallusersgroupcookie',authcookie, getallusersgroup);


router.post('/deletegroupownercookie',authcookie, deletegroupowner);

router.post('/jointogroupcookie',authcookie, jointogroup);
router.post('/getoutfromgroupcookie',authcookie, getoutfromgroup);
router.post('/getoutfromgroupadmincookie',authcookie, getoutfromgroupadmin);

router.post('/groupPage/addrecipetogroupcookie',authcookie, addrecipetogroup);
router.post('/groupPage/addbooktogroupcookie',authcookie, addbooktogroup);
router.post('/groupPage/removerecipefromgroupcookie',authcookie, removerecipefromgroup);
router.post('/groupPage/removebookfromgroupcookie',authcookie, removebookfromgroup);

export default router;
