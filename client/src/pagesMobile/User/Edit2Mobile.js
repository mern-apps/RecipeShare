import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, DialogContent, DialogTitle, Button, MenuItem, TextField, Typography, Grid, Snackbar, Alert, IconButton } from '@mui/material';
import { AddPhotoAlternate as AddPhotoIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { saveprofiledata, uploadImagesToS3 } from '../../actions/signupdialogaction';
import { useDropzone } from 'react-dropzone'; 
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { getAllcities } from '../../actions/signupdialogaction';
import { useNavigate } from 'react-router-dom';
import Edit2ImagesComponent from './Edit2ImagesComponent';
import EditCitiesAndAge from './EditCitiesAndAge';
import { getAllcitiesandcodes } from '../../actions/userpageactions'; // Assuming the action is in this file
import { uploadimage } from '../../actions/imagesactions';
import { deleteFromAmazonAndMongo } from '../../actions/imagesactions';



const Edit2Mobile = ({ onNext2to3, onClose }) => {
  const dispatch = useDispatch();
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
                    

                      
   const isLogOut = useSelector((state) => state.auth.islogout);

  const [selectedCity, setSelectedCity] = useState(null); // State for selected city

  const [birthday, setBirthday] = useState(null); // Using Date object
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [description, setDescription] = useState('');
const [descriptionError, setDescriptionError] = useState(false);

  const [myGender, setMyGender] = useState("");
  const [otherUserGender, setOtheruserGender] = useState("");

  const [notification, setNotification] = useState({ open: false, message: '' });
  
  //const [code, setCode] = useState([]); 

  const [imagesprevious, setImagesprevious ] = useState([]);
  const [imagesnew, setImagesnew ] = useState([]);
  const [imagestodelete, setImagestodelete] = useState([]);
  const [mainimage, setMainimage] = useState({
    newOrPrevious: "",
    URL: "",
  });

      const navigate = useNavigate();


    useEffect(() => {
    if (isLogOut === 1) {
      navigate('/');
    }
 }, [isLogOut]); 


   //first loading
   useEffect(() => {
     dispatch(getAllcitiesandcodes());

     if (user) {
      setImagesprevious(user.images); //no if beacuse it empty array in default
      if (user.myGender) {
        setMyGender(user.myGender); 
      }
      if (user.otherUserGender) {
        setOtheruserGender(user.otherUserGender); 

      }

      if (user.minBirthdate) {
        setMinAge(dayjs().diff(dayjs(user.minBirthdate), 'year'));
      }
      if (user.maxBirthdate) {
        setMaxAge(dayjs().diff(dayjs(user.maxBirthdate), 'year'));
      }

       if (user.description) {
            setDescription(user.description); 
  }

    }
   }, [user,dispatch]);

  const handleNext = async () => {
    if (!birthday || !minAge || !maxAge || !selectedCity || !myGender || !otherUserGender) {
    setNotification({ open: true, message: 'Please fill out all fields.' });
    return;
  }

    if (description.split(/\r\n|\r|\n/).length > 5) {
    setDescriptionError(true);
    setNotification({ open: true, message: 'לא ניתן להכניס יותר מ-5 שורות' });
    return;
  }

  
  //check in next ver if dayjs can be removed beacuse the client and the server are DATE format (also for minBirthdate +maxBirthdate)
  const formattedBirthday = dayjs(birthday).format('YYYY-MM-DD');
  const currentDate = dayjs();
  const minBirthdate = currentDate.subtract(minAge, 'year').format('YYYY-MM-DD'); 
  const maxBirthdate = currentDate.subtract(maxAge, 'year').format('YYYY-MM-DD');

    const profileData = {
      birthday: formattedBirthday,
      minBirthdate,
      maxBirthdate,
      city: selectedCity._id,
      myGender, 
      otherUserGender,
      description: description.trim(),
      //consider description: description.replace(/^[ \t]+|[ \t]+$/g, '')

      //code,
    };
    try {

    await dispatch(saveprofiledata(profileData));
  } catch (error) {
    console.error('Error saveprofiledata', error);
    return;
  }
  
      for (const imageObj of imagesnew) {
          const imagefile = imageObj.file;
          if (!imagefile) continue; 
          try {

          const fileDetails = {
            fileName: imageObj.name,
            fileType: imageObj.type,
            operation: 'upload',
          };  
          await dispatch(uploadimage(imagefile, fileDetails));
        } catch (error) {
          console.error('Error extracting file name:', error);
        }
        }

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
      //add loading icon
      onClose();
  };

  const handlePrevious = () => {
    onClose();
  };
  return (
    <>
    <DialogContent sx={{ textAlign: 'right', direction: 'rtl', px: { xs: 2, sm: 4 } }}>
      
      <Typography
        variant="h6"
        display="block"
        sx={{
          mt: 3,
          textDecoration: accessibilityData.contrastMode ? 'underline' : 'none',
          fontSize: { xs: adjustedFontSize(2.2), sm: adjustedFontSize(3) },
          textAlign: 'right',
          color:
            (accessibilityData.contrastMode || accessibilityData.darkContrast)
              ? '#FFF'
              : (accessibilityData.lightContrast ? '#000' : 'navy'),
          textShadow: '4px 4px 10px rgba(0,0,0,0.3)',
        }}
        gutterBottom
      >
        עריכת פרופיל אישי
      </Typography>

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

      <Typography
        variant="h6"
        display="block"
        sx={{
          mt: 2,
          textDecoration: accessibilityData.contrastMode ? 'underline' : 'none',
          fontSize: { xs: adjustedFontSize(1.4), sm: adjustedFontSize(1.8) },
          textAlign: 'right',
          color:
            (accessibilityData.contrastMode || accessibilityData.darkContrast)
              ? '#FFF'
              : (accessibilityData.lightContrast ? '#000' : '#000'),
          textShadow: '4px 4px 10px rgba(0,0,0,0.3)',
        }}
        gutterBottom
      >
        מידע על מגדר
      </Typography>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            select
            label="המגדר שלי"
            fullWidth
            value={myGender}
            onChange={(e) => setMyGender(e.target.value)}
            sx={{
              fontSize: adjustedFontSize(1.1),
              backgroundColor: '#FFF',
              color: '#000',
            }}
          >
            {[{ value: "male", label: "זכר" }, { value: "female", label: "נקבה" }, { value: "other", label: "אחר" }].map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <TextField
            select
            label="אני מחפש/ת"
            fullWidth
            value={otherUserGender}
            onChange={(e) => setOtheruserGender(e.target.value)}
            sx={{
              fontSize: adjustedFontSize(1.1),
              backgroundColor: '#FFF',
              color: '#000',
            }}
          >
            {[{ value: "male", label: "זכר" }, { value: "female", label: "נקבה" }, { value: "other", label: "אחר" }].map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      <EditCitiesAndAge 
        setSelectedCity={setSelectedCity}
        setBirthday={setBirthday}
        selectedCity={selectedCity}
      />

      <Typography
        variant="h6"
        sx={{
          mt: 2,
          textDecoration: accessibilityData.contrastMode ? 'underline' : 'none',
          fontSize: { xs: adjustedFontSize(1.4), sm: adjustedFontSize(1.8) },
          textAlign: 'right',
          color:
            (accessibilityData.contrastMode || accessibilityData.darkContrast)
              ? '#FFF'
              : (accessibilityData.lightContrast ? '#000' : '#000'),
          textShadow: '4px 4px 10px rgba(0,0,0,0.3)',
        }}
        gutterBottom
      >
        גיל נדרש
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            label="גיל מקסימלי"
            type="number"
            fullWidth
            value={maxAge}
            onChange={(e) => setMaxAge(e.target.value)}
            inputProps={{ min: 0 }}
            sx={{
              fontSize: adjustedFontSize(1.1),
              backgroundColor: '#FFF',
              color: '#000',
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            label="גיל מינימלי"
            type="number"
            fullWidth
            value={minAge}
            onChange={(e) => setMinAge(e.target.value)}
            inputProps={{ min: 0 }}
            sx={{
              fontSize: adjustedFontSize(1.1),
              backgroundColor: '#FFF',
              color: '#000',
            }}
          />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Typography
          variant="h6"
          sx={{
            mt: 2,
            textDecoration: accessibilityData.contrastMode ? 'underline' : 'none',
            fontSize: { xs: adjustedFontSize(1.4), sm: adjustedFontSize(1.8) },
            textAlign: 'right',
            color:
              (accessibilityData.contrastMode || accessibilityData.darkContrast)
                ? '#FFF'
                : (accessibilityData.lightContrast ? '#000' : '#000'),
            textShadow: '4px 4px 10px rgba(0,0,0,0.3)',
          }}
          gutterBottom
        >
          ספר/י על עצמך
        </Typography>

        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item xs={12} sm={10} md={6}>
            <TextField
              label="תיאור"
              multiline
              fullWidth
              rows={5}
              maxRows={5}
              value={description}
              onChange={(e) => {
                const value = e.target.value;
                setDescription(value);
                setDescriptionError(value.split(/\r\n|\r|\n/).length > 5);
              }}
              error={descriptionError}
              helperText={descriptionError ? "לא ניתן להכניס יותר מ-5 שורות" : ""}
              sx={{
                fontSize: adjustedFontSize(1.1),
                backgroundColor: '#FFF',
                color: '#000',
                direction: 'rtl',
              }}
              inputProps={{
                maxLength: 200,
              }}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        justifyContent="center"
        spacing={2}
        sx={{ mt: 4, mb: 2 }}
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
              ml: 2,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1), inset 0 -2px 4px rgba(255, 255, 255, 0.5)",
              border: "2px solid #a3bffa",
              fontSize: adjustedFontSize(1.1),
              height: 45,
              minWidth: 120,
              borderRadius: 3,
              ...getAccessibleStyles("#ff7961", "#FFF", "#f44336", "#FFF"),
            }}
            variant="contained"
          >
            ביטול
            {accessibilityData.characterKeyShortcuts ? ' (Alt+B)' : ''}
          </Button>
        </Grid>
      </Grid>

    </DialogContent>

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

export default Edit2Mobile;
