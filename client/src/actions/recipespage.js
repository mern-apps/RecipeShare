import * as api from '../api/api';
import * as apicookie from '../api/apicookie';
import { logout } from './userActions';

import { useNavigate } from 'react-router-dom';
import { currentrecipe } from './recipeNewForm.js';
import { setpagemode } from './recipeNewForm.js';

import {getAllRecipes,countAllRecipes} from '../reducers/RecipesPage/recipesPageSlice'; 
import {countAllRecipesFavorite,getAllRecipesFavorite} from '../reducers/RecipesPage/recipesPageSlice'; 
import {deleteRecipe} from '../reducers/RecipesPage/recipesPageSlice'; 

import {getAllBestRecipes,countAllRecipesBest} from '../reducers/RecipesPage/recipesPageSlice'; 
import {getAllCategoryRecipes,countAllRecipesCategory} from '../reducers/RecipesPage/recipesPageSlice'; 
import {getAllCuisineRecipes,countAllRecipesCuisine} from '../reducers/RecipesPage/recipesPageSlice'; 
import {getAllTagRecipes,countAllRecipesTag} from '../reducers/RecipesPage/recipesPageSlice'; 
//book
import {getAllBooks,getAllBookRecipes,countAllRecipesBook} from '../reducers/RecipesPage/recipesPageSlice'; 

//group
import {getAllGroups,getAllBooksGroup,getAllBookGroupRecipes,countAllRecipesBookGroup,getAllGroupRecipes,countAllRecipesGroup} from '../reducers/RecipesPage/recipesPageSlice'; 
//check if it OK ti import from allgroupsSlice
import {countAllGroups} from '../reducers/groups/allgroupsSlice'; 

//groupbook
import {initialRecipesBookGroup} from '../reducers/RecipesPage/recipesPageSlice'; 


import {AddUserFavorite,RemoveUserFavorite} from '../reducers/userSlice';
import {CopiedRecipe,FavoriterecipeAdding,FavoriterecipeRemove} from '../reducers/RecipesPage/recipesPageSlice'; 
import {CopiedRecipe1} from '../reducers/userSlice';
import {CopiedRecipe2} from '../reducers/books/currentprojectSlice';

import {setFilterCategories} from '../reducers/RecipesPage/recipesPageSlice'; 
import {setFilterTags} from '../reducers/RecipesPage/recipesPageSlice'; 

export const setfiltercategories = (updatedFiltercategories) => async (dispatch) => {
    try {
    dispatch(setFilterCategories(updatedFiltercategories));

  } catch (error) {
    console.log('Error adding project:', error.message);
    if (error.response && error.response.status === 401) {
      dispatch(logout());  // Automatically log out on 401 error
    }
  }
};
export const setfiltertags = (updatedFiltertags) => async (dispatch) => {
    try {
    dispatch(setFilterTags(updatedFiltertags));

  } catch (error) {
    console.log('Error adding project:', error.message);
    if (error.response && error.response.status === 401) {
      dispatch(logout());  // Automatically log out on 401 error
    }
  }
};



