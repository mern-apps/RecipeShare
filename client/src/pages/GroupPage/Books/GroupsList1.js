import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Box, IconButton, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";

import GroupSmallDesign from '../../../Components/SmallCards/GroupSmallDesign.js';

import { fetchBookById, setpagemode } from "../../../actions/bookPageActions.js";
import { removebookfromgroup } from "../../../actions/groupactions.js";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const GroupsList1 = ({ items = [] }) => {


useEffect(() => {
console.log(items);}, []);

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
    display: "flex",
    justifyContent: "center",
     flexDirection: "column",
    mt: 4,
  }}
>
            {/* MAIN CARD */}
       <Box onClick={() => handleGroupPageClick(task)}>
      <GroupSmallDesign item={task?.recipes?.[0]} />
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

export default GroupsList1;