import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Typography } from '@mui/material';
import { getallmatches,getallmessages, initialmassages } from '../../actions/matchespage';
import { backwardpaginationGroupsListPage, forwardwardpaginationGroupsListPage } from '../../actions/matchespage';

import HeaderMatchesMobile from './HeaderMatchesMobile';
import HeaderMessagesMobile from './HeaderMessagesMobile';

import BlockPageMatchMobile from '../../Components/Block/BlockPageMatchMobile';

const MatchesMobile = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  
     const blockPageredux = useSelector((state) => state.general.match);

  const { user } = useSelector((state) => state.auth);
    const isLogOut = useSelector((state) => state.auth.islogout);

  const [showMatches, setShowMatches] = useState(true); // Default is showing HeaderMatchesMobile


  const Matchedlist = useSelector((state) => state.auth.matchedlist);
  const countallMatchedlist = useSelector(state => state.auth.countmatchedlist);
  const LastTimeserver = useSelector((state) => state.auth.lastTimeserver);
  const UserMatchespagination = useSelector(state => state.auth.userMatchespagination);


  const [selectedMatch, setSelectedMatch] = useState(null);

    const [items, setItems] = useState(Matchedlist);
  const [countitems, setCountitems] = useState(countallMatchedlist);

  const [currentpage, setCurrentpage] = useState(1);
  const [tempPagination, setTempPagination] = useState(1);

  //messsages

  const [servermesssages, setServermesssages] = useState(false);

  const Messageslist = useSelector((state) => state.auth.messageslist);
  const countMessagesList = useSelector(state => state.auth.countmessageslist);

  const [items111, setItems111] = useState(Messageslist);
  const [countitems111, setCountitems111] = useState(countMessagesList);

  const [currentpage111, setCurrentpage111] = useState(1);
  const [tempPagination111, setTempPagination111] = useState(1);



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
  console.log('Updated items:', Matchedlist);

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
    const newSelectedMatch = items[0]; // Get the first item from the items array
    setSelectedMatch(newSelectedMatch); // Update selectedMatch with the first item
  } else {
    const matchExists = items.some(item => item.matchId === selectedMatch.matchId); // Match check
                if (matchExists) {
                } else {
                  const newSelectedMatch1 = items[0]; // Get the first item from the items array
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
  setShowMatches(false);

};

//messages
const handleBackClick111 = () => {
const skipValue = ((currentpage-3) * 12);
setTempPagination111(prevTemp => prevTemp - 1);
  dispatch(backwardpaginationGroupsListPage(currentpage,countallMatchedlist,skipValue));
  setCurrentpage111(prevPage => prevPage - 1);
};

const handleForwardClick111 = () => {
const skipValue = ((currentpage-1) * 12);
setTempPagination111(prevTemp => prevTemp + 1);
dispatch(forwardwardpaginationGroupsListPage(currentpage,countallMatchedlist,skipValue));
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
        {blockPageredux ? (
                   <BlockPageMatchMobile />
                 )
                  : (
    <Box   sx={{
    padding: 1,
    minHeight: '50vh', // Minimum height to fit the full viewport height
    direction: 'rtl', // For right-to-left layout
    display: 'flex', // Optional: Enables flexbox for better layout control
    flexDirection: 'column', // Stack children vertically
  }}>


    <Grid container spacing={3} sx={{ height: '100%' }}>
        <Grid item xs={12}>
          {/* Show either HeaderMatchesMobile or HeaderMessagesMobile based on showMatches state */}
          {showMatches ? (

          <HeaderMatchesMobile
            items={items}
            currentpage={currentpage}
            countallgroups={countitems}
            handleForwardClick={handleForwardClick}
            handleBackClick={handleBackClick}
            handleMatchSelect={handleMatchSelect}
            selectedMatch={selectedMatch}
        />
          ) : (
            <HeaderMessagesMobile
            servermesssages={servermesssages}
            selectedMatch={selectedMatch}
            items={items111}
            currentpage={currentpage111}
            countallgroups={countitems111}
            handleForwardClick={handleForwardClick111}
            handleBackClick={handleBackClick111}
            setShowMatches={setShowMatches}
          />
        )}
          </Grid>
          </Grid>
        </Box>
        )}
    </>
      );
    };
export default MatchesMobile;