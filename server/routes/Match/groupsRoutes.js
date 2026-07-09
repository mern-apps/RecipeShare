import express from 'express';
import { getcodepage,deletecodefromuser,deletecodefromuserpending,addgroup } from '../controllers/groupscontroller.js';
import { deletegroupuser,deletegroupuserpending } from '../controllers/groupscontroller.js';

import { getallcodespage } from '../controllers/groupscontroller.js';



import auth from '../middleware/auth.js';

const router = express.Router();

//specific page
router.post('/getcodepage',getcodepage);
router.post('/deletecodefromuserpending',deletecodefromuserpending);
//router.post('/deletecodefromuser',deletecodefromuser);



//all codes page
router.get('/getallcodespage',auth,getallcodespage);
router.post('/deletegroupuser',auth,deletegroupuser);
router.post('/deletegroupuserpending',auth,deletegroupuserpending);
router.post('/addgroup',auth,addgroup);



export default router;




