import React, { useState, useEffect } from 'react';
import { Box,Button, Grid, TextField, IconButton, Chip } from '@mui/material';
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { edit2getallcodes } from '../../actions/adminaction.js';

const Edit2Codes = ({ code, setCode }) => {
  const dispatch = useDispatch();
  const { user,codes } = useSelector((state) => state.auth);

  const [codesprevious, setCodesprevious] = useState([]);
  const [codesnew, setCodesnew] = useState([]);

  const [newInput, setNewInput] = useState('');


  useEffect(() => {
    setCodesprevious(codes);
  }, [codes]);

  // Merge both arrays into a unified array
  useEffect(() => {
    setCode([...codesprevious, ...codesnew]);
  }, [codesprevious, codesnew]);

  // Handle adding a new code
  const handleAddCode = () => {
    if (newInput.trim() && ![...codesnew, ...codesprevious].includes(newInput)) {
      setCodesnew((prev) => [...prev, newInput]);
      setNewInput('');
    }
  };

  // Handle deleting a code
  const handleDeleteCode = (codeToDelete) => {
    setCodesnew((prev) => prev.filter((code) => code !== codeToDelete));
    setCodesprevious((prev) => prev.filter((code) => code !== codeToDelete));
  };

  return (
    <Box >
      {/* Input field to add new codes */}
      <Grid container spacing={2} alignItems="center">

              {/* List of codes */}
      <Grid item xs={12}>
      <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {[...codesprevious, ...codesnew].map((code, index) => (
          <Chip
            key={index}
            label={code}
            onDelete={() => handleDeleteCode(code)}
            deleteIcon={<CloseIcon />}
            sx={{ fontSize: 14 }}
          />
        ))}
      </Box>
      </Grid>


        <Grid item xs={4}>
          <TextField
            fullWidth
            label="הוסף קוד"
            variant="outlined"
            value={newInput}
            size="small"
            onChange={(e) => setNewInput(e.target.value)}
          />
        </Grid>
        <Grid item xs={2}>
      <Button variant="contained" onClick={handleAddCode}>
          הוסף
        </Button>
        </Grid>
      </Grid>



    </Box>
  );
};

export default Edit2Codes;
