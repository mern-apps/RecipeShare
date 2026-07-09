import React, { useState, useEffect } from "react";
 import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  Box,
  TextField,
  Grid,
  Typography,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import { AddPhotoAlternate as AddPhotoIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { motion } from "framer-motion";

const ImageForm = ({
  item,
  imagesFiles,
  setImagesFiles,
  selectedTemplate,
  setSelectedTemplate,
  selectedOption,
  setSelectedOption,
   task,
   editbaselineimage,
  editDelete,
    setEditDelete,

}) => {

    const  {user}  = useSelector((state) => state.auth);
const pagemode2 = useSelector((state) => state.grouppage.pagemode);

        const imagesTemplates = useSelector(
            (state) => state.currentproject.imagestemplates || []
  );

  const [firstSelectedOption, setFirstSelectedOption] = useState(0);
  const [notification, setNotification] = useState({ open: false, message: "" });

  const dispatch = useDispatch();

useEffect(() => {
  // ✅ Initial setup logic
   if (firstSelectedOption === 0) {
setSelectedOption(pagemode2 === "edit" ? "restore" : "templates");
    setFirstSelectedOption(1);
  }

  // ✅ Cleanup logic on unmount
  return () => {
    imagesFiles.forEach((img) => URL.revokeObjectURL(img.preview));
    setImagesFiles([]);
  };
}, []);


  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const DropzoneUpload = (acceptedFiles) => {
    if (imagesFiles.length + acceptedFiles.length > 5) {
      setNotification({ open: true, message: "You can upload up to 5 images." });
      return;
    }
    const file = acceptedFiles[0];
    const imagePreview = {
      file,
      name: file.name,
      type: file.type,
      preview: URL.createObjectURL(file),
    };
setImagesFiles([imagePreview]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/gif": [],
    },
    maxFiles: 1,
    maxSize: 5242880,
    onDrop: (acceptedFiles) => DropzoneUpload(acceptedFiles),
  });

  const handleImageDelete = (index) => {
  setImagesFiles((prevImages) => {
    URL.revokeObjectURL(prevImages[index].preview);
    return prevImages.filter((_, i) => i !== index);
  });
};

const handleDeleteTemplates = () => {
  selectedTemplate(null);
};

 
  return (
    <div>
      <Grid container spacing={2}>

         {/* Radio Buttons */}
        <Grid item xs={12}>
     <RadioGroup
  aria-label="options"
  name="options"
  value={selectedOption}
  onChange={(e) => {
    handleRadioChange(e); // update selectedOption
    if (e.target.value === "restore") {
      setEditDelete(false); // restore original image
    }
  }}
  row
>
            <FormControlLabel
              value="upload"
              control={<Radio />}
      label="העלה/י תמונה "
          sx={{ '& .MuiTypography-root': { fontSize: '1.3rem' } }}
            />
  <>
    <FormControlLabel
      value="templates"
      control={<Radio />}
      label="בחר תמונה מרשימה"
          sx={{ '& .MuiTypography-root': { fontSize: '1.3rem' } }}
    />
  </>

 {/* Restore original photo option, only if in edit mode AND photo was deleted */}
{pagemode2 === "edit" && (
    <FormControlLabel
      value="restore"
      control={<Radio />}
      label="תמונה מקורית"
          sx={{ '& .MuiTypography-root': { fontSize: '1.3rem' } }}
    />
  )}
          </RadioGroup>
        </Grid>


{/* Baseline/Edit Image Section */}
{pagemode2 === "edit" && editbaselineimage && selectedOption === "restore" && (
    <Grid item xs={12} sm={6} md={4} sx={{ position: "relative" }}>
    <img
      src={editbaselineimage}
      alt="תמונה בסיסית"
      style={{
        width: "100%",
        height: "auto",
        objectFit: "cover",
        borderRadius: 8,
        border: "1px solid #ccc",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        cursor: "pointer",
      }}
    />

  </Grid>
)}

        {/* Upload Section */}
        {selectedOption === "upload" && (
          <>
            <Grid item>
              <Box
                {...getRootProps()}
                sx={{
                  border: "2px dashed #ccc",
                  borderRadius: 2,
                  p: 2,
                  textAlign: "center",
                  cursor: "pointer",
                  color: "#777",
                  transition: "0.3s",
                  "&:hover": { borderColor: "#1976d2", color: "#1976d2" },
                }}
              >
                <input {...getInputProps()} />
                <AddPhotoIcon fontSize="large" />
                <Typography>גרור/י או לחץ להעלאת תמונה (עד 5)</Typography>
              </Box>
            </Grid>

              {imagesFiles.length > 0 && (
                <Grid container spacing={1} sx={{ mt: 1 }}>
                  {imagesFiles.map((img, index) => (
                    <Grid item key={index} sx={{ position: "relative" }}>
                      <IconButton
                        onClick={() => handleImageDelete(index)}
                        sx={{ position: "absolute", top: 0, right: 0, color: "red" }}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <img
                        src={img.preview}
                        alt={`preview-${index}`}
                        style={{
                          width: 100,
                          height: 100,
                          objectFit: "cover",
                          borderRadius: 8,
                          border: "1px solid #ccc",
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              )}
          </>
        )}
       
        {/* selectedTemplate Image section */}
{selectedOption === "templates" && (
  <Grid item xs={12}>
    <Grid
      container
      spacing={3}
      sx={{ direction: "rtl" }}
    >
      {imagesTemplates?.length > 0 ? (
        imagesTemplates.map((imgUrl, index) => {
          const isSelected = selectedTemplate === imgUrl;

          return (
<Grid item key={index} md="auto">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedTemplate(imgUrl)}
                style={{ cursor: "pointer" }}
              >
             <Box
  sx={{
    width: "100%",
    maxWidth: 140,
    aspectRatio: "210 / 297",
    mx: "auto",
    borderRadius: 3,
    overflow: "hidden",
    border: isSelected
      ? "4px solid #1976d2"
      : "3px solid transparent",
    boxShadow: isSelected
      ? "0 0 12px rgba(25,118,210,0.6)"
      : "0 3px 12px rgba(0,0,0,0.1)",
    transition: "0.3s ease",
    backgroundColor: "#fafafa",
  }}
>
                 
                  <img
  src={imgUrl}
  alt={`template-${index}`}
  style={{
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  }}
/>

                </Box>
              </motion.div>
            </Grid>
          );
        })
      ) : (
        <Grid item xs={12}>
          <Typography
            sx={{ textAlign: "center", color: "gray", mt: 3 }}
          >
            אין תבניות להצגה כרגע
          </Typography>
        </Grid>
      )}
    </Grid>
  </Grid>
)}


              <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={() => setNotification({ open: false, message: "" })}
      >
        <Alert severity="info">{notification.message}</Alert>
      </Snackbar>

        </Grid>
    </div>
  );
};

export default ImageForm;