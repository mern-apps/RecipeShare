import express from 'express';
import { dashboardgetallpendingrecipes,dashboardacceptpendingrecipe,dashboardrejectpendingrecipe } from '../controllers/dashboardcontrollers.js';
import authcookie from '../middleware/authcookie.js';

const router = express.Router();

router.get('/getallpendingrecipes',authcookie, dashboardgetallpendingrecipes);
router.post('/acceptpendingrecipe',authcookie, dashboardacceptpendingrecipe);
router.post('/rejectpendingrecipe',authcookie, dashboardrejectpendingrecipe);


export default router;

