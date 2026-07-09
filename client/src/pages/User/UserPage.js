    import React, { useState, useEffect } from 'react'; 
    import { useSelector, useDispatch } from 'react-redux';
    import { useParams } from 'react-router-dom'; // Import useParams
    import { useNavigate } from 'react-router-dom';
    import { Box, Typography } from '@mui/material';
    
    import { getuserpagebyid } from '../../actions/userpageactions';

    import  UserPage0  from './UserPage0';
    import  UserPage1  from './UserPage1';
    import UserPage3  from './UserPage3';

    import { motion } from "framer-motion"; // For smooth animation

    import BlockPageUser from '../../Components/Block/BlockPageUser';

    const UserPage = ({ }) => {

      const blockPageredux = useSelector((state) => state.general.user);



      const { user } = useSelector((state) => state.auth);

      const { id } = useParams();

      const userpagebyId = useSelector((state) => state.auth.userpagebyId);


      const [usertype, setUsertype] = useState(5);

      const [message, setMessage] = useState('pending current user'); // Message state to show
      const [currentUser, setCurrentUser] = useState(null); // presented user (by id)
      
      const [forceRender, setForceRender] = useState(0);

      const dispatch = useDispatch();
      const navigate = useNavigate();


      useEffect(() => {
        if (userpagebyId) {
          setCurrentUser(userpagebyId);
      }
    }, [userpagebyId]);

    
      //userbyid
      useEffect(() => {
        dispatch(getuserpagebyid(id));
      }, [ dispatch,id]);

      useEffect(() => {
        if (userpagebyId) {
          setCurrentUser(userpagebyId);
      }
    }, [userpagebyId]);


  


      useEffect(() => { 

        if (currentUser?._id) { 
                        if (user && user._id === id) { //connected + user=current user
                          setUsertype(0);  
                          setCurrentUser(user);
                          setMessage('');
                        } else if (user && user._id) { 
                          setUsertype(1);
                          setMessage('');
                        } 
                        else if (!user || !user._id) { // NOT connected
                          setUsertype(3);
                          setMessage(`אינך מחובר/ת - מומלץ להתחבר`);
                        } 
        } else {
         setMessage(`ממתין לקבלת נתונים לגבי המשתמש`);
          }
      }, [user, currentUser]);

  
      return (
            <>
            { blockPageredux ? (
              <BlockPageUser />
            ): (

<Box
  position="relative"
  display="flex"
  flexDirection="column"
  alignItems="center"
  justifyContent="center"
  gap={0}
>    {message && (
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        style={{ marginTop: 20 }} // Move message lower
        >
        <Box
          sx={{
            background: "rgba(0, 0, 0, 0.7)",
            color: "white",
            px: 2,
            py: 1,
            borderRadius: "8px",
            boxShadow: 3,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" textAlign="center">
            {message}
          </Typography>
        </Box>
      </motion.div>
    )}

  {usertype === 0 && (
      <UserPage0 currentUser={currentUser} />
    )}


          {usertype === 1 && (
            <UserPage1
              setMessage={setMessage}
              currentUser={currentUser}
            />
          )}
     
          {usertype === 3 && (
            <UserPage3
            setMessage={setMessage}
              currentUser={currentUser}
            />
          )}
        </Box>
        )}
    </>
      );
    };
    
    export default UserPage;