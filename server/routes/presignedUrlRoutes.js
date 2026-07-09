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

import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/',auth, generatePresignedUrl);
router.post('/uploadmongoUrl',auth,uploadmongoUrl);
router.post('/deleteFromAmazonAndMongo',auth,deleteFromAmazonAndMongo);

//AdminBest

router.post('/AdminBest',auth, generatePresignedUrlAdminBest);
router.post('/uploadmongoUrl/AdminBest',auth,uploadmongoUrlAdminBest);

//Books and Groups
router.post('/Book',auth, generatePresignedUrlBook);
router.post('/uploadmongoUrl/Book',auth,uploadmongoUrlBook);
router.post('/Book/recipe2',auth, generatePresignedUrlrecipe2);
router.post('/uploadmongoUrl/Book/recipe2',auth,uploadmongoUrlrecipe2);


router.post('/Group',auth, generatePresignedUrlGroup);
router.post('/uploadmongoUrl/Group',auth,uploadmongoUrlGroup);

router.post('/Admin',auth, generatePresignedUrlAdmin);
router.post('/deleteFromAmazonAndMongo/Admin',auth,deleteFromAmazonAndMongoAdmin);

//code image
router.post('/uploadmongoUrlcode',auth,uploadmongoUrlcode);
router.post('/preurlcode',auth,generatePresignedUrlcodes);
router.post('/deleteFromAmazonAndMongoeditcode',auth,deleteFromAmazonAndMongoeditcode);

export default router;


