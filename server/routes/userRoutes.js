import express from 'express';
import { signin,signup,logout } from '../controllers/usercontroller.js';
import { cookieedit } from '../controllers/usercontroller.js';

import { signinbyid } from '../controllers/usercontroller.js';
import { saveprofiledata } from '../controllers/usercontroller.js';

import auth from '../middleware/auth.js';
import signbyid from '../middleware/signbyid.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.post('/logout', logout);
router.post('/cookieedit',auth,cookieedit);

router.get('/signinbyid',signbyid,signinbyid);

router.post('/saveprofiledata',auth ,saveprofiledata);


export default router;
