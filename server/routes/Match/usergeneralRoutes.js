import express from 'express';
import { saveprofiledata,getqnr,questionsanswers } from '../controllers/usergeneralcontroller.js';

import {getalllistforuser,approveuser,rejectuser} from '../controllers/usergeneralcontroller.js';
import {getallcodesandtrips} from '../controllers/usergeneralcontroller.js';

import {getallnewmessages} from '../controllers/usergeneralcontroller.js';

import {getallmatches,deletematch,initialmassages,submitnewmessage } from '../controllers/usergeneralcontroller.js';
import { getuserpagebyid,approveuserbyid ,rejectuserbyid} from '../controllers/usergeneralcontroller.js';

import { forwardwardpaginationmatchesListPage,backwardpaginationmatchesListPage } from '../controllers/usergeneralcontroller.js';
//find
//trips
import {addtrip,removetrip } from '../controllers/usergeneralcontroller.js';
//codes
import { addcodetouser,deletecodefromuser } from '../controllers/usergeneralcontroller.js';
import { getallcodesgroups } from '../controllers/usergeneralcontroller.js';


//codes admin
import {addcode,editcode,deletecode } from '../controllers/usergeneralcontroller.js';


import {addadmin } from '../controllers/usergeneralcontroller.js';

import {defineqnr } from '../controllers/usergeneralcontroller.js';
import {addcities } from '../controllers/usergeneralcontroller.js';


import {geodata } from '../controllers/usergeneralcontroller.js';
import {getAllcities } from '../controllers/usergeneralcontroller.js';
import {getAllcitiesandcodes } from '../controllers/usergeneralcontroller.js';

import {adminblockdata,getadminblockdata} from '../controllers/usergeneralcontroller.js';
import {editAccessibility,improvementaccessibility,getAllImprovementsAccessibility} from '../controllers/usergeneralcontroller.js';




import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/saveprofiledata',auth ,saveprofiledata);
//router.post('/getAllcities',auth ,getAllcities);
router.get('/getqnr',auth,getqnr);
router.post('/questionsanswers',auth,questionsanswers);


router.post('/updateaccessibility',auth,editAccessibility);
router.post('/improvementaccessibility',improvementaccessibility);
router.get('/getAllImprovementsaccessibility',auth,getAllImprovementsAccessibility);

//userpage
//router.post('/deleteFromMongoUrl',auth,deleteFromMongoUrl);

router.post('/getalllistforuser',auth,getalllistforuser);

router.get('/getallcodesandtrips',auth,getallcodesandtrips);

router.get('/getAllcitiesandcodes',auth,getAllcitiesandcodes);

router.post('/getallnewmessages',auth,getallnewmessages);
router.post('/getallmatches',auth,getallmatches);
router.post('/deletematch',auth,deletematch);


router.post('/initialmassages',auth,initialmassages);
router.post('/submitnewmessage',auth,submitnewmessage);

//find/
//trips
router.post('/addtrip',auth,addtrip);
router.post('/removetrip',auth,removetrip);

router.post('/forwardwardpaginationmatchesListPage',auth,forwardwardpaginationmatchesListPage);
router.post('/backwardpaginationmatchesListPage',auth,backwardpaginationmatchesListPage);

router.post('/approveuser',auth,approveuser);
router.post('/rejectuser',auth,rejectuser);


//code new
router.post('/addcodetouser',auth,addcodetouser);
router.post('/deletecodefromuser',auth,deletecodefromuser);
router.get('/getallcodesgroups',auth,getallcodesgroups);



//no auth
router.post('/getuserpagebyid',getuserpagebyid);//no auth
router.post('/approveuserbyid', approveuserbyid); //no auth
router.post('/rejectuserbyid', rejectuserbyid); //no auth





//ADMIN DEVLOPMENT
//router.post('/admin/addusers',addusers);
router.post('/admin/addusers',addadmin);
router.post('/admin/geodata',auth,geodata);



//ADMIN production
router.post('/admin/defineqnr',auth,defineqnr);
router.post('/admin/addcities',auth,addcities);
router.post('/admin/addcode',auth,addcode);
router.post('/admin/editcode',auth,editcode);
router.post('/admin/deletecode',auth,deletecode);

router.post('/admin/adminblockdata',auth,adminblockdata);
router.get('/admin/getadminblockdata',getadminblockdata);




export default router;


