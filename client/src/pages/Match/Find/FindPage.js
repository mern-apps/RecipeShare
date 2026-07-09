  import React, { useEffect, useState } from 'react';   
  import { useSelector, useDispatch } from 'react-redux';
  import { useNavigate } from 'react-router-dom';

  import { getalllistforuser } from '../../actions/userfindpageactions';
  import { getallcodesandtrips } from '../../actions/userfindpageactions';
  import { getallmatches,getallnewmessages } from '../../actions/matchespage';

  import AddTripForm from './AddTripForm';
  import GroupsNew from '../Groups/GroupsNew.js';
  import ChosenUserList from '../../Components/ChosenUserList';

    import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
  import { FormControl, InputLabel, Select, MenuItem,Checkbox,ListItemText} from '@mui/material';
  import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
  import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
  import { Dialog, DialogContent, DialogTitle } from '@mui/material';
  import { Box, Divider } from '@mui/material'
  import { Grid, Typography, Button, ButtonGroup } from '@mui/material';
  import { Message as MessageIcon, Favorite as FavoriteIcon } from '@mui/icons-material';

  const FindPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);


    const [afterinitial, setAfterinitial] = useState(false);

  const codesArray = user?.codes || [];
  const [selectedCodes, setSelectedCodes] = useState(null);
    //const allCodesArray = useSelector((state) => state.auth.codes);

    const [selectedTrips, setSelectedTrips] = useState(null);
    //const alltripsArray = useSelector((state) => state.auth.trips);
    const [tripsArray, setTripsArray] = useState([]);
    

    const Newmatches = useSelector((state) => state.auth.newmatches);
    const CountLastMessagesReceived = useSelector((state) => state.auth.countLastMessagesReceived);
    const CountNoMessages = useSelector((state) => state.auth.countNoMessages);

    const [totalUnreadMessages, setTotalUnreadMessages] = useState(0);


    const [selectedKM, setSelectedKM] = useState(15); 

    const [openAddGroupDialog, setOpenAddGroupDialog] = useState(false);
    const [openAddTripDialog, setOpenAddTripDialog] = useState(false);

    
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
                      case "A":
                        handleKMChange(15);
            break;
            case "B":
              handleKMChange(30);
              break;
              case "C":
                handleKMChange(1000);
                break;
                case "D":
                  break;
                    case "F":
                      break;
                      case "G":
                        break;
                        case "H":
                          break;
                          case "Q":
                            handleKMChange(1000);
                            break;
                      default:
                        break;
                    }
                  };
              
                  window.addEventListener("keydown", handleKeyDown);
                  return () => window.removeEventListener("keydown", handleKeyDown);
                }, []);




    useEffect(() => {
      setTotalUnreadMessages(CountLastMessagesReceived + CountNoMessages);
    }, [CountLastMessagesReceived, CountNoMessages]);


    useEffect(() => {
      dispatch(getallcodesandtrips());
  }, [dispatch]);


  useEffect(() => {
    if (user?.codes) {
      const userExistingCodeIds = user.codes.map(code => code._id.toString());
      setSelectedCodes(userExistingCodeIds);
    }

    if (user?.trips) {
      const formattedTrips = user.trips.map((trip, index) => ({
        ...trip,
        _id: index,
        startDate: trip.datestart ? trip.datestart.split('T')[0] : '',
        finishDate: trip.datefinish ? trip.datefinish.split('T')[0] : '',
      }));
      setSelectedTrips(formattedTrips);//Selected Array is the just the Selected (when initial it equal to all the array)
      setTripsArray(formattedTrips); //TripsArray is the ALL array

    }
    setAfterinitial(false);
  }, [user?.codes, user?.trips]);





      // Initialize per selectedCodes 
    useEffect(() => {
      if (selectedCodes !== null && selectedTrips !== null && afterinitial === false) {
        dispatch(getalllistforuser({ selectedKM, selectedCodes, selectedTrips }));
        setAfterinitial(true);
      }

    }, [selectedCodes, selectedTrips,afterinitial, dispatch]);



    const handleKMChange = (km) => {
      setSelectedKM(km); 
    };
    
    
    const handleSearchClick = () => {
      console.log(' selectedKM:',selectedKM);
      console.log(' selectedCodes:',selectedCodes);
      console.log(' selectedTrips:',selectedTrips);
      dispatch(getalllistforuser({ selectedKM, selectedCodes, selectedTrips }));
    };


    const handleAddTrip  = () => {
      setOpenAddGroupDialog(false);
      setOpenAddTripDialog(true);
    };

    //add code
    const handleAddGroup  = () => {
      setOpenAddGroupDialog(true);
      setOpenAddTripDialog(false);

    };
    
    if (selectedCodes === null || selectedTrips === null) return null;

    return (
      <Grid 
      container 
      alignItems="center" 
      justifyContent="center"
      spacing={4} 
      sx={{ 
        padding: 3, 
        ...getAccessibleStyles('#f5f5f5') 
      }}   
       >
      {/* Headline */}
                    <Grid item md={12}>
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: accessibilityData.contrastMode ? 'bold' : 'normal',
                      textDecoration: accessibilityData.contrastMode ? 'underline' : 'none',
                      color: getAccessibleStyles('#3f51b5').color,
                      fontSize: adjustedFontSize(4),
                      textAlign: 'center',
                      background: 'linear-gradient(to right, #3f51b5, #6a1b9a)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      textShadow: '4px 4px 10px rgba(0, 0, 0, 0.3)',
                      letterSpacing: '0.05em',
                    }}
                    gutterBottom
                  >
                    מצא/י התאמה
                  </Typography>

                </Grid>

  <Grid item md={12}>
  <Grid container spacing={3} justifyContent="center">
  <Grid item sx={{ mt: 4,mr: 3 }}>
  <Button
                          onClick={handleSearchClick}
                          aria-label="חיפוש"
                          aria-keyshortcuts="Alt+A"
                          sx={{
                            backgroundColor: 'rgba(1, 87, 155, 0.03)',  // very subtle blue tint
                            color: '#01579b',                           // dark blue text
                            border: '2px solid #01579b',              // slightly thicker border
                            fontSize: adjustedFontSize(1.1),
                            fontWeight: 600,                            // semi-bold font weight
                            height: 47,                                // just a bit taller
                            minWidth: 130,                             // a bit wider
                            padding: '0 16px',                         // moderate horizontal padding
                            borderRadius: 4,                           // slightly rounded corners
                            boxShadow: "0 2px 2px rgba(1, 87, 155, 0.2), inset 0 -2px 2px rgba(255, 255, 255, 0.5)", // moderate shadow
                            transition: 'all 0.25s ease',           
                            '&:hover': {
                              backgroundColor: '#0277bd',
                              color: '#fff',
                              borderColor: '#01579b',
                              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
                            }
                          }}
                          variant="outlined"
                        >
                          חפש
                          {accessibilityData.characterKeyShortcuts ? ' (Alt+A)' : ''}
                    
                        </Button>
                        </Grid>
                        
  <Grid item sx={{ mr: 3 }} >
                        <Box
   sx={{
    display: 'flex',
    alignItems: 'center',  // vertically center items
    justifyContent: 'center',
    mb: 1, 
  }}
