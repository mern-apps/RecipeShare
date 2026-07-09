import React, { useRef, useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { flushSync } from "react-dom";
import RecipeActions from "./RecipeActions";
import { CircularProgress,Typography, Box,Button, TextField, Select, MenuItem, FormControl, InputLabel, Checkbox, FormGroup, FormControlLabel, Grid, Radio, RadioGroup, Divider } from '@mui/material';
import { Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/system';
import MoreVertIcon from '@mui/icons-material/MoreVert';


//import ItemDisplayView from './ItemDisplayView';
import ItemDisplayrouter from '../BookPageEdit/ItemDisplay/ItemDisplayrouter.js';

import { addnewrecipe } from '../../actions/recipeNewForm.js';
import { editrecipe } from '../../actions/recipeNewForm.js';
import { fetchRecipeById } from '../../actions/recipeNewForm.js';

import { uploadimage } from '../../actions/imagesactions.js';

import { newformID } from '../../actions/bookPageActions.js'; //It isfor both recipe and book - it initial


import Quill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import ImageForm from './ImageForm'; 
import { initializetask } from '../../actions/recipeNewForm.js';
import { setpagemode } from '../../actions/recipeNewForm.js';

import { useParams } from 'react-router-dom';

import { FONT_COLOR_OPTIONS } from '../../assets/fontColorRecipe1.js';
import { FONT_SIZE_OPTIONS } from '../../assets/fontSize.js';

// Fix Quill bullets RTL text overlap
const quillFixStyles = `
.ql-editor li {
  padding-right: 1.4em !important; /* space between bullet and text */
}

.ql-editor li::before {
  margin-right: -1.2em !important; /* position bullet correctly */
  margin-left: 0 !important;
}

.ql-editor {
  direction: rtl !important;
  text-align: right !important;
}
`;


const TaskForm = ({
}) => {

  
  //need to add reset actions..:

  const dispatch = useDispatch();

    const navigate = useNavigate();

    const { id } = useParams();
  const aIImage = useSelector(state => state.newrecipepage.replicateaiimage);
  const previouspage = useSelector(state => state.general.previouspage);
  const groupId = useSelector(state => state.general.newFormID);

const [isSubmitting, setIsSubmitting] = useState(false);
const [abortController, setAbortController] = useState(null);

        
const tags = useSelector(
  (state) => state.recipespage?.filtertags || []
);
const categories = useSelector(
  (state) => state.recipespage?.filtercategories || []
);

    const { user } = useSelector((state) => state.auth);
   const isLogOut = useSelector((state) => state.auth.islogout);

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
              document.getElementById('submit-recipe-button')?.click();
              break;
            default:
              break;
          }
        }
      };
 window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, []);

    const [selectedOption, setSelectedOption] = useState('upload'); 
      const currentItem = useSelector(state => state.newrecipepage.currenteditrecipe);
      const pagemode = useSelector(state => state.newrecipepage.pagemode);

  const [item, setItem] = useState(null);
  
  const [imagesFiles, setImagesFiles] = useState([]);
  const [imageAI, setimageAI] = useState(null);
    

    const [editmode, setEditmode] = useState(false);
  const [editbaselineimage, setEditbaselineimage] = useState(null);
    const [editDelete, setEditDelete] = useState(false);

      const [imageRecipeDisplay, setImageRecipeDisplay] = useState(null);
 
    const [error, setError] = useState(null);

    //This define if the user allowd to update the page
const [allowEdit, setAllowEdit] = useState(false);

  
       const [chosenColorIng, setChosenColorIng] = useState("#000000");
const [chosenColorIns, setChosenColorIns] = useState("#000000");
  

