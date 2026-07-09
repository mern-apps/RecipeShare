import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Badge, Typography, Grid, IconButton, Checkbox,Box } from '@mui/material';
import AddPhotoIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';

const Edit2ImagesComponent = ({
  imagesprevious,
  imagesnew,
  setImagesprevious,
  setImagesnew,
  setImagestodelete,
 mainimage,
  setMainimage,
  setNotification
}) => {


   const  {user}  = useSelector((state) => state.auth);


  const [tempNumber, setTempNumber] = useState(0);



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
                                   break;
                                   case "B":
                                     break;
                                             default:
                                               break;
                                           }
                                         };
                                     
                                         window.addEventListener("keydown", handleKeyDown);
                                         return () => window.removeEventListener("keydown", handleKeyDown);
                                       }, []);


      useEffect(() => {
  if (imagesprevious && imagesprevious.length > 0 && tempNumber === 0) {
    setMainimage({
      type: "previous",
      URL: imagesprevious[0],
      index: 0,
    });

  setTempNumber(tempNumber + 1);

  }
  // runs only once when the component mounts
}, [imagesprevious]);

  
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

    if (imagesprevious.length + imagesnew.length >= 5) {
        setNotification({ open: true, message: 'You can upload up to 5 images.' });
        return;
      }
    const file = acceptedFiles[0]; 
    const imagePreview = {
      file,
      name: file.name,
      type: file.type, 
      preview: URL.createObjectURL(file),
    };
    setImagesnew((prevImages) => [...prevImages, imagePreview]);

if (imagesprevious.length === 0 && !mainimage.URL) {
      setMainimage({
        type: "new",
        URL: imagePreview.preview,
        index: 0,
      });
    }
  };


const handleDeleteFromNew = (index) => {
  setImagesnew((prevImages) => {
    const newImages = prevImages.filter((_, i) => i !== index);

    if (mainimage.type === "new") {
      if (mainimage.index === index) {
        // Deleted image IS the main image
        if (newImages.length > 0) {
          setMainimage({
            type: "new",
            URL: newImages[0].preview,
            index: 0,
          });
        } else if (imagesprevious.length > 0) {
          setMainimage({
            type: "previous",
            URL: imagesprevious[0],
            index: 0,
          });
        } else {
          setMainimage({
            type: "",
            URL: "",
            index: null,
          });
        }
      } else if (mainimage.index > index) {
        // Deleted image was before the main image
        setMainimage((prev) => ({
          ...prev,
          index: prev.index - 1,
        }));
      }
    }

    return newImages;
  });
};





  const handleDeleteFromPrevious = (index) => {
  const imageToDelete = imagesprevious[index];
  setImagestodelete((prevToDelete) => [...prevToDelete, imageToDelete]);

  setImagesprevious((prevImages) => {
    const newImages = prevImages.filter((_, i) => i !== index);

    // Check if the deleted image was the main image
if (mainimage.type === "previous") {
         if (mainimage.index === index) {
    // The deleted image WAS the main image
              if (newImages.length > 0) {
                setMainimage({
                  type: "previous",
                  URL: newImages[0],
                  index: 0,
                });
              } else if (imagesnew.length > 0) {
                setMainimage({
                  type: "new",
                  URL: imagesnew[0].preview,
                  index: 0,
                });
              } else {
                setMainimage({
                  type: "",
                  URL: "",
                  index: null,
                });
              }
  }    else if (mainimage.index > index) {
    // Deleted something before the main image, shift index down by 1
          setMainimage((prev) => ({
            ...prev,
            index: prev.index - 1,
          }));
        }
}

    return newImages;
  });

};




