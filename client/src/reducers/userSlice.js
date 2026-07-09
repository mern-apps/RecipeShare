import { createSlice } from '@reduxjs/toolkit';
import { signup,signin } from '../actions/userActions';

//let { user } = decodeToken() || {};
//user = user || null;
//token: getTokenFromCookie(),



  const defaultAccessibility = {
    darkContrast: false,
    lightContrast: false,
    contrastMode: false,
    fontSizeAdjustments: 100,
    lowSaturation: false,
    highSaturation: false,
    characterKeyShortcuts: false,
  };

const storedAccessibility = JSON.parse(localStorage.getItem('accessibility')) || defaultAccessibility;

const initialState = {
  user: {},
  accessibility: storedAccessibility,
  islogout: 0,

  codes: null,
  trips: null,

  cities: [],

  signupstep: 0, 


  listforuser: [],
  listforuserpending:true,

  //MATCH
  matchedlist: [], 
  matchedlistids: [], 
  countmatchedlist: 0, 
  newmatches: 0, 
  userMatchespagination: 1, 


  messageslist: [], 
  countmessageslist: 0, 
  newmessages: 0, 

  maxTimeMatch: null,
  lastTimeserver: null,
  maxTimeMessage: null,
  
  countLastMessagesReceived: 0, 
  countNoMessages: 0, 

  qnrtemplate: [],

//userpage
userpagebyId: null,

  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Reducer to handle logout
    logOut: (state) => {
      state.islogout = 1;
            state.user = {};
      state.signupstep = 0;  // Reset signup step to initial value
      state.cities = [];  // Reset cities
      state.codes = [];  
      state.listforuser = [];  // Reset list for user
      state.matchedlist = [];  // Reset matched list
      state.matchedlistids = [];  // Reset matched list ids
      state.countmatchedlist = 0;  // Reset matched count
      state.newmatches = 0;  // Reset new matches count
      state.userMatchespagination = 1;  // Reset match pagination
      state.messageslist = [];  // Reset messages list
      state.countmessageslist = 0;  // Reset messages count
      state.newmessages = 0;  // Reset new messages count
      state.maxTimeMatch = null;  // Reset max time match
      state.lastTimeserver = null;  // Reset last server time
      state.maxTimeMessage = null;  // Reset max time message
      state.countLastMessagesReceived = 0;  // Reset last messages received count
      state.countNoMessages = 0;  // Reset no messages count
      state.qnrtemplate = [];  // Reset qnr template
      state.userpagebyId = null;  // Reset user page data
      state.loading = false;  // Reset loading state
      state.error = null;
      //removeTokenCookie(); 
       },

  
       
       signIn: (state,action) => {
        state.user = action.payload;
        state.islogout = 0;
       },

       signUp: (state,action) => {
        state.user = action.payload;
        state.islogout = 0;
       },

       userCredits: (state, action) => {
      if (state.user) {
        state.user.creditImage = action.payload;
      }
    },

   CopiedRecipe1: (state, action) => {
              console.log("👉 ROUTE: 0");
  const { newrecipe, item } = action.payload;
  if (!newrecipe?._id || !item?._id) return;
  if (!state.user) return;
  const previousId = item._id.toString();
  // 🔹 Case 1: item.type === 1 (regular)
const isType1 = (item?.type || []).every(t => Math.floor(t) < 3 || Math.floor(t) > 9);
    if (isType1) {
          console.log("👉 ROUTE: TYPE 1 (favorite)");
    const index = state.user.favorite.findIndex(
      (fav) => fav.toString() === previousId
    );

    if (index !== -1) {
            console.log("✅ Found in favorite → replacing");
      state.user.favorite.splice(index, 1);
      state.user.favorite.push(newrecipe._id);
    }
  } else {
    // 🔹 Case 2: admin recipe
    // Check if exists in favoriteAdmin
        console.log("👉 ROUTE: ADMIN (favoriteAdmin)");

    const indexAdmin = state.user.favoriteAdmin?.findIndex(
      (fav) => fav.toString() === previousId
    );
    if (indexAdmin !== -1 && indexAdmin !== undefined) {
            console.log("✅ Found in favoriteAdmin → moving to favorite");
      state.user.favoriteAdmin.splice(indexAdmin, 1);
      state.user.favorite.push(newrecipe._id);
            console.log("🔄 favoriteAdmin updated:", state.user.favoriteAdmin);
      console.log("🔄 favorite updated:", state.user.favorite);
    }
  }
},
AddUserFavorite: (state, action) => {
  const recipe = action.payload;
  if (!state.user) return;

  // Determine which array to update
const isType1 = (recipe?.type || []).every(t => Math.floor(t) < 3 || Math.floor(t) > 9);
  const favField = isType1 ? "favorite" : "favoriteAdmin";

  // Initialize array if missing
  if (!state.user[favField]) {
    state.user[favField] = [];
  }

  // Check if already exists
  const exists = state.user[favField].some(
    (fav) => fav.toString() === recipe._id.toString()
  );

  // Add if not exists
  if (!exists) {
    state.user[favField].push(recipe._id);
  }
},

RemoveUserFavorite: (state, action) => {
  const recipe = action.payload;
  if (!state.user) return;
  const types = recipe?.type || [];
  // 🔹 Type 1 (1.x)
const isType1 = (recipe?.type || []).every(t => Math.floor(t) < 3 || Math.floor(t) > 9);

  if (isType1) {
    // Normal recipe
    state.user.favorite = state.user.favorite.filter(
      (fav) => fav.toString() !== recipe._id.toString()
    );
  } else {
    // Admin recipe
    state.user.favoriteAdmin = state.user.favoriteAdmin.filter(
      (fav) => fav.toString() !== recipe._id.toString()
    );
  }
},

  addGrouptoUser: (state, action) => {
  const groupId = action.payload;
  if (Array.isArray(state.user?.codes)) {
    state.user.codes = state.user.codes.filter(
      (id) => id?.toString() !== groupId?.toString()
    );
  }
},

removeGroupfromUser: (state, action) => {
  const groupId = action.payload;

  if (Array.isArray(state.user?.codes)) {
    state.user.codes = state.user.codes.filter(
      (id) => id?.toString() !== groupId?.toString()
    );
  }
},

       addTrip: (state, action) => {
        if (state.user && Array.isArray(action.payload)) {
          state.user.trips = action.payload; 
        }
      },

      TripServerCount: (state, action) => {
        state.user.servercount = action.payload;
      },
      
  
      removeTrip: (state, action) => {
        if (state.user && Array.isArray(action.payload)) {
          state.user.trips = action.payload; // full trip array sent from backend
        }
      },

       updateAccessibility: (state, action) => {
        if (state.user && state.user.accessibility) {
          state.user.accessibility = action.payload;
        }
        state.accessibility = action.payload;
        localStorage.setItem('accessibility', JSON.stringify(action.payload));
      },

      updateAccessibilitynouser: (state, action) => {
        state.accessibility = action.payload;
        localStorage.setItem('accessibility', JSON.stringify(action.payload));
      },
      

       EditgetAllCodes: (state,action) => {
        state.codes = action.payload;
       },

       cookieEdit: (state,action) => {
        state.user.cookie = action.payload;
       },

      signInbyId: (state,action) => {
        state.user = action.payload;
        state.islogout = 0;
       },

      

      signUpStep: (state,action) => {
        state.signupstep = action.payload;
       },

      saveProfileData: (state,action) => {
        state.user = action.payload;
       },
       getAllCities: (state,action) => {
        state.cities = action.payload;
       },

       getAllCodes: (state,action) => {
        state.codes = action.payload;
       },
       getAllCodesGroups: (state,action) => {
        state.codes = action.payload;
       },
       

       getAllTrips: (state,action) => {
        state.trips = action.payload;
       },
       
       addCode: (state, action) => {
        if (!Array.isArray(state.codes)) {
          state.codes = [action.payload]; // initialize with the first item
        } else {
          state.codes = [...state.codes, action.payload]; // append to existing array
        }
      },

      editCode: (state, action) => {
        state.codes = state.codes.map(code =>
          code._id === action.payload._id ? action.payload : code
        );
      },

      deleteCode: (state, action) => {
        state.codes = state.codes.filter(code => code._id !== action.payload);
      },

      addCodeToUser: (state, action) => {
        const exists = state.user.codes.some(code => code._id === action.payload._id);
        if (!exists) {
          state.user.codes.push(action.payload);
        }
      },

      deleteCodeFromUser: (state, action) => {
        const codeID = action.payload;
        state.user.codes = state.user.codes.filter(code => code._id !== codeID);
      },




      getAllListForUser: (state, action) => {
        state.listforuser = action.payload;
        state.listforuserpending = false;
      },

      ReduceListForUser: (state, action) => {
        state.listforuser = state.listforuser.slice(1);
      },

      AddTomatched: (state, action) => {
        const candidate = action.payload;
        // Check if the candidate with the same _id already exists in the matchedlist
        const existingCandidateIndex = state.matchedlist.findIndex(
          (item) => item._id === candidate._id
        );
        // If candidate does not exist, add it to the matchedlist
        if (existingCandidateIndex === -1) {
          state.matchedlist.push(candidate);
          state.countmatchedlist += 1; 
          state.newmatches += 1; 
        }
      },



      AllMatchedList: (state, action) => {
        state.matchedlist = action.payload;
      },

AllMatchedListDecrease: (state, action) => {
  const matchID = action.payload; // payload contains the matchId to delete
  state.matchedlist = state.matchedlist.filter(
    (match) => match.matchId !== matchID
  );
},



      initialMassages: (state, action) => {
        const { matchId, messages, status } = action.payload;
      
        // Find the index of the item in matchedlist that matches the matchId
        const index = state.matchedlist.findIndex(item => item.matchId === matchId);
    
        // If the item is found, update it with the new messages and status
        if (index !== -1) {
          state.matchedlist[index] = {
            ...state.matchedlist[index],
            messages: messages,
            status: status,
          };
        } 
      },
    
      AddMassagesTemp: (state, action) => {
        const { matchId, trimmedMessage, status } = action.payload;
        // Find the index of the item in matchedlist that matches the matchId
        const index = state.matchedlist.findIndex(item => item.matchId === matchId);
        // If the item is found, update it with the new messages and status
        if (index !== -1) {
          const otherUserId = state.matchedlist[index].otherUser?._id;
           
          const tempId = `temp-${Date.now()}`;
          const newMessage = {
            _id: tempId,
            receive: otherUserId,
            text: trimmedMessage,
            createdAt: new Date().toISOString()
          };
          
          state.matchedlist[index] = {
            ...state.matchedlist[index],
            messages: [...(state.matchedlist[index].messages || []), newMessage].slice(-12), 
            status: status,
          };
          state.messageslist = [...(state.messageslist || []), newMessage].slice(-12); 
        }
      },

      AddMessage: (state, action) => {
        const { matchId, messages, status } = action.payload;
        // Find the index of the item in matchedlist that matches the matchId
        const index = state.matchedlist.findIndex(item => item.matchId === matchId);
        // If the item is found, update it with the new messages and status
        if (index !== -1) {
          state.matchedlist[index] = {
            ...state.matchedlist[index],
            messages: messages,
            status: status,
          };
        } 
        state.messageslist = messages;
      },

      AllMatchedIDs: (state, action) => {
        state.matchedlistids = action.payload;
      },
      CountAllMatchedList: (state, action) => {
        state.countmatchedlist = action.payload;
      },
    

      AllMatchedIDsDecrease: (state, action) => {
  const matchID = action.payload; // payload contains the matchId to delete
  state.matchedlistids = state.matchedlistids.filter(
    (id) => id !== matchID
  );
},

CountAllMatchedListDecrease: (state) => {
  if (state.countmatchedlist > 0) {
    state.countmatchedlist -= 1;
  }
},

      AllMessages: (state, action) => {
        state.messageslist = action.payload;
      },
      CountAllMessages: (state, action) => {
        state.countmessageslist = action.payload;
      },

      UserMatchesPagination: (state, action) => {
        state.userMatchespagination = action.payload;
      },

      MaxTimeMatch: (state, action) => {
        state.maxTimeMatch = action.payload;
      },

      LastTimeServer: (state, action) => {
        state.lastTimeserver = action.payload;
      },
      

      MaxTimeMessage: (state, action) => {
        state.maxTimeMessage = action.payload;
      },
      
      //all NEW Matched
      CountAllNewMatches: (state, action) => {
        state.newmatches = action.payload;
      },

      //all NEW messages
      CountLastMessagesReceived: (state, action) => {
        state.countLastMessagesReceived = action.payload;
      },

      CountNoMessages: (state, action) => {
        state.countNoMessages = action.payload;
      },

      setQnrTemplate: (state, action) => {
        state.qnrtemplate = action.payload;  // Set the questions (qnr) to qnrtemplate
      },

      getUserPagebyId: (state, action) => {
        state.userpagebyId = action.payload;  
      },

      imagesUrls: (state, action) => {
        state.user.images = action.payload;  
      },
      

      
//TO DELETE: THIS IS NEW MESSAGES BUT I ALREADT HAVE UNREAD MESSAGES (RECIVE + NO MESSAGES)
      NewMessages: (state, action) => {
      state.newmessages = action.payload;
    },

  },

});