const [chosenSizeIng, setChosenSizeIng] = useState(25);
const [chosenSizeIns, setChosenSizeIns] = useState(25);

            useEffect(() => {
    if (!currentItem && id) {
      dispatch(fetchRecipeById(id));
    }
  }, [currentItem, id, dispatch]);

 
    useEffect(() => {
    if (currentItem) {
      console.log(currentItem)
      setItem(currentItem);
    }
  }, [currentItem]);

  const [scrollMarginTop, setScrollMarginTop] = useState(-160);

  useEffect(() => {
    const handleScroll = () => {
      const maxClampValue = task.imageFile === 0 ? 850 : 250;

      const newMarginTop = clamp(-850, maxClampValue, -150 + window.scrollY * 0.9); 
      setScrollMarginTop(newMarginTop);
    };

    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  function clamp(min, max, value) {
    return Math.min(Math.max(value, min), max);
  }

  
  const initialTaskState = {
    type: [1],
    title: '',
    author: user?.firstName || "",
    ingredients: '',
    instructions: '',
    image: null,
    selectedCategories: '',
    selectedTags: [],  
  level: "קל",
  numserves: "1-2",
  groups: [],
  favorite: [],
  predecessor: [],
   insFont: 1.1,
  ingFont: 1.1,
  };

  const [task, setTask] = useState({ ...initialTaskState });

 
useEffect(() => {
  //first consotion is for edit mode, and secind is for new mode) - OK
  if (item?.owner === user?._id || !item?.owner) {
    setAllowEdit(true);
  } else {
    setAllowEdit(false);
  }

}, [item, user]);

  useEffect(() => {
    if (!item || !item.title) {
      //initializetaskshould no be here but before.
      //check what it do?/???
      dispatch(initializetask());
      const initialGroups = [];
    setTask(prev => ({
      ...prev,
      ...initialTaskState,
      groups: initialGroups,
    }));
    } else {
     //this is not contain all item model
      setTask({
         _id: item._id,
                 type:item.type,
        title: item.title,
        author: item.author,
        ingredients: item.ingredients,
        instructions: item.instructions,
        image: item.image,
        selectedCategories: item.selectedCategories,
        selectedTags: item.selectedTags,
        level:item.level,
        numserves:item.numserves,
        groups: item.groups,
  owner: item.owner, 
    favorite: item.favorite, 
  predecessor: item.predecessor,
   insFont: item.insFont,
  ingFont: item.ingFont,
      });

      setEditbaselineimage(item.image);
      setEditmode(true);

    }
  }, [allowEdit]);


  const quillRef1 = useRef(null);
  const quillRef2 = useRef(null);

  var toolbarOptions = [
    ['bold', 'italic', 'underline'],        // toggled buttons
  
    //[{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    //[{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      //[{ 'direction': 'rtl' }], 
    //[{ 'align': [] }], // This enables text alignment options in the toolbar

    //[{ 'direction': 'ltr' }],

    //['image'],                       // text direction
  
    //[{ 'header': [1, 2, 3] }],
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
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
      if (quillRef2.current) {
        quillRef2.current.getEditor().root.style.direction = 'rtl';
        quillRef2.current.getEditor().root.style.textAlign = 'right';
      }
    }, []);

 
    const handleingredientsChange = (content, delta, source, editor) => {
      setTask((task) => ({ ...task, ingredients: content }));
    };
  
    const handleinstructionsChange = (content, delta, source, editor) => {
      setTask((task) => ({ ...task, instructions: content }));
    };
   


  const handleCategoryToggle = (category) => {
  // Set the selected category or clear it if the same category is selected
  setTask({
    ...task,
    selectedCategories:category
  });
};

    const handleTagToggle = (Tag) => {
      const isSelected = task.selectedTags.includes(Tag);
      if (isSelected) {
        // Remove category index if already selected
        setTask({
          ...task,
          selectedTags: task.selectedTags.filter((i) => i !== Tag)
        });
      } else {
        // Add category index if not already selected
        setTask({
          ...task,
          selectedTags: [...task.selectedTags, Tag]
        });
      }
    };


 const imageUrltemplate = 'https://media.istockphoto.com/id/1368935114/photo/vegan-asian-recipes-assorted-brown-rice-curry-masala-poke-do.jpg?s=1024x1024&w=is&k=20&c=Ff4aFup2u0kQI57KQTjfwC4yUuT5CzzX3s0zeN8Rbew=';

  useEffect(() => {
  let img = imageUrltemplate;
  if (pagemode === "view") {
    if (task?.image) {
      img = task.image;
    }
    setImageRecipeDisplay(img);
    return;
  }
  if (selectedOption === "ImageAI" && aIImage) {
    img = aIImage;
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
  aIImage,
  imagesFiles,
  task,
  imageUrltemplate
]);



const isSubmittingRef = useRef(false);

  const handleTaskSubmit = async (e) => {
    e.preventDefault();

  if (isSubmittingRef.current) return;
  isSubmittingRef.current = true;
  setIsSubmitting(true);

    let selectedCategories = task.selectedCategories;
    let selectedTags = task.selectedTags;
    if (!task.selectedCategories || !task.title || !task.ingredients || !task.instructions) {
      setError('נא למלא את כל השדות בטופס.');
      return;
    } 
   if (!editmode && ((selectedOption === "upload" && imagesFiles.length === 0) || (selectedOption === "ImageAI" && !imageAI))) {
  setError("נא לבחור תמונה");
  return; 
}
   
      if (selectedTags.length === 0) {
      selectedTags = 
        [
          'כללי',
        ];
    }

    if (!task.numserves) {
  task.numserves = "1-2";
}

if (!task.level) {
  task.level = "קל";
}


        try {
    console.log("112221isSubmitting:", isSubmitting);

    const formData = {
       type: task.type,
      owner:1,
      title: task.title,
      author: task.author,
      ingredients: task.ingredients,
      instructions: task.instructions,
      selectedCategories: task.selectedCategories,
      selectedTags: task.selectedTags,
      level:task.level,
      numserves:task.numserves,
      groups: task.groups,
      insFont: task.insFont,
      ingFont: task.ingFont,
        groupId: groupId !== null ? groupId : null,

    };

const editData = {
  ...formData,
  id: task._id 
};
  
let savedItemID;

if (editmode) {
  await dispatch(editrecipe(editData));
  savedItemID = editData.id;
} else {
  const savedRecipe = await dispatch(addnewrecipe(formData));
  savedItemID = savedRecipe._id;
}


if (selectedOption === "upload" && imagesFiles.length > 0) {
    console.log("Upload option selected. Total images:",selectedOption, imagesFiles.length);

              for (const imageObj of imagesFiles) {
            const imagefile = imageObj.file;
            if (!imagefile) continue;
            const fileDetails = {
              fileName: imageObj.name,
              fileType: imageObj.type,
              operation: "upload",
             savedItemID,
            };
            await dispatch(uploadimage(imagefile, fileDetails));


          }
} else if (selectedOption === 'ImageAI' && imageAI) {
      console.log("ImageAI:",imageAI);

const imagefile = imageAI.file;
    const fileDetails = {
      fileName: imageAI.name,
      fileType: imageAI.type,
      operation: "upload",
      savedItemID,
    };
    await dispatch(uploadimage(imagefile, fileDetails));

}
  const initialGroups2 = [];
    setTask(prev => ({
      ...prev,
      ...initialTaskState,
      groups: initialGroups2,
    }));

   setError(null); 
       dispatch(newformID(null));
     dispatch(setpagemode("view"));
  navigate(previouspage || "/myrecipes");
   
  } catch (err) {
    console.log(err);
        setIsSubmitting(false);
    setError(" שגיאה ");
  }

  };

    const handleCancel = () => {
  setIsSubmitting(false);
};

  const handleCloseError = () => {
    setError(null);
  };



  

   return (
    <>
      <style>{quillFixStyles}</style>
{allowEdit && pagemode !== "view" ? (

<Grid
  container
  sx={{
    direction: 'rtl',
  }}
>
        {/* Left – Preview */}
          {/* Right – Form */}
<Grid
  item
  xs={7}
  sx={{
    backgroundColor: '#fff',
    border: '2px solid #3498db',
    borderRadius: '10px',
    boxShadow: 2,
    p: 3,
    overflowY: 'auto',        // scroll for entire form
  }}
>
        <Typography
          variant="h4"
          sx={{ color: '#00427D', fontWeight: 'bold', mb: 2 }}
        >
          {item?.title ? 'עריכת מתכון' : 'יצירת מתכון חדש'}
        </Typography>

      <form onSubmit={handleTaskSubmit}>
      <Grid container spacing={2}>
     
          <Grid item xs={12}>
          <Typography 
          variant="h6"
          style={{ color: 'black', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '16px' }}
          >
                                            בחר/י שם מתכון ומחבר/ת
                                </Typography> 
              <Grid container spacing={2}>
                  <Grid item xs={4}> 
                    <TextField
                      value={task.title}
                      onChange={(e) => setTask({ ...task, title: e.target.value })}
                      fullWidth
                      label="שם המתכון"
                    disabled={!( (item?.owner === user?._id && editmode) || editmode === false )}         
           />
                  </Grid>
              </Grid>
          </Grid>

          <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    label="מחבר/ת"
                    value={task.author}
                    onChange={(e) => setTask(
                      { ...task, author: e.target.value }
                      )                      // Log the result object
                    }
                    fullWidth
                    disabled={!( (item?.owner === user?._id && editmode) || editmode === false )}
                  />
                </Grid>
             </Grid>
          </Grid>


<Grid container spacing={2} alignItems="stretch">

  <Grid item xs={12} md={5}>
              <Grid container spacing={1}>
                          <Grid item xs={12}>

                            <Grid item xs={12}>
  <Typography
    variant="h6"
    sx={{
      color: 'black',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      lineHeight: 1.3,
      mb: 1,
    }}
  >
     מרכיבים   </Typography>

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

<Box
  onClick={() => {
    setTask((prev) => {
      const rawBulletsIng = Number(prev.ingFont || 1.1);
      const hasBulletsIng = Math.floor((rawBulletsIng * 100) % 10) !== 0;

      if (hasBulletsIng) {
        const cleanedIng = Math.floor(rawBulletsIng * 10) / 10;
        return { ...prev, ingFont: cleanedIng };
      }

      const sizeBulletsIng = Math.floor(rawBulletsIng);
      const colorBulletsIng = Number((rawBulletsIng % 1).toFixed(1));
      const baseBulletsIng = Number((sizeBulletsIng + colorBulletsIng).toFixed(1));
      const withBulletsIng = Number((baseBulletsIng + 0.01).toFixed(2));

      return { ...prev, ingFont: withBulletsIng };
    });
  }}
  sx={{
     mt: 1  ,
      mb: 1,
    width: 42,
    height: 36,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 2,
    cursor: 'pointer',
    transition: 'all 0.2s ease',

    border:
      Math.floor((Number(task?.ingFont || 1.1) * 100) % 10) !== 0
        ? '2px solid #2563EB'
        : '1px solid #D1D5DB',

    backgroundColor:
      Math.floor((Number(task?.ingFont || 1.1) * 100) % 10) !== 0
        ? '#EFF6FF'
        : '#FFFFFF',

    '&:hover': {
      transform: 'scale(1.05)',
      backgroundColor:
        Math.floor((Number(task?.ingFont || 1.1) * 100) % 10) !== 0
          ? '#DBEAFE'
          : '#F3F4F6',
    },

    '&:active': {
      transform: 'scale(0.97)',
    },
  }}
>
  {/* 3 vertical dots */}
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: '2px',
    }}
  >
    <Box sx={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#4B5563' }} />
    <Box sx={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#4B5563' }} />
    <Box sx={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#4B5563' }} />
  </Box>
</Box>

</Grid>



                                 
   <TextField
  fullWidth
  multiline
  minRows={6}
  value={task.ingredients || ""}
  onChange={(e) =>
    setTask((prev) => ({ ...prev, ingredients: e.target.value }))
  }
    placeholder="לרשום כאן מרכיבים"

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
  disabled={!( (item?.owner === user?._id && editmode) || editmode === false )}
/>
                           </Grid>
                        

              </Grid>
          </Grid>
          
           <Grid
    item
    md={1}
    sx={{
      display: { xs: "none", md: "flex" },
      justifyContent: "center",
      alignItems: "stretch",
    }}
  >
    <Divider
      orientation="vertical"
      flexItem
      sx={{
        width: "2px",
        backgroundColor: "#D0D6DD",
      }}
    />
  </Grid>
          
  <Grid item xs={12} md={5}>
              <Grid container spacing={1}>
                          <Grid item xs={12}>
  
<Grid item xs={12}>
  <Typography
    variant="h6"
    sx={{
      color: 'black',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      lineHeight: 1.3,
      mb: 1,
    }}
  >
     הוראות הכנה  </Typography>

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
                const rawIns = Number(prev.insFont || 1.1);
                const sizeIns = Math.floor(rawIns);
                const newTypeIns = Number((sizeIns + color.type).toFixed(1));
                return { ...prev, insFont: newTypeIns };
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
                const rawIns = Number(prev.insFont || 1.1);
                const colorIns = Number((rawIns % 1).toFixed(1));
                const newTypeIns = Number((size.type + colorIns).toFixed(1));
                return { ...prev, insFont: newTypeIns };
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
<Box
  onClick={() => {
    setTask((prev) => {
      const rawBulletsIns = Number(prev.insFont || 1.1);
      const hasBulletsIns = Math.floor((rawBulletsIns * 100) % 10) !== 0;

      if (hasBulletsIns) {
        const cleanedIns = Math.floor(rawBulletsIns * 10) / 10;
        return { ...prev, insFont: cleanedIns };
      }

      const sizeBulletsIns = Math.floor(rawBulletsIns);
      const colorBulletsIns = Number((rawBulletsIns % 1).toFixed(1));
      const baseBulletsIns = Number((sizeBulletsIns + colorBulletsIns).toFixed(1));
      const withBulletsIns = Number((baseBulletsIns + 0.01).toFixed(2));

      return { ...prev, insFont: withBulletsIns };
    });
  }}
  sx={{
     mt: 1  ,
      mb: 1,
    width: 42,
    height: 36,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 2,
    cursor: 'pointer',
    transition: 'all 0.2s ease',

    border:
      Math.floor((Number(task?.insFont || 1.1) * 100) % 10) !== 0
        ? '2px solid #2563EB'
        : '1px solid #D1D5DB',

    backgroundColor:
      Math.floor((Number(task?.insFont || 1.1) * 100) % 10) !== 0
        ? '#EFF6FF'
        : '#FFFFFF',

    '&:hover': {
      transform: 'scale(1.05)',
      backgroundColor:
        Math.floor((Number(task?.insFont || 1.1) * 100) % 10) !== 0
          ? '#DBEAFE'
          : '#F3F4F6',
    },

    '&:active': {
      transform: 'scale(0.97)',
    },
  }}
>
  {/* 3 vertical dots */}
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: '2px',
    }}
  >
    <Box sx={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#4B5563' }} />
    <Box sx={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#4B5563' }} />
    <Box sx={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#4B5563' }} />
  </Box>
</Box>
</Grid> 

                                   
<TextField
  fullWidth
  multiline
  minRows={6}
  value={task.instructions || ""}
  onChange={(e) =>
    setTask((prev) => ({ ...prev, instructions: e.target.value }))
  }
  placeholder="לרשום כאן הוראות מתכון"
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
  disabled={!( (item?.owner === user?._id && editmode) || editmode === false )}
/>
                           </Grid>
              </Grid>
          </Grid>

             </Grid>



          <Grid container sx={{ mt: 2.5  }} >
            <Grid item xs={12} >
            <Typography 
          variant="h6"
          style={{ color: 'black', fontSize: '1.2rem', fontWeight: 'bold' }}>
      תגיות (אופציונלי)

                          </Typography>            </Grid>
                
     

            <Grid item md={9} sx={{ mb: 3 }}>
              <FormControl>
  <FormGroup>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
      {tags.map((tag) => (
        <FormControlLabel
          key={tag.description}
          control={
            <Checkbox
              checked={task.selectedTags.includes(tag.description)}
              onChange={() => handleTagToggle(tag.description)}
              style={{ color: '#0077B5' }}
              disabled={!((item?.owner === user?._id && editmode) || editmode === false)}
            />
          }
          label={tag.description}
        />
      ))}
    </div>
  </FormGroup>
</FormControl>
          </Grid> 
          </Grid> 


<Grid container spacing={2} alignItems="stretch">
                <Grid item md={2}>

                                     <Grid >
          <Typography 
          variant="h6"
          style={{ color: 'black', fontSize: '1.2rem', fontWeight: 'bold',textAlign: 'center', }}>
מספר מנות                    </Typography> 
</Grid>

                      <FormControl fullWidth style={{ width: '100%' }}>
                                  <InputLabel>מספר מנות</InputLabel>
                                  <Select value={task.numserves} onChange={(e) => setTask({ ...task, numserves: e.target.value })}
                                    disabled={!( (item?.owner === user?._id && editmode) || editmode === false )}>
                                    <MenuItem value="">מספר מנות</MenuItem>
                                    {["1-2", "3-4", "5-6","7-10", "11+"].map((numserves) => (
                                      <MenuItem key={numserves} value={numserves}>
                                        {numserves}
                                      </MenuItem>
                                    ))}
                                  </Select>
                      </FormControl>
                </Grid>
    
     <Grid
    item
    md={.1}
    sx={{
      display: { xs: "none", md: "flex" },
      justifyContent: "center",
      alignItems: "stretch",
    }}
  >
    <Divider
      orientation="vertical"
      flexItem
      sx={{
        width: "2px",
        backgroundColor: "#D0D6DD",
      }}
    />
  </Grid>

                <Grid item md={2}>
                       <Grid >
          <Typography 
          variant="h6"
          style={{ color: 'black', fontSize: '1.2rem', fontWeight: 'bold',textAlign: 'center', }}>
רמת קושי                      </Typography> 
</Grid>

                        <FormControl fullWidth style={{ width: '100%' }}>
                                    <InputLabel>רמת קושי</InputLabel>
                                    <Select value={task.level} onChange={(e) => setTask({ ...task, level: e.target.value })}
                                      disabled={!( (item?.owner === user?._id && editmode) || editmode === false )}>
                                      <MenuItem value="">רמת קושי</MenuItem>
                                      {["קל", "בינוני", "קשה"].map((level) => (
                                        <MenuItem key={level} value={level}>
                                          {level}
                                        </MenuItem>
                                      ))}
                                    </Select>
                            </FormControl>
                </Grid>

 <Grid
    item
    md={.1}
    sx={{
      display: { xs: "none", md: "flex" },
      justifyContent: "center",
      alignItems: "stretch",
    }}
  >
    <Divider
      orientation="vertical"
      flexItem
      sx={{
        width: "2px",
        backgroundColor: "#D0D6DD",
      }}
    />
  </Grid>


<Grid item md={6} container >

  <Grid
    item
    md={5}
    sx={{
      display: 'flex',
      justifyContent: 'center',
      borderRadius: 2,
    }}
  >
    <Typography
      variant="h6"
      sx={{
        color: 'black',
        fontSize: '1.2rem',
        fontWeight: 'bold',
      }}
    >
      קטגוריה (אחת בלבד)
    </Typography>
  </Grid>

                
<Grid item xs={12}>
   <FormControl>
  <FormGroup>
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {categories.map((cat) => (
        <FormControlLabel
          key={cat.description}
          control={
            <Checkbox
              checked={task.selectedCategories === cat.description}
              onChange={() => handleCategoryToggle(cat.description)}
              style={{ color: '#0077B5' }}
              disabled={!((item?.owner === user?._id && editmode) || editmode === false)}
            />
          }
          label={cat.description}
        />
      ))}
    </div>
  </FormGroup>
</FormControl>
  </Grid>
          </Grid> 

          </Grid>

 
          <Grid item xs={12}>
            <Typography 
          variant="h6"
          style={{ color: 'black', fontSize: '1.2rem', fontWeight: 'bold' }}
          >
תמונות                                </Typography> 
          <ImageForm 
    item={item}
    imagesFiles={imagesFiles}
    setImagesFiles={setImagesFiles}
    imageAI={imageAI}
    setimageAI={setimageAI}
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

            {!isSubmitting && (
      <Button
   type="submit"
   variant="contained"
   aria-label={item && item.title ? 'עדכון מתכון' : 'הוספת מתכון חדש'}
   title={item && item.title ? 'עדכון מתכון (Alt+D)' : 'הוספת מתכון (Alt+D)'}
   id="submit-recipe-button"
   role="button"
   sx={{
     borderRadius: 3,
     fontSize: adjustedFontSize(1.1),
     lineHeight: adjustedLineHeight(1.3),
     letterSpacing: adjustedLetterSpacing(0.04),
     wordSpacing: adjustedWordSpacing(0.02),
     padding: '10px 22px',
     background: 'linear-gradient(135deg, #28a745, #4cd964)', // green gradient
     color: '#fff',
     fontWeight: 'bold',
     boxShadow: '0 6px 20px rgba(0,0,0,0.18)',
     border: '1px solid rgba(255,255,255,0.3)',
     transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
     '&:hover': {
       transform: 'translateY(-2px)',
       boxShadow: '0 10px 28px rgba(0,0,0,0.3)',
       background: 'linear-gradient(135deg, #218838, #3ad44e)',
       border: '1px solid #fff',
     },
     '&:focus-visible': {
       outline: '3px solid #FF6347',
       outlineOffset: '3px',
     },
   }}
 >
   {item && item.title ? 'עדכון מתכון' : 'הוספת מתכון '}
 </Button>
 )}

 {isSubmitting && (
   <Box
     sx={{
       display: "flex",
       alignItems: "center",
       justifyContent: "space-between",
       gap: 2,
       mt: 2,
       p: 2,
       borderRadius: 3,
       background: "rgba(25, 118, 210, 0.06)",
       border: "1px solid rgba(25, 118, 210, 0.2)",
     }}
   >
     {/* Loader + Text */}
     <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
       <CircularProgress size={22} />
 
       <Box sx={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
         <Box sx={{ fontWeight: "bold", fontSize: "0.95rem", color: "#0d47a1" }}>
           בתהליך שמירה
         </Box>
 
         <Box sx={{ fontSize: "0.8rem", color: "#555" }}>
           מומלץ לא לבטל, אך ניתן לבטל בכל רגע
         </Box>
       </Box>
     </Box>
 
     {/* Cancel Button */}
     <Button
       onClick={handleCancel}
       variant="outlined"
       sx={{
         borderRadius: 3,
         border: "2px solid #d32f2f",
         color: "#d32f2f",
         fontWeight: "bold",
         "&:hover": {
           background: "rgba(211, 47, 47, 0.08)",
           border: "2px solid #d32f2f",
         },
       }}
     >
       ביטול
     </Button>
   </Box>
 )}

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
<ItemDisplayrouter item={task} imageRecipeDisplay={imageRecipeDisplay} scale={1}/>
    </Box>
  </Grid>
    </Grid>
 ) : (
      // Else
 <Grid
  container
  sx={{
    direction: 'rtl',
    justifyContent: 'center', // 🔥 מרכז אופקית
    alignItems: 'flex-start',
    minHeight: '100vh', // אופציונלי למרכז גם ויזואלית
  }}
>
<Grid
  item
  xs={5}
  sx={{
    position: 'sticky',
    display: 'flex',
    flexDirection: 'column',   // 🔥 זה הקריטי
    alignItems: 'center',
  }}
>

  {/* 🔥 TOOLBAR מעל */}
 <Box
  sx={{
    width: '100%',
    background: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: 3,
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    p: 1,
  }}
>
  <RecipeActions item={task} />
</Box>

  {/* 🔥 ה־BOX */}
  <Box
    sx={{
      transform: 'scale(1)',
      transformOrigin: 'top',
      width: '100%',
    }}
  >
    <ItemDisplayrouter item={task} scale={.75} />
  </Box>

</Grid>
    </Grid> 

 )}
</>
  );
};

export default TaskForm;
