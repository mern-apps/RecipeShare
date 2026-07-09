import React, { useRef, useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";

import { Box,Button,Stack,FormLabel, TextField, Select, MenuItem, FormControl, InputLabel, Checkbox, FormGroup, FormControlLabel, Grid, Radio, RadioGroup } from '@mui/material';
import CancelIcon from "@mui/icons-material/Cancel";
import { Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';
import CircularProgress from "@mui/material/CircularProgress";

import ItemDisplayrouter from '../BookPageEdit/ItemDisplay/ItemDisplayrouter.js';
import GroupPage from '../GroupPage/GroupPage.js';


import { addgroupowner } from '../../actions/groupactions.js';
import { editgroup } from '../../actions/groupactions.js';
import { setpagemode } from '../../actions/groupactions.js';
import { uploadimagegroup } from '../../actions/imagesactions.js';
import { fetchGroupById } from '../../actions/groupactions';
 import { previouspage } from '../../actions/recipeNewForm.js';

//import { setpagemode2 } from '../../../../actions/bookEditPageActions.js';
//import { uploadimagerecipe2 } from '../../../../actions/imagesactions.js';

import Quill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import ImageForm from './ImageForm.js'; 

import { useParams } from 'react-router-dom';
import { FONT_COLOR_OPTIONS } from '../../assets/fontColorRecipe2.js';
import { FONT_SIZE_OPTIONS } from '../../assets/fontSize.js';

// Fix Quill bullets RTL text overlap
const quillFixStyles = `
.ql-editor li {
  padding-right: 1.6em !important; /* מרווח גדול יותר בין בולטים לטקסט */
}     

.ql-editor li::before {
  margin-right: -1.4em !important; /* מיקום הבולטים */
  margin-left: 0 !important;
}

.ql-editor {
  direction: rtl !important;    /* עברית ברירת מחדל */
  text-align: right !important;  /* יישור לימין */
  font-family: 'Arial, sans-serif', 'David', 'Heebo' !important; /* פונטים שמתאימים לעברית */
  font-size: 1.5rem !important;  /* גדול וברור */
  line-height: 1.8 !important;   /* מרווח שורות נוח לקריאה */
  padding: 18px !important;      /* ריווח פנימי */
}

/* Placeholder Hebrew-friendly */
.ql-editor.ql-blank::before {
  font-size: 1.4rem;
  color: #9e9e9e;
  content: 'הכנס שם קבוצה כאן'; /* אפשר לשים טקסט בעברית */
}

/* Optional: הגדלת רשימות */
.ql-editor ul, .ql-editor ol {
  padding-right: 1.6em !important;
}
`;


const GroupForm = () => {

    //need to add reset actions..:
  const dispatch = useDispatch();
      const location = useLocation();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);
   const isLogOut = useSelector((state) => state.auth.islogout);

const recipe2 = useSelector((state) => state.grouppage.currentgroup);
const pagemode2 = useSelector((state) => state.grouppage.pagemode);
      
const [isSaving, setIsSaving] = useState(false);

const [recipeUploadPermissionUI, setRecipeUploadPermissionUI] = useState("everyone");

    const imagesTemplatesBooks2 = useSelector(
       (state) => state.grouppage.imagestemplates || []
  );

//title
       const [chosenColorIng, setChosenColorIng] = useState("#000000");
  const [chosenSizeIng, setChosenSizeIng] = useState(25);


const MAX_TOTAL_CHARS = 120;     // סה"כ תווים מותרים
const MAX_CHARS_PER_WORD = 12;  // תווים למילה
const stripHtml = (html = "") =>
  html
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();

    const validateRichTextTitle = (html) => {
  const text = stripHtml(html);

  if (!text) {
    return "נא להזין כותרת";
  }

  // סה"כ תווים
  if (text.length > MAX_TOTAL_CHARS) {
    return `הכותרת ארוכה מדי (מקסימום ${MAX_TOTAL_CHARS} תווים)`;
  }

  // בדיקת אורך מילה
  const words = text.split(" ");
  const longWord = words.find(word => word.length > MAX_CHARS_PER_WORD);

  if (longWord) {
    return `המילה "${longWord}" ארוכה מדי (מקסימום ${MAX_CHARS_PER_WORD} תווים למילה)`;
  }

  return null; // תקין
};

     // ♿ Accessibility
        const localaccessibilitySettings = useSelector((state) => state.auth.accessibility);
        const [accessibilityData, setAccessibilityData] = useState(localaccessibilitySettings);
      
        useEffect(() => {
          if (user && user.accessibility) {
            setAccessibilityData(user.accessibility);
          } else {
            setAccessibilityData(localaccessibilitySettings);
          }
        }, [user, localaccessibilitySettings]);
      
        const adjustedFontSize = (size) => `${(size * (accessibilityData?.fontSizeAdjustments || 100)) / 100}rem`;
        const adjustedLineHeight = (defaultValue) => defaultValue * (accessibilityData?.lineSpacing || 1);
        const adjustedWordSpacing = (defaultValue) => defaultValue * (accessibilityData?.wordSpacing || 1);
        const adjustedLetterSpacing = (defaultValue) => defaultValue * (accessibilityData?.letterSpacing || 1);
      
    // Keyboard shortcuts for accessibility
    useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.altKey) {
          switch (event.key.toUpperCase()) {
            case 'D':
              event.preventDefault();
              document.getElementById('submit-group-button')?.click();
              break;
            default:
              break;
          }
        }
      };
 window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, []);

