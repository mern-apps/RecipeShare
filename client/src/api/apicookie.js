import axios from 'axios';



const API = axios.create({
  baseURL: process.env.REACT_APP_API || 'http://localhost:5000',
});

//updateaccessibility

export const updateaccessibilitycookie = (formAccessibilityData) => API.post('/usercookie/updateaccessibilitycookie',formAccessibilityData,{ 
  withCredentials: true  
});


export const getAllImprovementsaccessibilitycookie = () => API.get('/usercookie/getAllImprovementsaccessibilitycookie',{ 
  withCredentials: true  
});






//codeimages

export const getPresignedUrlcodecookie = (updatedFileDetails) => API.post('/presigned-urlcookie/preurlcodecookie',updatedFileDetails,{ 
  withCredentials: true  
});

export const uploadmongoUrlcodecookie = (imageObject) => API.post('/presigned-urlcookie/uploadmongoUrlcodecookie',imageObject,{ 
  withCredentials: true  
});


//editcodeimage

export const deleteFromAmazonAndMongoeditcodecookie = (fileDetails) => API.post('/presigned-urlcookie/deleteFromAmazonAndMongoeditcodecookie',fileDetails,{ 
  withCredentials: true  
});

//user

export const saveprofiledatacookie = (profileData) => API.post('/usercookie/saveprofiledatacookie',profileData,{
  withCredentials: true,
});

export const signinbyidcookie = () => API.get('/usercookie/signinbyidcookie', { 
  withCredentials: true  
});

export const logoutcookie = () => API.post('/usercookie/logoutcookie',null, {withCredentials: true});



//admin
export const adminblockdatacookie = (data) => API.post('/admincookie/adminblockdatacookie',data,{ 
  withCredentials: true  
});
//why dont have withCredentials
export const getadminblockdatacookie = () => API.get('/admincookie/getadminblockdatacookie');

//cookie
export const cookieeditcookie = (cookieState) => API.post('/usercookie/cookieeditcookie',{ cookieState }, { 
  withCredentials: true  
});

//userpage - 
export const getuserpagebyidcookie = (id) => API.post('/usercookie/getuserpagebyidcookie',{ id },{ 
  withCredentials: true  
});

//consider to delete:
export const deleteFromMongoUrlcookie = (urlToDelete) => API.post('/usergeneralcookie/deleteFromMongoUrlcookie',{ urlToDelete }, { 
  withCredentials: true  
});
export const getAllcitiesandcodescookie = () => API.get('/usergeneralcookie/getAllcitiesandcodescookie',{ 
  withCredentials: true  
});





//Books
export const getallprojectscookie = () => API.get('/projectscookie', { 
  withCredentials: true  
});
export const getallprojectsfromgroupscookie = () => API.get('/projectscookie/getallprojectsfromgroupscookie', { 
  withCredentials: true  
});

export const addprojectcookie = (formData) => API.post('/projectscookie/addprojectcookie',formData,{ 
  withCredentials: true  
});
export const updateprojectcookie = (updatedproject) => API.post('/projectscookie/updateprojectcookie',updatedproject,{ 
  withCredentials: true  
});


////Best recipes

export const getallrecipesbestcookie = (combinedFilters) => API.post('/allrecipespagecookie/bestcookie',combinedFilters,{ 
  withCredentials: true  
});
export const sendforwardpaginationactionbestcookie = (combinedFilters,currentpage) => API.post('/allrecipespagecookie/forwardpaginationbestcookie',{ combinedFilters,currentpage },{ 
  withCredentials: true  
});
export const sendbackwardpaginationactionbestcookie = (combinedFilters,currentpage) => API.post('/allrecipespagecookie/backwardpaginationbestcookie',{ combinedFilters,currentpage },{ 
  withCredentials: true  
});

