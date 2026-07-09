import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography, List, ListItem, ListItemText, Avatar, IconButton, Divider, Badge, Box, Button } from '@mui/material';
import { Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MessageIcon from '@mui/icons-material/Message';
import PersonIcon from '@mui/icons-material/Person';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomMobile from './ZoomMobile.js';

const MatchListMobile = ({
  Matchedlist,
  selectedMatch,
  onMatchSelect,
}) => {
  const { user } = useSelector((state) => state.auth);
  const MaxTimeMatch = useSelector((state) => state.auth.maxTimeMatch);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleDialogOpen = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  return (
    <List sx={{ width: '100%', padding: 0 }}>
      {Matchedlist && Matchedlist.length > 0 ? (
        Matchedlist.map((match) => {
          const userImage = match.otherUser.images?.[0];
          const isNewMatch = new Date(match.createdAt) > MaxTimeMatch;

          const lastMessage =
            match.messages && match.messages.length > 0
              ? match.messages[match.messages.length - 1].text.slice(0, 20) +
                (match.messages[match.messages.length - 1].text.length > 20 ? '...' : '')
              : '';

          return (
            <>
              <ListItem
                key={match.matchId}
                button
                onClick={() => onMatchSelect(match)}
                selected={selectedMatch?.matchId === match.matchId}
                sx={{
                  '&.Mui-selected': { backgroundColor: '#e3f2fd' },
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px 16px',
                  ':hover': { backgroundColor: '#cfe8fc' },
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  width: '100%',
                  marginBottom: '8px',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Avatar
                  src={userImage || undefined}
                  alt={match.otherUser.firstName}
                  sx={{
                    width: 48,
                    height: 48,
                    backgroundColor: userImage ? 'transparent' : '#e0e0e0',
                    marginLeft: 2,
                  }}
                >
                  {!userImage && <PersonIcon fontSize="large" color="action" />}
                </Avatar>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'right',
                    marginLeft: 'auto',
                    padding: '0 8px', // Adjust padding for smaller screens
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: 'text.primary',
                      fontWeight: 'bold',
                      fontSize: { xs: '1rem', sm: '1.25rem' }, // Responsive font size
                    }}
                  >
                    {match.otherUser.firstName}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      fontSize: { xs: '0.75rem', sm: '0.875rem' }, // Smaller text on mobile
                    }}
                  >
                    {lastMessage}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 1 }}>
                  <IconButton onClick={() => handleDialogOpen(match.otherUser)} color="primary">
                    <ZoomInIcon />
                  </IconButton>

                  <Badge
                    overlap="circular"
                    variant="dot"
                    color={match.status === 'noMessages' ? 'purple' : match.status === 'MessageReceived' ? 'green' : 'default'}
                    sx={{ marginRight: 1 }}
                  >
                    <MessageIcon />
                  </Badge>
                  <IconButton onClick={() => console.log('Delete match:', match.matchId)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </ListItem>
              <Divider />

              <Dialog
                open={openDialog}
                onClose={handleDialogClose}
                fullWidth
                maxWidth="lg"
                BackdropProps={{
                  style: {
                    backgroundColor: 'transparent',
                  },
                }}
              >
                <DialogTitle sx={{ textAlign: 'right', fontSize: '2rem' }}>מידע על משתמש</DialogTitle>
                <DialogContent>
                  <ZoomMobile currentUser={selectedUser} />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleDialogClose} color="primary">
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          );
        })
      ) : (
        <Typography variant="body1" sx={{ textAlign: 'center', color: 'gray', marginTop: 2 }}>
          No matches found.
        </Typography>
      )}
    </List>
  );
};

export default MatchListMobile;
