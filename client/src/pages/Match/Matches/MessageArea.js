import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Paper, Box, Typography, TextField, IconButton ,Button} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { submitnewmessage } from '../../actions/matchespage';
import { Dialog, DialogContent, DialogTitle,DialogActions } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import Zoom from './Zoom.js';  

const MessageArea = ({ selectedMatch,items,addMessageToSelectedMatch }) => {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

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
  
  

  const [newMessage, setNewMessage] = useState('');


  const handleSendMessage = () => {
    const trimmedMessage = newMessage.trim();
    if (!trimmedMessage) return; // Prevent sending empty or whitespace-only messages
    addMessageToSelectedMatch(trimmedMessage);

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
    <Box
    sx={{
      ...getAccessibleStyles('white'),
      width: '100%',
      maxWidth: '1900px',
      flexDirection: 'column',
      backgroundColor: '#F5F5F5',
      color: '#333333',
      borderRadius: 2,
      display: 'flex', // Flexbox layout
    }}
  >
      {selectedMatch ? (
        <>
          <Box
        sx={{
          ...getAccessibleStyles('white'),
          padding: 1,
          backgroundColor: '#3f51b5',
          color: '#fff',
          borderTopLeftRadius: 2,
          borderTopRightRadius: 2,
          display: 'flex',
          alignItems: 'center',
        }}
          >
            <Typography variant="h6" 
  sx={{
    fontSize: adjustedFontSize(1.2),
    color: getAccessibleStyles('#fce4ec').color,
    fontWeight: accessibilityData.contrastMode ? 'bold' : 'normal',
    textDecoration: accessibilityData.contrastMode ? 'underline' : 'none',
  }}            
            >
              שוחח/י עם {selectedMatch.otherUser.firstName}
            </Typography>

            <IconButton
  onClick={() => handleDialogOpen(selectedMatch.otherUser)}
  color="primary"
  sx={{
    color: 'white',
    fontSize: '30px',  // Enlarges the icon
    marginLeft: '10px', // Adds left margin (adjust as needed)
    marginRight: '10px', // Adds right margin (adjust as needed)
  }}
>            <ZoomInIcon   />
              </IconButton>

                                            <Dialog
                                                  open={openDialog}
                                                  onClose={handleDialogClose}
                                                  fullWidth
                                                  maxWidth="lg"
                                                  BackdropProps={{
                                                    style: {
                                                      backgroundColor: 'transparent', // Ensures the backdrop is fully transparent
                                                    },
                                                  }}
                                                >    
                                                        <DialogTitle sx={{ textAlign: 'right', fontSize: '2rem' }}>מידע על משתמש</DialogTitle>
                                                        <DialogContent>
                                                          
                                                        <Zoom currentUser={selectedUser} />
                                                        
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
    ...getAccessibleStyles('#f5f5f5'),
    display: 'flex',
    flexDirection: 'column',
    padding: 2,
    height: '100%', // Allow it to take up the remaining space
    minHeight: '580px', // Ensure a minimum height of 180px
  }}
          >
            {items && items.length > 0 ? (
              items.map((message) => (
                <Box
                key={message._id}
                sx={{
                  ...getAccessibleStyles('#f5f5f5'),
                  display: 'flex',
                  justifyContent: 'flex-start',  // Align both at flex-start
                  marginBottom: 1,
                  transform: message.receive === user?._id ?  'translateX(-30px)' : 'none', // Shift the user's sent messages a bit to the left
                }}
              >
                 <Box
                    sx={{
                      ...getAccessibleStyles('#f5f5f5'),
                      padding: 1.5,
                      backgroundColor: message.receive === user?._id ?  '#3f51b5' : '#e8eaf6',
                      color: message.receive === user?._id ?  '#fff' : '#000',
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
<Typography variant="body2" 
sx={{
  fontSize: adjustedFontSize(1.2),
  color: getAccessibleStyles('#fce4ec').color,
  fontWeight: accessibilityData.contrastMode ? 'bold' : 'normal',
  textDecoration: accessibilityData.contrastMode ? 'underline' : 'none',
}}            
          >
התחל/י שיחה
 </Typography>

            )}
          </Box>

          {/* Message Input */}
          <Box
            sx={{
              ...getAccessibleStyles('#f5f5f5'),
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
                ...getAccessibleStyles('#ffffff'),
                direction: 'rtl',
                textAlign: 'right',
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

<Typography variant="body1" 
sx={{
  fontSize: adjustedFontSize(1.2),
  color: getAccessibleStyles('#fce4ec').color,
  fontWeight: accessibilityData.contrastMode ? 'bold' : 'normal',
  textDecoration: accessibilityData.contrastMode ? 'underline' : 'none',
}}            
          >
          בחר/י משתמש/ת מצד ימין להתחלת שיחה.
          </Typography>

      )}
 </Box>
  );
};

export default MessageArea; 