//Myrecipes
export const getallrecipespagecookie = (combinedFilters) => API.post('/allrecipespagecookie/allrecipescookie',combinedFilters,{ 
  withCredentials: true  
});
export const sendforwardpaginationactionmyrecipescookie = (combinedFilters,currentpage) => API.post('/allrecipespagecookie/forwardpaginationmyrecipescookie',{ combinedFilters,currentpage },{ 
  withCredentials: true  
});
export const sendbackwardpaginationactionmyrecipescookie = (combinedFilters,currentpage) => API.post('/allrecipespagecookie/backwardpaginationmyrecipescookie',{ combinedFilters,currentpage },{ 
  withCredentials: true  
});


//favorite

export const getallrecipesfavoritecookie = (combinedFilters) => API.post('/allrecipespagecookie/getallrecipesfavoritecookie',combinedFilters,{ 
  withCredentials: true  
});
export const sendforwardpaginationactionfavoritecookie = (combinedFilters,currentpage) => API.post('/allrecipespagecookie/forwardpaginationfavoritecookie',{ combinedFilters,currentpage },{ 
  withCredentials: true  
});
export const sendbackwardpaginationactionfavoritecookie = (combinedFilters,currentpage) => API.post('/allrecipespagecookie/backwardpaginationfavoritecookie',{ combinedFilters,currentpage },{ 
  withCredentials: true  
});




//cuisine

export const getallrecipesCuisinecookie = (combinedFilters) => API.post('/allrecipespagecookie/cuisinecookie',combinedFilters,{ 
  withCredentials: true  
});
export const sendforwardpaginationactioncuisinecookie = (combinedFilters,currentpage) => API.post('/allrecipespagecookie/forwardpaginationcuisinecookie',{ combinedFilters,currentpage },{ 
  withCredentials: true  
});
export const sendbackwardpaginationactioncuisinecookie = (combinedFilters,currentpage) => API.post('/allrecipespagecookie/backwardpaginationcuisinecookie',{ combinedFilters,currentpage },{ 
  withCredentials: true  
});







//books


export const getallrecipesbookrecipespagecookie = (combinedFilters) => API.post('/allrecipespagecookie/recipesbookcookie',combinedFilters,{ 
  withCredentials: true  
});

export const sendforwardpaginationactionbookcookie = (combinedFilters,currentpage) => API.post('/allrecipespagecookie/forwardpaginationbookcookie',{ combinedFilters,currentpage },{ 
  withCredentials: true  
});

export const sendbackwardpaginationactionbookcookie = (combinedFilters,currentpage) => API.post('/allrecipespagecookie/backwardpaginationbookcookie',{ combinedFilters,currentpage },{ 
  withCredentials: true  
});


//groups
export const getallgroupsrecipepagecookie = () => API.get('/allrecipespagecookie/allgroupscookie',{ 
  withCredentials: true  
});


//Add new recipe type 1

export const generateRecipePromptcookie = (imagedata) => API.post('/recipescookie/generateRecipePromptcookie',imagedata,{ 
  withCredentials: true  
});
export const unsplashImagescookie = (shortRecipeName) => API.post('/recipescookie/unsplashImagescookie',{ shortRecipeName },{ 
  withCredentials: true  
});
export const apiAIImagecookie = (imagePrompt) => API.post('/recipescookie/apiAIImagecookie',{ imagePrompt },{ 
  withCredentials: true  
});

export const addnewrecipeAdmincookie = (formData) => API.post('/recipescookie/addnewrecipeAdmincookie',formData,{ 
  withCredentials: true  
});
export const addnewrecipecookie = (formData) => API.post('/recipescookie/addnewrecipecookie',formData,{ 
  withCredentials: true  
});
export const editrecipecookie = (editData) => API.post('/recipescookie/editrecipecookie',editData,{ 
  withCredentials: true  
});
export const fetchRecipeByIdcookie = (id) => API.post('/recipescookie/fetchRecipeByIdcookie',{ id },{ 
  withCredentials: true  
});

export const addtofavoriterecipecookie = (modalTaskCuisine) => API.post('/recipescookie/addtofavoriterecipecookie',modalTaskCuisine,{ 
  withCredentials: true  
});
export const removefavoriterecipecookie = (modalTaskCuisine) => API.post('/recipescookie/removefavoriterecipecookie',modalTaskCuisine,{ 
  withCredentials: true  
});
export const deleterecipecookie = (deleteId) => API.post('/recipescookie/deleterecipecookie',{ deleteId },{ 
  withCredentials: true  
});

