import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allprojects: [],
  allprojectscount:0,
 allprojectsfromgroups: [],
  allprojectsfromgroupscount:0,
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {

    
   
      addBook: (state, action) => {
      state.allprojects.push(action.payload);
    },
    getAllProjects: (state, action) => {
      state.allprojects = action.payload;
    },

    editBookAllBooks: (state, action) => {
      const { updatedBook } = action.payload;
      if (!updatedBook) return;
 state.allprojects = state.projects.map((project) =>
    project._id === updatedBook._id ? updatedBook : project
  ); 
},

    countAllProjects: (state, action) => {
      state.allprojectscount = action.payload;
    },
    getAllProjectsFromgroups: (state, action) => {
      state.allprojectsfromgroups = action.payload;
    },
    countAllProjectsFromgroups: (state, action) => {
      state.allprojectsfromgroupscount = action.payload;
    },

    deleteBook: (state, action) => {
      state.allprojects = state.allprojects.filter(project => project._id !== action.payload);
    },

    deleteAllProjects: (state, action) => {
      state.allprojects = action.payload;
    },  },
});

export const { addBook, deleteBook} = projectsSlice.actions;
export const {getAllProjects,countAllProjects,getAllProjectsFromgroups,countAllProjectsFromgroups} = projectsSlice.actions;

export const { deleteAllProjects} = projectsSlice.actions;
export const { editBookAllBooks} = projectsSlice.actions;


export default projectsSlice.reducer;

