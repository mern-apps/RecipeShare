import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Typography, List, ListItem, ListItemText, Avatar,IconButton,Divider, Badge, Box,Button} from '@mui/material';
import { Dialog, DialogContent, DialogTitle,DialogActions } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import MessageIcon from '@mui/icons-material/Message';
import PersonIcon from '@mui/icons-material/Person';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import Zoom from './Zoom.js'; 

import { deletematch } from '../../actions/matchespage';



const MatchList = ({
  Matchedlist,
  selectedMatch,
  onMatchSelect,
}) => {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);



  useEffect(() => {
  if (Matchedlist) {
    console.log("Matchedlist 111111updated:", Matchedlist);
    console.log("Matchedlist 111111111length:", Matchedlist?.length || 0);
  } else {
    console.log("Matchedlist 1111111111is empty or undefined");
  }
}, [Matchedlist]);


   const accessibilitySettings = useSelector((state) => state.auth.accessibility);
            const [accessibilityData, setAccessibilityData] = useState(accessibilitySettings);
  
            useEffect(() => {
                if (user && user.accessibility) {
                  setAccessibilityData(user.accessibility);
                } else {
                  setAccessibilityData(accessibilitySettings);
                }
              }, [user, accessibilitySettings]);
            
              const adjustedFontSize = (size) => `${(size * accessibilityData.fontSizeAdjustments) / 100}rem`;
            
              const getAccessibleStyles = (defaultBg) => {
                const { darkContrast, lightContrast, contrastMode } = accessibilityData;
            
                if (darkContrast) {
                  return {
                    backgroundColor: "#000",
                    color: "#FFF",
                  };
                }
            
                if (lightContrast) {
                  return {
                    backgroundColor: "#FFF",
                    color: "#000",
                  };
                }
            
                if (contrastMode) {
                  return {
                    backgroundColor: "#000",
                    color: "#FFF",
                    fontWeight: "bold",
                    textDecoration: "underline",
                  };
                }
            
                return {
                  backgroundColor: defaultBg,
                  color: "#000",
                };
              };
            
            
            
              useEffect(() => {
                const handleKeyDown = (event) => {
                  if (!event.altKey) return;
            
                  const key = event.key.toUpperCase();
                  switch (key) {
                    case "C":
          break;
                    default:
                      break;
                  }
                };
            
                window.addEventListener("keydown", handleKeyDown);
                return () => window.removeEventListener("keydown", handleKeyDown);
              }, []);
      
    const step  = useSelector((state) => state.auth.signupstep);
  
  


  const MaxTimeMatch = useSelector((state) => state.auth.maxTimeMatch);


  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);


  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
const [matchToDelete, setMatchToDelete] = useState(null);


//zoom
  const handleDialogOpen = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };


//delete
  const handleDeleteClick = (matchId) => {
  setMatchToDelete(matchId);
  setDeleteDialogOpen(true);
};

const handleConfirmDelete = () => {
  if (matchToDelete) {
    dispatch(deletematch(matchToDelete)); // dispatch your action
  }
  setDeleteDialogOpen(false);
  setMatchToDelete(null);
};

