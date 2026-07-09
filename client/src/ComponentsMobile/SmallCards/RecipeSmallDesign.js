import React, { useState ,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from '@mui/material';

const RecipeSmallDesign = ({ task }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
const [openSnackbar, setOpenSnackbar] = useState(false);

   useEffect(() => {
  console.log("dnd small - dispatching newformID(null)",task);
}, []);

return (
  <Box
    sx={{
      width: 280,
      height: 265,
      borderRadius: 3,
      display: "flex",
      flexDirection: "column",
      boxShadow: 3,
      transition: "0.3s",
      direction: "rtl",
      cursor: "pointer",
      overflow: "hidden",
      bgcolor: "#fff",

      "&:hover": {
        boxShadow: 5,
        transform: "translateY(-2px) scale(1.02)",
      },
    }}
  >
    {/* IMAGE */}
    <Box
      component="img"
      src={task.image}
      alt={task.title}
      sx={{
        width: "100%",
        height: 180,
        objectFit: "cover",
      }}
    />

    {/* CONTENT */}
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        px: 1,
        overflow: "hidden",
      }}
    >
      {/* TITLE */}
      <Typography
        sx={{
          textAlign: "right",
          fontWeight: "bold",
          fontSize: "1.3rem",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          width: "100%",
        }}
      >
        {task.title}
      </Typography>

      {/* AUTHOR */}
      {task.author && (
        <Typography
          sx={{
            textAlign: "right",
            fontSize: "1.2rem",
            color: "text.secondary",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
            mt: 0.2,
          }}
        >
          {task.author}
        </Typography>
      )}
    </Box>
  </Box>

);
};

export default RecipeSmallDesign;