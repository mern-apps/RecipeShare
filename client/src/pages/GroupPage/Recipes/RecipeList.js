import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import RecipeSmallDesign from "./RecipeSmallDesign";
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
        justifyContent: "flex-end",
        gap: 5,
      }}
    >
      {items.map((task) => {
        const canDelete = canDeleteTask(task);

        return (
          <Box
            key={task._id}
            sx={{
              width: "calc(33.333% - 40px)",
              minWidth: 260,
              boxSizing: "border-box",
            }}
          >
            {/* MAIN CARD */}
            <Box
              onClick={() => handleClick(task)}
              sx={{
                width: "100%",
                borderRadius: 3,
                position: "relative",
                cursor: "pointer",
                transition: "all 0.25s ease",
                border: "1px solid #e5e7eb",
                boxShadow: "0 4px 12px rgba(0,0,0,0.06)",

                // 🌟 HOVER ONLY (NO SELECT STATE)
                "&:hover": {
                  transform: "translateY(-6px) scale(1.02)",
                  boxShadow: "0 18px 40px rgba(107,75,204,0.18)",
                  border: "1px solid rgba(107,75,204,0.35)",
                },
              }}
            >
              <RecipeSmallDesign task={task} />
            </Box>

            {/* ACTION ROW */}
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
                    fontSize: 20,
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