//fix the word pagination
export const sendbackwardpaginationactionbest = (combinedFilters,currentpage,countallrecipes,token) => async (dispatch) => {
  try {
    if (currentpage > 2 && (currentpage) * 12 < countallrecipes) {
          const response = await api.sendbackwardpaginationactionbest(combinedFilters,currentpage,token);
          const { recipes,totalcount } = response.data;
          dispatch(getAllBestRecipes(recipes));

        } 
  } catch (error) {

    console.log('Error', error.message);
  }
};

  
export const sendforwardpaginationactionbest = (combinedFilters,currentpage,countallrecipes,token) => async (dispatch) => {

  try {
    if (currentpage > 1 && (currentpage + 1) * 12 < countallrecipes) {
          const response = await api.sendforwardpaginationactionbest(combinedFilters,currentpage,token);
          const { recipes,totalcount } = response.data;
          dispatch(getAllBestRecipes(recipes));

        } 
  } catch (error) {
    console.log('Error', error.message);
  }
};




 
  export const sendbackwardpaginationactionmyrecipes = (combinedFilters,currentpage,countallrecipes,token) => async (dispatch) => {
    try {
      if (currentpage > 2 && (currentpage) * 12 < countallrecipes) {
            const response = await api.sendbackwardpaginationactionmyrecipes(combinedFilters,currentpage,token);
            const { recipes,totalcount } = response.data;
            dispatch(getAllRecipes(recipes));

          } 
    } catch (error) {
  
      console.log('Error', error.message);
    }
  };
    
  export const sendforwardpaginationactionmyrecipes = (combinedFilters,currentpage,countallrecipes,token) => async (dispatch) => {
  
    try {
      if (currentpage > 1 && (currentpage + 1) * 12 < countallrecipes) {
            const response = await api.sendforwardpaginationactionmyrecipes(combinedFilters,currentpage,token);
            const { recipes,totalcount } = response.data;
            dispatch(getAllRecipes(recipes));

          } 
    } catch (error) {
      console.log('Error', error.message);
    }
  };


  

  

  export const sendbackwardpaginationactionfavorite = (combinedFilters,currentpage,countallrecipes,token) => async (dispatch) => {
    try {
      if (currentpage > 2 && (currentpage) * 12 < countallrecipes) {
            const response = await api.sendbackwardpaginationactionfavorite(combinedFilters,currentpage,token);
            const { recipes,totalcount } = response.data;
            dispatch(getAllRecipesFavorite(recipes));

          } 
    } catch (error) {
  
      console.log('Error', error.message);
    }
  };
  
    
  export const sendforwardpaginationactionfavorite = (combinedFilters,currentpage,countallrecipes,token) => async (dispatch) => {
  
    try {
      if (currentpage > 1 && (currentpage + 1) * 12 < countallrecipes) {
            const response = await api.sendforwardpaginationactionfavorite(combinedFilters,currentpage,token);
            const { recipes,totalcount } = response.data;
            dispatch(getAllRecipesFavorite(recipes));

          } 
    } catch (error) {
      console.log('Error', error.message);
    }
  };


//NEW

