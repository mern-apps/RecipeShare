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
import NewFormGroupAndBook from '../../ComponentsMobile/SmallCards/NewFormGroupAndBook.js';

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
>
            <FormControlLabel
              value="upload"
              control={<Radio />}
      label="העלה/י תמונה "
          sx={{ '& .MuiTypography-root': { fontSize: '1.1rem' } }}
            />
  <>
    <FormControlLabel
      value="templates"
      control={<Radio />}
      label="בחר תמונה מרשימה"
          sx={{ '& .MuiTypography-root': { fontSize: '1.1rem' } }}
    />
  </>

          </RadioGroup>
        </Grid>


{/* Baseline/Edit Image Section */}
{pagemode2 === "edit" && editbaselineimage && selectedOption === "restore" && (
    <Grid item xs={12} sm={6} md={4} sx={{ position: "relative" }}>
 <NewFormGroupAndBook
              item={task}
              imageSrc={editbaselineimage}
            />

  </Grid>
)}

        {/* Upload Section */}
        {selectedOption === "upload" && (
          <>

{imagesFiles.length === 0 ? (
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
        "&:hover": {
          borderColor: "#1976d2",
          color: "#1976d2",
        },
      }}
    >
      <input {...getInputProps()} />
      <AddPhotoIcon fontSize="large" />
      <Typography>
        גרור/י או לחץ להעלאת תמונה
      </Typography>
    </Box>
  </Grid>
) : (
  <Grid container spacing={1} sx={{ mt: 1 }}>
    {imagesFiles.length === 1 ? (
      <Grid item sx={{ position: "relative" }}>
        <IconButton
          onClick={() => handleImageDelete(0)}
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            color: "red",
            zIndex: 10,
          }}
        >
          <DeleteIcon />
        </IconButton>

       <NewFormGroupAndBook
          item={task}
          imageSrc={imagesFiles[0].preview}
        />
      </Grid>
    ) : (
      imagesFiles.map((img, index) => (
        <Grid item key={index} sx={{ position: "relative" }}>
          <IconButton
            onClick={() => handleImageDelete(index)}
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              color: "red",
            }}
          >
            <DeleteIcon />
          </IconButton>

         <NewFormGroupAndBook
              item={task}
          imageSrc={img.preview}
            />
        </Grid>
      ))
    )}
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