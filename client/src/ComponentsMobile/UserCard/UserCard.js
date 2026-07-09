import React, { useState, useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';

import { Box, Typography, IconButton, Card, CardMedia, Fab } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import easypic from '../../pictures/easypic.png';

const UserCard = ({ currentUser, size, handleApprove, handleDecline, timeLimitCheck }) => {
  const placeholderImage = easypic;
  const [newImages, setNewImages] = useState(Array(5).fill(placeholderImage));
  const [mainImage, setMainImage] = useState(placeholderImage);

    const { user } = useSelector((state) => state.auth);
  

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
                        case "O":
                          handleApprove();
              break;
              case "P":
                handleDecline();
                break;
                        default:
                          break;
                      }
                    };
                
                    window.addEventListener("keydown", handleKeyDown);
                    return () => window.removeEventListener("keydown", handleKeyDown);
                  }, []);
                  
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


   const nameStyle = {
    fontWeight: accessibilityData.contrastMode ? 'bold' : 'normal',
    textDecoration: accessibilityData.contrastMode ? 'underline' : 'none',
    color: getAccessibleStyles('#3f51b5').color,
    fontSize: adjustedFontSize(2),
    textAlign: 'center',
    background: 'linear-gradient(to right, #3f51b5, #6a1b9a)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '4px 4px 10px rgba(0, 0, 0, 0.3)',
    letterSpacing: '0.05em',
  };


  return (
    <Card
sx={{
    ...getAccessibleStyles('#f5f5f5'),
    boxShadow: 12,
    borderRadius: 8,
    position: 'relative',
    width: 480, 
    overflow: 'hidden',
  }}
  >
    <CardMedia
      component="img"
     sx={{
        ...getAccessibleStyles('#f5f5f5'),
        height: 450,
        width: '100%',
        objectFit: 'cover',
        borderRadius: '8px 8px 0 0',
        transition: 'opacity 0.3s ease-in-out',
      }}
      image={mainImage}
      alt={`Image of ${currentUser?.firstName}`}
    />
    
    {/* Image Thumbnails */}
    <Box sx={{ display: 'flex', justifyContent: 'center', padding: 1, gap: 1, mt: 1 }}>
      {newImages
.filter(image => image !== placeholderImage)
        .map((image, index) => (

          <Box
            key={index}
            sx={{
              ...getAccessibleStyles('#f5f5f5'),
              width: 60,
              height: 60,
              borderRadius: '8px',
              overflow: 'hidden',
              cursor: 'pointer',
              position: 'relative',
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

    {/* User Info & Action Buttons */}
    <Box
          sx={{
        ...getAccessibleStyles('#f5f5f5'),
        padding: 1,
        color: '#333',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 2,
      }}
    >
   <Typography variant="h4" sx={nameStyle} gutterBottom>
  {currentUser?.firstName}
</Typography>
<Typography variant="body1" sx={nameStyle} gutterBottom>
{userAge}
</Typography>

      {/* Action Buttons */}
      {handleApprove && handleDecline && (
      <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%', mt: 2 }}>
        <Fab
          onClick={handleDecline}
          sx={{
            backgroundColor:'#ff6b6b',
            color: '#fff',
            '&:hover':{ backgroundColor: '#ff4d4d' },
          }}
        >
          <CloseIcon />
        </Fab>
        <Fab
          onClick={handleApprove}
          sx={{
            backgroundColor:'#4caf50',
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

export default UserCard;
