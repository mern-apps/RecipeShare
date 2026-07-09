import React, { useState, useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Grid,Box } from '@mui/material';

import { useMediaQuery } from '@mui/material'; // Importing useMediaQuery


import TaskForm from './pages/TaskForm/TaskForm';
import GroupForm from './pages/GroupForm/GroupForm';
import BookForm from './pages/BookForm/BookForm';

import GroupsList from './pages/Groups/GroupsList';
import BooksList from './pages/Books/BooksList';

import Newrecipe2 from './pages/BookPageEdit/ProjectList/Recipe2/Newrecipe2';

import AllRecipes from './pages/AllRecipes/AllRecipes';
import Header from './Components/Header';
import Homepage from './pages/HomePage/Homepage';
import BookPage from './pages/BookPage/BookPage';

import Admin from './pages/Admin/Admin';
//import AdminMobile from './pages/Admin/AdminMobile';

import NavBarMobile from './ComponentsMobile/NavBarMobile';
import GroupFormMobile from './pagesMobile/GroupForm/GroupFormMobile';
import BooksListMobile from './pagesMobile/Books/BooksListMobile';
import GroupsListMobile from './pagesMobile/Groups/GroupsListMobile';

import TaskFormMobile from './pagesMobile/TaskForm/TaskFormMobile';
import BookFormMobile from './pagesMobile/BookForm/BookFormMobile';
import Newrecipe2Mobile from './pagesMobile/BookPageEdit/ProjectList/Recipe2/Newrecipe2Mobile';
import AllRecipesMobile from './pagesMobile/AllRecipes/AllRecipesMobile';
import HomepageMobile from './pagesMobile/HomePage/HomepageMobile';
import BookPageMobile from './pagesMobile/BookPage/BookPageMobile';

import { signinbyid } from './actions/userActions';
import { getadminblockdata } from './actions/adminaction';

import Contact from './pages/Accessibility/Contact';
import Policy from './pages/Accessibility/Policy';
import ContactMobile from './pages/Accessibility/ContactMobile';
import PolicyMobile from './pages/Accessibility/PolicyMobile';
//<Route path="/recipes" element={<Recipes/>} />
import { CssBaseline } from "@mui/material";

function App() {

  const isMobile = useMediaQuery('(max-width:600px)');

  const { user } = useSelector((state) => state.auth);
    
  const dispatch = useDispatch();

    //useEffect(() => {
    //  if (user && user._id && token) {
     //   dispatch(signinbyid(user._id, token));
     // }
   // }, [dispatch, token])

      useEffect(() => {
    dispatch(signinbyid()); 
    dispatch(getadminblockdata()); 
}, [dispatch]);

  return (
    <Router>
        <CssBaseline />

     {!isMobile && (
         <Box>
    <Header />
        </Box>
)}

  <Box
        sx={{
    backgroundColor: '#f9fafb',
    minHeight: '100vh',
    pb: isMobile ? '80px' : 0,
  }}
      >

                  <Routes>

          <Route
            exact
            path="/"
 element={
    user?._id
      ? (isMobile ? <AllRecipesMobile /> : <AllRecipes />)
      : (isMobile ? <HomepageMobile /> : <Homepage />)
  }          />
        
          <Route
            path="/myrecipes"
            element={isMobile ? <AllRecipesMobile /> : <AllRecipes />}
          />

 <Route
            path="/meal-planner"
            element={isMobile ? <HomepageMobile /> : <Homepage />}
          />

          <Route
            path="/recipe/:id"
            element={isMobile ? <TaskFormMobile /> : <TaskForm />}
          />

            <Route
            path="/new-recipe"
            element={isMobile ? <TaskFormMobile /> : <TaskForm />}
          />
 <Route
            path="/newpage2"
            element={isMobile ? <Newrecipe2Mobile /> : <Newrecipe2 />}
          />

            <Route
            path="/groups"
            element={isMobile ? <GroupsListMobile /> : <GroupsList />}
          />
         <Route
            path="/group/:id"
            element={isMobile ? <GroupFormMobile /> : <GroupForm />}
          />

            <Route
            path="/new-group"
            element={isMobile ? <GroupFormMobile/> : <GroupForm />}
          />

<Route
            path="/books"
            element={isMobile ? <BooksListMobile /> : <BooksList />}
          />
         <Route
            path="/book/:id"
            element={isMobile ? <BookFormMobile /> : <BookForm />}
          />

            <Route
            path="/new-book"
            element={isMobile ? <BookFormMobile /> : <BookForm />}
          />


<Route
  path="/contact-for-improvement"
  element={isMobile ? <ContactMobile /> : <Contact />}
/>

<Route
  path="/policy-accessibility"
  element={isMobile ? <PolicyMobile /> : <Policy />}
/>

         <Route
            path="/admin"
            element={isMobile ? <Admin /> : <Admin />}
          />
         
      
        </Routes>
  </Box>
        {isMobile && (
<Box
  sx={{

  }}
>
  <NavBarMobile />
</Box>
  )}
    </Router>
  );
}

export default App;