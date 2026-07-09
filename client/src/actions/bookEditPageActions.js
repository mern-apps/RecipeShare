import * as api from '../api/api';
import * as apicookie from '../api/apicookie';

import { logout } from './userActions';

import {getBookPage,setPageMode,setPageMode2 } from '../reducers/books/currentprojectSlice';
import {getAllRecipesInBook } from '../reducers/books/currentprojectSlice';

import { addBook,deleteProject} from '../reducers/books/allprojectsSlice';

import { addBookGroup} from '../reducers/groups/groupListSlice';

import {bookEditRecipesBook,bookEditRecipesGroup,bookEditRecipes } from '../reducers/books/currentprojectSlice';
import {addRecipeFromList,removeRecipeFromBook } from '../reducers/books/currentprojectSlice';
import {EditBookRecipeSectionBookID,EditBookRecipeSectionGroupID } from '../reducers/books/currentprojectSlice';

//DND
import {updateRecipe2,addRecipe2,setRecipe2 } from '../reducers/books/currentprojectSlice';
import {DnD } from '../reducers/books/currentprojectSlice';


export const setpagemode = (mode) => async (dispatch) => {
    try {
  dispatch(setPageMode(mode));
    } catch (error) {
      console.log('Error adding project:', error.message);
      if (error.response && error.response.status === 401) {
        dispatch(logout());  // Automatically log out on 401 error
      }
    }
  };






  export const reduxEditBookRecipeSectionBookID = (ID) => async (dispatch) => {
    try {
  dispatch(EditBookRecipeSectionBookID(ID));
    } catch (error) {
      console.log('Error adding project:', error.message);
      if (error.response && error.response.status === 401) {
        dispatch(logout());  // Automatically log out on 401 error
      }
    }
  };

 export const reduxEditBookRecipeSectionGroupID = (ID) => async (dispatch) => {
    try {
  dispatch(EditBookRecipeSectionGroupID(ID));
    } catch (error) {
      console.log('Error adding project:', error.message);
      if (error.response && error.response.status === 401) {
        dispatch(logout());  // Automatically log out on 401 error
      }
    }
  };

  export const setpagemode2 = (mode) => async (dispatch) => {
    try {
  dispatch(setPageMode2(mode));
    } catch (error) {
      console.log('Error adding project:', error.message);
      if (error.response && error.response.status === 401) {
        dispatch(logout());  // Automatically log out on 401 error
      }
    }
  };

 export const currentbookNull = () => async (dispatch) => {
      try {
   
   dispatch(
      getBookPage({
        book: null,
        bookRecipes: null,
        totalcountbookRecipes: null,
      })
    );

      } catch (error) {
        console.log('Error adding project:', error.message);
        if (error.response && error.response.status === 401) {
          dispatch(logout());  // Automatically log out on 401 error
        }
      }
    };

    
    
 export const getallrecipesbookfilter = (bookrecipes) => async (dispatch) => {
      try {
        let response;
        let token = localStorage.getItem('token');
        if (token) {
          response = await api.getallrecipesbookfilter(bookrecipes,token)
        } 
            else {
              response = await apicookie.getallrecipesbookfiltercookie(bookrecipes)
            }
            const { bookRecipes,totalcountbookRecipes} = response.data;
        dispatch(getAllRecipesInBook({bookRecipes,totalcountbookRecipes}));
       
        } catch (error) {
        console.log('Error adding project:', error.message);
        if (error.response && error.response.status === 401) {
          dispatch(logout());  // Automatically log out on 401 error
        }
      }
    };

    //
      
 export const addrecipefromlist = (data) => async (dispatch) => {
      try {
        let response;
        let token = localStorage.getItem('token');
        if (token) {
          response = await api.addrecipefromlist(data,token)
        } 
            else {
              response = await apicookie.addrecipefromlistcookie(data)
            }
            const { newrecipebook} = response.data;
        dispatch(addRecipeFromList({newrecipebook}));
               console.log('action newrecipebook:', newrecipebook);

        } catch (error) {
        console.log('Error adding project:', error.message);
        if (error.response && error.response.status === 401) {
          dispatch(logout());
        }
      }
    };

    //DND
