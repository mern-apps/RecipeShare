import axios from 'axios';


const API = axios.create({
  baseURL: process.env.REACT_APP_API || 'http://localhost:5000',
});

export const editrecipepage1 = (newTask, token) => API.post('/recipes/editrecipepage1',newTask, {
  headers: { Authorization: `Bearer ${token}` },
});

//to delte - there is seperate for my recipe + edit page together
export const getallrecipes = (token) => API.get('/editproject/getallrecipes', {
  headers: { Authorization: `Bearer ${token}` },
});

export const getallrecipesbook = (id,token) => API.get(`/editproject/getallrecipesbook/${id}`, {
  headers: { Authorization: `Bearer ${token}` },
});






export const copyrecipeCuisineeditproject = (modalTaskCuisine, token) => API.post('/editproject/editrecipe1/copy',modalTaskCuisine, {
  headers: { Authorization: `Bearer ${token}` },
});





export const removefavoriterecipeeditproject = (modalTaskCuisine, token) => API.post('/editproject/editrecipe1/removefavorite',modalTaskCuisine, {
  headers: { Authorization: `Bearer ${token}` },
});


//all project page
export const getallprojects = (token) => API.get('/projects', {
  headers: { Authorization: `Bearer ${token}` },
});

export const getallprojectsfromgroups = (token) => API.get('/projects/getallprojectsfromgroups', {
  headers: { Authorization: `Bearer ${token}` },
});





export const deleteproject = (id, token) => API.delete(`/projects/${id}`, {
  headers: { Authorization: `Bearer ${token}` },
});


//group


export const updategroup = (updatedgroup,token) => API.post('/groups/updategroup',updatedgroup,{
  headers: { Authorization: `Bearer ${token}` },
});




//Group Page
//All sections

//
export const getallgroupsnewrecipeform = (token) => API.post('/groups/newform', {}, {
 headers: { Authorization: `Bearer ${token}` },
});


//






// (assign task to book) updatedrecipefromlist - Owner is NOT the user (there is code)

//check the ''

export const updatedrecipefromlist = (updatedtask, token) => API.patch(`/editprojectupdatecode/`,updatedtask, {
  headers: { Authorization: `Bearer ${token}` },
});


export const removerecipefromlist = (itemid, token) => API.post('/projects/projectpage/removerecipefromlist', { itemid }, {
  headers: { Authorization: `Bearer ${token}` },
});



export const removerecipefromlistfavorite = (itemid, token) => API.patch('/projects/projectpage/removerecipefromlistfavorite', { itemid } , {
  headers: { Authorization: `Bearer ${token}` },
});



//edit recipe from edit project page - Owner is NOT the user (there is code)

//check the ''

export const editupdatedrecipefromlist = (updatedtask, token) => API.patch('/editrecipefromlistwithcode',updatedtask, {
  headers: { Authorization: `Bearer ${token}` },
});

export const copyandeditaddrecipefromlist = (newTask, token) => API.post('/projectpage/copyandeditaddrecipefromlist',newTask, {
  headers: { Authorization: `Bearer ${token}` },
});

 
//edit recipe from edit project page - Owner is  the user (no code)

//check the ''

export const geteditrecipepage = (id,token) => API.get(`/recipes/${id}`, {
  headers: { Authorization: `Bearer ${token}` },
});

export const editrecipepage = (formData,token) => API.post('/recipes/editrecipepage',formData, {
  headers: { Authorization: `Bearer ${token}` },
});

export const editrecipepagefileimage = (formData,token) => API.post('/recipes/editrecipepagefileimage',formData,{
  headers: { Authorization: `Bearer ${token}` },
});



//projectpage
//to delete
export const projectpagegetallrecipesgroup = (itemid, token) => API.post('/projects/projectpage/getallrecipesgroup',{ itemid }, {
  headers: { Authorization: `Bearer ${token}` },
});

export const getallrecipesfiltergroup = (combinedFilters, token) => API.post('/projects/projectpage/group/getallfilter',combinedFilters, {
  headers: { Authorization: `Bearer ${token}` },
});



//getallpendingrecipes

export const getallpendingrecipes = (token) => API.get('/dashboard/getallpendingrecipes', {
  headers: { Authorization: `Bearer ${token}` },
});

