import React, { useState } from 'react';
import { Box, Typography, Button, Alert, FormControlLabel, Checkbox } from '@mui/material';
import { useDispatch } from 'react-redux';
import { adminblockdata } from '../../actions/adminaction';

const AdminBlock = () => {
  const dispatch = useDispatch();

  const [groups, setGroups] = useState(false);
  const [find, setFind] = useState(false);
  const [match, setMatch] = useState(false);
  const [user, setUser] = useState(false);
  const [homepage, setHomepage] = useState(false);

  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = () => {
    const data = { groups,find,match,user,homepage };
    dispatch(adminblockdata(data));
    setSuccess('Data sent successfully');
  };

  return (
    <Box sx={{ marginTop: 4, padding: 2, border: '1px solid #ccc', borderRadius: 2 }}>
      <Typography variant="h6">Set Block Status</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}

      <FormControlLabel
        control={
          <Checkbox
            checked={groups}
            onChange={(e) => setGroups(e.target.checked)}
          />
        }
        label="Block groups"
      />

<FormControlLabel
        control={
          <Checkbox
            checked={find}
            onChange={(e) => setFind(e.target.checked)}
          />
        }
        label="Block Find"
      />

<FormControlLabel
        control={
          <Checkbox
            checked={match}
            onChange={(e) => setMatch(e.target.checked)}
          />
        }
        label="Block Match"
      />

<FormControlLabel
        control={
          <Checkbox
            checked={user}
            onChange={(e) => setUser(e.target.checked)}
          />
        }
        label="Block User"
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={homepage}
            onChange={(e) => setHomepage(e.target.checked)}
          />
        }
        label="Block homepage"
      />

      <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ marginTop: 2 }}>
        Submit
      </Button>
    </Box>
  );
};

export default AdminBlock;
