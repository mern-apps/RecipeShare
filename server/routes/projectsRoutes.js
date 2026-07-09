import express from 'express';
import {getallprojectsfromgroups } from '../controllers/projectcontroller.js';
import { updateproject } from '../controllers/projectcontroller.js';


import { addproject,editbook,deleteproject } from '../controllers/projectcontroller.js';
import { addtofavoritebook,removefavoritebook } from '../controllers/projectcontroller.js';

import {getallbooks, forwardwardpaginationBooksListPage,backwardpaginationBooksListPage} from '../controllers/projectcontroller.js';

import {getproject} from '../controllers/projectcontroller.js';

import {getallrecipesbookfilter,forwardwardpaginationRecipesbookpage,backwardpaginationRecipesbookpage} from '../controllers/projectcontroller.js';

//bookpage - edit - recipes section
import {bookeditfetchRecipesBookById,bookeditfetchRecipesGroupById,bookeditfetchRecipes} from '../controllers/projecteditcontroller.js';
import {bookeditgetallrecipesfilter,bookeditbackwardpagination,bookeditforwardwardpagination} from '../controllers/projecteditcontroller.js';
import {addrecipefromlist} from '../controllers/projecteditcontroller.js';
//bookpage - edit - DND section
import {removerecipefrombook} from '../controllers/projecteditcontroller.js';
import {addrecipe2,editrecipe2} from '../controllers/projecteditcontroller.js';
import {dnd} from '../controllers/projecteditcontroller.js';
import {PDFBook} from '../controllers/PDF/Puppeteer/PDFBook.js';



import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/',auth, getallbooks);

//bookpage
router.post('/bookpage/fetchBookById',auth, getproject);
router.post('/bookpage/forwardwardpaginationRecipes',auth, forwardwardpaginationRecipesbookpage);
router.post('/bookpage/backwardpaginationRecipes',auth, backwardpaginationRecipesbookpage);
router.post('/bookpage/getallrecipesbookfilter',auth, getallrecipesbookfilter);

//bookpage - edit - recipes section
router.post('/bookpage/edit/recipessection/fetchRecipesBookById',auth, bookeditfetchRecipesBookById);
router.post('/bookpage/edit/recipessection/fetchRecipesGroupById',auth, bookeditfetchRecipesGroupById);
router.get('/bookpage/edit/recipessection/fetchRecipes',auth, bookeditfetchRecipes);
router.post('/bookpage/edit/recipessection/getallrecipesfilter',auth, bookeditgetallrecipesfilter);
router.post('/bookpage/edit/recipessection/backwardpagination',auth, bookeditbackwardpagination);
router.post('/bookpage/edit/recipessection/forwardwardpagination',auth, bookeditforwardwardpagination);
router.post('/bookpage/edit/recipessection/addrecipefromlist',auth, addrecipefromlist);

//bookpage - edit - DND section
router.post('/bookpage/edit/booksection/removerecipefrombook',auth, removerecipefrombook);
router.post('/bookpage/edit/booksection/dnd',auth, dnd);
router.post('/bookpage/edit/booksection/addrecipe2',auth, addrecipe2);
router.post('/bookpage/edit/booksection/editrecipe2',auth, editrecipe2);
router.post('/bookpage/edit/booksection/PDFBook',auth, PDFBook);





router.get('/booklist/getallBooks',auth, getallbooks);
router.post('/booklist/forwardwardpaginationBooksListPage',auth, forwardwardpaginationBooksListPage);
router.post('/booklist/backwardpaginationBooksListPage',auth, backwardpaginationBooksListPage);


//
router.post('/deletebookowner',auth, deleteproject);
router.post('/addbookowner',auth, addproject);
router.post('/editbook',auth, editbook);
router.post('/addtofavoritebook',auth, addtofavoritebook);
router.post('/removefavoritebook',auth, removefavoritebook);


router.get('/getallprojectsfromgroups',auth, getallprojectsfromgroups);
router.post('/updateproject',auth, updateproject);


export default router;