//acceptpendingrecipe

export const acceptpendingrecipe = (itemid, token) => API.post('/dashboard/acceptpendingrecipe',{ itemid }, {
  headers: { Authorization: `Bearer ${token}` },
});

//rejectpendingrecipe

export const rejectpendingrecipe = (itemid, token) => API.post('/dashboard/rejectpendingrecipe',{ itemid }, {
  headers: { Authorization: `Bearer ${token}` },
});




////test - deleteall
export const deleteallrecipes = (token) => API.delete('/test/deleteallrecipes', {
  headers: { Authorization: `Bearer ${token}` },
});

export const deleteallprojects = (token) => API.delete('/test/deleteallprojects', {
  headers: { Authorization: `Bearer ${token}` },
});

export const handledeleteAllgroups = (token) => API.delete('/test/handledeleteAllgroups', {
  headers: { Authorization: `Bearer ${token}` },
});


export const sendforwardpaginationactiongroup = (combinedFilters,currentpage, token) => API.post('/projects/projectpage/group/forwardpagination',{ combinedFilters,currentpage }, {
  headers: { Authorization: `Bearer ${token}` },
});

export const sendbackwardpaginationactiongroup = (combinedFilters,currentpage, token) => API.post('/projects/projectpage/group/backwardpagination',{ combinedFilters,currentpage }, {
  headers: { Authorization: `Bearer ${token}` },
});

export const sendforwardpaginationactiongroups = (currentpage, token) => API.post('/groups/allgroupspage/forwardpagination',{ currentpage }, {
  headers: { Authorization: `Bearer ${token}` },
});

export const sendbackwardpaginationactiongroups = (currentpage, token) => API.post('/groups/allgroupspage/backwardpagination',{ currentpage }, {
  headers: { Authorization: `Bearer ${token}` },
});

export const sendforwardpaginationactionprojects = (currentpage, token) => API.post('/projects/allprojectspage/forwardpagination',{ currentpage }, {
  headers: { Authorization: `Bearer ${token}` },
});

export const sendbackwardpaginationactionprojects = (currentpage, token) => API.post('/projects/allprojectspage/backwardpagination',{ currentpage }, {
  headers: { Authorization: `Bearer ${token}` },
});


////users page

export const getalluserssearchlistname = (searchValue, token) => API.post('/userspage/searchlistname',searchValue, {
  headers: { Authorization: `Bearer ${token}` },
});
export const getalluserssearchlistcode = (searchValue, token) => API.post('/userspage/searchlistcode',searchValue, {
  headers: { Authorization: `Bearer ${token}` },
});

export const addfriend = (friendId,token) => API.post('/userspage/addfriend',{ friendId }, {
  headers: { Authorization: `Bearer ${token}` },
});

export const removefriend = (friendId,token) => API.post('/userspage/removefriend',{ friendId }, {
  headers: { Authorization: `Bearer ${token}` },
});

export const approvefriend = (friendId,token) => API.post('/userspage/approvefriend',{ friendId }, {
  headers: { Authorization: `Bearer ${token}` },
});



export const getallusersfriends = (token) => API.get('/userspage/friends', {
  headers: { Authorization: `Bearer ${token}` },
});

export const getalluserspending = (token) => API.get('/userspage/pending', {
  headers: { Authorization: `Bearer ${token}` },
});

export const copyrecipeCuisine = (modalTaskCuisine, token) => API.post('/allrecipespage/modal/copy',modalTaskCuisine, {
  headers: { Authorization: `Bearer ${token}` },
});





//edit project

export const deleterecipefromlist = (itemid, token) => API.patch('/editproject/deleterecipefromlist',{ itemid } , {
  headers: { Authorization: `Bearer ${token}` },
});

export const likedeleterecipealllist = (modalTaskCuisine, token) => API.post('/editproject/likedeleterecipealllist',modalTaskCuisine, {
  headers: { Authorization: `Bearer ${token}` },
});


//export const removerecipefrombook = (itemid, id, token) => API.patch(`/projects/${id}`, { itemid } , {
 // headers: { Authorization: `Bearer ${token}` },
//});
//Add new recipe type 2
export const addnewrecipe2 = (newTasktype2,id,token) => API.post(`/recipes/recipe2/${id}`,newTasktype2,{
  headers: { Authorization: `Bearer ${token}` },
});

