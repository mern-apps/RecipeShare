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


//Add new recipe type 1
export const addnewrecipe1fileimage = (formData,token) => API.post('/recipes/addnewrecipe1fileimage',formData,{
  headers: { Authorization: `Bearer ${token}` },
});

export const addnewrecipe1urlimage = (formData,token) => API.post('/recipes/addnewrecipe1urlimage',formData,{
  headers: { Authorization: `Bearer ${token}` },
});





//projects
export const addproject = (newproject,token) => API.post('/projects/addproject',newproject,{
  headers: { Authorization: `Bearer ${token}` },
});


export const updateproject = (updatedproject,token) => API.post('/projects/updateproject',updatedproject,{
  headers: { Authorization: `Bearer ${token}` },
});

export const copyrecipeCuisineeditproject = (modalTaskCuisine, token) => API.post('/editproject/editrecipe1/copy',modalTaskCuisine, {
  headers: { Authorization: `Bearer ${token}` },
});





export const removefavoriterecipeeditproject = (modalTaskCuisine, token) => API.post('/editproject/editrecipe1/removefavorite',modalTaskCuisine, {
  headers: { Authorization: `Bearer ${token}` },
});



export const getallprojects = (token) => API.get('/projects', {
  headers: { Authorization: `Bearer ${token}` },
});

export const getproject = (id, token) => API.get(`/projects/${id}`, {
  headers: { Authorization: `Bearer ${token}` },
});

//DELETE API is to delete, instead of patch to partially delete properties
export const deleteproject = (id, token) => API.delete(`/projects/${id}`, {
  headers: { Authorization: `Bearer ${token}` },
});


//group
//export const addgroup = (group,token) => API.post('/groups',group,{
  //headers: { Authorization: `Bearer ${token}` },
//});

export const updategroup = (updatedgroup,token) => API.post('/groups/updategroup',updatedgroup,{
  headers: { Authorization: `Bearer ${token}` },
});

export const getallgroups = (token) => API.get('/groups', {
  headers: { Authorization: `Bearer ${token}` },
});





//Groups list page
export const forwardwardpaginationGroupsListPage = (currentpage, token) => API.post('/groupslistpage/forwardwardpaginationGroupsListPage',{ currentpage }, {
  headers: { Authorization: `Bearer ${token}` },
});

export const backwardpaginationGroupsListPage = (currentpage, token) => API.post('/groupslistpage/backwardpaginationGroupsListPage',{ currentpage }, {
  headers: { Authorization: `Bearer ${token}` },
});

//Books list page
export const forwardwardpaginationBooksListPage = (currentpage, token) => API.post('/bookslistpage/forwardwardpaginationBooksListPage',{ currentpage }, {
  headers: { Authorization: `Bearer ${token}` },
});

export const backwardpaginationBooksListPage = (currentpage, token) => API.post('/bookslistpage/backwardpaginationBooksListPage',{ currentpage }, {
  headers: { Authorization: `Bearer ${token}` },
});



//Group Page
//All sections
export const forwardpaginationactiongroup = (currentgroupId,combinedFilters,currentpage, token) => API.post(`/groups/grouppage/forwardpaginationactiongroup/${currentgroupId}`,{ combinedFilters,currentpage }, {
  headers: { Authorization: `Bearer ${token}` },
});

export const backpaginationactiongroup = (currentgroupId,combinedFilters,currentpage, token) => API.post(`/groups/grouppage/backpaginationactiongroup/${currentgroupId}`,{ combinedFilters,currentpage }, {
  headers: { Authorization: `Bearer ${token}` },
});

export const getgroup = (id, token) => API.get(`/groups/${id}`, {
  headers: { Authorization: `Bearer ${token}` },
});


//
export const getallgroupsnewrecipeform = (token) => API.post('/groups/newform', {}, {
 headers: { Authorization: `Bearer ${token}` },
});


//


export const deletegroup = (id, token) => API.delete(`/groups/${id}`, {
  headers: { Authorization: `Bearer ${token}` },
});