export const copyrecipecookie = (item) => API.post('/recipescookie/copyrecipe',item,{ 
  withCredentials: true  
});

export const PDFRecipecookie = (RecipeID) =>
  API.post(
    '/recipescookie/PDFRecipe',
    { RecipeID },
    {
      responseType: 'arraybuffer',
      withCredentials: true,
    }
  );




//images
export const getPresignedUrlcookie = (fileDetails) => API.post('/presigned-urlcookie',fileDetails,{ 
  withCredentials: true  
});
export const uploadmongoUrlcookie = (payload) => API.post('/presigned-urlcookie/uploadmongoUrlcookie',payload,{ 
  withCredentials: true  
});
export const deleteFromAmazonAndMongocookie = (fileDetails) => API.post('/presigned-urlcookie/deleteFromAmazonAndMongocookie',fileDetails,{ 
  withCredentials: true  
});

//AdminBest
export const getPresignedUrlAdminBestcookie = (fileDetails) => API.post('/presigned-urlcookie/AdminBest',fileDetails,{ 
  withCredentials: true  
});
export const uploadmongoUrlAdminBestcookie = (payload) => API.post('/presigned-urlcookie/uploadmongoUrlcookie/AdminBest',payload,{ 
  withCredentials: true  
});

//images-book & groups

export const getPresignedUrlBookcookie = (fileDetails) => API.post('/presigned-urlcookie/Book',fileDetails,{ 
  withCredentials: true  
});
export const uploadmongoUrlBookcookie = (payload) => API.post('/presigned-urlcookie/uploadmongoUrlcookie/Book',payload,{ 
  withCredentials: true  
});

export const getPresignedUrlGroupcookie = (fileDetails) => API.post('/presigned-urlcookie/Group',fileDetails,{ 
  withCredentials: true  
});
export const uploadmongoUrlGroupcookie = (payload) => API.post('/presigned-urlcookie/uploadmongoUrlcookie/Group',payload,{ 
  withCredentials: true  
});

export const getPresignedUrlAdmincookie = (fileDetails) => API.post('/presigned-urlcookie/Admin',fileDetails,{ 
  withCredentials: true  
});
export const uploadmongoUrlAdmincookie = (payload) => API.post('/presigned-urlcookie/uploadmongoUrlcookie/Admin',payload,{ 
  withCredentials: true  
});

export const deleteImageadmincookie = (fileDetails) => API.post('/presigned-urlcookie/deleteFromAmazonAndMongocookie/Admin',fileDetails,{ 
  withCredentials: true  
});



// Need to add delete image from amazon only (not from mongo as there is overeright)


//bookpage

export const fetchBookByIdcookie = (id) => API.post('/projectscookie/bookpage/fetchBookByIdcookie',{ id },{ 
  withCredentials: true  
});

export const getallrecipesbookfiltercookie = (bookrecipes) => API.post('/projectscookie/bookpage/getallrecipesbookfiltercookie',bookrecipes,{ 
  withCredentials: true  
});


export const forwardwardpaginationRecipesbookpagecookie = (bookrecipes) => API.post('/projectscookie/bookpage/forwardwardpaginationRecipescookie',bookrecipes,{ 
  withCredentials: true  
});

export const backwardpaginationRecipesbookpagecookie = (bookrecipes) => API.post('/projectscookie/bookpage/backwardpaginationRecipescookie',bookrecipes,{ 
  withCredentials: true  
});

//Book edit - recieps section

export const editbookrecipessectionfetchRecipesBookByIdcookie = (bookId) => API.post('/projectscookie/bookpage/edit/recipessection/fetchRecipesBookById',{ bookId },{ 
  withCredentials: true  
});
export const editbookrecipessectionfetchRecipesGroupByIdcookie = (groupId) => API.post('/projectscookie/bookpage/edit/recipessection/fetchRecipesGroupById',{ groupId },{ 
  withCredentials: true  
});