export const updaterecipe2 = (updatedrecipe2,token) => API.post('/projects/updaterecipe2',updatedrecipe2,{
  headers: { Authorization: `Bearer ${token}` },
});



//updateaccessibility

export const updateaccessibility = (formAccessibilityData,token) => API.post('/user/updateaccessibility',formAccessibilityData, {
  headers: { Authorization: `Bearer ${token}` },
});


export const improvementaccessibility = (formData) => API.post('/user/improvementaccessibility', formData);

export const getAllImprovementsaccessibility = (token) => API.get(`/user/getAllImprovementsaccessibility/`,{
  headers: { Authorization: `Bearer ${token}` },
});




//code image

export const getPresignedUrlcode = (updatedFileDetails,token) => API.post('/presigned-url/preurlcode',updatedFileDetails, {
  headers: { Authorization: `Bearer ${token}` },
});

export const uploadmongoUrlcode = (imageObject,token) => API.post('/presigned-url/uploadmongoUrlcode',imageObject, {
  headers: { Authorization: `Bearer ${token}` },
});

//editcodeimage

export const deleteFromAmazonAndMongoeditcode = (fileDetails,token) => API.post('/presigned-url/deleteFromAmazonAndMongoeditcode',fileDetails, {
  headers: { Authorization: `Bearer ${token}` },
});




//user
export const getuserpagebyid = (id) => API.post('/user/getuserpagebyid', { id });


//usersign in/up
export const saveprofiledata = (profileData,token) => API.post('/user/saveprofiledata',profileData,{
  headers: { Authorization: `Bearer ${token}` },
});
export const signupuserapi = (updatedFormData) => API.post('/user/signup', updatedFormData, { withCredentials: true });
export const signinuserapi = (formData) => API.post('/user/signin',formData, { withCredentials: true });
export const signinbyid = (token) => API.get('/user/signinbyid',{
  headers: { Authorization: `Bearer ${token}` },
});


//admin
export const adminblockdata = (data,token) => API.post('/admin/adminblockdata',data, {
  headers: { Authorization: `Bearer ${token}` },
});

export const getadminblockdata = () => API.get('/admin/getadminblockdata');

//cookie
export const cookieedit = (cookieState,token) => API.post('/user/cookieedit',{ cookieState }, {
  headers: { Authorization: `Bearer ${token}` },
});


//projects


export const updateproject = (updatedproject,token) => API.post('/projects/updateproject',updatedproject,{
  headers: { Authorization: `Bearer ${token}` },
});


////Best recipes
export const getallrecipesbest = (combinedFilters,token) => API.post('/allrecipespage/best',combinedFilters, {
  headers: { Authorization: `Bearer ${token}` },
});



export const sendforwardpaginationactionbest = (combinedFilters,currentpage, token) => API.post('/allrecipespage/forwardpaginationbest',{ combinedFilters,currentpage }, {
  headers: { Authorization: `Bearer ${token}` },
});

export const sendbackwardpaginationactionbest = (combinedFilters,currentpage, token) => API.post('/allrecipespage/backwardpaginationbest',{ combinedFilters,currentpage }, {
  headers: { Authorization: `Bearer ${token}` },
});

//Myrecipes

export const getallrecipespage = (combinedFilters,token) => API.post('/allrecipespage/allrecipes',combinedFilters, {
  headers: { Authorization: `Bearer ${token}` },
});

export const sendforwardpaginationactionmyrecipes = (combinedFilters,currentpage, token) => API.post('/allrecipespage/forwardpaginationmyrecipes',{ combinedFilters,currentpage }, {
  headers: { Authorization: `Bearer ${token}` },
});

export const sendbackwardpaginationactionmyrecipes = (combinedFilters,currentpage, token) => API.post('/allrecipespage/backwardpaginationmyrecipes',{ combinedFilters,currentpage }, {
  headers: { Authorization: `Bearer ${token}` },
});

//favorite

export const getallrecipesfavorite = (combinedFilters,token) => API.post('/allrecipespage/getallrecipesfavorite',combinedFilters, {
  headers: { Authorization: `Bearer ${token}` },
});
export const sendforwardpaginationactionfavorite = (combinedFilters,currentpage, token) => API.post('/allrecipespage/forwardpaginationfavorite',{ combinedFilters,currentpage }, {
  headers: { Authorization: `Bearer ${token}` },
});

