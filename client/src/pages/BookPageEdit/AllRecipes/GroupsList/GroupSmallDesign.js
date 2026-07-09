import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";

const GroupSmallDesign = ({ task }) => {
  if (!task) return null;

  const { image, title, recipesNum, booksNum, usersNum } = task;

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 220, damping: 24 }}
      style={{ cursor: "pointer" }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 260,
          borderRadius: 2.5,
          overflow: "hidden",
          boxShadow: "0 3px 10px rgba(0,0,0,0.12)",
          background: "#fff",
        }}
      >
        {/* ================= IMAGE (MINI A4 POSTER) ================= */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            aspectRatio: "1 / 1.25", // visual A4-like but compact
          }}
        >
          <CardMedia
            component="img"
            image={image}
            alt=""
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          {/* Dark overlay like poster */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.35)",
            }}
          />

          {/* ===== TITLE (CENTERED, PROPORTIONAL TO A4) ===== */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              px: 2,
              textAlign: "center",
              pointerEvents: "none",
            }}
          >
            <Typography
              component="div"
              sx={{
                color: "#fff",
                fontWeight: 800,
                fontSize: "1.15rem",   // ⬅️ scaled-down from 7rem A4
                lineHeight: 1.2,
                textShadow: "2px 2px 6px rgba(0,0,0,0.5)",

                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",

                "& *": {
                  fontSize: "inherit !important",
                  lineHeight: "inherit !important",
                  color: "inherit",
                  margin: 0,
                },
              }}
              dangerouslySetInnerHTML={{ __html: title }}
            />
          </Box>
        </Box>

        {/* ================= INFO (COMPACT, RIGHT ALIGNED) ================= */}
        <CardContent
          sx={{
            pt: 0.6,
            pb: 0.5,
            px: 1.2,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 0.25,
            textAlign: "right",
            direction: "rtl",
          }}
        >
          <Box display="flex" alignItems="center" gap={0.4}>
            <Typography fontSize="1.5rem" fontWeight={400}>
              {recipesNum} מתכונים
            </Typography>
            <RestaurantMenuIcon sx={{ fontSize: 14 }} />
          </Box>

          <Box display="flex" alignItems="center" gap={0.4}>
            <Typography fontSize="1.5rem" fontWeight={400}>
              {booksNum} ספרים
            </Typography>
            <CollectionsBookmarkIcon sx={{ fontSize: 14 }} />
          </Box>

          <Box display="flex" alignItems="center" gap={0.4}>
            <Typography fontSize="1.5rem" fontWeight={400}>
              {usersNum} משתמשים
            </Typography>
            <PeopleAltOutlinedIcon sx={{ fontSize: 14 }} />
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default GroupSmallDesign;
