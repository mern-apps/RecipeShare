import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Card,
  CardContent,
  Typography,
  Box
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { ToggleButton } from "@mui/material";


import {
  jointogroup,
  deletegroupowner,
  getoutfromgroup,
  setpagemode
} from '../../actions/groupactions.js';

import GroupSmallDesign from '../../Components/SmallCards/GroupSmallDesign.js';



export const GroupInfo = ({ item, showUsers,setShowUsers  }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const currentGroup = useSelector(state => state.grouppage.currentgroup);
  const usersList = useSelector(state => state.grouppage.userslist);
  const countAllUsers = useSelector(state => state.grouppage.countallusers);
  const booksList = useSelector(state => state.grouppage.bookslist);
  const countAllBooks = useSelector(state => state.grouppage.countallbooks);
  const allRecipesGroup = useSelector(state => state.grouppage.allrecipesgroup);
  const countAllrecipesGroup = useSelector(state => state.grouppage.countallrecipesgroup);

  const [openGetOutOfGroupDialog, setOpenGetOutOfGroupDialog] = useState(false);
  const [getOutOfGroupId, setGetOutOfGroupId] = useState(null);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);


  // ================== Dialog handlers ==================
 const handleOpenGetOutOfGroupDialog = () => {
  setGetOutOfGroupId(currentGroup._id);
  setOpenGetOutOfGroupDialog(true);
};

  const handleCloseGetOutOfGroupDialog = () => {
    setOpenGetOutOfGroupDialog(false);
    setGetOutOfGroupId(null);
  };

  const handleOpenDeleteDialog = () => {
    setDeleteId(currentGroup._id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setDeleteId(null);
  };


  // ================== Actions ==================
  const handleJoinToGroup = () => {
    dispatch(jointogroup(currentGroup._id));
  };

  const handleEditClick = () => {
    dispatch(setpagemode("edit"));
  };

  if (!currentGroup?._id || !user) return null;

 // Extract title + image from item
const groupTitle = item?.title
  ? item.title.replace(/<[^>]*>/g, "").trim()
  : "קבוצה ללא שם";
  const groupImage = item?.image || item?.imageUrl || null;


const editGroupBtn = {
  px: 2.5,
  py: 1,
  borderRadius: "14px",
  fontWeight: 700,
  fontSize: "1.1rem",
  color: "#fff",
  background: "linear-gradient(135deg,#1e3a8a,#3b82f6)", // vibrant blue gradient
  boxShadow: "0 6px 18px rgba(30,58,138,0.35)",
  transition: "all .22s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 12px 28px rgba(30,58,138,0.45)",
  },
};

const deleteGroupBtn = {
  px: 2.5,
  py: 1,
  borderRadius: "14px",
  fontWeight: 700,
  fontSize: "1.1rem",
  color: "#fff",
  background: "linear-gradient(135deg,#9f1239,#be123c)", // wine red
  boxShadow: "0 6px 18px rgba(159,18,57,0.35)",
  transition: "all .22s ease",
  "&:hover": {
    transform: "translateY(-1px)",
    boxShadow: "0 10px 26px rgba(159,18,57,0.45)",
  },
};

const joinGroupBtn = {
  px: 2.5,
  py: 1,
  borderRadius: "14px",
  fontWeight: 700,
  fontSize: "1.1rem",
  color: "#fff",
  background: "linear-gradient(135deg,#4d7c0f,#65a30d)", // olive green
  boxShadow: "0 6px 18px rgba(77,124,15,0.35)",
  transition: "all .22s ease",
  "&:hover": {
    transform: "translateY(-1px)",
    boxShadow: "0 10px 26px rgba(77,124,15,0.45)",
  },
};

const leaveGroupBtn = {
  px: 2.5,
  py: 1,
  borderRadius: "14px",
  fontWeight: 700,
  fontSize: "1.1rem",
  color: "#fff",
  background: "linear-gradient(135deg,#6b7280,#4b5563)", // warm gray
  boxShadow: "0 6px 18px rgba(75,85,99,0.35)",
  transition: "all .22s ease",
  "&:hover": {
    transform: "translateY(-1px)",
    boxShadow: "0 10px 26px rgba(75,85,99,0.45)",
  },
};
  return (

<Box
  sx={{
    display: "flex",
    gap: 3,
    alignItems: "flex-start",
    direction: "rtl",
    mt: 4,
  }}
>
  <Box sx={{ flexShrink: 0 }}>
    <GroupSmallDesign item={currentGroup} />
  </Box>

  <Box sx={{ flexShrink: 0 }}>

    <Typography
      variant="h6"
      sx={{ mb: 2, color: "text.secondary", fontWeight: 500 }}
    >
      משתמשים {countAllUsers} · ספרים {countAllBooks} · מתכונים {countAllrecipesGroup}
    </Typography>

<Box
  sx={{
    width: { md: 200 }, 
    flexShrink: 0,
  }}
>

  <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1.5, // spacing between buttons
        }}
      >

