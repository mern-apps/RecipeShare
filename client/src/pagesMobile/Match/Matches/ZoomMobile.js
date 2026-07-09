import React, { useState, useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'; // Import useParams

import { Box, Typography, Button, IconButton, Card, CardMedia, CardContent, CardActions, Avatar, } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import easypic from '../../pictures/easypic.png'; 


const ZoomMobile = ({ currentUser}) => {

  const { user } = useSelector((state) => state.auth);

  const [message, setMessage] = useState('pending current user'); // Message state to show

  const placeholderImage = easypic; // Use easypic.png as the placeholder image
  const [newImages, setNewImages] = useState(Array(5).fill(placeholderImage)); // Initialize with easypic.png
  const [mainimage, setMainimage] = useState(placeholderImage); // Initialize with easypic.png


  const dispatch = useDispatch();


  useEffect(() => {
    const images = currentUser.images?.length ? currentUser.images : [placeholderImage];
                  const newImages = Array.from({ length: 5 }, (_, index) =>
                    images[index] || placeholderImage
                  );
                  setNewImages(newImages);
    setMessage('');
  }, [])



  const handleImageClick = (index) => {
    setMainimage(newImages[index]); 
   };


  const calculateAge = (birthday) => {
    if (!birthday) return null;
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    // If the birthday hasn't occurred yet this year, subtract one from age
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  const userAge = currentUser ? calculateAge(currentUser.birthday) : null;

  if (!currentUser) {
    return <Typography variant="h6">אין נתוני משתמש זמינים.</Typography>;
  }

  return (
    <Card
    sx={{
      boxShadow: 12, 
      borderRadius: 8, 
      overflow: 'hidden',
      position: 'relative',
    }}
  >

            <>
              {/* Main Image Display */}
              <CardMedia
    component="img"
    sx={{
      height: 270, 
      width: '100%', 
      objectFit: 'cover', 
      borderRadius: 2, 
      boxShadow: 3, 
    }}
    image={mainimage ? mainimage : placeholderImage}
    alt={`Image of ${currentUser.firstName}`}
  />
  
              {/* Image Thumbnails */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  padding: 1,
                  gap: 1,
                  marginTop: 1,
                }}
              >
    {newImages.filter(image => image !== mainimage && image !== placeholderImage).map((image, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '8px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'scale(1.1)',
                        transition: 'transform 0.2s ease-in-out',
                        boxShadow: 3,
                      },
                    }}
                    onClick={() => handleImageClick(index)} 
                  >
                    <CardMedia
                      component="img"
                      image={image}
                      alt={`Thumbnail ${index}`}
                      sx={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  </Box>
                ))}
              </Box>
  
              {/* Overlay Description */}
              <Box
    sx={{
      bottom: 0,
      left: 0,
      right: 0,
      padding: 2,
      background: 'linear-gradient(135deg, rgba(211, 211, 211, 0.3), rgba(255, 255, 255, 0.2))', // Lighter gradient with soft gray and white
      color: '#333333', // Dark charcoal gray text for a softer contrast
      display: 'flex', // Enable flexbox
      alignItems: 'center', // Vertically center items
      justifyContent: 'space-between', // Distribute space between items
      borderRadius: 2, // Rounded corners for a soft and modern look
      boxShadow: 3, // Slight shadow for depth without being too bold
    }}
  >
               
  
                <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
    <Typography
      variant="h4" // Enlarge the font size for the name and age
      sx={{
        fontWeight: 'bold', 
        fontSize: '2rem', // Further adjust if you want a specific size
        letterSpacing: '1px', // Adds a little letter spacing for a modern feel
        color: '#2C3E50', // Deep color to match your updated background and provide contrast
      }}
    >
      {currentUser.firstName}, {userAge}
    </Typography>
    <Typography
      variant="body1" // Use a larger variant for the last name and a cool comment
      sx={{
        mt: 1,
        fontStyle: 'italic', // Italics for a more stylish comment feel
        color: '#34495E', // Slightly lighter shade of gray to keep it cool and readable
        fontWeight: '500',
        fontSize: '1.5rem', // Further adjust if you want a specific size
        // Medium weight to make it stand out but still subtle
        letterSpacing: '0.5px', // Adds a more trendy, spacious feel
      }}
    >
      {currentUser.lastName}
    </Typography>
  </Box>
  
              </Box>
            </>
        </Card>
  );
};


export default ZoomMobile;