export const editbookrecipessectionfetchRecipescookie = () => API.get('/projectscookie/bookpage/edit/recipessection/fetchRecipes',{ 
  withCredentials: true  
});
export const bookeditgetallrecipesfiltercookie = (data) => API.post('/projectscookie/bookpage/edit/recipessection/getallrecipesfilter',data,{ 
  withCredentials: true  
});

export const bookeditbackwardpaginationcookie = (data) => API.post('/projectscookie/bookpage/edit/recipessection/backwardpagination',data,{ 
  withCredentials: true  
});
export const bookeditforwardwardpaginationcookie = (data) => API.post('/projectscookie/bookpage/edit/recipessection/forwardwardpagination',data,{ 
  withCredentials: true  
});

export const addrecipefromlistcookie = (data) => API.post('/projectscookie/bookpage/edit/recipessection/addrecipefromlist',data,{ 
  withCredentials: true  
});

//DND

//book info/
export const deletebookownercookie = (id) => API.post('/projectscookie/deletebookownercookie',{ id },{ 
  withCredentials: true  
});

//Recipe book list
export const removerecipefrombookcookie = (data) => API.post('/projectscookie/bookpage/edit/booksection/removerecipefrombook',data,{ 
  withCredentials: true  
});

export const dndcookie = (data) => API.post('/projectscookie/bookpage/edit/booksection/dnd',data,{ 
  withCredentials: true  
});


export const PDFBookcookie = (BookID) =>
  API.post(
    '/projectscookie/bookpage/edit/booksection/PDFBook',
    { BookID },
    {
      responseType: 'arraybuffer',
      withCredentials: true,
    }
  );


export const addrecipe2cookie = (formData2) => API.post('/projectscookie/bookpage/edit/booksection/addrecipe2',formData2,{ 
  withCredentials: true  
});

export const editrecipe2cookie = (editData2) => API.post('/projectscookie/bookpage/edit/booksection/editrecipe2',editData2,{ 
  withCredentials: true  
});

export const getPresignedUrlrecipe2cookie = (fileDetails) => API.post('/presigned-urlcookie/Book/recipe2',fileDetails,{ 
  withCredentials: true  
});
export const uploadmongoUrlrecipe2cookie = (payload) => API.post('/presigned-urlcookie/uploadmongoUrlcookie/Book/recipe2',payload,{ 
  withCredentials: true  
});







//Users
export const forwardwardpaginationUsersgrouppagecookie = (groupusers) => API.post('/grouppagecookie/users/forwardwardpaginationUserscookie',groupusers,{ 
  withCredentials: true  
});

export const backwardpaginationUsersgrouppagecookie = (groupusers) => API.post('/grouppagecookie/users/backwardpaginationUserscookie',groupusers,{ 
  withCredentials: true  
});

//Recipes

export const getallrecipesgroupfiltercookie = (grouprecipes) => API.post('/grouppagecookie/recipes/getallrecipesgroupfiltercookie',grouprecipes,{ 
  withCredentials: true  
});

export const forwardwardpaginationRecipesgrouppagecookie = (grouprecipes) => API.post('/grouppagecookie/recipes/forwardwardpaginationRecipescookie',grouprecipes,{ 
  withCredentials: true  
});

export const backwardpaginationRecipesgrouppagecookie = (grouprecipes) => API.post('/grouppagecookie/recipes/backwardpaginationRecipescookie',grouprecipes,{ 
  withCredentials: true  
});

//Books
export const forwardwardpaginationBooksgrouppagecookie = (groupbooks) => API.post('/grouppagecookie/books/forwardwardpaginationBookscookie',groupbooks,{ 
  withCredentials: true  
});

export const backwardpaginationBooksgrouppagecookie = (groupbooks) => API.post('/grouppagecookie/books/backwardpaginationBookscookie',groupbooks,{ 
  withCredentials: true  
});


export const addbookownercookie = (formData) => API.post('/projectscookie/addbookownercookie',formData,{ 
  withCredentials: true  
});