{(
  currentGroup?.owner?.some(
    (ownerId) => ownerId?.toString() === user?._id?.toString()
  ) ||
  currentGroup?.userId?.some(
    (id) => id?.toString() === user?._id?.toString()
  )
) &&
user?.codes?.some(
  (code) => (code?._id || code)?.toString() === currentGroup?._id?.toString()
) && (
<>
      <Button
        startIcon={<EditIcon />}
        onClick={handleEditClick}
        sx={editGroupBtn}
      >
        עריכת קבוצה
      </Button>
          <Button
        startIcon={<DeleteIcon />}
        onClick={() => handleOpenDeleteDialog(currentGroup._id)}
        sx={deleteGroupBtn}
      >
        מחיקת קבוצה
      </Button>
      </>

  )}


{!currentGroup?.owner?.some(
  (ownerId) => ownerId?.toString() === user?._id?.toString()
) &&
!currentGroup?.userId?.some(
  (id) => id?.toString() === user?._id?.toString()
) &&
!user?.codes?.some(
  (code) => (code?._id || code)?.toString() === currentGroup?._id?.toString()
) && (
  <>
      <Button
        startIcon={<AddIcon />}
        onClick={handleJoinToGroup}
        sx={joinGroupBtn}
      >
        הצטרפות לקבוצה
      </Button>
      </>

  )}

{currentGroup?.userId?.some(
  (id) => id?.toString() === user?._id?.toString()
) &&
user?.codes?.some(
  (code) => (code?._id || code)?.toString() === currentGroup?._id?.toString()
) && (
    <>

      <Button
        startIcon={<DeleteIcon />}
        onClick={() => handleOpenGetOutOfGroupDialog(currentGroup._id)}
        sx={leaveGroupBtn}
      >
        יציאה מהקבוצה
      </Button>

       <Button
      onClick={() => setShowUsers(prev => !prev)}
      startIcon={showUsers ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
      sx={{
        px: 2.5,
  py: 1,
  borderRadius: "14px",
  fontWeight: 700,
  fontSize: "1.1rem",
        color: "#fff",
        background: showUsers
          ? "linear-gradient(135deg,#0ea5e9,#38bdf8)"
          : "linear-gradient(135deg,#64748b,#94a3b8)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
        transition: "all .25s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 16px 40px rgba(0,0,0,0.35)",
        },
      }}
    >
      {showUsers ? "הסתרת משתמשים" : "הצגת משתמשים"}
    </Button>
      </>

    )}
    </Box>

          </Box>
  </Box>

<Dialog
  open={openGetOutOfGroupDialog}
  onClose={handleCloseGetOutOfGroupDialog}
  dir="rtl"
>
  <DialogTitle>מחיקת קבוצה</DialogTitle>
  <DialogContent>
<Typography>
  {currentGroup?.owner?.some(
    (ownerId) => ownerId?.toString() === user?._id?.toString()
  ) &&
  currentGroup?.owner?.length === 1
    ? "אתה האדמין היחיד של הקבוצה. תגדיר קודם אדמין אחר או שתמחוק את הקבוצה."
    : "האם אתה בטוח שברצונך לצאת מהקבוצה?"}
</Typography>
      </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseGetOutOfGroupDialog} color="inherit">
      ביטול
    </Button>

{(
  (
    currentGroup?.owner?.some(
      (id) => id?.toString() === user?._id?.toString()
    ) &&
    currentGroup?.owner?.length > 1
  )
  ||
  (
    currentGroup?.userId?.some(
      (id) => id?.toString() === user?._id?.toString()
    ) &&
    !currentGroup?.owner?.some(
      (id) => id?.toString() === user?._id?.toString()
    )
  )
) && (
  <Button
    onClick={async () => {
      if (currentGroup) {
        await dispatch(getoutfromgroup(currentGroup._id));
        handleCloseGetOutOfGroupDialog();
        navigate("/groups");
      }
    }}
    color="error"
    variant="contained"
    startIcon={<DeleteIcon />}
  >
    יציאה מהקבוצה
  </Button>
)}
  </DialogActions>
</Dialog>


<Dialog
  open={openDeleteDialog}
  onClose={handleCloseDeleteDialog}
  dir="rtl"
>
  <DialogTitle>מחיקת קבוצה</DialogTitle>
  <DialogContent>
    <Typography>האם אתה בטוח שברצונך למחוק את הקבוצה?</Typography>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseDeleteDialog} color="inherit">
      ביטול
    </Button>
    <Button
      onClick={async () => {
        if (currentGroup) {
          await dispatch(deletegroupowner(currentGroup._id));
          handleCloseDeleteDialog();
          navigate("/groups");
        }
      }}
      color="error"
      variant="contained"
      startIcon={<DeleteIcon />}
    >
      מחיקה
    </Button>
  </DialogActions>
</Dialog>
  </Box>



  );
};

export default GroupInfo;