export const sendbackwardpaginationactionfavorite = (combinedFilters,currentpage, token) => API.post('/allrecipespage/backwardpaginationfavorite',{ combinedFilters,currentpage }, {
  headers: { Authorization: `Bearer ${token}` },
});


//cuisine

export const getallrecipesCuisine = (combinedFilters,token) => API.post('/allrecipespage/cuisine',combinedFilters, {
  headers: { Authorization: `Bearer ${token}` },
});

export const sendforwardpaginationactioncuisine = (combinedFilters,currentpage, token) => API.post('/allrecipespage/forwardpaginationcuisine',{ combinedFilters,currentpage }, {
  headers: { Authorization: `Bearer ${token}` },
});

export const sendbackwardpaginationactioncuisine = (combinedFilters,currentpage, token) => API.post('/allrecipespage/backwardpaginationcuisine',{ combinedFilters,currentpage }, {
  headers: { Authorization: `Bearer ${token}` },
});







export const getallrecipesbookrecipespage = (combinedFilters,token) => API.post('/allrecipespage/recipesbook',combinedFilters, {
  headers: { Authorization: `Bearer ${token}` },
});

export const sendforwardpaginationactionbook = (combinedFilters,currentpage, token) => API.post('/allrecipespage/forwardpaginationbook',{ combinedFilters,currentpage }, {
  headers: { Authorization: `Bearer ${token}` },
});

export const sendbackwardpaginationactionbook = (combinedFilters,currentpage, token) => API.post('/allrecipespage/backwardpaginationbook',{ combinedFilters,currentpage }, {
  headers: { Authorization: `Bearer ${token}` },
});

//groups
export const getallgroupsrecipepage = (token) => API.get('/allrecipespage/allgroups', {
  headers: { Authorization: `Bearer ${token}` },
});



export const addnewrecipe1urlimage = (formData,token) => API.post('/recipes/addnewrecipe1urlimage',formData,{
  headers: { Authorization: `Bearer ${token}` },
});



//Add new recipe type 1
export const generateRecipePrompt = (imagedata,token) => API.post('/recipes/generateRecipePrompt',imagedata,{
  headers: { Authorization: `Bearer ${token}` },
});

export const unsplashImages = (shortRecipeName,token) => API.post('/recipes/unsplashImages',{ shortRecipeName },{
  headers: { Authorization: `Bearer ${token}` },
});

export const apiAIImage = (imagePrompt,token) => API.post('/recipes/apiAIImage',{ imagePrompt },{
  headers: { Authorization: `Bearer ${token}` },
});

export const addnewrecipeAdmin = (formData,token) => API.post('/recipes/addnewrecipeAdmin',formData,{
  headers: { Authorization: `Bearer ${token}` },
});

export const addnewrecipe = (formData,token) => API.post('/recipes/addnewrecipe',formData,{
  headers: { Authorization: `Bearer ${token}` },
});
export const editrecipe = (editData,token) => API.post('/recipes/editrecipe',editData,{
  headers: { Authorization: `Bearer ${token}` },
});

export const fetchRecipeById = (id,token) => API.post('/recipes/fetchRecipeById',{ id },{
  headers: { Authorization: `Bearer ${token}` },
});


export const addtofavoriterecipe = (modalTaskCuisine, token) => API.post('/recipes/addtofavoriterecipe',modalTaskCuisine, {
  headers: { Authorization: `Bearer ${token}` },
});
export const removefavoriterecipe = (modalTaskCuisine, token) => API.post('/recipes/removefavoriterecipe',modalTaskCuisine, {
  headers: { Authorization: `Bearer ${token}` },
});

export const deleterecipe = (deleteId, token) => API.post('/recipes/deleterecipe',{ deleteId }, {
  headers: { Authorization: `Bearer ${token}` },
});

export const copyrecipe = (item, token) => API.post('/recipes/copyrecipe',item , {
  headers: { Authorization: `Bearer ${token}` },
});


