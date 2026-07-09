import React, { useState, useRef  ,useEffect } from 'react';
import { Link } from 'react-router-dom';

import Modal from 'react-modal';

import { useParams } from 'react-router-dom';

import ItemDisplay from '../../../src/pages/TaskForm/ItemDisplay.js';

import { styled } from '@mui/system';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';
import { Container,Grid, Paper, Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import Easy from '../pictures/easypic.png';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { removerecipefromlist } from '../../../src/actions/projecteditpageaction.js';


import { getallrecipesgroup } from '../../../src/actions/groupactions.js';
import { currentgroupid } from '../../../src/actions/groupactions.js';



const GroupPage = () => {
  //to delete later showGroupForm ?
  const [showGroupForm, setShowGroupForm] = useState(false);


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentGroup = useSelector(state => state.currentgroup.currentgroup); //recieved as empty array or object with no array


    const allrecipesgroup = useSelector((state) => state.grouppage.allrecipesgroup);
    const allusersgroup = useSelector((state) => state.grouppage.userslist);
        // currentgroup - to know all properties becides the recipes (name, ect..)
    const currentgroup = useSelector((state) => state.grouppage.currentgroup);
    
    const { id } = useParams();
    //const id = project._id;
    const  {user}  = useSelector((state) => state.auth);
    const  token  = useSelector((state) => state.auth.token);

    const [items, setItems] = useState(allrecipesgroup);


   useEffect(() => {
      dispatch(getallrecipesgroup(id,token));
      console.log("id:", id); // Log the 'id' value

    }, [dispatch, user]);

    useEffect(() => {
      // Example: Dispatch an action to get group details based on the ID
      //dispatch(currentgroupid(id));
    }, [dispatch, id]);


    
    useEffect(() => {
     setItems(allrecipesgroup); 
     console.log("items:", items); // Log the 'id' value
 }, [allrecipesgroup]); 


  const [removefromallmassage, setRemovefromallmassage] = useState(false);
  
  const [activeCategories, setActiveCategories] = useState([]);
  const [activeTags, setActiveTags] = useState([]);
  const [filtercategories, setFiltercategories] = useState([
    { description: 'ראשונות', active: false },
    { description: 'עיקריות', active: false },
    { description: 'קינוחים', active: false },
  ]);
  
  const [filtertags, setFiltertags] = useState([
    { description: 'חלב', active: false },
    { description: 'אגוזים', active: false },
    { description: 'גלוטן', active: false },
  ]);
  
    useEffect(() => {
      // Update activeCategories whenever categories changes
      setActiveCategories(filtercategories.filter(category => category.active));
    }, [filtercategories]);
  
    useEffect(() => {
      setActiveTags(filtertags.filter(tag => tag.active));
    }, [filtertags]); 

  const handleButtonClickcategory = (categoryDescription) => {
    const categoryIndex = filtercategories.findIndex(category => category.description === categoryDescription);
      const updatedFiltercategories = [...filtercategories];
      updatedFiltercategories[categoryIndex].active = !updatedFiltercategories[categoryIndex].active;
      setFiltercategories(updatedFiltercategories);
  };


  const handleButtonClicktag = (tagDescription) => {
    const tagIndex = filtertags.findIndex(tag => tag.description === tagDescription);
      const updatedFiltertags = [...filtertags];
      updatedFiltertags[tagIndex].active = !updatedFiltertags[tagIndex].active;
      setFiltertags(updatedFiltertags);
  };


  const [selectedItemdisplay, setSelectedItemdisplay] = useState(null);
  const handleItemDisplayClick = (item) => {
    setSelectedItemdisplay(item);
  };
  const handleCloseItemDisplay = () => {
    setSelectedItemdisplay(null);
  };
 

  const [isModalOpen, setModalOpen] = useState(false);


 const removefromalltasks = (task, token) => {

      dispatch(removerecipefromlist(task._id, token));
    };
  
    
  return (

    <Grid
    container
    style={{
      background: '#e8e8e8', // Grey background color similar to JIRA/Trello
      padding: '20px', // Adjust padding as needed
    }}
  >   

  <Grid container style={{ border: '0px solid red' }}>


  <Grid item xs={4} style={{ border: '0px solid black'}}>
  <Paper style={{ backgroundColor: '#e8e8e8',padding: '16px' }}>
          
        <Grid container style={{ border: '0px solid orange', textAlign: 'right' }}>

                     <Grid item xs={12} style={{ marginBottom: '0px', marginTop: '0' }}>
                     <h1 style={{ marginBottom: '0px', marginRight: '10px', color: '#001F3F' }}>כל המתכונים</h1>
                                        </Grid>

                                        <Grid item xs={12} style={{  }}>
                                        <h3 style={{ marginBottom: '5px', marginRight: '10px' }}>קטגוריות</h3>
                                            </Grid>

                                            <Grid item xs={12} style={{ }}>
                                                                <ToggleButtonGroup
                                                                  value={activeCategories.map(category => category.description)}
                                                                  onChange={() => {}}
                                                                  aria-label="filter categories"
                                                                  style={{ }}
                                                                  >
                                                                  {filtercategories.map((category, index) => (
                                                                    <ToggleButton
                                                                      key={index}
                                                                      value={category.description}
                                                                      onClick={() => handleButtonClickcategory(category.description)}
                                                                      style={{
                                                                        backgroundColor: category.active ? '#1976D2' : '#E0E0E0',
                                                                        color: category.active ? 'white' : 'black',
                                                                        borderRadius: '15px',
                                                                        padding: '4px 12px',
                                                                        marginRight: '8px',
                                                                        fontSize: '14px',
                                                                      }}
                                                                    >
                                                                      {category.description}
                                                                    </ToggleButton>
                                                                  ))}
                                                                </ToggleButtonGroup>
                                                                </Grid>

                                     <Grid item xs={12} style={{  }}>
                                     <h3 style={{ marginBottom: '5px', marginRight: '10px' }}>תגיות</h3>
                                      </Grid>

                                      <Grid item xs={12} style={{ }}>
                                      <ToggleButtonGroup
                                        value={activeTags.map(tag => tag.description)}
                                        onChange={() => {}}
                                        aria-label="filter tags"
                                        style={{ marginBottom: '0px' }}
                                      >
                                          {filtertags.map((tag, index) => (
                                          <ToggleButton
                                            key={index}
                                            value={tag.description}
                                            onClick={() => handleButtonClicktag(tag.description)}
                                            style={{
                                              backgroundColor: tag.active ? '#1976D2' : '#E0E0E0',
                                              color: tag.active ? 'white' : 'black',
                                              borderRadius: '15px',
                                              padding: '4px 12px',
                                              marginRight: '8px',
                                              fontSize: '14px',
                                            }}
                                          >
                                            {tag.description}
                                          </ToggleButton>
                                        ))}
                                      </ToggleButtonGroup>
                                      </Grid>
                         </Grid>


 

<Grid item xs={12} style={{}}>
    <button onClick={() => console.log("Hello")}>Click here</button>
</Grid>

<button>
  <Link to={`/group-newrecipe-page/${id}`} style={{
    backgroundColor: 'white',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '72px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none', // Remove underline
  }}>
    מתכון חדש לקבוצה <span style={{ fontSize: '1.3em' }}>&#9998;</span>
  </Link>
</button>  

   
      <Grid style={{}}>
      {selectedItemdisplay && (
       <Modal
       isOpen={Boolean(selectedItemdisplay)}
       onRequestClose={handleCloseItemDisplay}
       style={{
         overlay: {
           backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust overlay color as needed
         },
         content: {
           width: '50%', // Set the width as needed
           height: '70%', // Set the height as needed
           margin: 'auto',
           padding: '20px', // Adjust padding as needed
           backgroundColor: '#fff', // Adjust background color as needed
           borderRadius: '8px', // Adjust border radius as needed
           boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Adjust box shadow as needed
         },
       }}
     >
          <button onClick={handleCloseItemDisplay}>Close</button>
          <div
        style={{
          transform: 'scale(0.6)',
          marginTop: '-240px',
          cursor: 'pointer', // Make the div clickable
        }}
        onClick={handleCloseItemDisplay}
      >
        <ItemDisplay item={selectedItemdisplay} />
      </div>    
             </Modal>
      )}
      </Grid>
 

      </Paper>

  </Grid>
  </Grid>


</Grid>




  );
};

export default GroupPage;
