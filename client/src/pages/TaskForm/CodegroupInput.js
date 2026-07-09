import React, { useState, useEffect } from 'react';
import { Grid, Typography, MenuItem, Paper, ClickAwayListener } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getallgroupsnewrecipeform} from '../../actions/recipeNewForm.js';
import { Checkbox, FormControlLabel } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'; // Import the dropdown icon

const CodegroupInput = ({handleinputgroupcodeChange }) => {

  const dispatch = useDispatch();
  const allgroups = useSelector(state => state.groups.allgroupsnewrecipeform);
  const currentGroup = useSelector(state => state.grouppage.currentgroup); //recieved object with no array
  const  token  = useSelector((state) => state.auth.token);

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(allgroups);

  const [ShownItems, setShownItems] = useState([currentGroup]);

  const [filteredItems, setFilteredItems] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    dispatch(getallgroupsnewrecipeform(token));
    }, []);

    useEffect(() => {
      setItems(allgroups);
    }, [allgroups]);

    useEffect(() => {
      setShownItems([currentGroup]);
      console.log('Current Group updated:', currentGroup);

    }, [currentGroup]);

    useEffect(() => {
      // Filter out items that are in ShownItems based on the _id property
      const updatedFilteredItems = items.filter(item => 
        !ShownItems.some(shownItem => shownItem._id === item._id)
      );
      setFilteredItems(updatedFilteredItems);
    }, [items, ShownItems]);

    const handleInputChange = (event) => {
      const value = event.target.value;
      //handleinputgroupcodeChange(null); why i need it? consider to return
      setInputValue(value);
      setFilteredItems(items.filter(item => item.title.toLowerCase().includes(value.toLowerCase())));
      setOpen(true);
    };

    const handleItemClick = (item) => {
      handleinputgroupcodeChange(item);
      setShownItems(prevShownItems => [...prevShownItems, item]);
      setInputValue('');
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
      setInputValue(''); // consider to remove
    }
  };

  const handleRemoveItem = (itemToRemove) => {
    setShownItems(prevShownItems => prevShownItems.filter(item => item._id !== itemToRemove._id));
    setFilteredItems(prevFilteredItems => [...prevFilteredItems, itemToRemove]);
  };

  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            checked={isChecked}
            onChange={handleCheckboxChange}
            color="primary"
          />
        }
        label="Show Filter Items"
      />

      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          {/* White box for dropdown trigger */}
          <Paper 
            onClick={() => setOpen(!open)} 
            style={{ 
              backgroundColor: 'green', 
              padding: '10px', 
              cursor: 'pointer', 
              border: '1px solid #ccc', 
              borderRadius: '4px' 
            }}
          >
            <Typography variant="body1" style={{ marginRight: '8px' }}>
              בחר קבוצה
            </Typography>
            <ArrowDropDownIcon /> {/* Dropdown icon */}

          </Paper>

          {open && (
            <Paper style={{ marginTop: '5px', maxHeight: '200px', overflowY: 'auto' }}>
              {filteredItems.map(item => (
                <div key={item._id} onClick={() => handleItemClick(item)} style={{ padding: '8px', cursor: 'pointer' }}>
                  {item.title}
                </div>
              ))}
            </Paper>
          )}
        </div>
      </ClickAwayListener>

      {ShownItems.length > 0 && (
        <>
          <Typography variant="h6">Chosen Items:</Typography>
          <Grid container spacing={1}>
            {ShownItems.map(item => (
              <Grid item key={item._id}>
                <Paper style={{ display: 'flex', alignItems: 'center', padding: '5px' }}>
                  <Typography>{item.title}</Typography>
                  <CloseIcon 
                    onClick={() => handleRemoveItem(item)} 
                    style={{ cursor: 'pointer', color: 'red', marginLeft: '8px' }} 
                  />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};


export default CodegroupInput;