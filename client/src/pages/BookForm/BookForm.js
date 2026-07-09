import React, { useRef, useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";

import CancelIcon from "@mui/icons-material/Cancel";
import { Box,Button,Stack, TextField, Select, MenuItem, FormControl, InputLabel, Checkbox, FormGroup, FormControlLabel, Grid, Radio, RadioGroup } from '@mui/material';
import { Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';
import CircularProgress from "@mui/material/CircularProgress";

//import ItemDisplay from './ItemDisplay.js';
import ItemDisplayrouter from '../BookPageEdit/ItemDisplay/ItemDisplayrouter.js';

import BookPage from '../BookPage/BookPage.js';
import ProjectPage1 from '../BookPageEdit/ProjectPage1.js';

import { addbookowner } from '../../actions/bookPageActions.js';
import { editbook } from '../../actions/bookPageActions.js';
import { fetchBookById } from '../../actions/bookPageActions.js';
import { initializebook } from '../../actions/bookPageActions.js';
import { setpagemode } from '../../actions/bookPageActions.js';

import { uploadimagebook } from '../../actions/imagesactions.js';
 import { previouspage } from '../../actions/recipeNewForm.js';

import { newformID } from '../../actions/bookPageActions.js';


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
  content: 'הכנס שם ספר כאן'; /* אפשר לשים טקסט בעברית */
}

/* Optional: הגדלת רשימות */
.ql-editor ul, .ql-editor ol {
  padding-right: 1.6em !important;
}
`;

const BookForm = ({}) => {
    //need to add reset actions..:
  const dispatch = useDispatch();
    const navigate = useNavigate();
      const location = useLocation();

   const { id } = useParams();
   const { user } = useSelector((state) => state.auth);
   const isLogOut = useSelector((state) => state.auth.islogout);
   const currentGroup = useSelector(state => state.grouppage.currentgroup);
   
const [isSaving, setIsSaving] = useState(false);
const [designType, setDesignType] = useState([10]);

//title
const [chosenColorIng, setChosenColorIng] = useState("#000000");
  const [chosenSizeIng, setChosenSizeIng] = useState(25);

  //author
const [chosenColorIns, setChosenColorIns] = useState("#000000");
  const [chosenSizeIns, setChosenSizeIns] = useState(25);

    const imagesTemplatesBooks = useSelector(
    (state) => state.currentproject.imagestemplates || []
  );

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

    const [selectedOption, setSelectedOption] = useState('templates'); 
      const currentItem = useSelector(state => state.currentproject.currentproject);
      const pagemode = useSelector(state => state.currentproject.pagemode);
  const previouspage = useSelector(state => state.general.previouspage);
  const groupId  = useSelector(state => state.general.newFormID);

  const [item, setItem] = useState(null);
  
  const [imagesFiles, setImagesFiles] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

    const [editmode, setEditmode] = useState(false);
  const [editbaselineimage, setEditbaselineimage] = useState(null);
    const [editDelete, setEditDelete] = useState(false);

    const [imageRecipeDisplay, setImageRecipeDisplay] = useState(null);
 
    const [error, setError] = useState(null);

    //This define if the user allowd to update the page
const [allowEdit, setAllowEdit] = useState(false);



        useEffect(() => {
          if (isLogOut === 1) {
            navigate('/');
            }
          }, [isLogOut, navigate]);

          useEffect(() => {
  if (imagesTemplatesBooks?.length > 0) {
    setSelectedTemplate(imagesTemplatesBooks[0]);
  }
}, [imagesTemplatesBooks]);


            useEffect(() => {
    if (!currentItem && id) {
      dispatch(fetchBookById(id));
    }
     if (currentItem) {
      setItem(currentItem);
    }
      console.log("currentItemcurrentItem:", currentItem);

  }, [currentItem, id, dispatch]);



  const initialTaskState = {
 title: "",
  author: "",
  image: null,
   //category: "ראשונות",
  type: designType,
  ingFont: 1.1,
   insFont: 1.1,
 };

  const [task, setTask] = useState({ ...initialTaskState });


useEffect(() => {
  //first consotion is for edit mode, and secind is for new mode) - OK
  //if (item?.owner === user?._id || !item?.owner) {
if (
  item?.owner?.some(
    (ownerId) => ownerId?.toString() === user?._id?.toString()
  ) ||
  pagemode === "new"
) {    setAllowEdit(true);
  } else {
    setAllowEdit(false);
  }

   if (!item || !item.title) {
    setTask(prev => ({
      ...prev,
      ...initialTaskState,
    }));
    } else {
     //this is not contain all item model
      setTask({
         _id: item._id,
        title: item.title,
                author: item.author,
  insFont: item?.recipes?.[0]?.insFont,
ingFont: item?.recipes?.[0]?.ingFont,
        image: item.image,
        //category: item.category,
      type: designType, 
             });
      setEditbaselineimage(item.image);
      setEditmode(true);
    }

}, [item,allowEdit, user]);


  const quillRef1 = useRef(null);

  var toolbarOptions = [
   // ['bold', 'italic', 'underline'],        // toggled buttons
    //  ['bold'],        // toggled buttons
  //[{ header: [1, 2, 3, false] }],     // <<< FONT SIZE CONTROL HERE
    //[{ 'header': 1 }, { 'header': 2 }],               // custom button values
    //[{ 'list': 'ordered'}, { 'list': 'bullet' }],
    //[{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      //[{ 'direction': 'rtl' }], 
    //[{ 'align': [] }], // This enables text alignment options in the toolbar

    //[{ 'direction': 'ltr' }],

    //['image'],                       // text direction
  
    //[{ 'header': [1, 2, 3] }],
      //[{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme

    [{ 'color': [] }, ],          // dropdown with defaults from theme
   // [{ 'font': [] }],
   // [{ 'align': [] }],
  
    //['clean']        // remove formatting button
  ];

  var module ={
    toolbar:toolbarOptions,
    };
    useEffect(() => {
      if (quillRef1.current) {
       quillRef1.current.getEditor().root.style.direction = 'rtl';
       quillRef1.current.getEditor().root.style.textAlign = 'right';
      }
    }, []);

 
    const handleingredientsChange = (content, delta, source, editor) => {
      setTask((task) => ({ ...task, title: content }));
    };



const DEFAULT_GROUP_IMAGE =
  "https://mern-apps.s3.eu-north-1.amazonaws.com/groups/1765255033660/Homepageimage1.png";

  useEffect(() => {
  let img = DEFAULT_GROUP_IMAGE;
  if (imagesTemplatesBooks.length === 0) return;
  img = imagesTemplatesBooks[0];

  if (pagemode === "view") {
    if (task?.image) {
      img = task.image;
    }
    setImageRecipeDisplay(img);
    return;
  }
  if (selectedOption === "templates" && selectedTemplate) {
    img = selectedTemplate;
    setImageRecipeDisplay(img);
    return;
  }
  if (selectedOption === "upload" && imagesFiles?.length > 0) {
    const preview = imagesFiles[0]?.preview;
    if (preview) {
      img = preview;
    }
    setImageRecipeDisplay(img);
    return;
  }
  if (task?.image) {
    img = task.image;
  }
  setImageRecipeDisplay(img);
}, [
  pagemode,
  selectedOption,
  selectedTemplate,
  imagesFiles,
  task
]);


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

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
     const validationError = validateRichTextTitle(task.title);
 if (validationError) {
    setError(`נא לבחור שם קצר יותר`);
    return;
  }

  
   if (!editmode && ((selectedOption === "upload" && imagesFiles.length === 0) || (selectedOption === "Templates" && !selectedTemplate))) {
  setError("נא לבחור תמונה");
  return; 
}
 try {

  setIsSaving(true);

    const formData = {
      title: task.title,
            type: task.type,
                 insFont: task.insFont,
  ingFont: task.ingFont,
      author: task.author,     
        //category: task.category,
      groupId: groupId !== null ? groupId : null,
template:
    selectedOption === "templates" && selectedTemplate
      ? selectedTemplate 
      : null,  
    };
const editData = {
  ...formData,
  id: task._id,
template:
    selectedOption === "templates" && selectedTemplate
      ? selectedTemplate 
      : null,     
    };
let savedItemID;
if (editmode) {
  await dispatch(editbook(editData));
  savedItemID = editData.id;
} else {
  const savedBook = await dispatch(addbookowner(formData));
  savedItemID = savedBook._id;
}

  if (
  selectedOption === "upload" &&
  imagesFiles.length > 0 
) {
              for (const imageObj of imagesFiles) {
            const imagefile = imageObj.file;
            if (!imagefile) continue;
            const fileDetails = {
              fileName: imageObj.name,
              fileType: imageObj.type,
              operation: "upload",
             savedItemID,
            };
            await dispatch(uploadimagebook(imagefile, fileDetails));
          }
} 
    setTask(prev => ({
      ...prev,
      ...initialTaskState,
    }));

    setIsSaving(false);
    dispatch(newformID(null));
   setError(null); 
   if (savedItemID) {
    
      navigate(`/book/${savedItemID}`);
    } else {
      navigate(`/`);
    }
   dispatch(setpagemode("edit1"));

  } catch (err) {
    setIsSaving(false);
    console.log(err);
    setError(" שגיאה ");
  }

  };

  const handleCloseError = () => {
    setError(null);
  };


   return (
    <>
      <style>{quillFixStyles}</style>
{allowEdit && (pagemode === "new" || pagemode === "edit") ? (

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
          {item?.title ? 'עריכת ספר מתכונים' : 'יצירת ספר מתכונים חדש'}
        </Typography>

      <form onSubmit={handleTaskSubmit}>
      <Grid container spacing={2}>
     
        
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
  רשום/י שם ספר מתכונים
</Typography>
       
          </Grid>
          
          
 <Grid item xs={12}>


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
            setTask((prev) => {
              const rawColorIng = Number(prev.ingFont || 1.1);
              const sizeColorIng = Math.floor(rawColorIng);
              const newTypeColorIng = Number((sizeColorIng + color.type).toFixed(1));
              return { ...prev, ingFont: newTypeColorIng };
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
      gap: 1,
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

            setTask((prev) => {
              const rawSizeIng = Number(prev.ingFont || 1.1);
              const colorSizeIng = Number((rawSizeIng % 1).toFixed(1));
              const newTypeSizeIng = Number((size.type + colorSizeIng).toFixed(1));
              return { ...prev, ingFont: newTypeSizeIng };
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

          <Grid item md={4}>
<TextField
  fullWidth
  value={task.title || ""}
  onChange={(e) =>
    setTask((prev) => ({ ...prev, title: e.target.value }))
  }
  placeholder="הכנס שם ספר מתכונים"
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
disabled={!((item?.owner?.some((ownerId) => ownerId?.toString() === user?._id?.toString()) && editmode) || pagemode === "new")}
/>
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
מחבר</Typography>
       
          </Grid>

          
 <Grid item xs={12}>
   <Box
    sx={{
      display: 'flex',
      gap: 1,
      flexWrap: 'wrap',
      mb: 1, // 👈 space between color and size
    }}
  >
    {FONT_COLOR_OPTIONS.map((color) => {
      const isSelectedColorIns = chosenColorIns === color.value;

      return (
        <Box
          key={color.value}
          onClick={() => {
            setChosenColorIns(color.value);
            setTask((prev) => {
              const raw = Number(prev.insFont || 1.1);
              const size = Math.floor(raw);
              const newType = Number((size + color.type).toFixed(1));
              return { ...prev, insFont: newType };
            });
          }}
          sx={{
            width: 30,
            height: 30,
            borderRadius: 2,
            cursor: 'pointer',
            backgroundColor: color.value,
            border: isSelectedColorIns
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
      gap: 1,
      flexWrap: 'wrap',
    }}
  >
    {FONT_SIZE_OPTIONS.map((size) => {
 const isSelectedSizeIns = chosenSizeIns === size.value;

      return (
        <Box
          key={size.type}
          onClick={() => {
              setChosenSizeIns(size.value);
            setTask((prev) => {
              const raw = Number(prev.insFont || 1.1);
              const color = Number((raw % 1).toFixed(1));
              const newType = Number((size.type + color).toFixed(1));
              return { ...prev, insFont: newType };
            });
          }}
            sx={{
    px: 1,
    py: 0.3,
    borderRadius: 2,
    cursor: 'pointer',

    fontWeight: 'bold',
    fontSize: size.value,

    border: isSelectedSizeIns
      ? '2px solid #2563EB'
      : '1px solid #D1D5DB',

    backgroundColor: isSelectedSizeIns
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
          
          <Grid item md={4}>
<TextField
  fullWidth
  value={task.author || ""}
  onChange={(e) =>
    setTask((prev) => ({ ...prev, author: e.target.value }))
  }
  placeholder="רשום מחבר"
  inputProps={{
    maxLength: MAX_TOTAL_CHARS,
    dir: "rtl",
  }}
 sx={{
    "& .MuiOutlinedInput-root": {
      backgroundColor:
        chosenColorIns === "#FFFFFF" ? "#4B5563" : "#FFFFFF",
      "& input": {
        color: chosenColorIns,
      },
      "& input::placeholder": {
        color: chosenColorIns,
         opacity: 1,
      },
      "& fieldset": {
        borderColor:
          chosenColorIns === "#FFFFFF" ? "#9CA3AF" : chosenColorIns,
      },
      "&:hover fieldset": {
        borderColor:
          chosenColorIns === "#FFFFFF" ? "#6B7280" : chosenColorIns,
      },
      "&.Mui-focused fieldset": {
        borderColor:
          chosenColorIns === "#FFFFFF" ? "#4B5563" : chosenColorIns,
      },
    },
  }}
disabled={!((item?.owner?.includes(user?._id) && editmode) || pagemode === "new")}/>

           </Grid>

          <Grid container spacing={2}>
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
    item={item}
    imagesFiles={imagesFiles}
    setImagesFiles={setImagesFiles}
    selectedTemplate={selectedTemplate}
    setSelectedTemplate={setSelectedTemplate}
    selectedOption={selectedOption}
    setSelectedOption={setSelectedOption}
    task={task}
    editmode={editmode}
    editbaselineimage={editbaselineimage}
     editDelete={editDelete}
    setEditDelete={setEditDelete}
  />
          </Grid>

          <Grid item xs={12} style={{  }}>
          <Snackbar
            open={error !== null}
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
                        {error}
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
        ? "שומר ספר מתכונים"
        : item && item.title
        ? "עדכון ספר"
        : "הוספת ספר חדש"
    }
    title={
      isSaving
        ? "שומר ספר..."
        : item && item.title
        ? "עדכון ספר (Alt+D)"
        : "הוספת ספר (Alt+D)"
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
      ? "שומר ספר מתכונים..."
      : item && item.title
      ? "עדכון ספר מתכונים"
      : "הוספת ספר מתכונים"}
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

<Grid item xs={5}>
  <Box
    sx={{
      height: '100vh',              // take full viewport height
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',     // center horizontally
      alignItems: 'flex-start',     // start from top
      backgroundColor: '#F3F4F6',
      paddingTop: '5rem',           // <-- push it down
    }}
  >
<ItemDisplayrouter item={task} imageRecipeDisplay={imageRecipeDisplay} scale={0.7}/>
    
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

) : allowEdit && pagemode === "edit1" ? (
  <ProjectPage1 allowEdit={allowEdit} pagemode={pagemode} />
) : pagemode === "view" && currentItem?._id ? (
  <ProjectPage1 allowEdit={allowEdit} pagemode={pagemode} />
) : null}
</>
  );
  
};

export default BookForm;
