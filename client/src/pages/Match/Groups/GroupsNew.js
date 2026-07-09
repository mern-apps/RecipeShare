import React, { useState,useEffect,useMemo } from 'react';
import {
  Grid, Card, CardMedia, CardContent, Typography, Button,
  ToggleButtonGroup, ToggleButton, Box, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addcodetouser, deletecodefromuser } from '../../actions/groupactions';
import { getallcodesgroups } from '../../actions/groupactions';

import BlockPageGroups from '../../Components/Block/BlockPageGroups';
import GroupsIcon from '@mui/icons-material/Groups';

const categoriesList = ['sport', 'nature', 'culture', 'food', 'politics'];
const categoriesMap = {
  sport: 'ספורט',
  nature: 'טבע',
  culture: 'תרבות',
  food: 'אוכל',
  //politics: 'פוליטיקה',
};
const GroupsNew = () => {

     const blockPageredux = useSelector((state) => state.general.groups);
     
  const allCodesArray = useSelector((state) => state.auth.codes);
  const { user } = useSelector((state) => state.auth);
  const userCodeIds = user?.codes?.map((code) => code._id?.toString()) || [];

  const [selectedCode, setSelectedCode] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogPassword, setDialogPassword] = useState('');
  const [dialogError, setDialogError] = useState('');

const [activeCategories, setActiveCategories] = useState([...categoriesList]);
const allOn = activeCategories.length === categoriesList.length;



  const navigate = useNavigate();
  const dispatch = useDispatch();

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
              break;
              case "B":
                break;
                case "C":
                  break;
                        default:
                          break;
                      }
                    };
                
                    window.addEventListener("keydown", handleKeyDown);
                    return () => window.removeEventListener("keydown", handleKeyDown);
                  }, []);



    useEffect(() => {
      dispatch(getallcodesgroups());
    }, [dispatch]);
  

    const selectAllCategories = () => {
  // always select all
  setActiveCategories([...categoriesList]);
};

const handleCategoryClick = (category) => {
  setActiveCategories((prev) => {
    if (prev.length === categoriesList.length) {
      // currently all are selected → switch to only the clicked one
      return [category];
    } else {
      // currently a single category → switch to that clicked category
      return [category];
    }
  });
};

const handleJoin = (code) => {
  if (code.premium) {
    setSelectedCode(code);   // store code here
    setDialogOpen(true);
  } else {
    dispatch(addcodetouser(code._id.toString()));
  }
};

  const handleRemove = (codeID) => {
    dispatch(deletecodefromuser(codeID));
  };