export const getallrecipesgroup = (id,token) => API.get(`/groups/recipe/${id}`, {
  headers: { Authorization: `Bearer ${token}` },
});

export const addrecipeTogroup = (id,recipe,token) => API.post(`/groups/addrecipeTogroup/${id}`,recipe,{
  headers: { Authorization: `Bearer ${token}` },
});

export const addbookTogroup = (id,book,token) => API.post(`/groups/addbookTogroup/${id}`,book,{
  headers: { Authorization: `Bearer ${token}` },
});


export const removerecipefromgroup = (id, token) => API.delete(`/groups/recipe/${id}`, {
  headers: { Authorization: `Bearer ${token}` },
});

export const addusersgroup = (id,token) => API.post(`/groups/user/${id}`,{
  headers: { Authorization: `Bearer ${token}` },
});

export const getallusersgroup = (id,token) => API.get(`/groups/user/${id}`,{
  headers: { Authorization: `Bearer ${token}` },
});

export const removeuserfromgroup = (id, token) => API.delete(`/groups/user/${id}`, {
  headers: { Authorization: `Bearer ${token}` },
});




//export const signupuserapi = (updatedFormData) => API.post('/user/signup', updatedFormData);

export const signupuserapi = (updatedFormData) => API.post('/user/signup', updatedFormData, { withCredentials: true });


export const signinuserapi = (formData) => API.post('/user/signin',formData, { withCredentials: true });
//token is not recived in the server-check if token can be removed and not post.
//export const logoutserver = (token) => API.post('/user/logout', null, {
  //headers: { Authorization: `Bearer ${token}` },
//});

//export const logoutserver = () => API.post('/user/logout', null,{ withCredentials: true });

export const signinbyid = (token) => API.get('/user/signinbyid',{
  headers: { Authorization: `Bearer ${token}` },
});


// (assign task to book) updatedrecipefromlist - Owner is NOT the user (there is code)

//check the ''

export const updatedrecipefromlist = (updatedtask, token) => API.patch(`/editprojectupdatecode/`,updatedtask, {
  headers: { Authorization: `Bearer ${token}` },
});






// remove