>

 <Typography
  variant="subtitle2"
  sx={{
    fontWeight: accessibilityData.contrastMode ? 'bold' : 500,
    textDecoration: accessibilityData.contrastMode ? 'underline' : 'none',
    color: getAccessibleStyles('#3f51b5').color,
    fontSize: adjustedFontSize(1.6), // Slightly smaller
    textAlign: 'center',
    marginBottom: 0.5, // Tighter spacing
    letterSpacing: '0.03em',
    lineHeight: 1.2,
  }}
  gutterBottom
>
  בחר מרחק
</Typography>

</Box>


<FormControl
  fullWidth
  variant="outlined"
  sx={{
    direction: 'rtl',
    textAlign: 'right',
    mt: 1, 
  }}
>

  <Select
    value={selectedKM}
    onChange={(e) => handleKMChange(e.target.value)}
    sx={{
      textAlign: 'right',
    }}
    MenuProps={{
      PaperProps: {
        sx: {
          direction: 'rtl',
        },
      },
    }}
  >
     <MenuItem value={15}>עד 15 ק"מ</MenuItem>
    <MenuItem value={30}>עד 30 ק"מ</MenuItem>
    <MenuItem value={1000}>כל מרחק</MenuItem>
  </Select>
</FormControl>

    </Grid>

    {/* Group Selection */}
    <Grid item sx={{ mr: 3 }} >
    <Box
  sx={{
    display: 'flex',
    alignItems: 'right',  // vertically center items
    justifyContent: 'right', // horizontally center items in the box
    gap: 2,
    mb: 1 // space between Typography and Button, you can use number or string like '16px'
  }}