const handlePasswordSubmit = () => {
  if (!selectedCode) return;

  // check if dialogPassword matches any password in the array
  const isValidPassword = Array.isArray(selectedCode.password) 
    && selectedCode.password.includes(dialogPassword);

  if (isValidPassword) {
    dispatch(addcodetouser(selectedCode._id.toString()));
    setDialogOpen(false);
    setDialogPassword('');
    setDialogError('');
    setSelectedCode(null); // clear after use
  } else {
    setDialogError('הסיסמה שגויה');
  }
};

  

  const userCodes = useMemo(() => {
    if (!Array.isArray(allCodesArray)) return;
  
    return allCodesArray.filter(code =>
      userCodeIds.includes(code._id.toString())
    );
  }, [allCodesArray, userCodeIds]);



  const allFilteredCodes = useMemo(() => {
  if (!Array.isArray(allCodesArray)) return [];
  // Filter codes not in user and in active categories
  return allCodesArray.filter(code => {
    const isInUserCodes = userCodeIds.includes(code._id.toString());
    const isInActiveCategory = activeCategories.includes(code.category);

    return !isInUserCodes && isInActiveCategory;
  });

}, [allCodesArray, userCodeIds, activeCategories]);


  const renderCard = (code, isUserGroup = false) => (
  <Card
    key={Array.isArray(code._id) ? code._id[0] : code._id}
    sx={{
      maxWidth: 345,
      m: 1,
      borderRadius: 3,
      boxShadow: 4,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    {code.image ? (
      <CardMedia
        component="img"
        image={code.image}
        alt="Group image"
        sx={{
          width: '100%',
          // Maintain 16:9 aspect ratio
          aspectRatio: '16/9',
          objectFit: 'cover',
        }}
      />
    ) : (
      <Box
        sx={{
          width: '100%',
          aspectRatio: '16/9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
        }}
      >
        <GroupsIcon sx={{ fontSize: 64, color: '#9e9e9e' }} />
      </Box>
    )}

    <CardContent sx={{ flexGrow: 1 }}>
      <Typography
  gutterBottom
  variant="h6"
  component="div"
  sx={{
    height: '3rem', // adjust this to match 2 lines of your font-size
    lineHeight: 1.1, // line height
    overflow: 'hidden',
    wordBreak: 'break-word',
  }}
>
  {code.group}
</Typography>
      <Typography variant="body2" color="text.secondary">
        {code.description1}
      </Typography>
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Button
          variant="outlined"
          color={isUserGroup ? 'error' : 'primary'}
          onClick={() =>
            isUserGroup ? handleRemove(code._id.toString()) : handleJoin(code)
          }
        >
          {isUserGroup ? 'הסר קבוצה' : 'הצטרף לקבוצה'}
        </Button>
      </Box>
    </CardContent>
  </Card>
);



  if (blockPageredux && user.useradmin !== 10) {
      return <BlockPageGroups />;
    }

    if (!userCodes) return null;

  return (
    <Grid
    container
    direction="rtl"
    spacing={4}
    sx={{ p: 3, textAlign: 'right', mr: 5 }}
  >
    
    {/* Section A - User's Groups */}
      {userCodes.length > 0 && (
        <Grid item xs={12}>
        <Grid item xs={12} sx={{ mb: 4 }}>

       <Typography
                variant="h4"
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
כל הקבוצות שלך     
  </Typography>
</Grid>

         <Grid container spacing={2} justifyContent="flex-end">
  {userCodes.map((code) => (
    <Grid item xs={12} sm={6} md={4} lg={4} key={code._id}>
      {renderCard(code, true)}
    </Grid>
  ))}
</Grid>
          </Grid>
      )}

      {/* Section B - All Other Groups */}
      <Grid item xs={12}>

      <Typography
                variant="h4"
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
כל הקבוצות    
  </Typography>

   <ToggleButtonGroup
  value={activeCategories}
  sx={{ mb: 3, flexWrap: 'wrap', justifyContent: 'flex-start' }}
>
  {/* כפתור "כל הקטגוריות" */}
  <ToggleButton
    value="all"
    selected={allOn}
    onClick={selectAllCategories}
    sx={{
      borderRadius: '30px !important',
      m: 0.7,
      px: 3,
      py: 1,
      fontWeight: '600',
      fontSize: '0.95rem',
      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
      transition: 'all 0.25s ease-in-out',
      background: allOn
        ? 'linear-gradient(145deg, #2196f3, #1976d2)'
        : 'linear-gradient(145deg, #f5f5f5, #e0e0e0)',
      color: allOn ? '#fff' : '#333',
      border: 'none',
      '&.Mui-selected': {
        background: 'linear-gradient(145deg, #2196f3, #1976d2)',
        color: '#fff',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
      },
      '&:hover': {
        background: 'linear-gradient(145deg, #42a5f5, #1e88e5)',
        color: '#fff',
        transform: 'translateY(-2px)',
        boxShadow: '0 6px 12px rgba(0,0,0,0.25)',
      },
    }}
  >
    כל הקטגוריות
  </ToggleButton>

  {/* כפתורים לפי קטגוריה */}
  {categoriesList.map((category) => {
    const isSelected = activeCategories.includes(category);
    return (
      <ToggleButton
        key={category}
        value={category}
        selected={isSelected}
        onClick={() => handleCategoryClick(category)}
        sx={{
          borderRadius: '30px !important',
          m: 0.7,
          px: 3,
          py: 1,
          fontWeight: '600',
          fontSize: '0.95rem',
          boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
          transition: 'all 0.25s ease-in-out',
          background: isSelected
            ? 'linear-gradient(145deg, #2196f3, #1976d2)'
            : 'linear-gradient(145deg, #f5f5f5, #e0e0e0)',
          color: isSelected ? '#fff' : '#333',
          border: 'none',
          '&.Mui-selected': {
            background: 'linear-gradient(145deg, #2196f3, #1976d2)',
            color: '#fff',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
          },
          '&:hover': {
            background: 'linear-gradient(145deg, #42a5f5, #1e88e5)',
            color: '#fff',
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 12px rgba(0,0,0,0.25)',
          },
        }}
      >
        {categoriesMap[category]}
      </ToggleButton>
    );
  })}
</ToggleButtonGroup>


      
    <Grid container spacing={2} justifyContent="flex-end">
  {allFilteredCodes.map((code) => (
    <Grid item xs={12} sm={6} md={4} lg={4} key={code._id}>
      {renderCard(code)}
    </Grid>
  ))}
</Grid>
      </Grid>

      {/* Dialog for premium group password */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>הזן סיסמה לקבוצה זו</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="סיסמה"
            fullWidth
            type="password"
            value={dialogPassword}
            onChange={(e) => setDialogPassword(e.target.value)}
            error={!!dialogError}
            helperText={dialogError}
          />
        </DialogContent>
        <DialogActions>
<Button onClick={() => { setDialogOpen(false); setSelectedCode(null); }}>ביטול</Button>
<Button onClick={handlePasswordSubmit}>אישור</Button>
        </DialogActions>
      </Dialog>
  </Grid>
  );
};

export default GroupsNew;
