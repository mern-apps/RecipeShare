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
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import { AddPhotoAlternate as AddPhotoIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { motion } from "framer-motion";

import { generateRecipePrompt,resetPending } from '../../actions/recipeNewForm.js';
import { fetchUnsplash,apiAIImage } from '../../actions/recipeNewForm.js';

const ImageForm = ({
  item,
  imagesFiles,
  setImagesFiles,
  imageAI,
  setimageAI,
  selectedOption,
  setSelectedOption,
   task,
   editmode,
   editbaselineimage,
  editDelete,
    setEditDelete,

}) => {

    const unsplashImagesArray = useSelector(state => state.newrecipepage.unsplashimagesarray);
    const aIImage = useSelector(state => state.newrecipepage.replicateaiimage);
    const pendingimageAI = useSelector(state => state.newrecipepage.pendingimageai);
        const pendingimageAPI = useSelector(state => state.newrecipepage.pendingimageapi);

    const  {user}  = useSelector((state) => state.auth);

       const [generalCredits, setGeneralCredits] = useState(3);
       const [localpageCredits, setLocalpageCredits] = useState(3);
       const [credits, setCredits] = useState(3);

const [baselineImageData, setBaselineImageData] = useState(null);

  const [firstSelectedOption, setFirstSelectedOption] = useState(0);
  const [notification, setNotification] = useState({ open: false, message: "" });

  const dispatch = useDispatch();

useEffect(() => {
  // ✅ Initial setup logic
   if (firstSelectedOption === 0) {
    dispatch(resetPending());
    setSelectedOption(editmode ? "restore" : "upload");
    setFirstSelectedOption(1);
  }

  // ✅ Cleanup logic on unmount
  return () => {
    imagesFiles.forEach((img) => URL.revokeObjectURL(img.preview));
    setImagesFiles([]);
  };
}, []);

useEffect(() => {
  if (user) {
    setGeneralCredits(user.creditImage);
  }
}, [user]);

useEffect(() => {
  setCredits(Math.min(generalCredits, localpageCredits));
}, [generalCredits, localpageCredits]);

//unsplash- no need of useffect for unsplash as the handleUnsplashImageClick handle the set state

//AIImage
useEffect(() => {
  const convertAIImageToFile = async () => {
    if (!aIImage) {
      setimageAI(null);
      return;
    }

    try {
      // Fetch the AI image from the URL
      const response = await fetch(aIImage);
      const blob = await response.blob();
      // Create a File object
      const file = new File([blob], "ai-generated.png", { type: blob.type });
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      // Store exactly like Dropzone format
      const imagePreview = {
        file,
        name: file.name,
        type: file.type,
        preview: previewUrl,
      };
      setimageAI(imagePreview);
    } catch (error) {
      console.error("❌ Failed to convert AI image to File:", error);
    }
  };

  convertAIImageToFile();
}, [aIImage]);

useEffect(() => {
  const hasAIImage = aIImage;
  const hasUnsplashImages = unsplashImagesArray && unsplashImagesArray.length > 0;
  if (hasAIImage || hasUnsplashImages) {
    const title = task?.title?.trim();
    const ingredients = task?.ingredients?.trim();
    setBaselineImageData({ title, ingredients });
  }
}, [aIImage,unsplashImagesArray]);


  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };


  const DropzoneUpload = (acceptedFiles) => {
    if (imagesFiles.length + acceptedFiles.length > 1) {
      setNotification({ open: true, message: "You can upload up to 1 image." });
      return;
    }
    const file = acceptedFiles[0];
    const imagePreview = {
      file,
      name: file.name,
      type: file.type,
      preview: URL.createObjectURL(file),
    };
    setImagesFiles((prevImages) => [...prevImages, imagePreview]);
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

const handleDeleteAIImage = () => {
  if (imageAI?.preview) {
    URL.revokeObjectURL(imageAI.preview);
  }
  setimageAI(null);
};





 
const HandleImageSearchAndAI = async () => {
  const title = task?.title?.trim();
  const ingredients = task?.ingredients?.trim();
    if (!title || !ingredients) {
    setNotification({
     open: true,
     message: "יש למלא כותרת ורכיבים לפני יצירת תמונה 📸",
   });
    return;
}

  const imagedata = {
    title,
    ingredients,
  };

   // Skip if same as baseline
  if (
    baselineImageData &&
    baselineImageData.title === imagedata.title &&
    baselineImageData.ingredients === imagedata.ingredients
  ) {
        console.log("⏭️ Skipping duplicate request (same as previous)");
    setNotification({
      open: true,
      message: "זהה לבקשה קודמת, מבטל קריאה חוזרת",
    });
    return;
  }

    try {
  setLocalpageCredits((prev) => Math.max(0, prev - 0.5));
      console.log("🚀 Dispatching generateRecipePrompt...");
   const PromptAPI = await dispatch(generateRecipePrompt(imagedata,selectedOption));
    console.log("✅ PromptAPI Response:", PromptAPI);

    if (!PromptAPI) {
  console.log("PromptAPI failed.");
  return;
}
const { imagePrompt, shortRecipeName } = PromptAPI;

if (selectedOption === "api") {
  if (shortRecipeName) {
    await dispatch(fetchUnsplash(shortRecipeName));
  } else {
    console.log("shortRecipeName failed.");
  }
  if (imagePrompt) {
    await dispatch(apiAIImage(imagePrompt));
    console.log(imagePrompt);
  } else {
    console.log("imagePrompt failed.");
  }
}

// ✅ If user chose AI Image first (ImageAI option)
else if (selectedOption === "ImageAI") {
  if (imagePrompt) {
    await dispatch(apiAIImage(imagePrompt));
    console.log(imagePrompt);
  } else {
    console.log("imagePrompt failed.");
  }
  if (shortRecipeName) {
    await dispatch(fetchUnsplash(shortRecipeName));
  } else {
    console.log("shortRecipeName failed.");
  }
}

dispatch(resetPending(selectedOption));

  setNotification({ open: false, message: "" });
  } catch (error) {
    console.error("Error in HandleImageSearchAndAI:", error);
    setNotification({
      open: true,
      message: "אירעה שגיאה בעת יצירת התמונה.",
    });
    dispatch(resetPending(selectedOption));
  }
};


  useEffect(() => {
   if (
    credits <= 0 &&
    (selectedOption === "ImageAI")
  ) {
    setSelectedOption("upload");
  }
}, [credits]);

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
            />
{credits > -100 && (
  <>
    <FormControlLabel
      value="ImageAI"
      control={<Radio />}
      label="צור תמונה עם AI"
    />
  </>
)}
 {/* Restore original photo option, only if in edit mode AND photo was deleted */}
    {editmode && (
    <FormControlLabel
      value="restore"
      control={<Radio />}
      label="תמונה מקורית"
    />
  )}
          </RadioGroup>
        </Grid>


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

        {/* Upload Section */}
        {selectedOption === "upload" && (
          <>
            <Grid item>
                              {imagesFiles.length === 0 && (
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
                <Typography>גרור/י או לחץ להעלאת תמונה</Typography>
              </Box>
              )}
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
       
       {/* Elegant Loading Overlay */}
<Backdrop
  sx={{
    color: "#fff",
    zIndex: (theme) => theme.zIndex.drawer + 1,
    backdropFilter: "blur(4px)",
    backgroundColor: "rgba(0,0,0,0.3)",
  }}
open={
  (pendingimageAPI === 1 && selectedOption === "api") ||
  (pendingimageAI === 1 && selectedOption === "ImageAI")
}>
  <motion.div
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.4 }}
    style={{ textAlign: "center" }}
  >
    <CircularProgress size={80} thickness={5} color="inherit" />
    <Typography
      variant="h6"
      sx={{ mt: 2, fontWeight: 500, letterSpacing: 0.5 }}
    >
      {selectedOption === "ImageAI"
        ? "יוצר תמונה עם בינה מלאכותית..."
        : "מחפש תמונות עבורך..."}
    </Typography>
  </motion.div>
</Backdrop>

         {/* Unified Box for API or AI */}
{(
  (pendingimageAPI === 0 && selectedOption === "api") ||
  (pendingimageAI === 0 && selectedOption === "ImageAI")
) && (
  <Grid item xs={12} sm={4}sx={{ display: "flex", justifyContent: "flex-start" }}>
  <Box
    sx={{
      borderRadius: 3,
      p: 3,
      backgroundColor: "#ffffff",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)", 
      border: "1px solid #e3e3e3",
      direction: "rtl",
      textAlign: "right",
    }}
  >
    {/* כותרת */}
    <Typography
      variant="h6"
      sx={{
        mb: 1,
        fontWeight: 700,
        color: "#1565c0",
        textAlign: "center",
      }}
    >
      {selectedOption === "ImageAI" ? "צור תמונה" : "חפש תמונה"}
    </Typography>

    {/* קרדיטים */}
    <Typography
      variant="body2"
      sx={{ mb: 2, textAlign: "center", color: "#555" }}
    >
      יש לך{" "}
      <span style={{ fontWeight: "bold", color: "#0d47a1" }}>{credits}</span>{" "}
      קרדיטים
    </Typography>

<Typography
  variant="body2"
  sx={{ mb: 2, textAlign: "center", color: "#777" }}
>
  התמונה מבוססת על בסיס הכותרת והמרכיבים.
  ניתן לערוך ולשנות אותם כדי לשנות את התמונה.
</Typography>

    {/* כפתור */}
    <Button
      fullWidth
      variant="contained"
      sx={{
        py: 1.2,
        fontSize: "1rem",
        fontWeight: 600,
        borderRadius: 2,
        background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
        textShadow: "0 1px 1px rgba(0,0,0,0.2)",
      }}
      onClick={() => HandleImageSearchAndAI()}
    >
      {selectedOption === "ImageAI" ? "צור תמונה" : "חפש תמונה"}
    </Button>
  </Box>
</Grid>
        )}

        {/* AI Image section */}
{selectedOption === "ImageAI" && pendingimageAI ===0 && aIImage && (
  <Grid item xs={12}>
    <Grid container spacing={4}>
      <Grid item xs={12} sm={6} md={4}>
          {/* DELETE BUTTON */}
        <IconButton
          onClick={handleDeleteAIImage}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "rgba(255,255,255,0.9)",
            "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
            border: "1px solid red",
            color: "red",
            zIndex: 10,
          }}
        >
          <DeleteIcon />
        </IconButton>

        <img
          src={aIImage}
      alt="תמונה שנוצרה על ידי AI"
          style={{
            width: "100%",
            height: "auto",
            cursor: "pointer",
            boxShadow: "0 0 20px rgba(0,0,0,0.9)",
            borderRadius: 8,
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
        />
      </Grid>
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