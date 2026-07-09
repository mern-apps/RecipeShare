import React, { useState, useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'; // Import useParams
import { useNavigate } from 'react-router-dom';

import { Box, Typography } from '@mui/material';

import { getuserpagebyid } from '../../actions/userpageactions';

import  UserPage0Mobile  from './UserPage0Mobile';
import  UserPage1Mobile from './UserPage1Mobile';
import UserPage3Mobile from './UserPage3Mobile';

import { motion } from "framer-motion"; // For smooth animation

import BlockPageUser from '../../Components/Block/BlockPageUser';


const UserPageMobile = ({ }) => {
  
          const blockPageredux = useSelector((state) => state.general.user);

     const { user } = useSelector((state) => state.auth);
  
        const { id } = useParams();
  
        const userpagebyId = useSelector((state) => state.auth.userpagebyId);
  

  
        const [usertype, setUsertype] = useState(5);
  
        const [message, setMessage] = useState('pending current user'); // Message state to show
        const [currentUser, setCurrentUser] = useState(null); // presented user (by id)
        
        const dispatch = useDispatch();
        const navigate = useNavigate();

        //userbyid
        useEffect(() => {
          dispatch(getuserpagebyid(id));
        }, [user, dispatch, id]);
  
        useEffect(() => {
          if (userpagebyId) {
            setCurrentUser(userpagebyId);
        }
  
      }, [userpagebyId]);
  
  
        useEffect(() => { 
          if (currentUser?.images) { 
                  if (currentUser.hasdata === 0) {
                    setMessage(`${currentUser} נדרש להשלים מידע על מנת להציג`);
                  } else {
                          if (user && user._id === id) { //connected + user=current user
                            setUsertype(0);
                            setMessage('');
  
                          } else if (user && user._id) { 
                            setUsertype(1);
                            setMessage('');
  
                          } 
                          else if (!user || !user._id) { // NOT connected
                            setUsertype(3);
                            console.log('333333333:'); 
                            setMessage(`אינך מחובר/ת - מומלץ להתחבר`);
                          } 
                        }
          } else {
           setMessage(`ממתין לקבלת נתונים לגבי המשתמש`);
            }
        }, [user, currentUser]);


  return (
      <>
                {blockPageredux ? (
                               <BlockPageUser />
                             ):  (
<Box
  position="relative"
  display="flex"
  flexDirection="column"
  alignItems="center"
  justifyContent="center"
  height="100vh"
  width="100%"
  gap={4}
>
  {message && (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ marginBottom: 8 }} // Reduce space between message and UserFormMobile
    >
      <Box
        sx={{
          background: "rgba(0, 0, 0, 0.7)",
          color: "white",
          px: 2,
          py: 1,
          borderRadius: "8px",
          boxShadow: 3,
          zIndex: 10,
          textAlign: "center",
        }}
      >
        <Typography variant="h6">{message}</Typography>
      </Box>
    </motion.div>
  )}



{usertype === 0 && (
        <UserPage0Mobile
          user={user}
          setMessage={setMessage}
          currentUser={currentUser}
        />
      )}


      {usertype === 1 && (
        <UserPage1Mobile
          setMessage={setMessage}
          currentUser={currentUser}
        />
      )}
    
     {usertype === 3 && (
            <UserPage3Mobile
            setMessage={setMessage}
              currentUser={currentUser}
            />
          )}
    </Box>
    )}
    </>
  );
};

export default UserPageMobile;