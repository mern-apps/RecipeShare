import express from 'express';
import { saveprofiledata,getqnr,questionsanswers } from '../controllers/usergeneralcontroller.js';
import {getalllistforuser,approveuser,rejectuser} from '../controllers/usergeneralcontroller.js';
import {getallcodes} from '../controllers/usergeneralcontroller.js';

import {getallnewmessages} from '../controllers/usergeneralcontroller.js';

import {getallmatches,deletematch,initialmassages,submitnewmessage } from '../controllers/usergeneralcontroller.js';
import { getuserpagebyid,approveuserbyid ,rejectuserbyid} from '../controllers/usergeneralcontroller.js';

import { forwardwardpaginationmatchesListPage,backwardpaginationmatchesListPage } from '../controllers/usergeneralcontroller.js';

//trips
import {addtrip,removetrip } from '../controllers/usergeneralcontroller.js';

//codes
import { addcodetouser,deletecodefromuser } from '../controllers/usergeneralcontroller.js';
import {addcode,editcode,deletecode } from '../controllers/usergeneralcontroller.js';
import { getallcodesgroups } from '../controllers/usergeneralcontroller.js';

import {addusers,addadmin } from '../controllers/usergeneralcontroller.js';

import {defineqnr } from '../controllers/usergeneralcontroller.js';
import {addcities } from '../controllers/usergeneralcontroller.js';

import {geodata } from '../controllers/usergeneralcontroller.js';
import {getAllcitiesandcodes } from '../controllers/usergeneralcontroller.js';
import {getallcodesandtrips } from '../controllers/usergeneralcontroller.js';

import {adminblockdata,getadminblockdata } from '../controllers/usergeneralcontroller.js';

import {editAccessibility,getAllImprovementsAccessibility} from '../controllers/usergeneralcontroller.js';

import authcookie from '../middleware/authcookie.js';

const router = express.Router();

router.post('/saveprofiledatacookie',authcookie ,saveprofiledata);
router.get('/getqnrcookie',authcookie,getqnr);
router.post('/questionsanswerscookie',authcookie,questionsanswers);

router.post('/updateaccessibilitycookie',authcookie,editAccessibility);
router.get('/getAllImprovementsaccessibilitycookie',authcookie,getAllImprovementsAccessibility);


//userpage
//router.post('/deleteFromMongoUrl',authcookie,deleteFromMongoUrl);

router.post('/getalllistforusercookie',authcookie,getalllistforuser);
router.get('/getAllcitiesandcodescookie',authcookie,getAllcitiesandcodes);

//findpage
router.get('/getallcodesandtripscookie',authcookie,getallcodesandtrips);

//trips
router.post('/addtripcookie',authcookie,addtrip);
router.post('/removetripcookie',authcookie,removetrip);


router.post('/getallnewmessagescookie',authcookie,getallnewmessages);
router.post('/getallmatchescookie',authcookie,getallmatches);
router.post('/deletematchcookie',authcookie,deletematch);


router.post('/initialmassagescookie',authcookie,initialmassages);
router.post('/submitnewmessagecookie',authcookie,submitnewmessage);


router.post('/forwardwardpaginationmatchesListPagecookie',authcookie,forwardwardpaginationmatchesListPage);
router.post('/backwardpaginationmatchesListPagecookie',authcookie,backwardpaginationmatchesListPage);

router.post('/approveusercookie',authcookie,approveuser);
router.post('/rejectusercookie',authcookie,rejectuser);

router.post('/admin/geodatacookie',authcookie,geodata);


//code new
router.post('/addcodetousercookie',authcookie,addcodetouser);
router.post('/deletecodefromusercookie',authcookie,deletecodefromuser);
router.get('/getallcodesgroupscookie',authcookie,getallcodesgroups);



//router.post('/getuserpagebyidcookie',authcookie,getuserpagebyid);
//router.post('/approveuserbyid', approveuserbyid); //no authcookie
//router.post('/rejectuserbyid', rejectuserbyid); //no authcookie


//ADMIN DEVLOPMENT
router.post('/admin/adduserscookie',addadmin);


//ADMIN production
router.post('/admin/defineqnrcookie',authcookie,defineqnr);
router.post('/admin/addcitiescookie',authcookie,addcities);

router.post('/admin/addcodecookie',authcookie,addcode);
router.post('/admin/editcodecookie',authcookie,editcode);
router.post('/admin/deletecodecookie',authcookie,deletecode);

router.post('/admin/adminblockdatacookie',authcookie,adminblockdata);
router.get('/admin/getadminblockdatacookie',getadminblockdata);


export default router;