>

<Button
  variant="contained"
  color="primary"
  onClick={handleAddGroup}
  sx={{
    fontSize: adjustedFontSize(1.0),
    fontWeight: 400,
    px: 1.2,
    py: 0.3,
    minWidth: 'auto',
    backgroundColor: 'transparent',             // Clear background by default
    color: '#6a1b9a',                            // Dark purple text by default
    borderRadius: '8px',
    border: '2px solid #6a1b9a',                 // Purple frame
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1), inset 0 -2px 4px rgba(255, 255, 255, 0.5)",
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#8e24aa',               // Purple background on hover
      color: '#fff',                             // White text on hover
      borderColor: '#6a1b9a',                    // Same purple frame on hover
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
    }
  }}
>
  הוספה/עריכה
</Button>


<Typography
  variant="subtitle2"
  sx={{
    fontWeight: accessibilityData.contrastMode ? 'bold' : 500,
    textDecoration: accessibilityData.contrastMode ? 'underline' : 'none',
    color: getAccessibleStyles('#3f51b5').color,
    fontSize: adjustedFontSize(1.6), // Slightly smaller
    textAlign: 'center',
    marginBottom: 0.5, // Tighter spacing
    letterSpacing: '0.03em',
    lineHeight: 1.2,
  }}
  gutterBottom
