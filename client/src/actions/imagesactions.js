import * as api from '../api/api'; 
import * as apicookie from '../api/apicookie';
import axios from 'axios';
import {imagesUrls} from '../reducers/userSlice';
import {saveProfileData} from '../reducers/userSlice';
import { RecipeById } from '../reducers/RecipesPage/newRecipeSlice';
import { updateGroupInfo } from '../reducers/groups/groupListSlice';
import { updateBookInfo } from '../reducers/books/currentprojectSlice';
import { updateRecipe2 } from '../reducers/books/currentprojectSlice';


// Action to get presigned URL from the backend
export const uploadimageAdminBest = (imagefile, fileDetails, mainimageValue, isFirst) => async (dispatch) => {
  try {

       let response;
       let response2;

       let response10;
       let response11;

        let token = localStorage.getItem('token');
        if (token) {

            response = await api.getPresignedUrlAdminBest(fileDetails,token);

                            const {signedUrl,url} = response.data;
               

                            const uploadResponse = await axios.put(signedUrl, imagefile, {
                              headers: {
                                "Content-Type": fileDetails.fileType,
                              },
                            });


                                    if (uploadResponse.status === 200) {

                      const payload = {
      url,
      mainimageValue,
      isFirst,
      savedItemID: fileDetails.savedItemID,
    };

                                      response2 = await api.uploadmongoUrlAdminBest(payload,token);
                                      const { recipe } = response2.data;
                                      //dispatch(imagesUrls(updatedimages)); 
                                      dispatch(RecipeById(recipe)); 

                                    } else {
                                      console.error("Error uploading file:", uploadResponse.statusText);
                                    }   
        } else {
          response10 = await apicookie.getPresignedUrlAdminBestcookie(fileDetails);

            const { signedUrl, url } = response10.data;


            const uploadResponse = await axios.put(signedUrl, imagefile, {
              headers: {
               "Content-Type": fileDetails.fileType,
             },
            });

                    // Check if the file upload was successful
                    if (uploadResponse.status === 200) {
                          const payload = {
      url,
      mainimageValue,
      isFirst,
       savedItemID: fileDetails.savedItemID,
    };

                      response11 = await apicookie.uploadmongoUrlAdminBestcookie(payload);
                      const { recipe } = response11.data;
                      //dispatch(imagesUrls(updatedimages)); 
                      //dispatch(RecipeById(recipe)); 

                    } else {
                      console.error("Error uploading file:", uploadResponse.statusText);
                    } 
        }
  } catch (error) {
    console.error('Error fetching presigned URL:', error);
    throw error;
  }
};

export const uploadimage = (imagefile, fileDetails, mainimageValue, isFirst) => async (dispatch) => {
  try {

       let response;
       let response2;

       let response10;
       let response11;

        let token = localStorage.getItem('token');
        if (token) {

            response = await api.getPresignedUrl(fileDetails,token);

                            const {signedUrl,url} = response.data;
               

                            const uploadResponse = await axios.put(signedUrl, imagefile, {
                              headers: {
                                "Content-Type": fileDetails.fileType,
                              },
                            });


                                    if (uploadResponse.status === 200) {

                      const payload = {
      url,
      mainimageValue,
      isFirst,
      savedItemID: fileDetails.savedItemID,
    };

                                      response2 = await api.uploadmongoUrl(payload,token);
                                      const { recipe } = response2.data;
                                      //dispatch(imagesUrls(updatedimages)); 
                                      dispatch(RecipeById(recipe)); 

                                    } else {
                                      console.error("Error uploading file:", uploadResponse.statusText);
                                    }   
        } else {
          response10 = await apicookie.getPresignedUrlcookie(fileDetails);

            const { signedUrl, url } = response10.data;


            const uploadResponse = await axios.put(signedUrl, imagefile, {
              headers: {
               "Content-Type": fileDetails.fileType,
             },
            });

                    // Check if the file upload was successful
                    if (uploadResponse.status === 200) {
                          const payload = {
      url,
      mainimageValue,
      isFirst,
       savedItemID: fileDetails.savedItemID,
    };

                      response11 = await apicookie.uploadmongoUrlcookie(payload);
                      const { recipe } = response11.data;
                      //dispatch(imagesUrls(updatedimages)); 
                      dispatch(RecipeById(recipe)); 

                    } else {
                      console.error("Error uploading file:", uploadResponse.statusText);
                    } 
        }
  } catch (error) {
    console.error('Error fetching presigned URL:', error);
    throw error;
  }
};



