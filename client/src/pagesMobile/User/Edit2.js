import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box,DialogContent, DialogTitle, Button,MenuItem, TextField, Typography, Grid, Snackbar, Alert, IconButton } from '@mui/material';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

import { saveprofiledata } from '../../actions/signupdialogaction';
import { uploadimage } from '../../actions/imagesactions';
import { deleteFromAmazonAndMongo } from '../../actions/imagesactions';

//import { getAllcitiesandcodes } from '../../actions/userpageactions'; // Assuming the action is in this file

import Edit2ImagesComponent from './Edit2ImagesComponent';
//import Edit2Codes from './Edit2Codes';


const Edit2 = ({ onClose }) => {
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


    const isLogOut = useSelector((state) => state.auth.islogout);


  const [notification, setNotification] = useState({ open: false, message: '' });
  
  //const [code, setCode] = useState([]); 

  const [imagesprevious, setImagesprevious ] = useState([]);
  const [imagesnew, setImagesnew ] = useState([]);
  const [imagestodelete, setImagestodelete] = useState([]);
const [mainimage, setMainimage] = useState({
  type: "",
  URL: "",
  index: null 
});

      const navigate = useNavigate();


    useEffect(() => {
    if (isLogOut === 1) {
      navigate('/');
    }
 }, [isLogOut]); 


   //first loading
   useEffect(() => {
     //dispatch(getAllcitiesandcodes());
     if (user) {
      setImagesprevious(user.images); //no if beacuse it empty array in default
    }
   }, [user,dispatch]);

  const handleNext = async () => {
     //check in next ver if dayjs can be removed beacuse the client and the server are DATE format (also for minBirthdate +maxBirthdate)
    const profileData = {
      //consider description: description.replace(/^[ \t]+|[ \t]+$/g, '')
url: mainimage.type && mainimage.type !== 'new' 
       ? imagesprevious && imagesprevious.length > 0 
         ? imagesprevious[0] 
         : null 
       : null, // i
      //code,
    };
    try {

    await dispatch(saveprofiledata(profileData));
  } catch (error) {
    console.error('Error saveprofiledata', error);
    return;
  }
  
//i first delete and not upload beacuse i dont allow to upload exsiting image, and there is a case that i delete from previsue and add the same image in the new.

      for (const imageUrl of imagestodelete) {
        if (!imageUrl) continue;
        try {
          // Extract the file name from the URL
          const fileName = imageUrl.split('/').pop(); 
          const fileDetails = {
            fileName: fileName, // Send only the file name
            operation: 'delete',
          };
          await dispatch(deleteFromAmazonAndMongo(fileDetails));

        } catch (error) {
          console.error('Error extracting file name:', error);
        }
      }


        let index = 0;
      for (const imageObj of imagesnew) {
          const imagefile = imageObj.file;
          if (!imagefile) continue; 
          try {

          const fileDetails = {
            fileName: imageObj.name,
            fileType: imageObj.type,
            operation: 'upload', 
                };  

          const mainimageValue = mainimage.type === 'new'
    ? mainimage.type
    : imagesprevious && imagesprevious.length > 0
      ? imagesprevious[0]
      : null;

  // Determine if this is the first item in the array
const isFirst = index === 0;

  await dispatch(uploadimage(imagefile, fileDetails, mainimageValue, isFirst));
          index++;
        } catch (error) {
          console.error('Error extracting file name:', error);
        }
        }


      //add loading icon
      onClose();
  };

  const handlePrevious = () => {
    onClose();
  };

  
    return (
      <>
        <DialogContent sx={{ textAlign: 'right', direction: 'rtl' }}>
          
             <Typography
                                                          variant="h6"
                                                          display="block"
                                                          sx={{
                                                            marginTop: '20px',
                                                            textDecoration: accessibilityData.contrastMode ? 'underline' : 'none',
                                                            fontSize: adjustedFontSize(3),
                                                            textAlign: 'right',
                                                            color: 
                                                            (accessibilityData.contrastMode || accessibilityData.darkContrast) 
                                                              ? '#FFF' 
                                                              : (accessibilityData.lightContrast ? '#000' : 'navy'),
                                                            textShadow: '4px 4px 10px rgba(0, 0, 0, 0.3)',
                                                          }}
                                                          gutterBottom
                                                        >
עריכת פרופיל אישי         </Typography>


        <Edit2ImagesComponent
            imagesprevious={imagesprevious}
            imagesnew={imagesnew}
            setImagesprevious={setImagesprevious}
            setImagesnew={setImagesnew}
            setImagestodelete={setImagestodelete}
            mainimage={mainimage}
            setMainimage={setMainimage}
            setNotification={setNotification}
          />

  

     <Grid item md={12}>
                     <Grid
                       container
                       justifyContent="center"
                       spacing={2}
                       sx={{
                        marginTop: 4,

                       }}
                     >
                             <Grid item>
     
                             <Button
                               onClick={handleNext}
                               aria-label="המשך"
                               aria-keyshortcuts="Alt+A"
                               sx={{
                                 boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1), inset 0 -2px 4px rgba(255, 255, 255, 0.5)",
                         border: "2px solid #a3bffa",
                                 fontSize: adjustedFontSize(1.1),
                                 height: 45,
                                 minWidth: 120,
                                 borderRadius: 3,
                                 ...getAccessibleStyles("#039be5", "#FFF", "#0288d1", "#FFF"),
                               }}
                               variant="contained"
                             >
                               המשך
                               {accessibilityData.characterKeyShortcuts ? ' (Alt+A)' : ''}
                         
                             </Button>
     
                                 <Button
                                 onClick={handlePrevious}
                                 aria-label="ביטול"
                                 aria-keyshortcuts="Alt+B"
                                 sx={{
                                   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1), inset 0 -2px 4px rgba(255, 255, 255, 0.5)",
                           border: "2px solid #a3bffa",
                                   fontSize: adjustedFontSize(1.1),
                                   height: 45,
                                   minWidth: 120,
                                   borderRadius: 3,
                                   ...getAccessibleStyles("#ff7961", "#FFF", "#f44336", "#FFF"),  // Lighter red for cancel
                                 }}
                                 variant="contained"
                               >
                                 ביטול
                                 {accessibilityData.characterKeyShortcuts ? ' (Alt+B)' : ''}
                           
                               </Button>
                               </Grid>
         
                 </Grid>
            </Grid>
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

export default Edit2;