export const getallrecipesbest = (combinedFilters,countallrecipes) => async (dispatch) => {
    try {

if (
  combinedFilters.action === "all" ||
  (
    combinedFilters.action === "back" &&
    combinedFilters.currentpage > 2 &&
    combinedFilters.currentpage * 12 < countallrecipes
  ) ||
  (
    combinedFilters.action === "forward" &&
    combinedFilters.currentpage > 1 &&
    (combinedFilters.currentpage + 1) * 12 < countallrecipes
  )
)
 {
            let response;
    let token = localStorage.getItem('token');
    if (token) {
      response = await api.getallrecipesbest(combinedFilters,token)
    } 
        else {
          response = await apicookie.getallrecipesbestcookie(combinedFilters)
        }

     const { recipes,totalcount } = response.data;

          

        if (combinedFilters.activeCuisineid > 5 && combinedFilters.activeCuisineid < 6) {
      dispatch(getAllBestRecipes(recipes));
      dispatch(countAllRecipesBest(totalcount));
} else if (combinedFilters.activeCuisineid > 6 && combinedFilters.activeCuisineid < 7) {

     dispatch(getAllCuisineRecipes(recipes));
      dispatch(countAllRecipesCuisine(totalcount));
} else if (combinedFilters.activeCuisineid >7 && combinedFilters.activeCuisineid < 8) {
     dispatch(getAllCategoryRecipes(recipes));
      dispatch(countAllRecipesCategory(totalcount));
                
   } else if (combinedFilters.activeCuisineid >8 && combinedFilters.activeCuisineid < 9) {

        dispatch(getAllTagRecipes(recipes));
        dispatch(countAllRecipesTag(totalcount));
      }      
              } 
    } catch (error) {
      console.log('Error', error.message);
    }
  };


  export const getallrecipes = (combinedFilters,countallrecipes) => async (dispatch) => {
    try {
if (
  combinedFilters.action === "all" ||
  (
    combinedFilters.action === "back" &&
    combinedFilters.currentpage > 2 &&
    combinedFilters.currentpage * 12 < countallrecipes
  ) ||
  (
    combinedFilters.action === "forward" &&
    combinedFilters.currentpage > 1 &&
    (combinedFilters.currentpage + 1) * 12 < countallrecipes
  )
) {
            let response;
    let token = localStorage.getItem('token');
    if (token) {
      response = await api.getallrecipespage(combinedFilters,token)
    } 
        else {
          response = await apicookie.getallrecipespagecookie(combinedFilters)
        }

              console.log("📥 response:", response);

            const { recipes,totalcount } = response.data;

    dispatch(getAllRecipes(recipes));
    dispatch(countAllRecipes(totalcount));
} 
  } catch (error) {
    console.log('Error adding project:', error.message);
    if (error.response && error.response.status === 401) {
      dispatch(logout());  // Automatically log out on 401 error
    }
  }
};

 export const getallrecipesfavorite = (combinedFilters,countallrecipes) => async (dispatch) => {
    try {
if (
  combinedFilters.action === "all" ||
  (
    combinedFilters.action === "back" &&
    combinedFilters.currentpage > 2 &&
    combinedFilters.currentpage * 12 < countallrecipes
  ) ||
  (
    combinedFilters.action === "forward" &&
    combinedFilters.currentpage > 1 &&
    (combinedFilters.currentpage + 1) * 12 < countallrecipes
  )
) {
            let response;
    let token = localStorage.getItem('token');
    if (token) {
      response = await api.getallrecipesfavorite(combinedFilters,token)
    } 
        else {
          response = await apicookie.getallrecipesfavoritecookie(combinedFilters)
        }

            const { recipes,totalcount } = response.data;
    
    dispatch(getAllRecipesFavorite(recipes));
    dispatch(countAllRecipesFavorite(totalcount));
} 
  } catch (error) {
    console.log('Error adding project:', error.message);
    if (error.response && error.response.status === 401) {
      dispatch(logout());  // Automatically log out on 401 error
    }
  }
};