export const deleteFromAmazonAndMongo = (fileDetails) => async (dispatch) => {
  try {
       let response;
       let response2;
       console.log('fileDetails:', fileDetails);

        let token = localStorage.getItem('token');
        if (token) {
            response = await api.deleteFromAmazonAndMongo(fileDetails,token);
            console.log('response:', response);
            const { updatedimages,user } = response.data;
            //dispatch(imagesUrls(updatedimages)); 
            dispatch(saveProfileData(user)); 
            console.log('deleted from amazon + mongo:', user);                          
        } else {
          console.log('cocckie:');
          response2 = await apicookie.deleteFromAmazonAndMongocookie(fileDetails);
          const { updatedimages,user } = response2.data;
          //dispatch(imagesUrls(updatedimages)); 
          dispatch(saveProfileData(user)); 
          console.log('deleted from amazon + mongo:', user);            
        }
  } catch (error) {
    console.error('Error fetching presigned URL:', error);
    throw error;
  }
};


export const uploadimagegroup = (imagefile, fileDetails, mainimageValue, isFirst) => async (dispatch) => {
  try {

       let response;
       let response2;

       let response10;
       let response11;

        let token = localStorage.getItem('token');
        if (token) {

            response = await api.getPresignedUrlGroup(fileDetails,token);

                            const {signedUrl,url} = response.data;
               

                            const uploadResponse = await axios.put(signedUrl, imagefile, {
                              headers: {
                                "Content-Type": fileDetails.fileType,
                              },
                            });


                                    if (uploadResponse.status === 200) {

                      const payload = {
      url,
      mainimageValue,
      isFirst,
      savedItemID: fileDetails.savedItemID,
    };

                                      response2 = await api.uploadmongoUrlGroup(payload,token);
                                      const { group } = response2.data;
                                      //dispatch(imagesUrls(updatedimages)); 
                                      dispatch(updateGroupInfo(group)); 

                                    } else {
                                      console.error("Error uploading file:", uploadResponse.statusText);
                                    }   
        } else {
          response10 = await apicookie.getPresignedUrlGroupcookie(fileDetails);

            const { signedUrl, url } = response10.data;


            const uploadResponse = await axios.put(signedUrl, imagefile, {
              headers: {
               "Content-Type": fileDetails.fileType,
             },
            });

                    // Check if the file upload was successful
                    if (uploadResponse.status === 200) {
                          const payload = {
      url,
      mainimageValue,
      isFirst,
       savedItemID: fileDetails.savedItemID,
    };

                      response11 = await apicookie.uploadmongoUrlGroupcookie(payload);
                                            console.log("111111 response11 file:", response11);
                      const { group } = response11.data;
                      //dispatch(imagesUrls(updatedimages)); 
                      dispatch(updateGroupInfo(group)); 

                    } else {
                      console.error("Error uploading file:", uploadResponse.statusText);
                    } 
        }
  } catch (error) {
    console.error('Error fetching presigned URL:', error);
    throw error;
  }
};


export const uploadimagebook = (imagefile, fileDetails, mainimageValue, isFirst) => async (dispatch) => {
  try {

       let response;
       let response2;

       let response10;
       let response11;

        let token = localStorage.getItem('token');
        if (token) {

            response = await api.getPresignedUrlBook(fileDetails,token);

                            const {signedUrl,url} = response.data;
               

                            const uploadResponse = await axios.put(signedUrl, imagefile, {
                              headers: {
                                "Content-Type": fileDetails.fileType,
                              },
                            });


                                    if (uploadResponse.status === 200) {

                      const payload = {
      url,
      mainimageValue,
      isFirst,
      savedItemID: fileDetails.savedItemID,
    };

                                      response2 = await api.uploadmongoUrlBook(payload,token);
                                      const { book } = response2.data;
                                      //dispatch(imagesUrls(updatedimages)); 
                                     dispatch(updateBookInfo(book)); 

                                    } else {
                                      console.error("Error uploading file:", uploadResponse.statusText);
                                    }   
        } else {
          response10 = await apicookie.getPresignedUrlBookcookie(fileDetails);

            const { signedUrl, url } = response10.data;


            const uploadResponse = await axios.put(signedUrl, imagefile, {
              headers: {
               "Content-Type": fileDetails.fileType,
             },
            });

                    // Check if the file upload was successful
                    if (uploadResponse.status === 200) {
                          const payload = {
      url,
      mainimageValue,
      isFirst,
       savedItemID: fileDetails.savedItemID,
    };

                      response11 = await apicookie.uploadmongoUrlBookcookie(payload);
                      const { book } = response11.data;
                      //dispatch(imagesUrls(updatedimages)); 
                      dispatch(updateBookInfo(book)); 

                    } else {
                      console.error("Error uploading file:", uploadResponse.statusText);
                    } 
        }
  } catch (error) {
    console.error('Error fetching presigned URL:', error);
    throw error;
  }
};