const handleCheck = (type, index) => {
  // If already the same image, do nothing
  if (mainimage.type === type && mainimage.index === index) {
    return;
  }

  if (type === "previous") {
    const selected = imagesprevious[index];
    // Move selected to first position
    const newImagesPrev = [selected, ...imagesprevious.filter((_, i) => i !== index)];
    setImagesprevious(newImagesPrev);
    setMainimage({
      type: "previous",
      URL: selected,
      index: 0, // always 0 because it's now first
    });
  } else if (type === "new") {
    const selected = imagesnew[index];
    // Move selected to first position
    const newImagesNew = [selected, ...imagesnew.filter((_, i) => i !== index)];
    setImagesnew(newImagesNew);
    setMainimage({
      type: "new",
      URL: selected.preview,
      index: 0, // always 0 because it's now first
    });
  }
};

  return (
    <div>
      <Typography
                            variant="body1"
                            sx={{
                              textDecoration: accessibilityData.contrastMode ? 'underline' : 'none',
                              fontSize: adjustedFontSize(1.4),
                              textAlign: 'right',
                              color: '#000',
                               textShadow: '4px 4px 10px rgba(0, 0, 0, 0.3)',
                            }}
                            gutterBottom
                          >
        
       
         </Typography>
       <Typography
                                                          variant="h6"
                                                          display="block"
                                                          sx={{
                                                            marginTop: '40px',
                                                            textDecoration: accessibilityData.contrastMode ? 'underline' : 'none',
                                                            fontSize: adjustedFontSize(1.8),
                                                            textAlign: 'right',
                                                            color: 
                                                            (accessibilityData.contrastMode || accessibilityData.darkContrast) 
                                                              ? '#FFF' 
                                                              : (accessibilityData.lightContrast ? '#000' : '#000'),
                                                            textShadow: '4px 4px 10px rgba(0, 0, 0, 0.3)',
                                                          }}
                                                          gutterBottom
                                                        >
 לחץ להעלאת תמונות 
        (עד 5)
          </Typography>



<Grid container spacing={2} sx={{ mb: 1, flexDirection: 'column' }}>
  {/* Dropzone */}
  <Grid item sx={{ width: 'auto' }}>
    <Box
      {...getRootProps()}
      sx={{
        border: '2px dashed #ccc',
        borderRadius: 2,
        textAlign: 'center',
        cursor: 'pointer',
        width: 200,
      }}
    >
      <input {...getInputProps()} />
      <AddPhotoIcon fontSize="large" />

          <Typography
                                                          variant="h6"
                                                          display="block"
                                                          sx={{
                                                            textDecoration: accessibilityData.contrastMode ? 'underline' : 'none',
                                                            fontSize: adjustedFontSize(1),
                                                            textAlign: 'right',
                                                            color: 
                                                            (accessibilityData.contrastMode || accessibilityData.darkContrast) 
                                                              ? '#FFF' 
                                                              : (accessibilityData.lightContrast ? '#000' : '#000'),
                                                            textShadow: '4px 4px 10px rgba(0, 0, 0, 0.3)',
                                                          }}
                                                          gutterBottom
                                                        >
        גרור ושחרר או לחץ להעלאת תמונות
          </Typography>


    </Box>
  </Grid>

  {/* Main Image Preview */}
  {mainimage?.URL && (
    <Grid item sx={{ width: 'auto' }}>

      
          <Typography
                                                          variant="h6"
                                                          display="block"
                                                          sx={{
                                                            textDecoration: accessibilityData.contrastMode ? 'underline' : 'none',
                                                            fontSize: adjustedFontSize(1.2),
                                                            textAlign: 'right',
                                                            color: 
                                                            (accessibilityData.contrastMode || accessibilityData.darkContrast) 
                                                              ? '#FFF' 
                                                              : (accessibilityData.lightContrast ? '#000' : '#000'),
                                                            textShadow: '4px 4px 10px rgba(0, 0, 0, 0.3)',
                                                          }}
                                                          gutterBottom
                                                        >
        תמונה ראשית
          </Typography>


      <Box
        component="img"
        src={mainimage.URL}
        alt="תמונה ראשית"
        sx={{
          width: 100,
          height: 100,
          objectFit: 'cover',
          borderRadius: 2,
          border: '3px solid blue',
          boxShadow: 1,
        }}
      />
    </Grid>
  )}
</Grid>





      <Grid container spacing={2}>
        {/* Previous Images */}
        {imagesprevious && imagesprevious.length > 0 && (
          <Grid item xs={6}>

              <Typography
                                                          variant="h6"
                                                          display="block"
                                                          sx={{
                                                            marginTop: '10px',
                                                            textDecoration: accessibilityData.contrastMode ? 'underline' : 'none',
                                                            fontSize: adjustedFontSize(1.4),
                                                            textAlign: 'right',
                                                            color: 
                                                            (accessibilityData.contrastMode || accessibilityData.darkContrast) 
                                                              ? '#FFF' 
                                                              : (accessibilityData.lightContrast ? '#000' : '#000'),
                                                            textShadow: '4px 4px 10px rgba(0, 0, 0, 0.3)',
                                                          }}
                                                          gutterBottom
                                                        >
        תמונות קודמות
          </Typography>

            <Grid container spacing={2}>
             {imagesprevious.map((image, index) => (
  <Grid item xs={2} key={index} sx={{ textAlign: 'center' }}>
 <Checkbox
      checked={mainimage.type === "previous" && mainimage.index === index}
        onChange={() => handleCheck("previous", index)}
      sx={{
        mb: 0.5, // space below checkbox
        bgcolor: 'background.paper',
        borderRadius: '50%',
        boxShadow: 1,
        p: 0.5,
        cursor: 'pointer',
        '& svg': {
          fontSize: 20,
        },
        '&:hover': {
          bgcolor: 'action.hover',
        },
      }}
    />
<Typography
  sx={{
    textDecoration: accessibilityData.contrastMode ? 'underline' : 'none',
    fontSize: adjustedFontSize(.8),
    fontWeight: 'bold',
    textAlign: 'right',
    color:
      mainimage.type === "previous" && mainimage.index === index
        ? (accessibilityData.contrastMode || accessibilityData.darkContrast) 
          ? '#FFF'
          : '#0000FF' // blue for normal mode when selected
        : 'transparent', // hide if not main
    textShadow: '4px 4px 10px rgba(0, 0, 0, 0.3)',
    minHeight: '1.5em', // ensures consistent vertical space
  }}
>
  {mainimage.type === "previous" && mainimage.index === index ? 'תמונה ראשית' : '\u00A0'}
</Typography>


      <img
        src={image}
        alt={`תצוגה מקדימה ${index + 1}`}
        style={{
          width: 70,
          height: 70,
          objectFit: 'cover',
          borderRadius: 8,
          border: mainimage.type === "previous" && mainimage.index === index 
            ? '5px solid blue' 
            : 'none',
        }}
      />
    <IconButton
      style={{
        display: 'block',
        margin: '5px auto',
        color: 'red',
      }}
      onClick={() => handleDeleteFromPrevious(index)}
    >
      <DeleteIcon />
    </IconButton>
  </Grid>
))}

            </Grid>
          </Grid>
        )}

        {/* New Images */}
        {imagesnew && imagesnew.length > 0 && (
          <Grid item xs={6}>
               <Typography
                                                          variant="h6"
                                                          display="block"
                                                          sx={{
                                                            marginTop: '10px',
                                                            textDecoration: accessibilityData.contrastMode ? 'underline' : 'none',
                                                            fontSize: adjustedFontSize(1.4),
                                                            textAlign: 'right',
                                                            color: 
                                                            (accessibilityData.contrastMode || accessibilityData.darkContrast) 
                                                              ? '#FFF' 
                                                              : (accessibilityData.lightContrast ? '#000' : '#000'),
                                                            textShadow: '4px 4px 10px rgba(0, 0, 0, 0.3)',
                                                          }}
                                                          gutterBottom
                                                        >
        תמונות חדשות
          </Typography>


            <Grid container spacing={2}>
              {imagesnew.map((imagePreview, index) => (
         <Grid item xs={2} key={index} sx={{ textAlign: 'center' }}>
  <Checkbox
      checked={mainimage.type === "new" && mainimage.index === index}
  onChange={() => handleCheck("new", index)}
      sx={{
        mb: 0.5, // margin bottom for spacing
        bgcolor: 'background.paper',
        borderRadius: '50%',
        boxShadow: 1,
        p: 0.5,
        '& svg': {
          fontSize: 20,
        },
        '&:hover': {
          bgcolor: 'action.hover',
        },
      }}
    />

    <Typography
  sx={{
    textDecoration: accessibilityData.contrastMode ? 'underline' : 'none',
    fontSize: adjustedFontSize(.8),
    fontWeight: 'bold',
    textAlign: 'right',
    color:
      mainimage.type === "new" && mainimage.index === index
        ? (accessibilityData.contrastMode || accessibilityData.darkContrast) 
          ? '#FFF'
          : '#0000FF' // blue for normal mode when selected
        : 'transparent', // hide if not main
    textShadow: '4px 4px 10px rgba(0, 0, 0, 0.3)',
    minHeight: '1.5em', // ensures consistent vertical space
  }}
>
  {mainimage.type === "new" && mainimage.index === index ? 'תמונה ראשית' : '\u00A0'}
</Typography>


  <img
    src={imagePreview.preview}
    alt={`תצוגה מקדימה ${index + 1}`}
    style={{
      width: 70,
      height: 70,
      objectFit: 'cover',
      borderRadius: 8,
      border: mainimage.type === "new" && mainimage.index === index
        ? '5px solid blue'
        : 'none',
    }}
  />

    <IconButton
      style={{
        display: 'block',
        margin: '5px auto',
        color: 'red',
      }}
      onClick={() => handleDeleteFromNew(index)}
    >
      <DeleteIcon />
    </IconButton>
  </Grid>
))}
            </Grid>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default Edit2ImagesComponent;