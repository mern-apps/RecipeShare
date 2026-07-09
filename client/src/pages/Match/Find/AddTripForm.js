import React, { useState,useEffect  } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  IconButton,
  Card,
  CardContent
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { addtrip,removetrip } from '../../actions/tripsactions';

const AddTripForm = ({ user, onClose }) => {
  const dispatch = useDispatch();
  const allTripsArray = useSelector((state) => state.auth.trips);
  const servercount = useSelector((state) => state.auth.user.servercount);


  useEffect(() => {
    if (servercount !== undefined) {
      console.log('Server count changed:', servercount);
      // Or show with alert:
      // alert(`Server count: ${servercount}`);
    }
  }, [servercount]);


  const [formValues, setFormValues] = useState({
    countryandcity: '',
    datestart: null,
    datefinish: null,
  });

  // Get unique countryandcity values for the select dropdown
  const uniqueTrips = Array.from(new Set(allTripsArray.map(trip => trip.countryandcity))).sort((a, b) => a.localeCompare(b));

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formValues.countryandcity || !formValues.datestart || !formValues.datefinish) return;
    
    if (dayjs(formValues.datefinish).isBefore(dayjs(formValues.datestart), 'day')) {
      alert('תאריך הסיום חייב להיות אחרי או באותו היום של תאריך ההתחלה');
      return;
    }
    const tripData = {
      countryandcity: formValues.countryandcity,
      datestart: dayjs(formValues.datestart).toISOString(),
      datefinish: dayjs(formValues.datefinish).toISOString(),
    };
    
    dispatch(addtrip(tripData));
    
    setFormValues({
      countryandcity: '',
      datestart: null,
      datefinish: null,
    });
  };

  const handleRemove = (trip) => {
    dispatch(removetrip(trip));
  };

  return (
    <Box sx={{ direction: 'rtl' }}>
      <Typography variant="h4" gutterBottom>
        הטיולים שלך
      </Typography>

      <Grid container spacing={4} >
      {user.trips.map((trip, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
     <Card
        sx={{
          maxWidth: 300,
          mx: 'auto',
          boxShadow: 6,
          border: '1px solid #e0e0e0',
          borderRadius: 3,
          p: 2,
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s',
          '&:hover': {
            transform: 'scale(1.03)',
            boxShadow: 9,
            borderColor: '#1976d2',
          },
        }}
      >              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  {trip.countryandcity}
                </Typography>
  
                <Typography variant="body1" sx={{ }}>
                  {dayjs(trip.datestart).format('DD/MM/YYYY')} - התחלה
                </Typography>
                <Typography variant="body1" sx={{  }}>
                  {dayjs(trip.datefinish).format('DD/MM/YYYY')} - סיום
                </Typography>
                <Box>
                  <IconButton color="error" onClick={() => handleRemove(trip)}>
                    <Delete />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {user.trips.length >= 3 ? (
        <Typography color="error" sx={{ mt: 3, fontSize: '1.2rem', fontWeight: 'bold' }}>
        הגעת למקסימום של 3 טיולים. הסר טיול כדי להוסיף חדש.
      </Typography>
      ) : servercount >= 10 ? (
        <Typography color="error" sx={{ mt: 3, fontSize: '1.2rem', fontWeight: 'bold' }}>
        אין פעולות נוספות זמינות.
      </Typography>
      ) : (
<Box
  component="form"
  sx={{
    mt: 4,
    mb: 4,
    maxWidth: 400,      // narrow width, adjust as needed
    direction: 'rtl',
  }}
>          <Typography variant="h6" gutterBottom>
            הוסף טיול חדש
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                size="small"
                label="בחר מדינה ועיר"
                name="countryandcity"
                value={formValues.countryandcity}
                onChange={handleChange}
                InputProps={{
                  sx: {
                    textAlign: 'right', // Aligns selected value to the right
                    direction: 'rtl',   // Ensures Hebrew displays correctly
                  }
                }}
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      sx: {
                        textAlign: 'right',
                        direction: 'rtl',
                      }
                    }
                  }
                }}
              >
                {uniqueTrips.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

        
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="תאריך התחלה"
                value={formValues.datestart}
                onChange={(newValue) =>
                  setFormValues({ ...formValues, datestart: newValue })
                }
                format="DD/MM/YYYY"
                slotProps={{ textField: { fullWidth: true, size: 'small' } }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="תאריך סיום"
                value={formValues.datefinish}
                onChange={(newValue) =>
                  setFormValues({ ...formValues, datefinish: newValue })
                }
                format="DD/MM/YYYY"
                slotProps={{ textField: { fullWidth: true, size: 'small' } }}
              />
            </Grid>

      
            <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-start" gap={2}>
                <Button variant="contained" onClick={handleSubmit}>
                  הוסף טיול
                </Button>
            
              </Box>
            </Grid>

       


          </Grid>
        </Box>
      )}

      {servercount < 10 && (
        <Typography color="text.secondary" sx={{ mt: 2, fontSize: '1.2rem' }}>
        יש לך עוד {10 - servercount} פעולות זמינות
        </Typography>
      )}

           <Grid xs={12}>
              <Box display="flex" justifyContent="flex-start" gap={2} sx={{ mt: 3 }} >
      
              <Button variant="outlined" color="secondary" onClick={onClose}>
                  יציאה
                </Button>
              
              </Box>
            </Grid>


    </Box>
  );
};

export default AddTripForm;