//Recipe2

    export const dnd = (sourceIndex,destinationIndex,id) => async (dispatch) => {
      dispatch(DnD({ sourceIndex, destinationIndex }));
       const data = { sourceIndex, destinationIndex, id };

      try {
        let response;
        let token = localStorage.getItem('token');
        if (token) {
          response = await api.dnd(data,token)
        } 
            else {
              response = await apicookie.dndcookie(data)
            }
        } catch (error) {
        console.log('Error adding project:', error.message);
        if (error.response && error.response.status === 401) {
          dispatch(logout());  // Automatically log out on 401 error
        }
      }
    };


    

    export const setrecipe2 = (item) => async (dispatch) => {
    try {
  dispatch(setRecipe2(item));
    } catch (error) {
      console.log('Error adding project:', error.message);
      if (error.response && error.response.status === 401) {
        dispatch(logout());  // Automatically log out on 401 error
      }
    }
  };
    

export const PDFBook = (BookID) => async (dispatch) => {
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
      ? await api.PDFBook(BookID, token)
      : await apicookie.PDFBookcookie(BookID);

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



export const addrecipe2 = (formData2) => async (dispatch) => {
      try {
        let response;
        let token = localStorage.getItem('token');
        if (token) {
          response = await api.addrecipe2(formData2,token)
        } 
            else {
              response = await apicookie.addrecipe2cookie(formData2)
            }
      const { newrecipe2 } = response.data;
     dispatch(addRecipe2(newrecipe2));
     return newrecipe2;
          //reutrn is needed for the component const.
        } catch (error) {
        console.log('Error adding project:', error.message);
        if (error.response && error.response.status === 401) {
          dispatch(logout());  // Automatically log out on 401 error
        }
      }
    };
    

  export const editrecipe2 = (editData2) => async (dispatch) => {
    try {
      let response;
      let token = localStorage.getItem('token');
      if (token) {
        response = await api.editrecipe2(editData2,token)
      } 
          else {
            response = await apicookie.editrecipe2cookie(editData2)
          }
        const { newrecipe2} = response.data;
              console.log('recipe2recipe2recipe2:', newrecipe2);

     dispatch(updateRecipe2(newrecipe2)); 
    } catch (error) {
      console.log('Error adding project:', error.message);
      if (error.response && error.response.status === 401) {
        dispatch(logout());  // Automatically log out on 401 error
      }
    }
  };


     export const removerecipefrombook = (data) => async (dispatch) => {
      try {
        let response;
        let token = localStorage.getItem('token');
        if (token) {
          await api.removerecipefrombook(data,token)
        } 
            else {
              await apicookie.removerecipefrombookcookie(data)
            }
    dispatch(removeRecipeFromBook({ taskID: data.taskID }));       
        } catch (error) {
        console.log('Error adding project:', error.message);
        if (error.response && error.response.status === 401) {
          dispatch(logout());  // Automatically log out on 401 error
        }
      }
    };

 export const editbookrecipessectionfetchRecipesBookById = (bookId) => async (dispatch) => {
      try {
        let response;
        let token = localStorage.getItem('token');
        if (token) {
          response = await api.editbookrecipessectionfetchRecipesBookById(bookId,token)
        } 
            else {
              response = await apicookie.editbookrecipessectionfetchRecipesBookByIdcookie(bookId)
            }
            const { book, bookRecipes,totalcountbookRecipes} = response.data;

        dispatch(bookEditRecipesBook({book,bookRecipes,totalcountbookRecipes}));
        } catch (error) {
        console.log('Error adding project:', error.message);
        if (error.response && error.response.status === 401) {
          dispatch(logout());
        }
      }
    };

     export const editbookrecipessectionfetchRecipesGroupById = (groupId) => async (dispatch) => {
      try {
        let response;
        let token = localStorage.getItem('token');
        if (token) {
          response = await api.editbookrecipessectionfetchRecipesGroupById(groupId,token)
        } 
            else {
              response = await apicookie.editbookrecipessectionfetchRecipesGroupByIdcookie(groupId)
            }
            const { group, groupRecipes,totalcountgroupRecipes} = response.data;
        dispatch(bookEditRecipesGroup({group,groupRecipes,totalcountgroupRecipes}));
       
        } catch (error) {
        console.log('Error adding project:', error.message);
        if (error.response && error.response.status === 401) {
          dispatch(logout());
        }
      }
    };

    export const editbookrecipessectionfetchRecipes = () => async (dispatch) => {
      try {
        let response;
        let token = localStorage.getItem('token');
        if (token) {
          response = await api.editbookrecipessectionfetchRecipes(token)
        } 
            else {
              response = await apicookie.editbookrecipessectionfetchRecipescookie()
            }
            const { recipes,totalcount} = response.data;
        dispatch(bookEditRecipes({recipes,totalcount}));

        } catch (error) {
        console.log('Error adding project:', error.message);
        if (error.response && error.response.status === 401) {
          dispatch(logout());
        }
      }
    };

        export const bookeditgetallrecipesfilter = (data,countallrecipes) => async (dispatch) => {
      try {

        if (
  data.action === "all" ||
  (
    data.action === "back" &&
    data.currentpage > 2 &&
    data.currentpage * 12 < countallrecipes
  ) ||
  (
    data.action === "forward" &&
    data.currentpage > 1 &&
    (data.currentpage + 1) * 12 < countallrecipes
  )
)
{
        let response;
        let token = localStorage.getItem('token');
        if (token) {
          response = await api.bookeditgetallrecipesfilter(data,token)
        } 
            else {
              response = await apicookie.bookeditgetallrecipesfiltercookie(data)
            }
          const { recipes,totalcount} = response.data;
        dispatch(bookEditRecipes({recipes,totalcount}));
        } 
  } catch (error) {
        console.log('Error adding project:', error.message);
        if (error.response && error.response.status === 401) {
          dispatch(logout());
        }
      }
    };
     

    export const bookeditbackwardpagination = (data,countallrecipes) => async (dispatch) => {
          try {
                if (data.currentpage > 2 && (data.currentpage) * 12 < countallrecipes) {
              console.log('YES forwardwardpaginationGroupsListPage server');
        
            let response;
            let token = localStorage.getItem('token');
            if (token) {
              response = await api.bookeditbackwardpagination(data,token)
            } 
                else {
        
                  response = await apicookie.bookeditbackwardpaginationcookie(data)
                }
          const { recipes,totalcount} = response.data;
        dispatch(bookEditRecipes({recipes,totalcount}));
        }
              console.log('NO forwardwardpaginationGroupsListPage server');
        
          } catch (error) {
            console.log('Error adding project:', error.message);
            if (error.response && error.response.status === 401) {
              dispatch(logout());  // Automatically log out on 401 error
            }
          }
        };
        
        export const bookeditforwardwardpagination = (data,countallrecipes) => async (dispatch) => {
          try {
            if (data.currentpage > 1 && (data.currentpage + 1) * 12 < countallrecipes) {
              console.log('YES paginationGroupPage server');
        
            let response;
            let token = localStorage.getItem('token');
            if (token) {
              response = await api.bookeditforwardwardpagination(data,token)
            } 
                else {
        
                  response = await apicookie.bookeditforwardwardpaginationcookie(data)
                }
          const { recipes,totalcount} = response.data;
        dispatch(bookEditRecipes({recipes,totalcount}));
        
        }
              console.log('NO paginationGroupPage server');
          } catch (error) {
            console.log('Error adding project:', error.message);
            if (error.response && error.response.status === 401) {
              dispatch(logout());  // Automatically log out on 401 error
            }
          }
        };
      