import express from 'express';
import { dashboardgetallpendingrecipes,dashboardacceptpendingrecipe,dashboardrejectpendingrecipe } from '../controllers/dashboardcontrollers.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/getallpendingrecipes',auth, dashboardgetallpendingrecipes);
router.post('/acceptpendingrecipe',auth, dashboardacceptpendingrecipe);
router.post('/rejectpendingrecipe',auth, dashboardrejectpendingrecipe);


export default router;