export const PDFRecipe = (RecipeID, token) =>
  API.post(
    '/recipes/PDFRecipe',
    { RecipeID },
    {
      responseType: 'arraybuffer',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );


//images
export const getPresignedUrl = (fileDetails,token) => API.post('/presigned-url',fileDetails, {
  headers: { Authorization: `Bearer ${token}` },
});

export const uploadmongoUrl = (payload,token) => API.post('/presigned-url/uploadmongoUrl',payload, {
  headers: { Authorization: `Bearer ${token}` },
});

export const getPresignedUrlAdminBest = (fileDetails,token) => API.post('/presigned-url/AdminBest',fileDetails, {
  headers: { Authorization: `Bearer ${token}` },
});

export const uploadmongoUrlAdminBest = (payload,token) => API.post('/presigned-url/uploadmongoUrl/AdminBest',payload, {
  headers: { Authorization: `Bearer ${token}` },
});

//images-book & groups
export const getPresignedUrlBook = (fileDetails,token) => API.post('/presigned-url/Book',fileDetails, {
  headers: { Authorization: `Bearer ${token}` },
});
export const uploadmongoUrlBook = (payload,token) => API.post('/presigned-url/uploadmongoUrl/Book',payload, {
  headers: { Authorization: `Bearer ${token}` },
});
export const getPresignedUrlGroup = (fileDetails,token) => API.post('/presigned-url/Group',fileDetails, {
  headers: { Authorization: `Bearer ${token}` },
});
export const uploadmongoUrlGroup = (payload,token) => API.post('/presigned-url/uploadmongoUrl/Group',payload, {
  headers: { Authorization: `Bearer ${token}` },
});

export const getPresignedUrlAdmin = (fileDetails,token) => API.post('/presigned-url/Admin',fileDetails, {
  headers: { Authorization: `Bearer ${token}` },
});
export const uploadmongoUrlAdmin = (payload,token) => API.post('/presigned-url/uploadmongoUrl/Admin',payload, {
  headers: { Authorization: `Bearer ${token}` },
});

export const deleteImageadmin = (fileDetails,token) => API.post('/presigned-url/deleteFromAmazonAndMongo/Admin',fileDetails, {
  headers: { Authorization: `Bearer ${token}` },
});

//bookpage
export const fetchBookById = (id,token) => API.post('/projects/bookpage/fetchBookById',{ id },{
  headers: { Authorization: `Bearer ${token}` },
});

export const getallrecipesbookfilter = (bookrecipes, token) => API.post('/projects/bookpage/getallrecipesbookfilter', bookrecipes, {
  headers: { Authorization: `Bearer ${token}` },
});

export const forwardwardpaginationRecipesbookpage = (bookrecipes, token) => API.post('/projects/bookpage/forwardwardpaginationRecipes', bookrecipes, {
  headers: { Authorization: `Bearer ${token}` },
});

export const backwardpaginationRecipesbookpage = (bookrecipes, token) => API.post('/projects/bookpage/backwardpaginationRecipes',bookrecipes, {
  headers: { Authorization: `Bearer ${token}` },
});

//edit book page - recipes section
export const editbookrecipessectionfetchRecipesBookById = (bookId,token) => API.post('/projects/bookpage/edit/recipessection/fetchRecipesBookById',{ bookId },{
  headers: { Authorization: `Bearer ${token}` },
});

export const editbookrecipessectionfetchRecipesGroupById = (groupId,token) => API.post('/projects/bookpage/edit/recipessection/fetchRecipesGroupById',{ groupId },{
  headers: { Authorization: `Bearer ${token}` },
});

export const editbookrecipessectionfetchRecipes = (token) => API.get('/projects/bookpage/edit/recipessection/fetchRecipes', {
  headers: { Authorization: `Bearer ${token}` },
});

export const addrecipefromlist = (data,token) => API.post('/projects/bookpage/edit/recipessection/addrecipefromlist',data,{
  headers: { Authorization: `Bearer ${token}` },
});

//DnD section
export const removerecipefrombook = (data,token) => API.post('/projects/bookpage/edit/booksection/removerecipefrombook',data,{
  headers: { Authorization: `Bearer ${token}` },
});

export const dnd = (data,token) => API.post('/projects/bookpage/edit/booksection/dnd',data,{
  headers: { Authorization: `Bearer ${token}` },
});

export const PDFBook = (BookID, token) =>
  API.post(
    '/projects/bookpage/edit/booksection/PDFBook',
    { BookID },
    {
      responseType: 'arraybuffer',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );



export const addrecipe2 = (formData2,token) => API.post('/projects/bookpage/edit/booksection/addrecipe2',formData2,{
  headers: { Authorization: `Bearer ${token}` },
});

export const editrecipe2 = (editData2,token) => API.post('/projects/bookpage/edit/booksection/editrecipe2',editData2,{
  headers: { Authorization: `Bearer ${token}` },
});

export const getPresignedUrlrecipe2 = (fileDetails,token) => API.post('/presigned-url/Book/recipe2',fileDetails, {
  headers: { Authorization: `Bearer ${token}` },
});
export const uploadmongoUrlrecipe2 = (payload,token) => API.post('/presigned-url/uploadmongoUrl/Book/recipe2',payload, {
  headers: { Authorization: `Bearer ${token}` },
});


//Getall recipes filter
export const bookeditgetallrecipesfilter = (data,token) => API.post('/projects/bookpage/edit/recipessection/getallrecipesfilter',data, {
  headers: { Authorization: `Bearer ${token}` },
});

export const bookeditbackwardpagination = (data,token) => API.post('/projects/bookpage/edit/recipessection/backwardpagination',data, {
  headers: { Authorization: `Bearer ${token}` },
});
export const bookeditforwardwardpagination = (data,token) => API.post('/projects/bookpage/edit/recipessection/forwardwardpagination',data, {
  headers: { Authorization: `Bearer ${token}` },
});



//grouppage


//Users
export const forwardwardpaginationUsersgrouppage = (groupusers, token) => API.post('/grouppage/users/forwardwardpaginationUsers', groupusers, {
  headers: { Authorization: `Bearer ${token}` },
});

export const backwardpaginationUsersgrouppage = (groupusers, token) => API.post('/grouppage/users/backwardpaginationUsers',groupusers, {
  headers: { Authorization: `Bearer ${token}` },
});

//Recipes


export const getallrecipesgroupfilter = (grouprecipes, token) => API.post('/grouppage/recipes/getallrecipesgroupfilter', grouprecipes, {
  headers: { Authorization: `Bearer ${token}` },
});

export const forwardwardpaginationRecipesgrouppage = (grouprecipes, token) => API.post('/grouppage/recipes/forwardwardpaginationRecipes', grouprecipes, {
  headers: { Authorization: `Bearer ${token}` },
});

export const backwardpaginationRecipesgrouppage = (grouprecipes, token) => API.post('/grouppage/recipes/backwardpaginationRecipes',grouprecipes, {
  headers: { Authorization: `Bearer ${token}` },
});

//Books
export const forwardwardpaginationBooksgrouppage = (groupbooks, token) => API.post('/grouppage/books/forwardwardpaginationBooks', groupbooks, {
  headers: { Authorization: `Bearer ${token}` },
});

export const backwardpaginationBooksgrouppage = (groupbooks, token) => API.post('/grouppage/books/backwardpaginationBooks',groupbooks, {
  headers: { Authorization: `Bearer ${token}` },
});
///


export const addbookowner = (formData,token) => API.post('/projects/addbookowner',formData,{
  headers: { Authorization: `Bearer ${token}` },
});

export const editbook = (editData,token) => API.post('/projects/editbook',editData,{
  headers: { Authorization: `Bearer ${token}` },
});

export const getproject = (id,token) => API.post('/projects/getproject',{ id },{
  headers: { Authorization: `Bearer ${token}` },
});

//book info/
export const deletebookowner = (id,token) => API.post('/projects/deletebookowner',{ id },{
  headers: { Authorization: `Bearer ${token}` },
});

export const addtofavoritebook = (projectID, token) => API.post('/projects/addtofavoritebook',{projectID}, {
  headers: { Authorization: `Bearer ${token}` },
});
export const removefavoritebook = (projectID, token) => API.post('/projects/removefavoritebook',{projectID}, {
  headers: { Authorization: `Bearer ${token}` },
});


//Groups
export const getallgroups = (token) => API.get('/groups', {
  headers: { Authorization: `Bearer ${token}` },
});
//Groups list page
export const forwardwardpaginationGroupsListPage = (currentpage, token) => API.post('/groups/groupslistpage/forwardwardpaginationGroupsListPage',{ currentpage }, {
  headers: { Authorization: `Bearer ${token}` },
});

//grouppage
export const fetchGroupById = (id,token) => API.post('/groups/fetchGroupById',{ id },{
  headers: { Authorization: `Bearer ${token}` },
});

export const backwardpaginationGroupsListPage = (currentpage, token) => API.post('/groups/groupslistpage/backwardpaginationGroupsListPage',{ currentpage }, {
  headers: { Authorization: `Bearer ${token}` },
});

//Books
export const getallbooks = (token) => API.get('/projects/booklist/getallbooks', {
  headers: { Authorization: `Bearer ${token}` },
});

export const forwardwardpaginationBooksListPage = (currentpage, token) => API.post('/projects/booklist/forwardwardpaginationBooksListPage',{ currentpage }, {
  headers: { Authorization: `Bearer ${token}` },
});

export const backwardpaginationBooksListPage = (currentpage, token) => API.post('/projects/booklist/backwardpaginationBooksListPage',{ currentpage }, {
  headers: { Authorization: `Bearer ${token}` },
});



export const addgroupowner = (formData,token) => API.post('/groups/addgroupowner',formData,{
  headers: { Authorization: `Bearer ${token}` },
});

export const editgroup = (editData,token) => API.post('/groups/editgroup',editData,{
  headers: { Authorization: `Bearer ${token}` },
});

export const getallrecipesgroup = (combinedFilters,token) => API.post('/groups/getallrecipesgroup',combinedFilters, {
  headers: { Authorization: `Bearer ${token}` },
});
export const getallbooksgroup = (combinedFilters,token) => API.post('/groups/getallbooksgroup',combinedFilters, {
  headers: { Authorization: `Bearer ${token}` },
});
export const getallusersgroup = (combinedFilters,token) => API.post('/groups/getallusersgroup',combinedFilters, {
  headers: { Authorization: `Bearer ${token}` },
});




export const deletegroupowner = (id,token) => API.post('/groups/deletegroupowner',{ id },{
  headers: { Authorization: `Bearer ${token}` },
});

export const jointogroup = (id,token) => API.post('/groups/jointogroup',{ id },{
  headers: { Authorization: `Bearer ${token}` },
});
export const getoutfromgroup = (id,token) => API.post('/groups/getoutfromgroup',{ id },{
  headers: { Authorization: `Bearer ${token}` },
});

export const getoutfromgroupadmin = (idData,token) => API.post('/groups/getoutfromgroupadmin',idData,{
  headers: { Authorization: `Bearer ${token}` },
});

export const addrecipetogroup = (apiPayload,token) => API.post('/groups/groupPage/addrecipetogroup',apiPayload,{
  headers: { Authorization: `Bearer ${token}` },
});

export const addbooktogroup = (apiPayload,token) => API.post('/groups/groupPage/addbooktogroup',apiPayload,{
  headers: { Authorization: `Bearer ${token}` },
});

export const removerecipefromgroup = (apiPayload,token) => API.post('/groups/groupPage/removerecipefromgroup',apiPayload,{
  headers: { Authorization: `Bearer ${token}` },
});

export const removebookfromgroup = (apiPayload,token) => API.post('/groups/groupPage/removebookfromgroup',apiPayload,{
  headers: { Authorization: `Bearer ${token}` },
});
//



export const deleteFromAmazonAndMongo = (fileDetails,token) => API.post('/presigned-url/deleteFromAmazonAndMongo',fileDetails, {
  headers: { Authorization: `Bearer ${token}` },
});





//consider to delete:
export const approveuserbyid = (id) => API.post('/usergeneral/approveuserbyid', { id });
export const rejectuserbyid = (id) => API.post('/usergeneral/rejectuserbyid', { id });
export const deleteFromMongoUrl = (urlToDelete,token) => API.post('/usergeneral/deleteFromMongoUrl',{ urlToDelete }, {
  headers: { Authorization: `Bearer ${token}` },
});

export const getAllcitiesandcodes = (token) => API.get(`/usergeneral/getAllcitiesandcodes/`,{
  headers: { Authorization: `Bearer ${token}` },
});