export const removerecipefrombook = (itemid, id, token) => API.patch(`/projects/${id}`, { itemid } , {
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


// dnd
export const dnd = (sourceIndex,destinationIndex,id, token) => API.patch(`/projects/dnd/${id}`, { sourceIndex,destinationIndex } , {
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




//books


export const getallBooks = (token) => API.get('/allrecipespage/allbooks', {
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

export const getallbooksgroup = (itemid, token) => API.post('/allrecipespage/allbooksgroup',{ itemid }, {
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

export const addtofavoriterecipe = (modalTaskCuisine, token) => API.post('/allrecipespage/modal/addfavorite',modalTaskCuisine, {
  headers: { Authorization: `Bearer ${token}` },
});
export const removefavoriterecipe = (modalTaskCuisine, token) => API.post('/allrecipespage/modal/removefavorite',modalTaskCuisine, {
  headers: { Authorization: `Bearer ${token}` },
});



//edit project

export const deleterecipefromlist = (itemid, token) => API.patch('/editproject/deleterecipefromlist',{ itemid } , {
  headers: { Authorization: `Bearer ${token}` },
});

export const likedeleterecipealllist = (modalTaskCuisine, token) => API.post('/editproject/likedeleterecipealllist',modalTaskCuisine, {
  headers: { Authorization: `Bearer ${token}` },
});

export const addrecipefromlist = (newTask,id, token) => API.post(`/editproject/addrecipefromlist/${id}`,newTask, {
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




///new app:



export const saveprofiledata = (profileData,token) => API.post('/usergeneral/saveprofiledata',profileData,{
  headers: { Authorization: `Bearer ${token}` },
});


export const getqnr = (token) => API.get(`/usergeneral/getqnr/`,{
  headers: { Authorization: `Bearer ${token}` },
});


export const questionsanswers = (profileData,token) => API.post('/usergeneral/questionsanswers',profileData,{
  headers: { Authorization: `Bearer ${token}` },
});




//Find page
export const getalllistforuser = (selected,token) => API.post('/usergeneral/getalllistforuser', selected,{
  headers: { Authorization: `Bearer ${token}` },
});


export const getallcodes = (token) => API.get('/usergeneral/getallcodes', {
  headers: { Authorization: `Bearer ${token}` },
});

//find page
export const getallcodesandtrips = (token) => API.get('/usergeneral/getallcodesandtrips', {
  headers: { Authorization: `Bearer ${token}` },
});

export const approveuser = (actionObject,token) => API.post('/usergeneral/approveuser',actionObject, {
  headers: { Authorization: `Bearer ${token}` },
});

export const rejectuser = (actionObject,token) => API.post('/usergeneral/rejectuser',actionObject, {
  headers: { Authorization: `Bearer ${token}` },
});


export const getallnewmessages = (token) => API.post('/usergeneral/getallnewmessages', null, {
  headers: { Authorization: `Bearer ${token}` },
});

export const getallmatches = (skipValue,token) => API.post('/usergeneral/getallmatches', { skipValue }, {
  headers: { Authorization: `Bearer ${token}` },
})

export const deletematch = (matchToDelete,token) => API.post('/usergeneral/deletematch',{ matchToDelete }, {
  headers: { Authorization: `Bearer ${token}` },
});


export const getallmessages = (matchId,token) => API.post('/usergeneral/getallmessages', { matchId }, {
  headers: { Authorization: `Bearer ${token}` },
})

//to delete
export const forwardwardpaginationmatchesListPage = (currentpage, token) => API.post('/usergeneral/forwardwardpaginationmatchesListPage',{ currentpage }, {
  headers: { Authorization: `Bearer ${token}` },
});

export const backwardpaginationmatchesListPage = (currentpage, token) => API.post('/usergeneral/backwardpaginationmatchesListPage',{ currentpage }, {
  headers: { Authorization: `Bearer ${token}` },
});


export const initialmassages = (matchId, token) => API.post('/usergeneral/initialmassages',{ matchId } , {
  headers: { Authorization: `Bearer ${token}` },
});

export const submitnewmessage = (matchId,trimmedMessage,token) => API.post('/usergeneral/submitnewmessage',{ matchId,trimmedMessage }, {
  headers: { Authorization: `Bearer ${token}` },
});

export const getAllcities = (token) => API.post('/usergeneral/getAllcities',null,{
  headers: { Authorization: `Bearer ${token}` },
});


//userpage
//export const getuserpagebyid = (id,token) => API.post('/usergeneral/getuserpagebyid',{ id }, {
  //headers: { Authorization: `Bearer ${token}` },
//});

export const getuserpagebyid = (id) => API.post('/usergeneral/getuserpagebyid', { id });


export const approveuserbyid = (id) => API.post('/usergeneral/approveuserbyid', { id });

export const rejectuserbyid = (id) => API.post('/usergeneral/rejectuserbyid', { id });

export const deleteFromMongoUrl = (urlToDelete,token) => API.post('/usergeneral/deleteFromMongoUrl',{ urlToDelete }, {
  headers: { Authorization: `Bearer ${token}` },
});


//cookie
export const cookieedit = (cookieState,token) => API.post('/user/cookieedit',{ cookieState }, {
  headers: { Authorization: `Bearer ${token}` },
});


//ADMIN Prod
export const geodata = (parsedData,token) => API.post('/usergeneral/admin/geodata',parsedData, {
  headers: { Authorization: `Bearer ${token}` },
});

export const defineqnr = (token) => API.post('/usergeneral/admin/defineqnr',null, {
  headers: { Authorization: `Bearer ${token}` },
});


export const addusers = () => API.post('/usergeneral/admin/addusers', null);


export const addcities = (city,token) => API.post('/usergeneral/admin/addcities',city, {
  headers: { Authorization: `Bearer ${token}` },
});

export const addcode = (newCodeData,token) => API.post('/usergeneral/admin/addcode',newCodeData, {
  headers: { Authorization: `Bearer ${token}` },
});




export const adminblockdata = (data,token) => API.post('/usergeneral/admin/adminblockdata',data, {
  headers: { Authorization: `Bearer ${token}` },
});

export const getadminblockdata = () => API.get('/usergeneral/admin/getadminblockdata');


//images
export const getPresignedUrl = (fileDetails,token) => API.post('/presigned-url',fileDetails, {
  headers: { Authorization: `Bearer ${token}` },
});

export const uploadmongoUrl = (payload,token) => API.post('/presigned-url/uploadmongoUrl',payload, {
  headers: { Authorization: `Bearer ${token}` },
});



export const deleteFromAmazonAndMongo = (fileDetails,token) => API.post('/presigned-url/deleteFromAmazonAndMongo',fileDetails, {
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

//editcode

export const editcodegroup = (newCodeData,token) => API.post('/usergeneral/admin/editcode',newCodeData, {
  headers: { Authorization: `Bearer ${token}` },
});



//edit2

export const getAllcitiesandcodes = (token) => API.get(`/usergeneral/getAllcitiesandcodes/`,{
  headers: { Authorization: `Bearer ${token}` },
});




//groups

//spesific page
export const getcodepage = (CodeData) => API.post('/groups/getcodepage', CodeData);
//export const deletecodefromuser = (deleteData) => API.post('/groups/deletecodefromuser',deleteData);
export const addcodefromuserpending = (addpendingData) => API.post('/groups/addcodefromuserpending',addpendingData);
export const deletecodefromuserpending = (deletependingData) => API.post('/groups/deletecodefromuserpending',deletependingData);



//page with all codes
export const getallcodespage = (token) => API.get('/groups/getallcodespage', {
  headers: { Authorization: `Bearer ${token}` },
});


export const deletegroupuser = (groupId,token) => API.post('/groups/deletegroupuser',{ groupId }, {
  headers: { Authorization: `Bearer ${token}` },
});

export const deletegroupuserpending = (groupId,token) => API.post('/groups/deletegroupuserpending',{ groupId }, {
  headers: { Authorization: `Bearer ${token}` },
});

export const addgroup = (groupId,token) => API.post('/groups/addgroup',{ groupId }, {
  headers: { Authorization: `Bearer ${token}` },
});


//updateaccessibility

export const updateaccessibility = (formAccessibilityData,token) => API.post('/usergeneral/updateaccessibility',formAccessibilityData, {
  headers: { Authorization: `Bearer ${token}` },
});


export const improvementaccessibility = (formData) => API.post('/usergeneral/improvementaccessibility', formData);

export const getAllImprovementsaccessibility = (token) => API.get(`/usergeneral/getAllImprovementsaccessibility/`,{
  headers: { Authorization: `Bearer ${token}` },
});

//trips

export const addtrip = (tripData,token) => API.post('/usergeneral/addtrip',tripData, {
  headers: { Authorization: `Bearer ${token}` },
});

export const removetrip = (trip,token) => API.post('/usergeneral/removetrip',trip, {
  headers: { Authorization: `Bearer ${token}` },
});

//code



export const addcodetouser = (codeID,token) => API.post('/usergeneral/addcodetouser',{ codeID }, {
  headers: { Authorization: `Bearer ${token}` },
});
export const deletecodefromuser = (codeID,token) => API.post('/usergeneral/deletecodefromuser',{ codeID }, {
  headers: { Authorization: `Bearer ${token}` },
});


export const getallcodesgroups = (token) => API.get('/groups/getallcodesgroups', {
  headers: { Authorization: `Bearer ${token}` },
});


//admin
export const deletecode = (codeID,token) => API.post('/usergeneral/admin/deletecode',{ codeID }, {
  headers: { Authorization: `Bearer ${token}` },
});


