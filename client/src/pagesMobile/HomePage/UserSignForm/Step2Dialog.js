import React, { useState, useEffect,useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Autocomplete,Divider, Box,DialogContent, DialogTitle, Button,MenuItem, TextField, Typography, Grid, Snackbar, Alert, IconButton } from '@mui/material';
import { AddPhotoAlternate as AddPhotoIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { saveprofiledata } from '../../../actions/signupdialogaction';

import { useDropzone } from 'react-dropzone'; 



const Step2Dialog = ({ onNext2to3,onClose }) => {
  const dispatch = useDispatch();


  const  {user}  = useSelector((state) => state.auth);

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
                  
                    const getAccessibleStyles = (defaultBg, defaultColor, hoverBg, hoverColor) => {
                      const { darkContrast, lightContrast, contrastMode } = accessibilityData;
                  
                      if (darkContrast) {
                        return {
                          backgroundColor: "#000",
                          color: "#FFF",
                          border: '2px solid #FFF',
                          fontWeight: "bold",
                          textDecoration: "underline",
                          '&:hover': {
                            backgroundColor: '#111', // Darken on hover
                            color: '#FFF',
                          },
                        };
                      }
                  
                      if (lightContrast) {
                        return {
                          backgroundColor: "#FFF",
                          color: "#000",
                          border: '2px solid #000',
                          '&:hover': {
                            backgroundColor: '#f0f0f0', // Lighten on hover
                            color: '#000',
                          },
                        };
                      }
                  
                      if (contrastMode) {
                        return {
                          backgroundColor: "#000",
                          color: "#FFF",
                          border: '2px solid #FFF',
                          fontWeight: "bold",
                          textDecoration: "underline",
                          '&:hover': {
                            backgroundColor: '#111', // Darken on hover
                            color: '#FFF',
                          },
                        };
                      }
                  
                      return {
                        backgroundColor: defaultBg || "#00bcd4", // Default light blue if not provided
                        color: defaultColor || "#000", // Default black text if not provided
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // 3D light shadow by default
                        '&:hover': {
                          backgroundColor: hoverBg || '#0097a7', // Default darker blue on hover if not provided
                          color: hoverColor || '#000',
                          fontWeight: "bold",
                          // Default black text on hover if not provided
                        },
                      };
                    };
                  
                  
                  
                    useEffect(() => {
                      const handleKeyDown = (event) => {
                        if (!event.altKey) return;
                  
                        const key = event.key.toUpperCase();
                        switch (key) {
                          case "A":
                            handleNext();
                break;
                case "B":
                  handlePrevious();
                  break;
                  case "C":
                    break;
                    case "D":
                      break;
                          default:
                            break;
                        }
                      };
                  
                      window.addEventListener("keydown", handleKeyDown);
                      return () => window.removeEventListener("keydown", handleKeyDown);
                    }, []);
                    



  const [images, setImages] = useState([]);


  const [notification, setNotification] = useState({ open: false, message: '' });
  //nst [code, setCode] = useState(''); 

  useEffect(() => { 
    if (user && user._id) {
    } else {
    }
  }, [user, dispatch]);


  // Use Dropzone hook
   const { getRootProps, getInputProps } = useDropzone({
     accept: {
       'image/jpeg': [],
       'image/png': [],
       'image/gif': [],
     },
     maxFiles: 1,
     maxSize: 5242880, // 5MB file size limit
     onDrop: (acceptedFiles) => DropzoneUpload(acceptedFiles),
   });

  const DropzoneUpload = (acceptedFiles) => {
    if (images.length + acceptedFiles.length > 1) {
      setNotification({ open: true, message: 'You can upload up to 1 image.' });
      return;
    }
    const file = acceptedFiles[0]; // Extract the first file
    const imagePreview = {
      file, 
      name: file.name,  // Manually copy the name
      type: file.type,  // Manually copy the type
      preview: URL.createObjectURL(file),  // Generate preview URL
    };
    setImages((prevImages) => [...prevImages, imagePreview]);
  };

     const handleImageDelete = (index) => {
      setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };


    const handleNext = async () => {
    try {
     if (images.length === 0) {
    setNotification({ open: true, message: 'Please fill out all fields.' });
     return; }

    const profileData = {
      //consider description: description.replace(/^[ \t]+|[ \t]+$/g, '')
url: null,
     //code,
    };
    await dispatch(saveprofiledata(profileData));

    for (const imageObj of images) {
      const imagefile = imageObj.file;
      if (!imagefile) continue; 
      const fileDetails = {
        fileName: imageObj.name,
        fileType: imageObj.type,
        operation: 'upload',
      };

      //await dispatch(uploadimage(imagefile, fileDetails));
    }


  } catch (error) {
    setNotification({ open: true, message: 'An error occurred while saving your profile.' });
    console.error('Error in handleNext:', error);
  }

  onNext2to3();

  };

  const handlePrevious = () => {
    onClose();
  };


  
  return (
    <>


<DialogContent sx={{ textAlign: "right", direction: "rtl" }}>
  <Box
    sx={{
      ...getAccessibleStyles("#FFF", "#000", "#FFF", "#000"),
      display: "flex",
      flexDirection: "column",
      p: 3,
      border: "1px solid #ddd",
      boxShadow: "none",
      gap: 3,
    }}
  >

<Box
  sx={{
    ...getAccessibleStyles("#FFF", "#000", "#FFF", "#000"),
    display: "flex",
    flexDirection: "column",
    p: 6,
    border: "1px solid #ddd",
    boxShadow: "none",
  }}
>
  <Box>
    <Typography
      variant="h6"
      sx={{
        mt: 2,
        textDecoration: accessibilityData.contrastMode ? "underline" : "none",
        fontSize: adjustedFontSize(1.8),
        textAlign: "right",
        color:
          accessibilityData.contrastMode || accessibilityData.darkContrast
            ? "#FFF"
            : accessibilityData.lightContrast
            ? "#000"
            : "navy",
        textShadow: "4px 4px 10px rgba(0,0,0,.3)",
      }}
      gutterBottom
    >
      העלה תמונות
    </Typography>

    {images.length === 0 && (
      <Box
        {...getRootProps()}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFF",
          color: "#000",
          border: "2px dashed #ccc",
          p: 3,
          borderRadius: 2,
          textAlign: "center",
          cursor: "pointer",
          maxWidth: 325,
          ml: "auto",
        }}
      >
        <input {...getInputProps()} />
        <AddPhotoIcon fontSize="large" />

        <Typography
          variant="body1"
          sx={{
            fontSize: adjustedFontSize(1),
            color: "#000",
          }}
        >
          לחץ/י להעלאת תמונה
        </Typography>
      </Box>
    )}
  </Box>

  <Box
    sx={{
      mt: 2,
      display: "flex",
      flexDirection: "column",
      gap: 2,
      alignItems: "flex-end",
    }}
  >
    {images.map((image, index) => (
      <Box
        key={index}
        sx={{
          position: "relative",
          width: 150,
        }}
      >
        <IconButton
          onClick={() => handleImageDelete(index)}
          sx={{
            position: "absolute",
            top: 5,
            right: 5,
            color: "red",
            zIndex: 1,
          }}
        >
          <DeleteIcon />
        </IconButton>

        <Box
          component="img"
          src={image.preview}
          alt={`תצוגה מקדימה ${index + 1}`}
          sx={{
            width: 150,
            height: 150,
            objectFit: "cover",
            borderRadius: 2,
          }}
        />
      </Box>
    ))}
  </Box>

  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      gap: 2,
      mt: 4,
      flexWrap: "wrap",
    }}
  >
    <Button
      onClick={handleNext}
      aria-label="המשך"
      aria-keyshortcuts="Alt+A"
      variant="contained"
      sx={{
        boxShadow:
          "0 4px 8px rgba(0,0,0,.1), inset 0 -2px 4px rgba(255,255,255,.5)",
        border: "2px solid #a3bffa",
        fontSize: adjustedFontSize(1.1),
        height: 45,
        minWidth: 120,
        borderRadius: 3,
        ...getAccessibleStyles("#039be5", "#FFF", "#0288d1", "#FFF"),
      }}
    >
      המשך
      {accessibilityData.characterKeyShortcuts ? " (Alt+A)" : ""}
    </Button>

    <Button
      onClick={handlePrevious}
      aria-label="ביטול"
      aria-keyshortcuts="Alt+B"
      variant="contained"
      sx={{
        boxShadow:
          "0 4px 8px rgba(0,0,0,.1), inset 0 -2px 4px rgba(255,255,255,.5)",
        border: "2px solid #a3bffa",
        fontSize: adjustedFontSize(1.1),
        height: 45,
        minWidth: 120,
        borderRadius: 3,
        ...getAccessibleStyles("#ff7961", "#FFF", "#f44336", "#FFF"),
      }}
    >
      ביטול
      {accessibilityData.characterKeyShortcuts ? " (Alt+B)" : ""}
    </Button>
  </Box>
</Box>

   </Box>

      </DialogContent>
  
      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={() => setNotification({ open: false, message: '' })}
      >
        <Alert onClose={() => setNotification({ open: false, message: '' })} severity="warning" sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Step2Dialog;
