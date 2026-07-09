import express from 'express';
import {getallprojectsfromgroups } from '../controllers/projectcontroller.js';
import { updateproject } from '../controllers/projectcontroller.js';



import {getallbooks,forwardwardpaginationBooksListPage,backwardpaginationBooksListPage} from '../controllers/projectcontroller.js';
//
import {getproject} from '../controllers/projectcontroller.js';
import {getallrecipesbookfilter,forwardwardpaginationRecipesbookpage,backwardpaginationRecipesbookpage} from '../controllers/projectcontroller.js';

import { addproject,editbook } from '../controllers/projectcontroller.js';
import { addtofavoritebook,removefavoritebook } from '../controllers/projectcontroller.js';

//book info
import {deleteproject } from '../controllers/projectcontroller.js';


//bookpage - edit - recipes section
import {bookeditfetchRecipesBookById,bookeditfetchRecipesGroupById,bookeditfetchRecipes} from '../controllers/projecteditcontroller.js';
import {bookeditgetallrecipesfilter,bookeditbackwardpagination,bookeditforwardwardpagination} from '../controllers/projecteditcontroller.js';
import {addrecipefromlist} from '../controllers/projecteditcontroller.js';
//bookpage - edit - DND section

//recipebook list
import {removerecipefrombook} from '../controllers/projecteditcontroller.js';
import {addrecipe2,editrecipe2} from '../controllers/projecteditcontroller.js';
import {dnd} from '../controllers/projecteditcontroller.js';
import {PDFBook} from '../controllers/PDF/Puppeteer/PDFBook.js';


import authcookie from '../middleware/authcookie.js';

const router = express.Router();

//
//bookpage
router.post('/bookpage/fetchBookByIdcookie',authcookie, getproject);
router.post('/bookpage/forwardwardpaginationRecipescookie',authcookie, forwardwardpaginationRecipesbookpage);
router.post('/bookpage/backwardpaginationRecipescookie',authcookie, backwardpaginationRecipesbookpage);
router.post('/bookpage/getallrecipesbookfiltercookie',authcookie, getallrecipesbookfilter);


//bookpage - edit - recipes section
router.post('/bookpage/edit/recipessection/fetchRecipesBookById',authcookie, bookeditfetchRecipesBookById);
router.post('/bookpage/edit/recipessection/fetchRecipesGroupById',authcookie, bookeditfetchRecipesGroupById);
router.get('/bookpage/edit/recipessection/fetchRecipes',authcookie, bookeditfetchRecipes);

router.post('/bookpage/edit/recipessection/getallrecipesfilter',authcookie, bookeditgetallrecipesfilter);
router.post('/bookpage/edit/recipessection/backwardpagination',authcookie, bookeditbackwardpagination);
router.post('/bookpage/edit/recipessection/forwardwardpagination',authcookie, bookeditforwardwardpagination);

router.post('/bookpage/edit/recipessection/addrecipefromlist',authcookie, addrecipefromlist);
//bookpage - edit - DND section
router.post('/bookpage/edit/booksection/removerecipefrombook',authcookie, removerecipefrombook);
router.post('/bookpage/edit/booksection/dnd',authcookie, dnd);
router.post('/bookpage/edit/booksection/addrecipe2',authcookie, addrecipe2);
router.post('/bookpage/edit/booksection/editrecipe2',authcookie, editrecipe2);
router.post('/bookpage/edit/booksection/PDFBook',authcookie, PDFBook);


//bookslist
router.get('/booklist/getallbookscookie',authcookie, getallbooks);
router.post('/booklist/forwardwardpaginationBooksListPagecookie',authcookie, forwardwardpaginationBooksListPage);
router.post('/booklist/backwardpaginationBooksListPagecookie',authcookie, backwardpaginationBooksListPage);


//book
router.post('/editbookcookie',authcookie, editbook);
router.post('/addtofavoritebookcookie',authcookie, addtofavoritebook);
router.post('/removefavoritebookcookie',authcookie, removefavoritebook);

//
router.post('/deletebookownercookie',authcookie, deleteproject);
router.post('/addbookownercookie',authcookie, addproject);


router.get('/getallprojectsfromgroupscookie',authcookie, getallprojectsfromgroups);
router.post('/updateprojectcookie',authcookie, updateproject);

//



//books list page
router.post('/bookslistpage/forwardwardpaginationBooksListPage',authcookie, forwardwardpaginationBooksListPage);
router.post('/bookslistpage/backwardpaginationBooksListPage',authcookie, backwardpaginationBooksListPage);



export default router;


