import express from 'express';
import { generatePresignedUrl } from '../controllers/presignedUrlController.js';
import { uploadmongoUrl,deleteFromAmazonAndMongo } from '../controllers/presignedUrlController.js';
import { uploadmongoUrlcode } from '../controllers/presignedUrlController.js';
import { generatePresignedUrlcodes } from '../controllers/presignedUrlController.js';
import { deleteFromAmazonAndMongoeditcode } from '../controllers/presignedUrlController.js';

import { generatePresignedUrlAdminBest } from '../controllers/presignedUrlController.js';
import { uploadmongoUrlAdminBest } from '../controllers/presignedUrlController.js';

import { generatePresignedUrlBook } from '../controllers/presignedUrlController.js';
import { uploadmongoUrlBook } from '../controllers/presignedUrlController.js';
import { generatePresignedUrlrecipe2 } from '../controllers/presignedUrlController.js';
import { uploadmongoUrlrecipe2 } from '../controllers/presignedUrlController.js';

import { generatePresignedUrlGroup } from '../controllers/presignedUrlController.js';
import { uploadmongoUrlGroup } from '../controllers/presignedUrlController.js';

import { generatePresignedUrlAdmin,deleteFromAmazonAndMongoAdmin } from '../controllers/presignedUrlController.js';

import authcookie from '../middleware/authcookie.js';

const router = express.Router();


router.post('/',authcookie, generatePresignedUrl);
router.post('/uploadmongoUrlcookie',authcookie,uploadmongoUrl);
router.post('/deleteFromAmazonAndMongocookie',authcookie,deleteFromAmazonAndMongo);

//AdminBest

router.post('/AdminBest',authcookie, generatePresignedUrlAdminBest);
router.post('/uploadmongoUrlcookie/AdminBest',authcookie,uploadmongoUrlAdminBest);


router.post('/Book',authcookie, generatePresignedUrlBook);
router.post('/uploadmongoUrlcookie/Book',authcookie,uploadmongoUrlBook);
router.post('/Book/recipe2',authcookie, generatePresignedUrlrecipe2);
router.post('/uploadmongoUrlcookie/Book/recipe2',authcookie,uploadmongoUrlrecipe2);


router.post('/Group',authcookie, generatePresignedUrlGroup);
router.post('/uploadmongoUrlcookie/Group',authcookie,uploadmongoUrlGroup);

router.post('/Admin',authcookie, generatePresignedUrlAdmin);
router.post('/deleteFromAmazonAndMongocookie/Admin',authcookie,deleteFromAmazonAndMongoAdmin);

//codeimage
router.post('/uploadmongoUrlcodecookie',authcookie,uploadmongoUrlcode);
router.post('/preurlcodecookie',authcookie,generatePresignedUrlcodes);

router.post('/deleteFromAmazonAndMongoeditcodecookie',authcookie,deleteFromAmazonAndMongoeditcode);


export default router;

