import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allgroups: [],
  countallgroups: 0,
  allgroupsnewrecipeform: [],
};

const groupsSlice = createSlice({
  name: 'groups',
  initialState, 
  reducers: {
    addGroup: (state, action) => {
  const group = action.payload;
  const exists = state.allgroups.some(
    (g) => g?._id?.toString() === group?._id?.toString()
  );
  if (!exists) {
    state.allgroups.push(group);
  }
},

deleteGroup: (state, action) => {
  const id = action.payload;
  state.allgroups = state.allgroups.filter(
    (group) => group?._id?.toString() !== id?.toString()
  );
},

removeUserGroupAllList: (state, action) => {
    const id = action.payload;
  state.allgroups = state.allgroups.filter(
    (group) => group?._id?.toString() !== id?.toString()
  );
},


    getAllGroups: (state, action) => {
      state.allgroups = action.payload;
    },
    countAllGroups: (state, action) => {
      state.countallgroups = action.payload;
    },
    getAllGroupsNewRecipeForm: (state, action) => {
      state.allgroupsnewrecipeform = action.payload;
    },

    // Add more reducers for task actions (update, delete, etc.)
  },
});

export const { addGroup, deleteGroup,removeUserGroupAllList,getAllGroupsNewRecipeForm} = groupsSlice.actions;
export const { getAllGroups,countAllGroups} = groupsSlice.actions;



export default groupsSlice.reducer;

