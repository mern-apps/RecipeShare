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
import NewFormGroupAndBook from '../../../../ComponentsMobile/SmallCards/NewFormGroupAndBook.js';

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
{/* Baseline/Edit Image Section */}
{editmode && editbaselineimage && selectedOption === "restore" && (
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
          whileHover={{ scale: isSelected ? 1.06 : 1.03 }}
          whileTap={{ scale: 0.97 }}
          animate={{
            scale: isSelected ? 1.04 : 1,
          }}
          transition={{
            duration: 0.3,
          }}
          onClick={() => setSelectedTemplate(imgUrl)}
          style={{ cursor: "pointer" }}
        >
          <Box
            sx={{
              position: "relative",
              borderRadius: "20px",
              overflow: "hidden",

              border: isSelected
                ? "3px solid #1976d2"
                : "2px solid transparent",

              boxShadow: isSelected
                ? "0 0 30px rgba(25,118,210,0.45), 0 12px 40px rgba(25,118,210,0.25)"
                : "0 4px 12px rgba(0,0,0,0.08)",

              transform: isSelected
                ? "translateY(-4px)"
                : "translateY(0)",

              transition: "all 0.35s ease",

              "&::before": isSelected
                ? {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(135deg, rgba(25,118,210,0.15), rgba(66,165,245,0.05))",
                    zIndex: 1,
                    pointerEvents: "none",
                  }
                : {},
            }}
          >
            {isSelected && (
              <Box
                sx={{
                  position: "absolute",
                  top: 12,
                  zIndex: 10,
                  background:
                    "linear-gradient(135deg,#1976d2,#42a5f5)",
                  color: "#fff",
                  px: 1,
                  py: 0.5,
                  borderRadius: "999px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  boxShadow:
                    "0 4px 12px rgba(25,118,210,0.35)",
                }}
              >
                ✓
              </Box>
            )}

            <NewFormGroupAndBook
              item={task}
              imageSrc={imgUrl}
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