const handleCancelDelete = () => {
  setDeleteDialogOpen(false);
  setMatchToDelete(null);
};


  return (
<List
  sx={{
    width: '100%',
    p: 1,
  }}
>
  {Matchedlist && Matchedlist.length > 0 ? (
    Matchedlist.map((match) => {
      const userImage = match.otherUser.images?.[0];
      const statusIcon =
        match.status === 'noMessages' || match.status === 'MessageReceived' ? (
          <MessageIcon />
        ) : null;

      const lastMessage =
        match.messages && match.messages.length > 0
          ? match.messages[match.messages.length - 1].text
          : '';

      return (
        <React.Fragment key={match.matchId}>
          <ListItem
            button
            onClick={() => onMatchSelect(match)}
            selected={selectedMatch?.matchId === match.matchId}
            sx={{
              backgroundColor: 'white',
              borderRadius: 2,
              p: 2,
              mb: 2,
              boxShadow: '0 3px 8px rgba(0,0,0,0.08)',
              alignItems: 'center',
              transition: 'all 0.2s ease',
              '&:hover': { boxShadow: '0 6px 12px rgba(0,0,0,0.12)', backgroundColor: '#f7faff' },
              '&.Mui-selected': { backgroundColor: '#e3f2fd' },
            }}
          >
            {/* Avatar (right side for RTL) */}
            <Avatar
              src={userImage || undefined}
              alt={match.otherUser.firstName}
              sx={{
                width: 70,
                height: 70,
                border: '2px solid #eee',
                bgcolor: userImage ? 'transparent' : '#e0e0e0',
                ml: 2,
              }}
            >
              {!userImage && <PersonIcon fontSize="large" sx={{ color: '#666' }} />}
            </Avatar>

            {/* Text (aligned right) */}
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                textAlign: 'right',
                pr: 1,
              }}
            >
              <Typography
                variant="subtitle1"
                noWrap
                sx={{
                  fontWeight: 600,
                  fontSize: adjustedFontSize(1.6),
                  background: 'linear-gradient(to right, #3f51b5, #6a1b9a)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {match.otherUser.firstName}
              </Typography>

              <Typography
                variant="body2"
                noWrap
                sx={{
                  color: '#555',
                  fontSize: adjustedFontSize(1.2),
                  maxWidth: 250,
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  direction: 'rtl',
                }}
              >
                {lastMessage || 'אין הודעות'}
              </Typography>
            </Box>

            {/* Actions (left side for RTL) */}
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
              <IconButton onClick={() => handleDialogOpen(match.otherUser)} color="primary">
                <ZoomInIcon />
              </IconButton>

              <Badge
                overlap="circular"
                variant="dot"
                color={
                  match.status === 'noMessages'
                    ? 'secondary'
                    : match.status === 'MessageReceived'
                    ? 'success'
                    : 'default'
                }
                sx={{ mr: 1 }}
              >
                {statusIcon}
              </Badge>

            <IconButton onClick={() => handleDeleteClick(match.matchId)} color="error">
  <DeleteIcon />
</IconButton>

            </Box>
          </ListItem>
        </React.Fragment>
      );
    })
  ) : (
    <Typography
      variant="h6"
      sx={{
        fontSize: adjustedFontSize(1.4),
        textAlign: 'center',
        mt: 4,
        color: '#999',
      }}
    >
      אין התאמות
    </Typography>
  )}

<Dialog
  open={openDialog}
  onClose={handleDialogClose}
  fullWidth
  maxWidth="lg"
  PaperProps={{
    sx: {
      width: '55vw',    // 55% of viewport width
      height: '65vh',   // 65% of viewport height
      maxHeight: '90vh',
      maxWidth: '90vw',
      display: 'flex',
      flexDirection: 'column',
    },
  }}
>  
  <DialogContent
    sx={{
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    }}
  >
    {selectedUser ? (
      <Zoom currentUser={selectedUser} />
    ) : (
      <Typography variant="body2">אין נתונים להצגה</Typography>
    )}
  </DialogContent>
  
  <DialogActions sx={{ justifyContent: 'flex-end' }}>
    <Button onClick={handleDialogClose} color="primary">
      סגור
    </Button>
  </DialogActions>
</Dialog>

<Dialog
  open={deleteDialogOpen}
  onClose={handleCancelDelete}
  maxWidth="xs"
  fullWidth
>
  <DialogTitle sx={{ textAlign: 'center' }}>אישור מחיקה</DialogTitle>
  <DialogContent>
    <Typography variant="body1" sx={{ textAlign: 'center' }}>
      האם אתה בטוח שברצונך למחוק את ההתאמה הזו?
    </Typography>
  </DialogContent>
  <DialogActions sx={{ justifyContent: 'center' }}>
    <Button onClick={handleCancelDelete} color="primary">
      ביטול
    </Button>
    <Button onClick={handleConfirmDelete} color="error">
      מחק
    </Button>
  </DialogActions>
</Dialog>


</List>


  );
};

export default MatchList;