export const uploadimagerecipe2 = (imagefile, fileDetails) => async (dispatch) => {
  try {

       let response;
       let response2;

       let response10;
       let response11;

        let token = localStorage.getItem('token');
        if (token) {

            response = await api.getPresignedUrlrecipe2(fileDetails,token);

                            const {signedUrl,url} = response.data;
                            const uploadResponse = await axios.put(signedUrl, imagefile, {
                              headers: {
                                "Content-Type": fileDetails.fileType,
                              },
                            });
                                    if (uploadResponse.status === 200) {
                      const payload = {
      url,
      savedItemID: fileDetails.savedItemID,
    };

                                      response2 = await api.uploadmongoUrlrecipe2(payload,token);
                                      const { recipe2 } = response2.data;
                                     dispatch(updateRecipe2(recipe2)); 
                                    } else {
                                      console.error("Error uploading file:", uploadResponse.statusText);
                                    }   
        } else {
          response10 = await apicookie.getPresignedUrlrecipe2cookie(fileDetails);
            const { signedUrl, url } = response10.data;
            const uploadResponse = await axios.put(signedUrl, imagefile, {
              headers: {
               "Content-Type": fileDetails.fileType,
             },
            });

                    // Check if the file upload was successful
                    if (uploadResponse.status === 200) {
                          const payload = {
      url,
       savedItemID: fileDetails.savedItemID,
    };

                      response11 = await apicookie.uploadmongoUrlrecipe2cookie(payload);
                     const { recipe2 } = response2.data;
                     dispatch(updateRecipe2(recipe2)); 
                    } else {
                      console.error("Error uploading file:", uploadResponse.statusText);
                    } 
        }
  } catch (error) {
    console.error('Error fetching presigned URL:', error);
    throw error;
  }
};

export const uploadimageadmin = (imagefile, fileDetails) => async (dispatch) => {
  try {
        console.log('fileDetails:', fileDetails);

       let response;
       let response2;

       let response10;
       let response11;

        let token = localStorage.getItem('token');
        if (token) {

            response = await api.getPresignedUrlAdmin(fileDetails,token);

                            const {signedUrl,url} = response.data;
               

                            const uploadResponse = await axios.put(signedUrl, imagefile, {
                              headers: {
                                "Content-Type": fileDetails.fileType,
                              },
                            });


                                    if (uploadResponse.status === 200) {

                      const payload = {
      url,
     // savedItemID: fileDetails.savedItemID,
    };
        console.log('new URL:', url);

                                     // response2 = await api.uploadmongoUrlAdmin(payload,token);
                                      //const { book } = response2.data;
                                      //dispatch(imagesUrls(updatedimages)); 
                                    // dispatch(bookById(book)); 

                                    } else {
                                      console.error("Error uploading file:", uploadResponse.statusText);
                                    }   
        } else {
          response10 = await apicookie.getPresignedUrlAdmincookie(fileDetails);

            const { signedUrl, url } = response10.data;

            const uploadResponse = await axios.put(signedUrl, imagefile, {
              headers: {
               "Content-Type": fileDetails.fileType,
             },
            });

                    // Check if the file upload was successful
                    if (uploadResponse.status === 200) {
                          const payload = {
      url,
       //savedItemID: fileDetails.savedItemID,
    };
        console.log('new URL:', url);


                     // response11 = await apicookie.uploadmongoUrlAdmincookie(payload);
                      //const { book } = response11.data;
                      //dispatch(imagesUrls(updatedimages)); 
                     // dispatch(bookById(book)); 

                    } else {
                      console.error("Error uploading file:", uploadResponse.statusText);
                    } 
        }
  } catch (error) {
    console.error('Error fetching presigned URL:', error);
    throw error;
  }
};


export const deleteImageadmin = (fileDetails) => async (dispatch) => {
  try {
       let response;
       let response2;

        let token = localStorage.getItem('token');
        if (token) {
            response = await api.deleteImageadmin(fileDetails,token);
            console.log('deleted from amazon + mongo:', response);
        } else {
          response2 = await apicookie.deleteImageadmincookie(fileDetails);
                      console.log('response:', response2);
            console.log('deleted from amazon + mongo:', response2);
        }
  } catch (error) {
    console.error('Error fetching presigned URL:', error);
    throw error;
  }
};