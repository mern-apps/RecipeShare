import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Box, Typography, Button, Snackbar, Alert } from "@mui/material";
import { useDropzone } from "react-dropzone";

// Actions
import { uploadimageadmin, deleteImageadmin } from "../../actions/imagesactions";

import SendArrayComponent from "./SendArrayComponent";


const Admin = () => {
  const dispatch = useDispatch();

  // Redux state → URLs from Amazon
const imagesTemplatesGroups = useSelector(
  (state) => state.grouppage.imagestemplates || []
);

const imagesTemplatesBooks = useSelector(
  (state) => state.currentproject.imagestemplates || []
);

  // Local state → previews before upload
  const [localGroup, setLocalGroup] = useState([]);
  const [localBook, setLocalBook] = useState([]);
  const [notification, setNotification] = useState({ open: false, message: "" });

  // Extract S3 key from URL
  const extractKeyFromUrl = (url) => {
    try {
      const pathname = new URL(url).pathname; // key
      return pathname.substring(1); // remove leading slash
    } catch (e) {
      console.error("Invalid URL:", url);
      return null;
    }
  };

  // Dropzone
  const DropzoneUpload = useCallback((acceptedFiles, section) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    const imagePreview = {
      file,
      name: file.name,
      type: file.type,
      preview: URL.createObjectURL(file),
      uploaded: false,
    };

    if (section === "groups") setLocalGroup([imagePreview]);
    if (section === "books") setLocalBook([imagePreview]);
  }, []);

  const { getRootProps: getRootGroupsProps, getInputProps: getInputGroupsProps } = useDropzone({
    accept: { "image/jpeg": [], "image/png": [], "image/gif": [] },
    maxFiles: 1,
    maxSize: 5242880,
    onDrop: (files) => DropzoneUpload(files, "groups"),
  });

  const { getRootProps: getRootBooksProps, getInputProps: getInputBooksProps } = useDropzone({
    accept: { "image/jpeg": [], "image/png": [], "image/gif": [] },
    maxFiles: 1,
    maxSize: 5242880,
    onDrop: (files) => DropzoneUpload(files, "books"),
  });

  // Delete **local** preview only
  const handleDeleteLocal = (image, section) => {
    if (section === "groups") {
      setLocalGroup((prev) => prev.filter((i) => i.preview !== image.preview));
    }
    if (section === "books") {
      setLocalBook((prev) => prev.filter((i) => i.preview !== image.preview));
    }
  };

  // Delete **server** file (Amazon + MongoDB)
  const handleDeleteServer = (url) => {
    const key = extractKeyFromUrl(url);
    if (!key) return;
        const fileDetails = {
      key,// S3 key
      operation: "delete" 
    };
    dispatch(deleteImageadmin(fileDetails));
  };

  // Upload to server
  const handleUploadToServer = async (image, section) => {
    if (!image.file) return;

    const fileDetails = {
      fileName: image.name,
      fileType: image.type,
      operation: "upload",
      section,
    };

    await dispatch(uploadimageadmin(image.file, fileDetails));
    image.uploaded = true;
    setNotification({ open: true, message: "Image uploaded to server!" });
  };

  const handleCloseNotification = () => {
    setNotification({ open: false, message: "" });
  };

  // Render images
  const renderImageList = (images, sectionName, isLocal = false) => (
    <Grid container spacing={2}>
      {images.map((img, index) => {
        const src = isLocal ? img.preview : img;

        return (
          <Grid item key={`${sectionName}-${index}`} xs={12} sm={6} md={4}>
            <Box sx={{ position: "relative", border: "1px solid #ccc", borderRadius: 1, overflow: "hidden" }}>
              <img src={src} alt={`template-${index}`} style={{ width: "100%", height: 150, objectFit: "cover" }} />

              {isLocal ? (
                <Box sx={{ position: "absolute", top: 8, right: 8, display: "flex", flexDirection: "column", gap: 1 }}>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDeleteLocal(img, sectionName)}
                  >
                    Delete Local
                  </Button>
                  {!img.uploaded && (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleUploadToServer(img, sectionName)}
                    >
                      Upload to Server
                    </Button>
                  )}
                </Box>
              ) : (
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  sx={{ position: "absolute", top: 8, right: 8 }}
                  onClick={() => handleDeleteServer(img)}
                >
                  Delete from Server
                </Button>
              )}
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );

  return (
    <Box sx={{ p: 3 }}>
      {/* Groups Section */}
      <Typography variant="h5" sx={{ mb: 2 }}>
        Images Templates Groups
      </Typography>
      {renderImageList(localGroup.length ? localGroup : imagesTemplatesGroups, "groups", !!localGroup.length)}
      <Box
        {...getRootGroupsProps()}
        sx={{ mt: 2, p: 2, border: "2px dashed #3498db", borderRadius: 2, textAlign: "center", cursor: "pointer" }}
      >
        <input {...getInputGroupsProps()} />
        <Typography>Drag & drop an image here, or click to select (max 1)</Typography>
      </Box>

      {/* Books Section */}
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Images Templates Books
      </Typography>
      {renderImageList(localBook.length ? localBook : imagesTemplatesBooks, "books", !!localBook.length)}
      <Box
        {...getRootBooksProps()}
        sx={{ mt: 2, p: 2, border: "2px dashed #3498db", borderRadius: 2, textAlign: "center", cursor: "pointer" }}
      >
        <input {...getInputBooksProps()} />
        <Typography>Drag & drop an image here, or click to select (max 1)</Typography>
      </Box>

<Box sx={{ mt: 5 }}>
        <SendArrayComponent />
      </Box>


      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" onClose={handleCloseNotification}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Admin;