export const getallrecipesCuisine = (combinedFilters) => async (dispatch) => {
    try {
  const activeCuisineid = Number(combinedFilters.activeCuisineid);

    let response;
    let token = localStorage.getItem('token');
    if (token) {
      response = await api.getallrecipesCuisine(combinedFilters,token)
    } 
        else {
          response = await apicookie.getallrecipesCuisinecookie(combinedFilters)
        }
      const { recipes,totalcount} = response.data;
      
      if (activeCuisineid < 2) {
      dispatch(getAllCuisineRecipes(recipes));
      dispatch(countAllRecipesCuisine(totalcount));
} else if (activeCuisineid > 2 && activeCuisineid < 3) {
     dispatch(getAllCategoryRecipes(recipes));
      dispatch(countAllRecipesCategory(totalcount));
} else if (activeCuisineid >= 3 && activeCuisineid < 4) {
        dispatch(getAllTagRecipes(recipes));
        dispatch(countAllRecipesTag(totalcount));
   } else if (activeCuisineid >= 4 && activeCuisineid < 5) {
        dispatch(getAllGroupRecipes(recipes));
        dispatch(countAllRecipesGroup(totalcount));
      } 

    } catch (error) {
      console.log('Error fetching all reciped:', error.message);
    }
  };

 // no need another action for category and tags beacuse the name of the group defined in the combinedFilters

 //need to send type?? beacuse of reducer
  export const sendbackwardpaginationactioncuisine = (type,combinedFilters,currentpage,countallrecipes) => async (dispatch) => {
    try {
      if (currentpage > 2 && (currentpage) * 12 < countallrecipes) {

            let response;
    let token = localStorage.getItem('token');
    if (token) {
      response = await api.sendbackwardpaginationactioncuisine(combinedFilters,currentpage,token)
    } 
        else {
          response = await apicookie.sendbackwardpaginationactioncuisinecookie(combinedFilters,currentpage)
        }
            const { recipes,totalcount } = response.data;
            if (type === 'category') {
              dispatch(getAllCategoryRecipes(recipes));
              dispatch(countAllRecipesCategory(totalcount));
            }  else if (type === 'cuisine') {
              dispatch(getAllCuisineRecipes(recipes));
              dispatch(countAllRecipesCuisine(totalcount));
            } else if (type === 'tags') {
                dispatch(getAllTagRecipes(recipes));
                dispatch(countAllRecipesTag(totalcount));
              } 
              else if (type === 'group') {
                dispatch(getAllGroupRecipes(recipes));
                dispatch(countAllRecipesGroup(totalcount));
              } 
              //  else if (type === 'bookgroup') {
               // dispatch(getAllBookGroupRecipes(recipes));
               // dispatch(countAllRecipesBookGroup(totalcount));
            //  }   
            else {
              //
            }      
              } 
    } catch (error) {
  
      console.log('Error', error.message);
    }
  };
  
    
  export const sendforwardpaginationactioncuisine = (type,combinedFilters,currentpage,countallrecipes) => async (dispatch) => {
  
    try {
      if (currentpage > 1 && (currentpage + 1) * 12 < countallrecipes) {
                    let response;
    let token = localStorage.getItem('token');
    if (token) {
      response = await api.sendforwardpaginationactioncuisine(combinedFilters,currentpage,token)
    } 
        else {
          response = await apicookie.sendforwardpaginationactioncuisinecookie(combinedFilters,currentpage)
        }
            const { recipes,totalcount } = response.data;
            if (type === 'category') {
              dispatch(getAllCategoryRecipes(recipes));
              dispatch(countAllRecipesCategory(totalcount));
            }  else if (type === 'cuisine') {
              dispatch(getAllCuisineRecipes(recipes));
              dispatch(countAllRecipesCuisine(totalcount));
            } else if (type === 'tags') {
                dispatch(getAllTagRecipes(recipes));
                dispatch(countAllRecipesTag(totalcount));
              } 
              else if (type === 'group') {
                dispatch(getAllGroupRecipes(recipes));
                dispatch(countAllRecipesGroup(totalcount));
              } 
            //  else if (type === 'bookgroup') {
               // dispatch(getAllBookGroupRecipes(recipes));
               // dispatch(countAllRecipesBookGroup(totalcount));
            //  } 
            else {
              //
            }         
           } 

    } catch (error) {
      console.log('Error', error.message);
    }
  };


  //books
  export const getallBooks = () => async (dispatch) => {
    try {
      let response;
    let token = localStorage.getItem('token');
    if (token) {
      response = await api.getallbooks(token)
    } 
        else {
          response = await apicookie.getallbookscookie()
        }
      const { projects,totalcount} = response.data;
      dispatch(getAllBooks(projects));
    } catch (error) {
      console.log('Error fetching all reciped:', error.message);
    }
  };

  export const getallrecipesbook = (type,combinedFilters) => async (dispatch) => {
   
    try {
    
       let response;
    let token = localStorage.getItem('token');
    if (token) {
      response = await api.getallrecipesbookrecipespage(combinedFilters,token)
    } 
        else {
          response = await apicookie.getallrecipesbookrecipespagecookie(combinedFilters)
        }

      const { recipes,totalcount} = response.data;

      if (type === 'book') {
        dispatch(getAllBookRecipes(recipes));
        dispatch(countAllRecipesBook(totalcount));
      } else if (type === 'bookgroup') {
       dispatch(getAllBookGroupRecipes(recipes));
       dispatch(countAllRecipesBookGroup(totalcount)); 
      }else {
        
      }
    }
   catch (error) {
      console.log('Error fetching all reciped:', error.message);
    }
  };

  export const sendbackwardpaginationactionbook = (type,combinedFilters,currentpage,countallrecipes) => async (dispatch) => {
    try {
      if (currentpage > 2 && (currentpage) * 12 < countallrecipes) {
                            let response;
    let token = localStorage.getItem('token');
    if (token) {
      response = await api.sendbackwardpaginationactionbook(combinedFilters,currentpage,token)
    } 
        else {
          response = await apicookie.sendbackwardpaginationactionbookcookie(combinedFilters,currentpage)
        }
            const { recipes,totalcount } = response.data;
          if (type === 'book') {
            dispatch(getAllBookRecipes(recipes));
          }  else if (type === 'bookgroup') {
            dispatch(getAllBookGroupRecipes(recipes));
          }else {
            //
          }
        }
    } catch (error) {
  
      console.log('Error', error.message);
    }
  };
  
    
  export const sendforwardpaginationactionbook = (type,combinedFilters,currentpage,countallrecipes) => async (dispatch) => {
  
    try {
      if (currentpage > 1 && (currentpage + 1) * 12 < countallrecipes) {
                 let response;
    let token = localStorage.getItem('token');
    if (token) {
      response = await api.sendforwardpaginationactionbook(combinedFilters,currentpage,token)
    } 
        else {
          response = await apicookie.sendforwardpaginationactionbookcookie(combinedFilters,currentpage)
        }
            const { recipes,totalcount } = response.data;
            if (type === 'book') {
              dispatch(getAllBookRecipes(recipes));
            }  else if (type === 'bookgroup') {
              dispatch(getAllBookGroupRecipes(recipes));
            }else {
              //
            }
          }
    } catch (error) {
      console.log('Error', error.message);
    }
  };

  //groups

