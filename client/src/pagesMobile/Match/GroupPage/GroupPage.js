import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getcodepage } from '../../actions/groupactions';
import { addcodefromuserpending, deletecodefromuser,deletecodefromuserpending } from '../../actions/groupactions';

import { CircularProgress, Button, Typography, Card, CardContent, Avatar, Grid, Snackbar, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { Alert } from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';

const GroupPage = () => {
  const dispatch = useDispatch();

  // Fetching data directly from Redux state

  
  const groupTemp = useSelector((state) => state.group.group);
  const userCodesTemp = useSelector((state) => state.group.userscodes);
  const userCodesPendingTemp = useSelector((state) => state.group.userscodespending);
  const countMatchesTemp = useSelector((state) => state.group.countmatches);

  const [loading, setLoading] = useState(true);
  const [group, setGroup] = useState(null);
  const [usercodes, setUsercodes] = useState(0);
  const [usercodespending, setUsercodespending] = useState([]);
  const [countmatches, setCountmatches] = useState(0);

  // State for Dialog auth
  const [openDialog, setOpenDialog] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');


    // State for Dialog edit
  const [editOpen, setEditOpen] = useState(false);

  const handleEditClick = () => {
    setEditOpen(true);
  };
  
  ///



  // Handle submission of dialog form
  const handleSubmitDialog = () => {
    const CodeData = { username, password };
    dispatch(getcodepage(CodeData));
    setSnackbarMessage('User codes fetched successfully');
    setSnackbarOpen(true);
    setOpenDialog(false);
  };

  // Handle dialog close
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    // Check if the data exists in the Redux state after submission
    if (groupTemp && userCodesTemp && userCodesPendingTemp) {
        setGroup(groupTemp);
      setUsercodes(userCodesTemp || 0);
      setUsercodespending(userCodesPendingTemp || []);
      setCountmatches(countMatchesTemp || 0);
      setLoading(false);
    }
  }, [userCodesTemp, userCodesPendingTemp, countMatchesTemp]);

  // Loading and error handling
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  //const handleDeleteUser = (userId) => {
   // if (!group?._id) {
     //   console.error("Group ID is missing");
        //return;
     // }
     // const deleteData = { groupId: group._id, userId };
   // dispatch(deletecodefromuser(deleteData));
    //setSnackbarMessage('User deleted successfully');
   // setSnackbarOpen(true);
  //};

  const handleApproveUser = (userId) => {
    if (!group?._id) {
        console.error("Group ID is missing");
        return;
      }
      const addpendingData = { groupId: group._id, userId };
    dispatch(addcodefromuserpending(addpendingData));
    setSnackbarMessage('Pending user added successfully');
    setSnackbarOpen(true);
  };

  const handleRejectUser = (userId) => {
    if (!group?._id) {
        console.error("Group ID is missing");
        return;
      }
      const deletependingData = { groupId: group._id, userId };
    dispatch(deletecodefromuserpending(deletependingData));
    setSnackbarMessage('Pending user deleted successfully');
    setSnackbarOpen(true);
  };






  return (
    <div style={{ padding: '20px' }}>
      {/* Dialog for Login */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmitDialog} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

            {/* Group Info */}
            {group && (
        <Card style={{ marginBottom: '20px', padding: '20px' }}>
          <CardContent style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              alt={group.description1}
              src={group.image || ''}
              style={{ width: 80, height: 80, marginRight: 20 }}
            >
              {!group.image && <PersonIcon />}
            </Avatar>
            <div>
              <Typography variant="h4">{group.description1}</Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {group.description2}
              </Typography>
              <Typography variant="body1">Owner: {group.ownername}</Typography>
              <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              onClick={handleEditClick}
              style={{ marginLeft: "auto" }}
            >
              Edit
            </Button>
            </div>
          </CardContent>
        </Card>
      )}

  
      <Typography variant="h3" gutterBottom align="center">
        Group Page
      </Typography>

      {/* Display the User Codes */}
      <Grid container spacing={3}>
      {/* User Codes (Count Only) */}
      <Grid item xs={12} sm={6}>
        <Card style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f5f5f5' }}>
          <Typography variant="h5">User Codes</Typography>
          <Typography variant="h2" style={{ color: '#1976d2', fontWeight: 'bold' }}>
            {usercodes}
          </Typography>
        </Card>
      </Grid>

        {/* Display the User Codes Pending */}
        <Grid item xs={12} sm={6}>
        <Card style={{ padding: '20px', backgroundColor: '#fff', boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' }}>
          <Typography variant="h5">Pending Users </Typography>
          
          {usercodespending.length === 0 ? (
            <Typography color="textSecondary">No pending users.</Typography>
          ) : (
            usercodespending.slice(0, 10).map((user) => (
              <Card key={user._id} style={{ marginTop: 10, padding: 10, display: 'flex', alignItems: 'center' }}>
                <Avatar alt={`${user.firstName} ${user.lastName}`} src={user.images?.[0] || ''} />
                <div style={{ flexGrow: 1, marginLeft: 10 }}>
                  <Typography variant="h6">{user.firstName} {user.lastName}</Typography>
                </div>
                <Button 
            onClick={() => handleApproveUser(user._id)} 
            variant="contained" 
            color="success" 
            size="small" 
            style={{ marginRight: 5 }}
          >
            ✅ אישור
          </Button>

                     <Button 
            onClick={() => handleRejectUser(user._id)} 
            variant="contained" 
            color="error" 
            size="small"
          >
            ❌ דחייה
          </Button>

              </Card>
            ))
          )}

          {usercodespending.length > 10 && (
            <Typography color="textSecondary" style={{ marginTop: '10px', fontStyle: 'italic' }}>
מראה 10 משתמשים/ות - נדרש לאשר/לדחות כדי להציג עוד            </Typography>
          )}
        </Card>
      </Grid>
    </Grid>

      <div style={styles.matchesContainer}>
        <Typography variant="h5">Total Matches: {countmatches}</Typography>
      </div>

      {/* Snackbar for error and success messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success">{snackbarMessage}</Alert>
      </Snackbar>
    </div>
  );
};

// Styles for Card, Avatar, Button, etc.
const styles = {
  card: {
    marginBottom: '20px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  },
  cardContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    width: '50px',
    height: '50px',
    marginRight: '15px',
  },
  userInfo: {
    flexGrow: 1,
  },
  deleteButton: {
    marginLeft: 'auto',
  },
  matchesContainer: {
    marginTop: '20px',
    textAlign: 'center',
  },
};

export default GroupPage;
