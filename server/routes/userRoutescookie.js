import express from 'express';

import { signinbyid } from '../controllers/usercontroller.js';
import { logout } from '../controllers/usercontroller.js';
import { cookieedit } from '../controllers/usercontroller.js';
import { saveprofiledata } from '../controllers/usercontroller.js';

import authcookie from '../middleware/authcookie.js';
import signbyidcookie from '../middleware/signbyidcookie.js';

const router = express.Router();

router.post('/logoutcookie',logout);

router.post('/cookieeditcookie',authcookie,cookieedit);

router.get('/signinbyidcookie',signbyidcookie,signinbyid);

router.post('/saveprofiledatacookie',authcookie ,saveprofiledata);


export default router;
