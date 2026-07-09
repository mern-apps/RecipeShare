import express from 'express';
import {adminblockdata,getadminblockdata} from '../controllers/admincontroller.js';

import auth from '../middleware/auth.js';

const router = express.Router();

//ADMIN production
router.post('/adminblockdata',auth,adminblockdata);
router.get('/getadminblockdata',getadminblockdata);


export default router;


