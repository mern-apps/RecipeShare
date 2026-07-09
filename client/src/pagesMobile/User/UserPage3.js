import React, { useState, useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';

import { Box } from '@mui/material';

import { approveuserbyid,rejectuserbyid } from '../../actions/userpageactions';
import UserForm from '../UserSignForm/UserForm';
import UserCard from '../../Components/UserCard/UserCard';


  const UserPage3 = ({ setMessage, currentUser }) => {

  
  const [timeLimitCheck, setTimeLimitCheck] = useState(false);

  const dispatch = useDispatch();


  useEffect(() => {
    // Check if the action for currentUser._id exists in localStorage
    const savedAction = localStorage.getItem(`action_${currentUser._id}`);
    if (savedAction) {
      setTimeLimitCheck(true);
    }
  }, []);


  const handleApprove = () => {
      if (timeLimitCheck) {
        setMessage("Action already performed for this user.");
        return;
      } else {
        localStorage.setItem(`action_${currentUser._id}`, true); // Save action to localStorage 
        setMessage("approve successful.");
        setTimeLimitCheck(true);
        dispatch(approveuserbyid(currentUser._id)); // Reject user action
      }
  };

  const handleDecline = () => {
      if (timeLimitCheck) {
        setMessage("Action already performed for this user.");
        return;
      } else {
        localStorage.setItem(`action_${currentUser._id}`, true); // Save action to localStorage 
        setMessage("Reject successful.");
        setTimeLimitCheck(true);
        dispatch(rejectuserbyid(currentUser._id)); // Reject user action
      }
  };


  return (
        <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 1, // Adjust value as needed
    }}
  >
    <UserForm />

    <Box sx={{ marginTop: 3, display: 'flex', flexDirection: 'column' }}>
        <UserCard 
          currentUser={currentUser} 
          size={450} 
          handleApprove={handleApprove} 
          handleDecline={handleDecline} 
          timeLimitCheck={timeLimitCheck} 
        />
      </Box>

    </Box>
  );
};

export default UserPage3;