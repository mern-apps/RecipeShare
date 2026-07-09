import React, { useState, useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Card, CardMedia, Fab } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';



import easypic from '../../pictures/easypic.png'; 

import { motion } from "framer-motion"; // For smooth animation
import PersonIcon from "@mui/icons-material/Person";

const Zoom = ({currentUser }) => {

  const { user } = useSelector((state) => state.auth);


  
  const [message, setMessage] = useState('pending current user'); // Message state to show

  const placeholderImage = easypic; // Use easypic.png as the placeholder image
  const [newImages, setNewImages] = useState(Array(5).fill(placeholderImage)); // Initialize with easypic.png
  const [mainImage, setMainImage] = useState(placeholderImage);
  
  const [sharedCodes, setSharedCodes] = useState([]);
const [sharedTrips, setSharedTrips] = useState([]);

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
                        default:
                          break;
                      }
                    };
                
                    window.addEventListener("keydown", handleKeyDown);
                    return () => window.removeEventListener("keydown", handleKeyDown);
                  }, []);


  const dispatch = useDispatch();
  
  useEffect(() => {

    if (currentUser?._id) {
      const images = currentUser.images;
   const newImages1 = Array.from({ length: 5 }, (_, index) =>
    images[index] || placeholderImage
      );
      setNewImages(newImages1);
  setMessage(''); 

 // Shared codes
  const codes = (currentUser.codes || []).filter(code1 =>
    (user.codes || []).some(code2 => code2._id === code1._id)
  );
  setSharedCodes(codes);

  // Shared trips
  const trips = (currentUser.trips || []).filter(trip1 =>
    (user.trips || []).some(trip2 =>
      trip1.countryandcity === trip2.countryandcity &&
      new Date(trip1.datestart) <= new Date(trip2.datefinish) &&
      new Date(trip1.datefinish) >= new Date(trip2.datestart)
    )
  );
  setSharedTrips(trips);

     } 
  
  }, []);

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
  const userAge = currentUser? calculateAge(currentUser.birthday) : null;


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
              ...getAccessibleStyles('white'),
              px: 2,
              py: 1,
              borderRadius: "8px",
              boxShadow: 3,
              textAlign: "center",
              width: 700,
            }}
          >
               <Typography variant="subtitle1"
                      sx={{
                        fontWeight: accessibilityData.contrastMode ? 'bold' : 'normal',
                        textDecoration: accessibilityData.contrastMode ? 'underline' : 'none',
                        color: getAccessibleStyles('#000').color,
                        fontSize: adjustedFontSize(2),
                        textAlign: 'center',
                        letterSpacing: '0.05em',
                      }}
                      gutterBottom
                    >
              {message}
              </Typography>


          </Box>
        </motion.div>
      )}
    
    {!message && (
    
<Box
  sx={{
    display: 'flex',
    flexDirection: 'row',
    gap: 2,

  }}
>
  {/* LEFT: Description */}
 <Box
  sx={{
    ...getAccessibleStyles('white'),
    width: 480,
    boxShadow: 5,
    borderRadius: 3,
    padding: 2,
    display: 'flex',
    flexDirection: 'column', // Stack vertically
    alignItems: 'flex-end',  // הצמד לימין
    justifyContent: 'center',
    textAlign: 'right',      // טקסט לימין
    gap: 2, // spacing between description and shared info
  }}
>
  <Box
    sx={{
      background: `linear-gradient(135deg, #e6f0ff 0%, #c7b8f5 50%, #d9e8ff 100%)`,
      borderRadius: 3,
      boxShadow: '0 4px 8px rgba(199, 184, 245, 0.3)',
          minHeight: `calc(1.6em * 10)`, // 7 שורות בגובה שורה של 1.6em
      width: '100%',
      textAlign: 'right',
    }}
  >
    <Typography
      variant="body1"
      sx={{
        fontSize: adjustedFontSize(1.4),
        whiteSpace: 'pre-line',
        direction: 'rtl',
        lineHeight: 1.6,
        color: '#333',
        textAlign: 'right',
      }}
    >
      {currentUser?.description?.trim() ||
        (currentUser?.myGender === 'female'
          ? 'המשתמשת עדיין לא הוסיפה תיאור אישי.'
          : 'המשתמש עדיין לא הוסיף תיאור אישי.')}
    </Typography>
  </Box>

  {/* Shared Codes and Trips */}
  {(sharedCodes.length > 0 || sharedTrips.length > 0) && (
    <Box
       sx={{
      width: '100%',
      mt: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',   // שמירה על ימין
      textAlign: 'right',
background: `linear-gradient(135deg, #f0f8ff 0%, #e6f2ff 50%, #f9fbff 100%)`,
      borderRadius: 3,
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
      minHeight: `calc(1.6em * 5)`, // גובה מינימום 5 שורות
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center', // ממרכז אנכי
    }}
    >
      {sharedCodes.length > 0 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, flexDirection: 'row-reverse', alignItems: 'center' }}>
          <Typography   sx={{
        fontWeight: 'bold',
        fontSize: adjustedFontSize(1.2),
        paddingRight: 2, // הזזה קלילה לכיוון המרכז
      }}>
:קבוצות משותפות          </Typography>
          {sharedCodes.map((code) => (
            <Box
              key={code._id}
              sx={{
                background: 'linear-gradient(90deg, #81c784, #4caf50)',
                color: '#fff',
                borderRadius: '12px',
                px: 2,
                py: 0.5,
                fontSize: adjustedFontSize(1),
                textAlign: 'center',
              }}
            >
              {code.name}
            </Box>
          ))}
        </Box>
      )}

      {sharedTrips.length > 0 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1, flexDirection: 'row-reverse', alignItems: 'center' }}>
          <Typography sx={{
        fontWeight: 'bold',
        fontSize: adjustedFontSize(1.2),
        paddingRight: 2, // הזזה קלילה לכיוון המרכז
      }}>
:טיולים חופפים          </Typography>
          {sharedTrips.map((trip, index) => (
            <Box
              key={index}
              sx={{
                background: 'linear-gradient(90deg, #64b5f6, #2196f3)',
                color: '#fff',
                borderRadius: '12px',
                px: 2,
                py: 0.5,
                fontSize: adjustedFontSize(1),
                textAlign: 'center',
              }}
            >
              {trip.countryandcity}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  )}
</Box>


    
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
    <Box 
    sx={{
      ...getAccessibleStyles('#f5f5f5'),
      display: 'flex', justifyContent: 'center', padding: 1, gap: 1, mt: 1
      }}>
      {newImages
        .filter((img) => img !== mainImage && img !== placeholderImage)
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
{currentUser?.age}
</Typography>
     
    </Box>
  </Card>

  </Box>

)}
    </Box>
  );
};

export default Zoom;