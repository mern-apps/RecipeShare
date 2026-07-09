import express from 'express';

import {adminblockdata,getadminblockdata } from '../controllers/admincontroller.js';

import authcookie from '../middleware/authcookie.js';

const router = express.Router();

router.post('/adminblockdatacookie',authcookie,adminblockdata);
router.get('/getadminblockdatacookie',getadminblockdata);

export default router;