//Check if can be deleted
//const currentGroup = useSelector(state => state.grouppage.currentgroup); 

    const [selectedOption2, setSelectedOption2] = useState('templates'); 
  const [imagesFiles2, setImagesFiles2] = useState([]);
  const [selectedTemplate2, setSelectedTemplate2] = useState(null);

  const [editbaselineimage2, setEditbaselineimage2] = useState(null);
    const [editDelete2, setEditDelete2] = useState(false);

    const [imageRecipeDisplay2, setImageRecipeDisplay2] = useState(null);
 
    const [error2, setError2] = useState(null);

    //This define if the user allowd to update the page
    const { id } = useParams();

     useEffect(() => {
          if (isLogOut === 1) {
            navigate('/');
            }
          }, [isLogOut, navigate]);

          useEffect(() => {
  if (imagesTemplatesBooks2?.length > 0) {
    setSelectedTemplate2(imagesTemplatesBooks2[0]);
  }
}, [imagesTemplatesBooks2]);

const [task2, setTask2] = useState({
  title: "",
  image: null,
  ingFont: 1.1,
  password: null,
    recipeUploadPermissionUI: "everyone",

});

useEffect(() => {
  if (id?.includes("new")) {
    dispatch(setpagemode("new"));

    setTask2({
      title: "",
      image: null,
      ingFont: 1.1,
  recipeUploadPermissionUI: "everyone",
    });
  } else if (recipe2) {
    setTask2({
      _id: recipe2._id,
      title: recipe2.title,
      image: recipe2.image,
      ingFont: recipe2.ingFont,
      password: recipe2.password,
  recipeUploadPermissionUI:
      recipe2.recipeUploadPermission === 1 ? "everyone" : "admin", 
    });
    setEditbaselineimage2(recipe2.image);

  }
}, [id, recipe2, dispatch]);



