import axios from 'axios';


const API = axios.create({
  baseURL: process.env.REACT_APP_API || 'http://localhost:5000',
});



//export const signupuserapi = (userData) => API.post('/user/signup', userData);


//export const signinuserapi = (userData) => API.post('/user/signin', userData);


export const logoutcookie = () => API.post('/usercookie/logoutcookie',null, {withCredentials: true});


export const signinbyidcookie = () => API.get('/usercookie/signinbyidcookie', { 
  withCredentials: true  
});


///new app:


export const saveprofiledatacookie = (profileData) => API.post('/usergeneralcookie/saveprofiledatacookie',profileData,{
  withCredentials: true,
});

export const getqnrcookie = () => API.get('/usergeneralcookie/getqnrcookie',{ 
  withCredentials: true  
});

export const questionsanswerscookie = (profileData) => API.post('/usergeneralcookie/questionsanswerscookie',profileData,{
  withCredentials: true,
});






//Find page
export const getalllistforusercookie = (selected) => API.post('/usergeneralcookie/getalllistforusercookie', selected,{ 
  withCredentials: true  
});



//?? what is it - userpage?
export const getallcodescookie = () => API.get('/usergeneralcookie/getallcodescookie', { 
  withCredentials: true  
});

export const getallcodesandtripscookie = () => API.get('/usergeneralcookie/getallcodesandtripscookie', { 
  withCredentials: true  
});



export const approveusercookie = (actionObject) => API.post('/usergeneralcookie/approveusercookie',actionObject, { 
  withCredentials: true  
});

export const rejectusercookie = (actionObject) => API.post('/usergeneralcookie/rejectusercookie',actionObject, { 
  withCredentials: true  
});


export const getallnewmessagescookie = () => API.post('/usergeneralcookie/getallnewmessagescookie', null, { 
  withCredentials: true  
});

export const getallmatchescookie = (skipValue) => API.post('/usergeneralcookie/getallmatchescookie', { skipValue }, { 
  withCredentials: true  
});

export const deletematchcookie = (matchToDelete) => API.post('/usergeneralcookie/deletematchcookie', { matchToDelete }, { 
  withCredentials: true  
});


export const getallmessagescookie = (matchId) => API.post('/usergeneralcookie/getallmessagescookie', { matchId }, { 
  withCredentials: true  
});





//to delete
export const forwardwardpaginationmatchesListPagecookie = (currentpage) => API.post('/usergeneralcookie/forwardwardpaginationmatchesListPagecookie',{ currentpage },{ 
  withCredentials: true  
});

export const backwardpaginationmatchesListPagecookie = (currentpage) => API.post('/usergeneralcookie/backwardpaginationmatchesListPagecookie',{ currentpage }, { 
  withCredentials: true  
});


export const initialmassagescookie = (matchId) => API.post('/usergeneralcookie/initialmassagescookie',{ matchId } , { 
  withCredentials: true  
});

export const submitnewmessagecookie= (matchId,trimmedMessage) => API.post('/usergeneralcookie/submitnewmessagecookie',{ matchId,trimmedMessage },{ 
  withCredentials: true  
});

export const getAllcitiescookie = () => API.post('/usergeneralcookie/getAllcitiescookie',null,{ 
  withCredentials: true  
});


//userpage
export const getuserpagebyidcookie = (id) => API.post('/usergeneralcookie/getuserpagebyidcookie',{ id },{ 
  withCredentials: true  
});

//export const approveuserbyid = (id) => API.post('/usergeneralcookie/approveuserbyid', { id });

//export const rejectuserbyid = (id) => API.post('/usergeneralcookie/rejectuserbyid', { id });

export const deleteFromMongoUrlcookie = (urlToDelete) => API.post('/usergeneralcookie/deleteFromMongoUrlcookie',{ urlToDelete }, { 
  withCredentials: true  
});



//cookie

export const cookieeditcookie = (cookieState) => API.post('/usercookie/cookieeditcookie',{ cookieState }, { 
  withCredentials: true  
});


//ADMIN Prod
export const geodatacookie = (parsedData) => API.post('/usergeneralcookie/admin/geodatacookie',parsedData,{ 
  withCredentials: true  
});

export const defineqnrcookie = () => API.post('/usergeneralcookie/admin/defineqnrcookie',null, { 
  withCredentials: true  
});


export const adduserscookie = () => API.post('/usergeneralcookie/admin/adduserscookie', null);


export const addcitiescookie = (city) => API.post('/usergeneralcookie/admin/addcitiescookie',city, { 
  withCredentials: true  
});

export const addcodecookie = (newCodeData) => API.post('/usergeneralcookie/admin/addcodecookie',newCodeData,{ 
  withCredentials: true  
});

export const adminblockdatacookie = (data) => API.post('/usergeneralcookie/admin/adminblockdatacookie',data,{ 
  withCredentials: true  
});

export const getadminblockdatacookie = () => API.get('/usergeneralcookie/admin/getadminblockdatacookie');



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

//editcode
export const editcodegroupcookie = (newCodeData) => API.post('/usergeneralcookie/admin/editcodecookie',newCodeData,{ 
  withCredentials: true  
});





//edit2


export const getAllcitiesandcodescookie = () => API.get('/usergeneralcookie/getAllcitiesandcodescookie',{ 
  withCredentials: true  
});


//groups
//page with all codes

export const getallcodespagecookie = () => API.get('/groupscookie/getallcodespagecookie',{ 
  withCredentials: true  
});

export const deletegroupusercookie = (groupId) => API.post('/groupscookie/deletegroupusercookie',{ groupId },{ 
  withCredentials: true  
});

export const deletegroupuserpendingcookie = (groupId) => API.post('/groupscookie/deletegroupuserpendingcookie',{ groupId },{ 
  withCredentials: true  
});
export const addgroupcookie = (groupId) => API.post('/groupscookie/addgroupcookie',{ groupId },{ 
  withCredentials: true  
});



//updateaccessibility

export const updateaccessibilitycookie = (formAccessibilityData) => API.post('/usergeneralcookie/updateaccessibilitycookie',formAccessibilityData,{ 
  withCredentials: true  
});


export const getAllImprovementsaccessibilitycookie = () => API.get('/usergeneralcookie/getAllImprovementsaccessibilitycookie',{ 
  withCredentials: true  
});



export const addtripcookie = (tripData) => API.post('/usergeneralcookie/addtripcookie',tripData,{ 
  withCredentials: true  
});

export const removetripcookie = (trip) => API.post('/usergeneralcookie/removetripcookie',trip,{ 
  withCredentials: true  
});



export const addcodetousercookie = (codeID) => API.post('/usergeneralcookie/addcodetousercookie',{ codeID },{ 
  withCredentials: true  
});
export const deletecodefromusercookie = (codeID) => API.post('/usergeneralcookie/deletecodefromusercookie',{ codeID },{ 
  withCredentials: true  
});

export const getallcodesgroupscookie = () => API.get('/usergeneralcookie/getallcodesgroupscookie',{ 
  withCredentials: true  
});


//admin

export const deletecodecookie = (codeID) => API.post('/usergeneralcookie/admin/deletecodecookie',{ codeID },{ 
  withCredentials: true  
});

