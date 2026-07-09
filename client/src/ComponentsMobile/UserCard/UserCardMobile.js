import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Card, CardMedia,Fab } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import easypic from '../pictures/easypic.png';

const UserCardMobile = ({ currentUser, size, handleApprove, handleDecline, timeLimitCheck }) => {
  const placeholderImage = easypic;
  const [newImages, setNewImages] = useState(Array(5).fill(placeholderImage));
  const [mainImage, setMainImage] = useState(placeholderImage);


  useEffect(() => {
    if (currentUser) {
      const images = currentUser.images;
      const newImages1 = Array.from({ length: 5 }, (_, index) =>
        images[index] || placeholderImage
      );

      setNewImages(newImages1);
  }
}, [currentUser]);

useEffect(() => {
  if (newImages.length > 0) {
    setMainImage(newImages[0]);
    const images = newImages[0];
    console.log("New Images Array:", images); // Log the new images array
  }    }, [newImages]);


  const handleImageClick = (index) => {
    setMainImage(newImages[index]); 
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

  return (

    <Card sx={{ maxWidth: '100%', borderRadius: 2, boxShadow: 3 }}>
    {/* Main Image Display */}
    <CardMedia
      component="img"
      sx={{
        height: size, // Adjust the height for the mobile main image
        width: '100%',
        objectFit: 'cover', // Ensures the image doesn't get distorted
        borderRadius: 2,
      }}
      image={mainImage}
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
    {newImages.filter(image => image !== mainImage && image !== placeholderImage).map((image, index) => (
        <Box
        key={newImages.indexOf(image)} // Use original index
        sx={{
            width: 50,
            height: 50,
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            '&:hover': {
              transform: 'scale(1.1)',
              transition: 'transform 0.2s ease-in-out',
            },
          }}
          onClick={() => handleImageClick(newImages.indexOf(image))} // Use original index
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
        padding: 1, // Reduced padding for a more compact look
        background: 'linear-gradient(135deg, rgba(211, 211, 211, 0.3), rgba(255, 255, 255, 0.2))',
        color: '#333333',
        display: 'flex',
        flexDirection: 'column', // Stack items vertically for mobile
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h6" // Adjusted for a more compact text size
        sx={{
          fontWeight: 'bold',
          fontSize: '1.2rem', // Reduced font size for mobile
          color: '#2C3E50',
          letterSpacing: '0.8px', // Slightly reduced spacing
          textAlign: 'center', // Center text for better mobile layout
        }}
      >
        {currentUser.firstName}, {userAge}
      </Typography>
      <Typography
        variant="body2" // Smaller font for last name
        sx={{
          mt: 0.5, // Reduced margin top
          fontStyle: 'italic',
          color: '#34495E',
          fontWeight: '500',
          fontSize: '1rem', // Smaller size for mobile
          letterSpacing: '0.3px', // Reduced letter spacing
          textAlign: 'center', // Center text for better mobile layout
        }}
      >
        {currentUser.lastName}
      </Typography>

      {handleApprove && handleDecline && (
        <Box 
  sx={{ 
    display: 'flex', 
    justifyContent: { xs: 'center', sm: 'space-around' },  
    gap: { xs: 2, sm: 0 },  
    width: '100%', 
    mt: 2 
  }}
>
  <Fab
    onClick={handleDecline}
    size="small" // Adjust for smaller screens
    sx={{
      backgroundColor: '#ff6b6b',
      color: '#fff',
      '&:hover': { backgroundColor: '#ff4d4d' },
    }}
  >
    <CloseIcon />
  </Fab>
  <Fab
    onClick={handleApprove}
    size="small" // Adjust for smaller screens
    sx={{
      backgroundColor: '#4caf50',
      color: '#fff',
      '&:hover': { backgroundColor: '#45a044' },
    }}
  >
    <FavoriteIcon />
  </Fab>
</Box>

      )}

    </Box>
  </Card>

  );
};

export default UserCardMobile;
