import React, { useState, useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';

import { Box } from '@mui/material';

import { approveuserbyid,rejectuserbyid } from '../../actions/userpageactions';
import UserFormMobile from '../UserSignForm/UserFormMobile';
import UserCardMobile from '../../Components/UserCardMobile';


  const UserPage3Mobile = ({ setMessage, currentUser }) => {

  
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
    <Box sx={{ p: 2, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 3 }}>
    {/* User Form */}
    <UserFormMobile />
      {/* User Card */}
      <Box sx={{ marginTop: 5, display: 'flex', flexDirection: 'column' }}>
        <UserCardMobile 
          currentUser={currentUser} 
          handleApprove={handleApprove} 
          handleDecline={handleDecline} 
          savedAction={timeLimitCheck}
        />
      </Box>



    </Box>
  );
};

export default UserPage3Mobile;
