import React, { useState, useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';

import { Box} from '@mui/material';
import UserCard from '../../Components/UserCard/UserCard';


import easypic from '../../pictures/easypic.png'; 

const UserPage1 = ({ setMessage, currentUser }) => {


 const placeholderImage = easypic;
  const [newImages, setNewImages] = useState(Array(5).fill(placeholderImage)); // Initialize with easypic.png
  const [mainimage, setMainimage] = useState(placeholderImage); // Initialize with easypic.pn
    const [actionObject, setActionObject] = useState(null); // State for the object containing IDs
  

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser?.images) { // Ensures images is defined (not null or undefined)

  setMessage('');
  setActionObject({candidate: currentUser._id });
  //console.log("newImages:", newImages1);
  //console.log("currentUser.images:", currentUser.images);
}
//console.log("currentUser:", currentUser);
  }, [currentUser]);

  


  return (

    
    <Box
      sx={{
        marginTop: 5,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
    
    <Box sx={{ marginTop: 5, display: 'flex', flexDirection: 'column' }}>
        <UserCard 
          currentUser={currentUser} 
          size={450} 
        />
      </Box>

    </Box>


  );
};

export default UserPage1;