import React, { useState, useEffect } from 'react';
import { Grid, Typography, TextField, MenuItem, Paper, ClickAwayListener } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getallusersfriends } from '../../actions/userspage.js';
import { Checkbox, FormControlLabel } from '@mui/material';

const CodependingInput = ({handleinputpendingcodeChange }) => {

  const dispatch = useDispatch();
  const allusersfriends = useSelector(state => state.userspage.allusersfriends);

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(allusersfriends);

  const [filteredItems, setFilteredItems] = useState([]);
  const [inputValue, setInputValue] = useState('');


  //const  {user}  = useSelector((state) => state.auth);
  const  token  = useSelector((state) => state.auth.token);
  const [isChecked, setIsChecked] = useState(false);


  useEffect(() => {
    dispatch(getallusersfriends(token));
  }, []);

  useEffect(() => {
    setItems(allusersfriends);
    console.log('Items updated:', allusersfriends); 
  }, [allusersfriends]);

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  
  const handleInputChange = (event) => {
    const value = event.target.value;
    handleinputpendingcodeChange(null); 
    setInputValue(value);
    setFilteredItems(items.filter(item => item.firstName.toLowerCase().includes(value.toLowerCase())));
    setOpen(true);
  };

  const handleItemClick = (item) => {
    handleinputpendingcodeChange(item);
    setInputValue(item.firstName + ' ' + item.lastName);
    setOpen(false);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    if (event.target.checked) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  return (
    <Grid item xs={12}>
      <Typography
        variant="h6"
        style={{ color: 'black', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '16px' }}
      >
        קוד העברת מתכון לחבר
      </Typography>
      <Grid container spacing={2} alignItems="flex-start" >
        <Grid item>
          <FormControlLabel
            control={<Checkbox checked={isChecked} onChange={handleCheckboxChange} />}
            label="שלח מתכון לחבר"
          />
        </Grid>
        {isChecked && (
          <Grid item >
            <TextField
              label="חיפוש ברשימת החברים"
              value={inputValue}
              onChange={handleInputChange}
              aria-expanded={open}
              aria-haspopup="listbox"
            />
            {open && (
              <ClickAwayListener onClickAway={handleClickAway}>
                <Paper>
                  {filteredItems.map((item, index) => (
                    <MenuItem key={item._id} onClick={() => handleItemClick(item)} style={{ textAlign: 'right' }}>
          {item.firstName} {item.lastName}
          </MenuItem>
                  ))}
                </Paper>
              </ClickAwayListener>
            )}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default CodependingInput;