export const editbookcookie = (editData) => API.post('/projectscookie/editbookcookie',editData,{ 
  withCredentials: true  
});


export const getprojectcookie = (id) => API.post('/projectscookie/getprojectcookie',{ id },{ 
  withCredentials: true  
});



export const addtofavoritebookcookie = (projectID) => API.post('/projectscookie/addtofavoritebookcookie',{ projectID },{ 
  withCredentials: true  
});export const removefavoritebookcookie = (projectID) => API.post('/projectscookie/removefavoritebookcookie',{ projectID },{ 
  withCredentials: true  
});


//groups
export const getallgroupscookie = () => API.get('/groupscookie', { 
  withCredentials: true  
});

//grouppage
export const fetchGroupByIdcookie = (id) => API.post('/groupscookie/fetchGroupByIdcookie',{ id },{ 
  withCredentials: true  
});



export const forwardwardpaginationGroupsListPagecookie = (currentpage) => API.post('/groupscookie/groupslistpage/forwardwardpaginationGroupsListPagecookie',{ currentpage },{ 
  withCredentials: true  
});

export const backwardpaginationGroupsListPagecookie = (currentpage) => API.post('/groupscookie/groupslistpage/backwardpaginationGroupsListPagecookie',{ currentpage },{ 
  withCredentials: true  
});



//Books
export const getallbookscookie = () => API.get('/projectscookie/booklist/getallbookscookie', { 
  withCredentials: true  
});

export const forwardwardpaginationBooksListPagecookie = (currentpage) => API.post('/projectscookie/booklist/forwardwardpaginationBooksListPagecookie',{ currentpage },{ 
  withCredentials: true  
});

export const backwardpaginationBooksListPagecookie = (currentpage) => API.post('/projectscookie/booklist/backwardpaginationBooksListPagecookie',{ currentpage },{ 
  withCredentials: true  
});




export const addgroupownercookie = (formData) => API.post('/groupscookie/addgroupownercookie', formData ,{ 
  withCredentials: true  
});
export const editgroupcookie = (editData) => API.post('/groupscookie/editgroupcookie',editData,{ 
  withCredentials: true  
});

export const getallrecipesgroupcookie = (combinedFilters) => API.post('/groupscookie/getallrecipesgroupcookie',combinedFilters,{ 
  withCredentials: true  
});

export const getallbooksgroupcookie = (combinedFilters) => API.post('/groupscookie/getallbooksgroupcookie',combinedFilters,{ 
  withCredentials: true  
});
export const getallusersgroupcookie = (combinedFilters) => API.post('/groupscookie/getallusersgroupcookie',combinedFilters,{ 
  withCredentials: true  
});





export const deletegroupownercookie = (id) => API.post('/groupscookie/deletegroupownercookie',{ id },{ 
  withCredentials: true  
});
export const jointogroupcookie = (id) => API.post('/groupscookie/jointogroupcookie',{ id },{ 
  withCredentials: true  
});
export const getoutfromgroupcookie = (id) => API.post('/groupscookie/getoutfromgroupcookie',{ id },{ 
  withCredentials: true  
});
export const getoutfromgroupadmincookie = (formData) => API.post('/groupscookie/getoutfromgroupadmincookie', formData ,{ 
  withCredentials: true  
});

export const addrecipetogroupcookie = (apiPayload) => API.post('/groupscookie/groupPage/addrecipetogroupcookie',apiPayload,{ 
  withCredentials: true  
});

export const addbooktogroupcookie = (apiPayload) => API.post('/groupscookie/groupPage/addbooktogroupcookie',apiPayload,{ 
  withCredentials: true  
});


export const removerecipefromgroupcookie = (apiPayload) => API.post('/groupscookie/groupPage/removerecipefromgroupcookie',apiPayload,{ 
  withCredentials: true  
});
export const removebookfromgroupcookie = (apiPayload) => API.post('/groupscookie/groupPage/removebookfromgroupcookie',apiPayload,{ 
  withCredentials: true  
});
