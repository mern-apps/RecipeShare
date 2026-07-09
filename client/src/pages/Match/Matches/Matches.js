import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Typography } from '@mui/material';
import { getallmatches,getallmessages, initialmassages } from '../../actions/matchespage';
import { backwardpaginationGroupsListPage, forwardwardpaginationGroupsListPage } from '../../actions/matchespage';

import HeaderMatches from './HeaderMatches';
import HeaderMessages from './HeaderMessages';

import BlockPageMatch from '../../Components/Block/BlockPageMatch';

const Matches = () => {

  
  const dispatch = useDispatch();
  const navigate = useNavigate();

   const blockPageredux = useSelector((state) => state.general.match);


  const { user } = useSelector((state) => state.auth);
    const isLogOut = useSelector((state) => state.auth.islogout);

  const Matchedlist = useSelector((state) => state.auth.matchedlist);
  const countallMatchedlist = useSelector(state => state.auth.countmatchedlist);
  const LastTimeserver = useSelector((state) => state.auth.lastTimeserver);
  const UserMatchespagination = useSelector(state => state.auth.userMatchespagination);


  const [selectedMatch, setSelectedMatch] = useState(null);

    const [items, setItems] = useState(Matchedlist);
  const [countitems, setCountitems] = useState( );

  const [currentpage, setCurrentpage] = useState(1);
  const [tempPagination, setTempPagination] = useState(1);


  useEffect(() => {
  console.log("selectedMatchselectedMatchselectedMatchselectedMatch:", selectedMatch);
}, [selectedMatch]);

  //messsages

  const [servermesssages, setServermesssages] = useState(false);

  const Messageslist = useSelector((state) => state.auth.messageslist);
  const countMessagesList = useSelector(state => state.auth.countmessageslist);

  const [items111, setItems111] = useState(Messageslist);
  const [countitems111, setCountitems111] = useState(countMessagesList);

  const [currentpage111, setCurrentpage111] = useState(1);
  const [tempPagination111, setTempPagination111] = useState(1);




   const accessibilitySettings = useSelector((state) => state.auth.accessibility);
            const [accessibilityData, setAccessibilityData] = useState(accessibilitySettings);
  
            useEffect(() => {
                if (user && user.accessibility) {
                  setAccessibilityData(user.accessibility);
                } else {
                  setAccessibilityData(accessibilitySettings);
                }
              }, [user, accessibilitySettings]);
            
              const adjustedFontSize = (size) => `${(size * accessibilityData.fontSizeAdjustments) / 100}rem`;
            
              const getAccessibleStyles = (defaultBg) => {
                const { darkContrast, lightContrast, contrastMode } = accessibilityData;
            
                if (darkContrast) {
                  return {
                    backgroundColor: "#000",
                    color: "#FFF",
                  };
                }
            
                if (lightContrast) {
                  return {
                    backgroundColor: "#FFF",
                    color: "#000",
                  };
                }
            
                if (contrastMode) {
                  return {
                    backgroundColor: "#000",
                    color: "#FFF",
                    fontWeight: "bold",
                    textDecoration: "underline",
                  };
                }
            
                return {
                  backgroundColor: defaultBg,
                  color: "#000",
                };
              };
            
            
            
              useEffect(() => {
                const handleKeyDown = (event) => {
                  if (!event.altKey) return;
            
                  const key = event.key.toUpperCase();
                  switch (key) {
                    case "C":
          break;
                    default:
                      break;
                  }
                };
            
                window.addEventListener("keydown", handleKeyDown);
                return () => window.removeEventListener("keydown", handleKeyDown);
              }, []);
      
    const step  = useSelector((state) => state.auth.signupstep);
  
  

  useEffect(() => {
    if (isLogOut === 1 || !user?._id) {
      navigate('/');
    } else {
      const skipValue = 0;
      dispatch(getallmatches(skipValue));
      setCurrentpage(1);
      setTempPagination(1);
    }
  }, [isLogOut, dispatch, navigate]);


useEffect(() => {
  setCountitems(countallMatchedlist);
  }, [countallMatchedlist]); 


useEffect(() => {
  if (currentpage > 1) {
    setTempPagination(2);
  } else {
    setItems(Matchedlist.slice(0, 12));
    setTempPagination(1);
  }
  console.log('11111111111111111Updated items:', Matchedlist);
}, [Matchedlist]);


useEffect(() => {
  if (tempPagination === 1) {
      const slicedItems = Matchedlist.slice(0, 12);
      setItems(slicedItems);
  } else if (tempPagination === 2) {
      const slicedItems = Matchedlist.slice(12, 24);
      setItems(slicedItems);
  } else {
      const slicedItems = Matchedlist.slice(24, 36);
      setItems(slicedItems);
  }
}, [tempPagination]);


useEffect(() => {
  if (!selectedMatch) {
    const newSelectedMatch = items[0]; 
    setSelectedMatch(newSelectedMatch); 
  } else {
    const matchExists = items.some(item => item.matchId === selectedMatch.matchId); 
                if (matchExists) {
                } else {
                  const newSelectedMatch1 = items[0]; 
                  setSelectedMatch(newSelectedMatch1); 
                }
  }
}, [items]);



useEffect(() => {
  if (selectedMatch) { 

    // Check if selectedMatch._id exists in items
            const matchExists = items.some(item => item.matchId === selectedMatch.matchId);
            // If match doesn't exist, set selectedMatch to the first item in items
                if (!matchExists && items.length > 0) {
                  const newSelectedMatch = items[0];
                  setSelectedMatch(newSelectedMatch);
                  dispatch(getallmessages(newSelectedMatch, false)); // Pass false for servermesssages
                } else {
                  dispatch(getallmessages(selectedMatch, false)); // Pass false for servermesssages
                }
            setCurrentpage111(1);
            setTempPagination111(1);
            setServermesssages(false);
  } else {
          if (items.length > 0) {
            const newSelectedMatch = items[0];
            // Update selectedMatch
            setSelectedMatch(newSelectedMatch);
            // Perform additional actions using newSelectedMatch
            dispatch(getallmessages(newSelectedMatch, false)); // Pass false for servermesssages
            setCurrentpage111(1);
            setTempPagination111(1);
            setServermesssages(false);
          }
    }
}, [selectedMatch]);



const handleBackClick = () => {
  if (selectedMatch.messagespagination !== 1) {
    dispatch(initialmassages(selectedMatch.matchId));
}
const skipValue = ((currentpage-3) * 12);
setTempPagination(prevTemp => prevTemp - 1);
  dispatch(backwardpaginationGroupsListPage(currentpage,countallMatchedlist,skipValue));
  setCurrentpage(prevPage => prevPage - 1);
};

const handleForwardClick = () => {
  if (selectedMatch.messagespagination !== 1) {
    dispatch(initialmassages(selectedMatch.matchId));
}
const skipValue = ((currentpage-1) * 12);
setTempPagination(prevTemp => prevTemp + 1);
dispatch(forwardwardpaginationGroupsListPage(currentpage,countallMatchedlist,skipValue));
setCurrentpage(prevPage => prevPage + 1);
};


const handleMatchSelect = (match) => {
  setSelectedMatch(match);
};

const addMessageToSelectedMatch = (trimmedMessage) => {
  if (!selectedMatch) return;

  const otherUserId = selectedMatch.otherUser?._id;
  const tempId = `temp-${Date.now()}`;

  const newMessage = {
    _id: tempId,
    receive: otherUserId,
    text: trimmedMessage,
    createdAt: new Date().toISOString(),
  };
  setSelectedMatch((prev) => ({
    ...prev,
    messages: [...(prev?.messages || []), newMessage].slice(-12),
    status: "NoStatus",
  }));
};

//messages
const handleBackClick111 = () => {
const skipValue = ((currentpage111-3) * 12);
setTempPagination111(prevTemp => prevTemp - 1);
  dispatch(backwardpaginationGroupsListPage(currentpage111,countMessagesList,skipValue));
  setCurrentpage111(prevPage => prevPage - 1);
};

const handleForwardClick111 = () => {
const skipValue = ((currentpage111-1) * 12);
setTempPagination111(prevTemp => prevTemp + 1);
dispatch(forwardwardpaginationGroupsListPage(currentpage111,countMessagesList,skipValue));
setCurrentpage111(prevPage => prevPage + 1);
};



useEffect(() => {
  setItems111(Messageslist);
  }, [Messageslist]); 


  useEffect(() => {
    setCountitems111(countMessagesList);
    }, [countMessagesList]); 


  return (
      <>
        {
      blockPageredux && user.useradmin !== 10 ? (
          <BlockPageMatch />
        )
         : (
<Box sx={{...getAccessibleStyles('#f5f5f5'), padding: 1 , direction: 'rtl' }}>

    <Typography
      variant="h2"
      sx={{
        fontWeight: accessibilityData.contrastMode ? 'bold' : 'normal',
        textDecoration: accessibilityData.contrastMode ? 'underline' : 'none',
        color: getAccessibleStyles('#3f51b5').color,
        fontSize: adjustedFontSize(4),
        textAlign: 'center',
        background: 'linear-gradient(to right, #3f51b5, #6a1b9a)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textShadow: '4px 4px 10px rgba(0, 0, 0, 0.3)',
        letterSpacing: '0.05em',
      }}
    >
התאמות    </Typography>

      <Grid container spacing={3} sx={{ height: '100%' }}>



      <Grid
  item
  md={3}
  sx={{

  }}
>
          <HeaderMatches
            items={items}
            currentpage={currentpage}
            countallgroups={countitems}
            handleForwardClick={handleForwardClick}
            handleBackClick={handleBackClick}
            handleMatchSelect={handleMatchSelect}
            selectedMatch={selectedMatch}
          />
        </Grid>

        <Grid
  item
  md={7}
  sx={{

  }}
>
           <HeaderMessages
            servermesssages={servermesssages}
            selectedMatch={selectedMatch}
            items={items111}
            currentpage={currentpage111}
            countallgroups={countitems111}
            handleForwardClick={handleForwardClick111}
            handleBackClick={handleBackClick111}
            addMessageToSelectedMatch={addMessageToSelectedMatch}

          />
        </Grid>



         
      </Grid>
    </Box>
     )}
    </>
  );
};

export default Matches;