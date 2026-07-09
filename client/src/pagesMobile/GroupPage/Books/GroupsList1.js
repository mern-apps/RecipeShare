import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Box, IconButton, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";

import GroupSmallDesign from '../../../ComponentsMobile/SmallCards/GroupSmallDesign.js';

import { fetchBookById, setpagemode } from "../../../actions/bookPageActions.js";
import { removebookfromgroup } from "../../../actions/groupactions.js";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const GroupsList1 = ({ items = [] }) => {



  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const currentGroup = useSelector((state) => state.grouppage.currentgroup);

  const handleGroupPageClick = (task) => {
    dispatch(setpagemode("view"));
    dispatch(fetchBookById(task._id));
    navigate(`/book/${task._id}`);
  };

  if (!items.length) return null;

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
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 4,
      direction: "rtl",
    }}
  >
    {items.map((task) => {
      const canDelete = canDeleteTask(task);

      return (
        <Box
          key={task._id}
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* MAIN CARD */}
          <Box
            onClick={() => handleGroupPageClick(task)}
            sx={{
              width: "92%",
              maxWidth: 420,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <GroupSmallDesign item={task?.recipes?.[0]} />
          </Box>

          {/* ACTION ROW */}
          {canDelete && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: 1,
                gap: 1,
                color: "#ef4444",
                cursor: "pointer",
                userSelect: "none",
                transition: "all 0.2s ease",
                width: "100%",

                "&:active": {
                  transform: "scale(0.98)",
                },
              }}
              onClick={(e) => {
                e.stopPropagation();

                const apiPayload = {
                  bookId: task._id,
                  groupId: currentGroup._id,
                };

                dispatch(removebookfromgroup(apiPayload));
              }}
            >
              <Tooltip title="מחיקה מהקבוצה">
                <IconButton
                  size="small"
                  sx={{
                    color: "#ef4444",
                    "&:active": {
                      transform: "rotate(180deg) scale(1.1)",
                    },
                  }}
                >
                  <ExitToAppIcon sx={{ transform: "rotate(180deg)" }} />
                </IconButton>
              </Tooltip>

              <Box
                sx={{
                  fontSize: 16,
                  fontWeight: 500,
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

export default GroupsList1;