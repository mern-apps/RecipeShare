import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import RecipeSmallDesign from '../../../ComponentsMobile/SmallCards/RecipeSmallDesign.js';

import { removerecipefromgroup } from "../../../actions/groupactions.js";
import { currentrecipe, setpagemode } from "../../../actions/recipeNewForm.js";

const RecipeList = ({ items }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const currentGroup = useSelector((state) => state.grouppage.currentgroup);

  if (!items || items.length === 0) return null;

  const handleClick = (task) => {
    dispatch(currentrecipe(task));
    dispatch(setpagemode("view"));
    navigate(`/recipe/${task._id}`);
  };

  // ✅ permission logic
  const canDeleteTask = (task) => {
    if (!task || !user) return false;

    const userId = String(user?._id);

    const isTaskOwner = task?.owner && String(task.owner) === userId;

    const isGroupOwner =
      currentGroup?.owner?.some((id) => String(id) === userId);

    return isTaskOwner || isGroupOwner;
  };

return (
  <Box
    sx={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center", // ✅ מרכז אמיתי
      gap: 3,
      width: "100%",
    }}
  >
    {items.map((task) => {
      const canDelete = canDeleteTask(task);

      return (
        <Box
          key={task._id}
          sx={{
            width: {
              xs: "100%",   // 📱 mobile
              sm: "48%",    // tablet
              md: "32%",    // desktop
            },
            minWidth: 260,
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "center", // ✅ card centered inside column
          }}
        >
          {/* ================= MAIN CARD ================= */}
          <Box
            onClick={() => handleClick(task)}
          >
            <RecipeSmallDesign task={task} />
          </Box>

          {/* ================= ACTION ROW ================= */}
          {canDelete && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 0.5,
                gap: 0.5,
                color: "#ef4444",
                cursor: "pointer",
                userSelect: "none",
                transition: "all 0.2s ease",

                "&:hover": {
                  transform: "translateY(-2px)",
                  color: "#dc2626",
                },
              }}
              onClick={(e) => {
                e.stopPropagation();

                const apiPayload = {
                  recipeId: task._id,
                  groupId: currentGroup._id,
                };

                dispatch(removerecipefromgroup(apiPayload));
              }}
            >
              <Tooltip title="מחיקה מהקבוצה">
                <IconButton
                  size="small"
                  sx={{
                    color: "#ef4444",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      color: "#dc2626",
                      transform: "rotate(180deg) scale(1.15)",
                    },
                  }}
                >
                  <ExitToAppIcon sx={{ transform: "rotate(180deg)" }} />
                </IconButton>
              </Tooltip>

              <Box
                sx={{
                  fontSize: 16,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    fontWeight: 600,
                  },
                }}
              >
                מחיקה מהקבוצה
              </Box>
            </Box>
          )}
        </Box>
      );
    })}
  </Box>
);
};

export default RecipeList;