>
בחר קבוצה
</Typography>


    </Box>


    {codesArray.length > 0 ? (
      <FormControl fullWidth sx={{ direction: 'rtl', textAlign: 'right', mt: 1 }}>
      <Select
            multiple
            value={selectedCodes ?? []}
            onChange={(e) => setSelectedCodes(e.target.value)}  
            renderValue={(selected) => {
              if (selected.length === 0) {
                return 'לא נבחרו קודים'; // Fallback message
              }
              return codesArray
                .filter(code => selected.includes(code._id.toString()))
                .map(code => code.group)
                .join(', ');
            }}
          
            MenuProps={{
      PaperProps: {
        sx: { direction: 'rtl', textAlign: 'right' },
      },
    }}
    displayEmpty
    > 
            {codesArray.map((code) => (
              <MenuItem key={code._id} value={code._id.toString()}>
                <Checkbox checked={selectedCodes.includes(code._id.toString())} />
                <ListItemText primary={code.group} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (

      

<Box
  sx={{
    width: '100%',
    mt: 1.9,
    height: '55px', // standard MUI input height
    border: '1px solid rgba(0, 0, 0, 0.23)',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', // Center the text horizontally
    backgroundColor: '#f5f5f5',
    direction: 'rtl',
    textAlign: 'center', // ensure RTL centering
  }}
>
  <Typography
    sx={{
      textDecoration: accessibilityData.contrastMode ? 'underline' : 'none',
      fontSize: adjustedFontSize(1),
      textAlign: 'right',
      color: '#000',
      textShadow: '4px 4px 10px rgba(0, 0, 0, 0.3)',
    }}
    gutterBottom
  >
    אין קודים לבחירה
  </Typography>
</Box>
)}

    </Grid>

    <Grid item sx={{ }} >
    <Box
  sx={{
    display: 'flex',
    alignItems: 'right',  // vertically center items
    justifyContent: 'right', // horizontally center items in the box
    gap: 2,
    mb: 1, // space between Typography and Button, you can use number or string like '16px'
  }}
>

<Button
  onClick={handleAddTrip}
  sx={{
    fontSize: adjustedFontSize(1.0),
    fontWeight: 400,
    px: 1.2,
    py: 0.3,
    minWidth: 'auto',
    backgroundColor: 'transparent',             // Clear background by default
    color: '#6a1b9a',                            // Dark purple text by default
    borderRadius: '8px',
    border: '2px solid #6a1b9a',                 // Purple frame
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1), inset 0 -2px 4px rgba(255, 255, 255, 0.5)",
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#8e24aa',               // Purple background on hover
      color: '#fff',                             // White text on hover
      borderColor: '#6a1b9a',                    // Same purple frame on hover
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
    }
  }}
>

  הוספה/עריכה
</Button>

    <Typography
  variant="subtitle2"
  sx={{
    fontWeight: accessibilityData.contrastMode ? 'bold' : 500,
    textDecoration: accessibilityData.contrastMode ? 'underline' : 'none',
    color: getAccessibleStyles('#3f51b5').color,
    fontSize: adjustedFontSize(1.6),
    textAlign: 'center',
    marginBottom: 0.5,
    letterSpacing: '0.03em',
    lineHeight: 1.2,
  }}
  gutterBottom
>
בחר טיול
</Typography>

    </Box>

    {tripsArray.length > 0 ? (
      <FormControl fullWidth sx={{ direction: 'rtl', textAlign: 'right', mt: 1 }}>
      {/* This shows the selected trips inside the closed Select box */}
 <Select
   multiple
   value={selectedTrips ?? []}
   onChange={(e) => {
     setSelectedTrips(e.target.value);
   }}
   renderValue={(selected) => {
    if (selected.length === 0) {
      return 'לא נבחרו טיולים'; // 0 selected
    }
    if (selected.length === 1) {
      const trip = selected[0];
      return `${trip.countryandcity} (${trip.startDate} - ${trip.finishDate})`; // 1 selected
    }
    return `נבחרו ${selected.length} טיולים`; // More than 1 selected
  }}
  displayEmpty
   MenuProps={{ 
     PaperProps: {
       sx: { direction: 'rtl', textAlign: 'right' },
     },
   }}
 >
        {/* This list shows up when the user opens the Select dropdown */}
   {tripsArray.map(trip => (
     <MenuItem key={trip._id} value={trip}>
       <Checkbox checked={(selectedTrips ?? []).some(selectedTrip => selectedTrip._id === trip._id)} />
       <ListItemText primary={`${trip.countryandcity} (${trip.startDate} - ${trip.finishDate})`} />
     </MenuItem>
   ))}
 </Select>
</FormControl>
  ) : (

    
    <Box
      sx={{
        width: '100%',
        height: '56px', // standard MUI input height
        border: '1px solid rgba(0, 0, 0, 0.23)',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', // Center the text horizontally
        backgroundColor: '#f5f5f5',
        direction: 'rtl',
        textAlign: 'center', // ensure RTL centering
      }}
    >
      <Typography
        sx={{
          textDecoration: accessibilityData.contrastMode ? 'underline' : 'none',
          fontSize: adjustedFontSize(1),
          textAlign: 'right',
          color: '#000',
          textShadow: '4px 4px 10px rgba(0, 0, 0, 0.3)',
        }}
        gutterBottom
      >
        אין טיול לבחירה
      </Typography>
    </Box>
    )}


</Grid>
  </Grid>
  </Grid>


  <Grid item md={12} sx={{ marginTop: 4,display: 'flex', justifyContent: 'center' }}>
    <ChosenUserList />
  </Grid>

  <Dialog
      open={openAddTripDialog}
      onClose={() => setOpenAddTripDialog(false)}
      fullWidth
      PaperProps={{
        sx: {
          width: '50vw',        // 50% of viewport width
          maxWidth: '100%',     // Prevents overflow
          height: 'auto',       // Adjust to content height
          maxHeight: '90vh',    // Avoids screen overflow
          borderRadius: 3,
          p: 2,
          m: 'auto'             // Center the dialog
        }
      }}
    >
      <DialogContent
        sx={{
          height: 'calc(90vh - 64px)', // Adjust height to account for title's height (usually ~64px)
          overflowY: 'auto'
        }}
      >

        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AddTripForm user={user} onClose={() => setOpenAddTripDialog(false)} />
        </LocalizationProvider>


            </DialogContent>
    </Dialog>

      <Dialog
      open={openAddGroupDialog}
      onClose={() => setOpenAddGroupDialog(false)}
      fullWidth
      PaperProps={{
        sx: {
          width: '50vw',        // 50% of viewport width
          maxWidth: '100%',     // Prevents overflow
          height: 'auto',       // Adjust to content height
          maxHeight: '90vh',    // Avoids screen overflow
          borderRadius: 3,
          p: 2,
          m: 'auto'             // Center the dialog
        }
      }}
    >
      <DialogContent
        sx={{
          height: 'calc(90vh - 64px)', // Adjust height to account for title's height (usually ~64px)
          overflowY: 'auto'
        }}
      >

        <GroupsNew />


            </DialogContent>
    </Dialog>

    </Grid>

        );
  };
  
  export default FindPage;
