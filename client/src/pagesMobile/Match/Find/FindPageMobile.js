import React, { useEffect, useState } from 'react';   
import { useSelector, useDispatch } from 'react-redux';
import { Box,Grid, Typography, Button, ButtonGroup } from '@mui/material';
import { Message as MessageIcon, Favorite as FavoriteIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getalllistforuser } from '../../actions/userfindpageactions';
import { getallcodes } from '../../actions/userfindpageactions';
import { getallmatches, getallnewmessages } from '../../actions/matchespage';
import ChosenUserListMobile from '../../Components/ChosenUserListMobile';

const FindPageMobile = () => {
  const { user } = useSelector((state) => state.auth);
  const codeArray = useSelector((state) => state.auth.codes);

  const Newmatches = useSelector((state) => state.auth.newmatches);
  const CountLastMessagesReceived = useSelector((state) => state.auth.countLastMessagesReceived);
  const CountNoMessages = useSelector((state) => state.auth.countNoMessages);

  const [totalUnreadMessages, setTotalUnreadMessages] = useState(0);
  const [selectedKM, setSelectedKM] = useState(15); // Default to 15
  const [selectedCode, setSelectedCode] = useState(null); // Default to null for code selection

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setTotalUnreadMessages(CountLastMessagesReceived + CountNoMessages);
  }, [CountLastMessagesReceived, CountNoMessages]);

  useEffect(() => {
    if (!user?._id) {
      navigate('/');
    } else {
      //dispatch(getallcodes(token)); 
      const selected = {
        selectedKM,
        selectedCode
      };
      dispatch(getalllistforuser(selected)); 
             // dispatch(getallnewmessages(token));

      const skipValue = 0;
      //dispatch(getallmatches(skipValue, token));        
    }
  }, [dispatch, user, navigate, selectedKM, selectedCode]);

  const handleKMChange = (km) => {
    setSelectedKM(km); // Set selectedKM
  };
  
  const handleCodeChange = (codeId) => {
    setSelectedCode((prevCode) => (prevCode === codeId ? null : codeId));
  };

return (
  <Grid 
    container 
    direction="column" 
    alignItems="center" 
    sx={{ padding: 1 }}
  >
    {/* Headline */}
    <Grid item xs={12}>
      <Typography
        variant="h2"
        sx={{
          fontWeight: 'bold',
          color: '#3f51b5',
          textAlign: 'center',
          background: 'linear-gradient(to right, #3f51b5, #6a1b9a)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
          fontSize: '2rem',
          letterSpacing: '0.05em',
        }}
      >
        מצא/י התאמה
      </Typography>
    </Grid>

    <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ width: '100%', mt: -1 }}>
      {/* Distance Selection */}
      <Grid item>
        <Box 
          sx={{ 
            border: '1px solid #ccc', 
            borderRadius: '8px', 
            width: '250px', // Set a fixed width for consistency
            textAlign: 'center',
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            בחר מרחק
          </Typography>
          <ButtonGroup
            sx={{
              gap: 1, // Reduced the gap between buttons
            }}
          >
            <Button
              variant={selectedKM === 15 ? 'contained' : 'outlined'}
              onClick={() => handleKMChange(15)}
            >
              15KM
            </Button>
            <Button
              variant={selectedKM === 30 ? 'contained' : 'outlined'}
              onClick={() => handleKMChange(30)}
            >
              30KM
            </Button>
            <Button
              variant={selectedKM === 1000 ? 'contained' : 'outlined'}
              onClick={() => handleKMChange(1000)}
            >
              כל מרחק
            </Button>
          </ButtonGroup>
        </Box>
      </Grid>

      {/* Group Selection */}
      {codeArray?.length > 0 && (
      <Grid item>
        <Box 
          sx={{ 
            border: '1px solid #ccc', 
            borderRadius: '8px', 
            width: '250px', // Set a fixed width for consistency
            textAlign: 'center',
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            בחר קבוצה
          </Typography>
            <ButtonGroup
              sx={{
                gap: 1, // Reduced the gap between buttons
              }}
            >
              {codeArray.map((code) => (
                <Button
                  key={code._id}
                  variant={selectedCode === code._id ? 'contained' : 'outlined'}
                  onClick={() => handleCodeChange(code._id)}
                >
                  {code.group}
                </Button>
              ))}
              <Button
                variant={selectedCode === null ? 'contained' : 'outlined'}
                onClick={() => handleCodeChange(null)}
              >
                איפוס
              </Button>
            </ButtonGroup>
          
        </Box>
      </Grid>
      )}
    </Grid>

    <Grid container justifyContent="center" sx={{ width: '100%', marginTop: 3 }}>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <ChosenUserListMobile type="user" releventuser={user._id} />
      </Grid>
    </Grid>
  </Grid>
);
};

export default FindPageMobile;