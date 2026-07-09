import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Paper, Box, Typography, TextField, IconButton, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { submitnewmessage } from '../../actions/matchespage.js';
import { Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomMobile from './ZoomMobile.js';
import CloseIcon from '@mui/icons-material/Close';

const MessageAreaMobile = ({ selectedMatch, items }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    const trimmedMessage = newMessage.trim();
    if (!trimmedMessage) return; // Prevent sending empty or whitespace-only messages
    dispatch(submitnewmessage(selectedMatch.matchId, trimmedMessage));
    setNewMessage('');
  };

  const handleMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

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
    <Paper
      elevation={3}
      sx={{
        width: '100%',
        flexDirection: 'column',
        backgroundColor: '#F5F5F5',
        color: '#333333',
        borderRadius: 2,
        display: 'flex', // Use flexbox for proper layout
      }}
    >
      {selectedMatch ? (
        <>
          <Box
             sx={{
              padding: 1,
              backgroundColor: '#3f51b5',
              color: '#fff',
              borderTopLeftRadius: 2,
              borderTopRightRadius: 2,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              שוחח/י עם {selectedMatch.otherUser.firstName}
            </Typography>

            <IconButton
              onClick={() => handleDialogOpen(selectedMatch.otherUser)}
              color="primary"
              sx={{
                color: 'white',
                fontSize: '30px',
              }}
            >
              <ZoomInIcon />
            </IconButton>

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

<IconButton 
      onClick={handleDialogClose} 
      sx={{ position: 'absolute', left: 8, top: 8 }}
    >
      <CloseIcon />
    </IconButton>

              <DialogContent>
                <ZoomMobile currentUser={selectedUser} />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDialogClose} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </Box>

          {/* Message History */}
          <Box
     sx={{
      display: 'flex',
      flexDirection: 'column',
      padding: 2,
      height: { xs: '70vh', sm: '60vh' }, // 70% of the viewport height for mobile, 60% for small tablets
      minHeight: { xs: '50vh' }, // Ensure a minimum height of 50% for very small mobile screens
      backgroundColor: '#ffffff',
    }}
          >
            {items && items.length > 0 ? (
              items.map((message) => (
                <Box
                  key={message._id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',  // Align both at flex-start
                    marginBottom: 1,
                    transform: message.receive === user._id ? 'translateX(-30px)' : 'none', // Shift the user's sent messages a bit to the left
                  }}
                >
                  <Box
                    sx={{
                      padding: 1.5,
                      backgroundColor: message.receive === user._id ? '#3f51b5' : '#e8eaf6',
                      color: message.receive === user._id ? '#fff' : '#000',
                      borderRadius: 2,
                      maxWidth: '70%',
                      wordWrap: 'break-word',
                      boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    {message.text}
                  </Box>
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                התחל/י שיחה
              </Typography>
            )}
          </Box>

          {/* Message Input */}
          <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: 2,
            backgroundColor: '#f1f1f1',
            borderTop: '1px solid #ddd',
          }}
          >
            <TextField
              variant="outlined"
              fullWidth
              multiline
              rows={1}
              maxRows={4}
              placeholder="Type your message here..."
              value={newMessage}
              onChange={handleMessageChange}
              sx={{
                direction: 'rtl',
                textAlign: 'right',
                backgroundColor: '#ffffff',
                borderRadius: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
            <IconButton
              color="primary"
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              sx={{
                marginLeft: 1,
                backgroundColor: '#3f51b5',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#283593',
                },
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </>
      ) : (
        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            marginTop: '20%',
            color: 'gray',
            fontStyle: 'italic',
          }}
        >
          בחר/י משתמש/ת מצד ימין להתחלת שיחה.
        </Typography>
      )}
    </Paper>
  );
};

export default MessageAreaMobile;