export const { signIn,signUp} = authSlice.actions;
export const { logOut,signInbyId} = authSlice.actions;

export const { saveProfileData} = authSlice.actions;
export const { userCredits} = authSlice.actions;

export const { CopiedRecipe1} = authSlice.actions;


//dialog page
export const { getAllListForUser,ReduceListForUser} = authSlice.actions;
export const { AllMatchedList,AllMatchedIDs,CountAllMatchedList,UserMatchesPagination,CountAllNewMatches,AddTomatchedList} = authSlice.actions;
export const { MaxTimeMatch,LastTimeServer} = authSlice.actions;
export const { MaxTimeMessage,NewMessages,UnreadMatches,UnreadMatchesArray} = authSlice.actions;
export const { CountLastMessagesReceived,CountNoMessages} = authSlice.actions;
export const { initialMassages,AddMassagesTemp} = authSlice.actions;
export const { AllMessages,CountAllMessages} = authSlice.actions;
export const { AddMessage} = authSlice.actions;
export const { setQnrTemplate} = authSlice.actions;
export const { getUserPagebyId} = authSlice.actions;
export const { DeleteFromMongoUrl} = authSlice.actions;
export const { getAllCities} = authSlice.actions;
export const { getAllCodes,addCode,deleteCode,editCode} = authSlice.actions;
export const { getAllCodesGroups} = authSlice.actions;
export const { addCodeToUser,deleteCodeFromUser} = authSlice.actions;
export const { getAllTrips} = authSlice.actions;
export const { addTrip,removeTrip,TripServerCount} = authSlice.actions;
export const { signUpStep} = authSlice.actions;
export const { imagesUrls} = authSlice.actions;
export const { cookieEdit} = authSlice.actions;
export const { EditgetAllCities,EditgetAllCodes} = authSlice.actions;
export const { updateAccessibility,updateAccessibilitynouser} = authSlice.actions;
export const { AllMatchedListDecrease,AllMatchedIDsDecrease,CountAllMatchedListDecrease} = authSlice.actions;
export const { AddUserFavorite,RemoveUserFavorite} = authSlice.actions;
export const { addGrouptoUser,removeGroupfromUser} = authSlice.actions;


export default authSlice.reducer;