export const getallbooksgroup = (groupId) => async (dispatch) => {
    try {
      dispatch(initialRecipesBookGroup());
       let response;
    let token = localStorage.getItem('token');
    if (token) {
      response = await api.getallbooksgroup(groupId,token)
    } 
        else {
          response = await apicookie.getallbooksgroupcookie(groupId)
        }
      const { books,totalcount} = response.data;
      dispatch(getAllBooksGroup(books));

    } catch (error) {
      console.log('Error fetching all reciped:', error.message);
    }
  };

  export const getallgroups = () => async (dispatch) => {
    try {
           let response;
    let token = localStorage.getItem('token');
    if (token) {
      response = await api.getallgroupsrecipepage(token)
    } 
        else {
          response = await apicookie.getallgroupsrecipepagecookie()
        }

      const { groups,totalcount} = response.data;

   dispatch(getAllGroups(groups));
    dispatch(countAllGroups(totalcount));

    } catch (error) {
      console.log('Error fetching all reciped:', error.message);
    }
  };



    export const addtofavoriterecipe = (modalTaskCuisine) => async (dispatch) => {
    try {
           let response;
    let token = localStorage.getItem('token');
    if (token) {
      response = await api.addtofavoriterecipe(modalTaskCuisine,token)
    } 
        else {
          response = await apicookie.addtofavoriterecipecookie(modalTaskCuisine)
        }

      const { updatedModalTaskCuisine} = response.data;

         dispatch(FavoriterecipeAdding(updatedModalTaskCuisine));
         dispatch(AddUserFavorite(updatedModalTaskCuisine));

    } catch (error) {
      console.log('Error add to favorite recipe:', error.message);
    }
  };

    export const removefavoriterecipe = (modalTaskCuisine) => async (dispatch) => {
    try {
      let response;
    let token = localStorage.getItem('token');
    if (token) {
      response = await api.removefavoriterecipe(modalTaskCuisine,token)
    } 
        else {
          response = await apicookie.removefavoriterecipecookie(modalTaskCuisine)
        }

      const { updatedRecipe} = response.data;
        dispatch(FavoriterecipeRemove(updatedRecipe));
       dispatch(RemoveUserFavorite(updatedRecipe));
    } catch (error) {
      console.log('Error fetching all reciped:', error.message);
    }
  };

  
    export const deleterecipe = (item) => async (dispatch) => {
    try {
    let response;
    let token = localStorage.getItem('token');
    if (token) {
      response = await api.deleterecipe(item._id,token)
    } 
        else {
          response = await apicookie.deleterecipecookie(item._id)
        }
      const { deleteRecipeId} = response.data;
         dispatch(deleteRecipe(deleteRecipeId));
        dispatch(RemoveUserFavorite(item));
    } catch (error) {
      console.log('Error fetching all reciped:', error.message);
    }
  };
  

  export const PDFRecipe = (RecipeID) => async (dispatch) => {
    let pdfWindow;
  
    try {
      const token = localStorage.getItem('token');
  
      // 🔥 1. Open tab immediately (user gesture)
      pdfWindow = window.open('', '_blank');
  
      if (!pdfWindow) {
        throw new Error('Popup blocked');
      }
  
      // 🔄 2. Show loading UI (no blank page)
      pdfWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <title>Preparing PDF</title>
            <meta charset="UTF-8" />
          </head>
          <body style="
            margin:0;
            height:100vh;
            display:flex;
            align-items:center;
            justify-content:center;
            font-family:system-ui,-apple-system,BlinkMacSystemFont,sans-serif;
            background:#f9fafb;
            color:#111;
          ">
            <div style="text-align:center">
              <div style="font-size:40px;margin-bottom:12px">📄</div>
              <div style="font-size:18px;font-weight:500">
                Preparing your PDF…
              </div>
              <div style="font-size:13px;color:#666;margin-top:6px">
                This may take a few seconds
              </div>
            </div>
          </body>
        </html>
      `);
      pdfWindow.document.close();
  
      // ⏳ 3. Generate PDF
      const response = token
        ? await api.PDFRecipe(RecipeID, token)
        : await apicookie.PDFRecipecookie(RecipeID);
  
      // 📄 4. Create PDF blob
      const pdfBlob = new Blob([response.data], {
        type: 'application/pdf',
      });
  
      const pdfUrl = URL.createObjectURL(pdfBlob);
  
      // 🛡️ 5. Guard: user may have closed the tab
      if (!pdfWindow || pdfWindow.closed) return;
  
      // 🚀 6. Replace loading page with PDF
      pdfWindow.location.replace(pdfUrl);
  
    } catch (error) {
      console.error('PDF generation failed:', error);
  
      // ❌ If tab is open – show error instead of leaving it blank
      if (pdfWindow && !pdfWindow.closed) {
        pdfWindow.document.write(`
          <html>
            <body style="
              margin:0;
              height:100vh;
              display:flex;
              align-items:center;
              justify-content:center;
              font-family:sans-serif;
              background:#fff5f5;
              color:#991b1b;
            ">
              <div style="text-align:center">
                <div style="font-size:32px;margin-bottom:10px">⚠️</div>
                <div style="font-size:18px;font-weight:600">
                  Failed to generate PDF
                </div>
                <div style="font-size:14px;margin-top:6px">
                  Please try again.
                </div>
              </div>
            </body>
          </html>
        `);
        pdfWindow.document.close();
      }
  
      if (error.response?.status === 401) {
        dispatch(logout());
      }
    }
  };
  

export const copyrecipe = (item, navigate) => async (dispatch) => {
    try {
    let response;
    let token = localStorage.getItem('token');
    if (token) {
    response = await api.copyrecipe(item,token)
    } 
    else {
    response = await apicookie.copyrecipecookie(item)
    }
    const { newrecipe,previousrecipe} = response.data;
   dispatch(CopiedRecipe({ newrecipe, item }));
   dispatch(CopiedRecipe1({ newrecipe, item }));
   dispatch(CopiedRecipe2({ newrecipe, item }));

      dispatch(currentrecipe(newrecipe));
    dispatch(setpagemode("view"));
    navigate(`/recipe/${newrecipe._id}`);

    } catch (error) {
    console.log('Error fetching all reciped:', error.message);
    }
  };
