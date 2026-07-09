import express from 'express';
import { getallcodespage } from '../controllers/groupscontroller.js';
import { deletegroupuser,deletegroupuserpending,addgroup } from '../controllers/groupscontroller.js';

import authcookie from '../middleware/auth.js';

const router = express.Router();
//specific page - no auth..

//all codes page
router.get('/getallcodespagecookie',authcookie,getallcodespage);
router.post('/deletegroupusercookie',authcookie,deletegroupuser);
router.post('/deletegroupuserpendingcookie',authcookie,deletegroupuserpending);
router.post('/addgroupcookie',authcookie,addgroup);




export default router;



