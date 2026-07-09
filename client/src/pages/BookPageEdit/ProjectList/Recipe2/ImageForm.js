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
   editmode,
   editbaselineimage,
  editDelete,
    setEditDelete,

}) => {

    const  {user}  = useSelector((state) => state.auth);

        const imagesTemplates = useSelector(
            (state) => state.currentproject.imagestemplates || []
  );

  const [firstSelectedOption, setFirstSelectedOption] = useState(0);
  const [notification, setNotification] = useState({ open: false, message: "" });

  const dispatch = useDispatch();

useEffect(() => {
  // ✅ Initial setup logic
   if (firstSelectedOption === 0) {
    setSelectedOption(editmode ? "restore" : "templates");
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