const DEFAULT_GROUP_IMAGE =
  "https://mern-apps.s3.eu-north-1.amazonaws.com/groups/1765255033660/Homepageimage1.png";

  useEffect(() => {
  let img = DEFAULT_GROUP_IMAGE;
  if (imagesTemplatesBooks2.length === 0) return;
  img = imagesTemplatesBooks2[0];

  if (selectedOption2 === "templates" && selectedTemplate2) {
    img = selectedTemplate2;
    setImageRecipeDisplay2(img);
    return;
  }
  if (selectedOption2 === "upload" && imagesFiles2?.length > 0) {
    const preview = imagesFiles2[0]?.preview;
    if (preview) {
      img = preview;
    }
    setImageRecipeDisplay2(img);
    return;
  }
  if (task2?.image) {
    img = task2.image;
  }
  setImageRecipeDisplay2(img);
}, [
  pagemode2,
  selectedOption2,
  selectedTemplate2,
  imagesFiles2,
  task2
]);


  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    if (!task2.title) {
      setError2('נא למלא את כל השדות בטופס.');
      return;
    } 
   if ((selectedOption2 === "upload" && imagesFiles2.length === 0) || (selectedOption2 === "Templates" && !selectedTemplate2)) {
  setError2("נא לבחור תמונה");
  return; 
}

   try {
    const formData2 = {
      title: task2.title,
      password: task2.password,
            recipeUploadPermission: task2.recipeUploadPermissionUI === "everyone" ? 1 : 2,

template:
    selectedOption2 === "templates" && selectedTemplate2
      ? selectedTemplate2 
      : null,          
  ingFont: task2.ingFont,

    };
const editData2 = {
  ...formData2,
  id: task2._id,
    };
let savedItemID;
if (pagemode2 === "edit") {
    await dispatch(editgroup(editData2));
  savedItemID = editData2.id;
} else {
  const newitemrecipe2 = await dispatch(addgroupowner(formData2));
  savedItemID = newitemrecipe2._id;
}

  if (
  selectedOption2 === "upload" &&
  imagesFiles2.length > 0 
) {
              for (const imageObj of imagesFiles2) {
            const imagefile = imageObj.file;
            if (!imagefile) continue;
            const fileDetails = {
              fileName: imageObj.name,
              fileType: imageObj.type,
              operation: "upload",
             savedItemID,
            };
            await dispatch(uploadimagegroup(imagefile, fileDetails));
          }
} 

   setError2(null); 
if (savedItemID) {
  dispatch(setpagemode("view"));
  dispatch(fetchGroupById(savedItemID));
  navigate(`/group/${savedItemID}`);
} else {
  navigate(`/`);
}
       
  } catch (err) {
    console.log(err);
    setError2(" שגיאה ");
  }

  };

  const handleCloseError = () => {
    setError2(null);
  };


   return (
    <>
      <style>{quillFixStyles}</style>
{(pagemode2 === "new" || pagemode2 === "edit") ? (
<Grid
  container
  sx={{
    direction: 'rtl',
  }}
>
          {/* Right – Form */}
<Grid
  item
  xs={6}
  sx={{
    backgroundColor: '#fff',
    border: '2px solid #3498db',
    borderRadius: '10px',
    boxShadow: 2,
    p: 3,
    overflowY: 'auto',    
  }}
>
        <Typography
          variant="h4"
  sx={{ 
    color: '#00427D', 
    fontWeight: 'bold', 
    mb: 2, 
    fontSize: '2.5rem',
    lineHeight: 1.3,  
  }}        >
          {recipe2?.title ? 'עריכה ' : 'יצירת עמוד חדש'}
        </Typography>

      <form onSubmit={handleTaskSubmit}>
      <Grid container spacing={2}>

        <FormControl>
          <FormLabel>מי יכול להוסיף מתכונים לקבוצה?</FormLabel>
        
          <RadioGroup
            value={recipeUploadPermissionUI}
            onChange={(e) => setRecipeUploadPermissionUI(e.target.value)}
          >
            <FormControlLabel
              value="everyone"
              control={<Radio />}
              label="כל חברי הקבוצה יכולים להוסיף מתכונים"
            />
        
            <FormControlLabel
              value="admin"
              control={<Radio />}
              label="רק מנהל הקבוצה יכול להוסיף מתכונים"
            />
          </RadioGroup>
        </FormControl>

     
<Grid item xs={12}>
  <Typography
    variant="h6"
    sx={{
      color: 'black',
      fontSize: '1.8rem',
      fontWeight: 'bold',
      lineHeight: 1.3,
      mb: 1,
    }}
  >
צבע וגודל פונט  </Typography>

   <Box
  sx={{
        display: 'flex',
        gap: 1,
        flexWrap: 'wrap',
        mb: 1, 
      }}
  >
    {FONT_COLOR_OPTIONS.map((color) => {
      const isSelectedColorIng = chosenColorIng === color.value;

      return (
        <Box
          key={color.value}
          onClick={() => {
            setChosenColorIng(color.value);
            setTask2((prev) => {
              const raw = Number(prev.ingFont || 1.1);
              const size = Math.floor(raw);
              const newType = Number((size + color.type).toFixed(1));
              return { ...prev, ingFont: newType };
            });
          }}
           sx={{
              width: 30,
              height: 30,
              borderRadius: 2,
              cursor: 'pointer',
              backgroundColor: color.value,
              border: isSelectedColorIng
                ? '3px solid #2563EB'
                : '2px solid #D1D5DB',
            }}
        />
      );
    })}
  </Box>

  {/* 🔤 FONT SIZE */}
  <Box
    sx={{
      display: 'flex',
      gap: 2,
      flexWrap: 'wrap',
    }}
  >
    {FONT_SIZE_OPTIONS.map((size) => {
 const isSelectedSizeIng = chosenSizeIng === size.value;

      return (
        <Box
          key={size.type}
          onClick={() => {
              setChosenSizeIng(size.value);
            setTask2((prev) => {
              const raw = Number(prev.ingFont || 1.1);
              const color = Number((raw % 1).toFixed(1));
              const newType = Number((size.type + color).toFixed(1));
              return { ...prev, ingFont: newType };
            });
          }}
   sx={{
    px: 1,
    py: 0.3,
    borderRadius: 2,
    cursor: 'pointer',

    fontWeight: 'bold',
    fontSize: size.value,

    border: isSelectedSizeIng
      ? '2px solid #2563EB'
      : '1px solid #D1D5DB',
    backgroundColor: isSelectedSizeIng
      ? '#EFF6FF'
      : '#FFFFFF',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',

    '&:hover': {
      transform: 'scale(1.05)',
    },
  }}
        >
          {size.label}
        </Box>
      );
    })}
  </Box>
</Grid>

          <Grid item xs={12}>
<Typography 
  variant="h5"  
  style={{ 
    color: 'black', 
    fontSize: '1.8rem', 
    fontWeight: 'bold', 
    lineHeight: 1.3, 
  }}
>
  רשום/י שם קבוצה
</Typography>
       
          </Grid>
          
          <Grid item md={4}>
<TextField
  fullWidth
  value={task2.title || ""}
  onChange={(e) =>
    setTask2((prev) => ({ ...prev, title: e.target.value }))
  }
  placeholder="רשום/י שם קבוצה"
  inputProps={{
    maxLength: MAX_TOTAL_CHARS,
    dir: "rtl",
  }}
  sx={{
    "& .MuiOutlinedInput-root": {
      backgroundColor:
        chosenColorIng === "#FFFFFF" ? "#4B5563" : "#FFFFFF",
      "& input": {
        color: chosenColorIng,
      },
      "& input::placeholder": {
        color: chosenColorIng,
         opacity: 1,
      },
      "& fieldset": {
        borderColor:
          chosenColorIng === "#FFFFFF" ? "#9CA3AF" : chosenColorIng,
      },
      "&:hover fieldset": {
        borderColor:
          chosenColorIng === "#FFFFFF" ? "#6B7280" : chosenColorIng,
      },
      "&.Mui-focused fieldset": {
        borderColor:
          chosenColorIng === "#FFFFFF" ? "#4B5563" : chosenColorIng,
      },
    },
  }}
/>
              </Grid>

           <Grid item xs={12}>
            <Typography 
          variant="h6"
           style={{ 
    color: 'black', 
    fontSize: '1.8rem', 
    fontWeight: 'bold', 
    lineHeight: 1.3, 
  }}
          >
תמונות                                </Typography> 
          <ImageForm 
    item={recipe2}// Note: we send without "2" here
    imagesFiles={imagesFiles2}// Note: we send without "2" here
    setImagesFiles={setImagesFiles2}// Note: we send without "2" here
    selectedTemplate={selectedTemplate2}// Note: we send without "2" here
    setSelectedTemplate={setSelectedTemplate2}// Note: we send without "2" here
    selectedOption={selectedOption2} // Note: we send without "2" here
  setSelectedOption={setSelectedOption2} // Note: we send without "2" here
    task={task2}// Note: we send without "2" here
    editbaselineimage={editbaselineimage2}// Note: we send without "2" here
     editDelete={editDelete2}// Note: we send without "2" here
    setEditDelete={setEditDelete2}// Note: we send without "2" here
  />
          </Grid>

          <Grid item xs={12} style={{  }}>
          <Snackbar
            open={error2 !== null}
            autoHideDuration={6000}
            onClose={handleCloseError}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} 
          >
 <Alert
              severity="error"
              onClose={handleCloseError}
              sx={{
                backgroundColor: '#FFB0B0', // Light red background
                fontWeight: 'bold', // Make the text bold
                color: 'black', // Text color
                fontSize: '16px', // Increase font size
              }}
            >
                        {error2}
        </Alert>
      </Snackbar>
<Stack
  direction="row"
  spacing={2}
  justifyContent="center"
  alignItems="center"
  sx={{ mt: 3 }}
>
  <Button
    type="submit"
    variant="contained"
    disabled={isSaving}
    aria-label={
      isSaving
        ? "שמירה בתהליך"
        : recipe2 && recipe2.title
        ? "עדכון קבוצה"
        : "הוספת קבוצה חדשה"
    }
    title={
      isSaving
        ? "שומר קבוצה..."
        : recipe2 && recipe2.title
        ? "עדכון קבוצה (Alt+D)"
        : "הוספת קבוצה (Alt+D)"
    }
    id="submit-group-button"
    role="button"
    startIcon={
      isSaving ? <CircularProgress size={18} color="inherit" /> : null
    }
    sx={{
      borderRadius: 3,
      fontSize: adjustedFontSize(1.1),
      lineHeight: adjustedLineHeight(1.3),
      letterSpacing: adjustedLetterSpacing(0.04),
      wordSpacing: adjustedWordSpacing(0.02),
      padding: "10px 22px",
      background: isSaving
        ? "linear-gradient(135deg, #6c757d, #868e96)"
        : "linear-gradient(135deg, #28a745, #4cd964)",
      color: "#fff",
      fontWeight: "bold",
      boxShadow: "0 6px 20px rgba(0,0,0,0.18)",
      border: "1px solid rgba(255,255,255,0.3)",
      transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",

      "&:hover": {
        transform: isSaving ? "none" : "translateY(-2px)",
        boxShadow: isSaving
          ? "0 6px 20px rgba(0,0,0,0.18)"
          : "0 10px 28px rgba(0,0,0,0.3)",
        background: isSaving
          ? "linear-gradient(135deg, #6c757d, #868e96)"
          : "linear-gradient(135deg, #218838, #3ad44e)",
        border: "1px solid #fff",
      },

      "&:focus-visible": {
        outline: "3px solid #FF6347",
        outlineOffset: "3px",
      },

      "&.Mui-disabled": {
        color: "#fff",
        opacity: 0.9,
      },
    }}
  >
    {isSaving
      ? "שומר קבוצה ..."
      : recipe2 && recipe2.title
      ? "עדכון קבוצה "
      : "הוספת קבוצה "}
  </Button>

  <Button
    variant="outlined"
    color="inherit"
    disabled={isSaving}
    startIcon={<CancelIcon />}
    onClick={() =>
      dispatch(previouspage(location.pathname + location.search))
    }
    sx={{
      borderRadius: 3,
      fontSize: adjustedFontSize(1.1),
      padding: "10px 22px",
      fontWeight: "bold",
      minWidth: 140,
      borderWidth: 2,
      color: "#616161",
      borderColor: "#9e9e9e",
      transition: "all 0.3s ease",

      "&:hover": {
        borderColor: "#616161",
        backgroundColor: "rgba(0,0,0,0.04)",
        transform: "translateY(-2px)",
      },
    }}
  >
    ביטול
  </Button>
</Stack>
          </Grid>
          

        </Grid>

      </form>
   
  </Grid>

<Grid
    item
    xs={5}
    sx={{
      position: 'sticky',
      top: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      maxHeight: '100vh',       // limit height
      overflow: 'hidden',       // prevent extra scroll
    }}
  >
    <Box
     sx={{
      transform: 'scale(0.8)',
      transformOrigin: 'top',
      width: '100%',
    }}
    >
<ItemDisplayrouter item={task2} imageRecipeDisplay={imageRecipeDisplay2} scale={1}/>
    </Box>
  </Grid>



<Grid item xs={1}>
  <Box
    sx={{
      height: '100vh',              // take full viewport height
      backgroundColor: '#F3F4F6',
    }}
  >
  </Box>
</Grid> 

    </Grid>
) : pagemode2 === "view" && recipe2?._id ? (
  <GroupPage />
) : null}
</>
  );
  
};

export default GroupForm;