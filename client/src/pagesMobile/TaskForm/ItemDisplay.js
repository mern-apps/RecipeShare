import React from 'react';
import { styled } from '@mui/system';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import categories from '../../assets/Icons/recipe1pdf/categories.png';
import leveldifficulty from '../../assets/Icons/recipe1pdf/leveldifficulty.png';
import numserves from '../../assets/Icons/recipe1pdf/numserves.png';
import { FONT_COLOR_OPTIONS } from '../../assets/fontColorRecipe1.js';
import { FONT_SIZE_OPTIONS } from '../../assets/fontSize.js';

const imageUrltemplate = 'https://media.istockphoto.com/id/1368935114/photo/vegan-asian-recipes-assorted-brown-rice-curry-masala-poke-do.jpg?s=1024x1024&w=is&k=20&c=Ff4aFup2u0kQI57KQTjfwC4yUuT5CzzX3s0zeN8Rbew=';

const A4_WIDTH = 21.0; // Width of an A4 page in centimeters
const A4_HEIGHT = 29.7; // Height of an A4 page in centimeters

const StyledPaper = styled(Paper)({
  padding: 16,
  textAlign: 'center',
  width: `${A4_WIDTH}cm`,
  height: `${A4_HEIGHT}cm`,
  border: "none",
  outline: "none",
  elevation: 0,
  boxShadow: "0 0 0 0 rgba(0, 0, 0, 0.1)",  
});

const ImageContainer = styled('div')({
  width: '100%', // Take up the entire width
  height: '25%', // Set the height to 25% of the container height
});

const ImageElement = styled('img')({
  width: '100%',
  maxHeight: '100%', // Set the maximum height for the image
  //objectFit: 'contain',
  objectFit: 'cover', // You can use 'cover' or 'contain' based on your preference
});

const Textdiv = styled('div')({
  width: '100%', // Take up the entire width
  boxSizing: 'border-box', // Include padding and border in the element's total width and height
  textAlign: 'right', // Align text from right to left
});

const TitleAuthorContainer = styled(Paper)({
  width: '100%', // Take up the entire width
  padding: '8px', // Adjust padding as needed
  boxSizing: 'border-box', // Include padding and border in the element's total width and height
  border: "none",
  outline: "none",
  elevation: 0,
  boxShadow: "0 0 0 0 rgba(0, 0, 0, 0.1)",    
});

const MiddleContainer = styled(Paper)({
  width: '100%',
  padding: '8px',
  boxSizing: 'border-box',
  display: 'flex',
  textAlign: 'center', 
  flexDirection: 'row',
  justifyContent: 'space-between', // Add space between the containers
  alignItems: 'flex-start', // Align items to the top
  flexWrap: 'wrap',
  border: "none",
  outline: "none",
  elevation: 0,
  boxShadow: "0 0 0 0 rgba(0, 0, 0, 0.1)",
});

const CategoriesContainer = styled('div')({
  textAlign: 'center', // Center the text within the container
  boxSizing: 'border-box',
  border: '0px solid black',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  margin: '0 2px', // Adjust the margin as needed
});

const CategoryChip = styled(Chip)({
  margin: '2px', // Adjust as needed
});

const NumservesContainer = styled('div')({
  textAlign: 'center', // Center the text within the container
  boxSizing: 'border-box',
  border: '0px solid black',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  margin: '0 2px', // Adjust the margin as needed
});

const LevelContainer = styled('div')({
  textAlign: 'center', // Center the text within the container
  boxSizing: 'border-box',
  border: '0px solid black',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  margin: '0 40px', // Adjust the margin as needed
});


const IngredientsContainer = styled(Paper)({
  width: '75%', // Adjust the width for the left column
  padding: '8px',
  boxSizing: 'border-box',
  minHeight: '450px', // Set a minimum height, adjust as needed
  marginLeft: 'auto', // Align the frame to the right
  marginTop: '20px', // Add marginTop as needed
  borderLeft: '5px solid #333', // Add a thicker border only on the left side
  border: "none",
  outline: "none",
  elevation: 0,
  boxShadow: "0 0 0 0 rgba(0, 0, 0, 0.1)",  
});


const InstructionsContainer = styled(Paper)({
  width: '125%', // Adjust the width for the left column
  padding: '8px',
  boxSizing: 'border-box',
  minHeight: '450px', // Set a minimum height, adjust as needed
  marginTop: '20px', // Add marginTop as needed
  border: "none",
  outline: "none",
  elevation: 0,
  boxShadow: "0 0 0 0 rgba(0, 0, 0, 0.1)",  
});




const ItemDisplay = ({ item, imageRecipeDisplay }) => {

       if (!item) return null;

  const formatWithBullets = (html = "") => {
  const lines = html
    .replace(/<\/p>/g, "\n")
    .replace(/<br\s*\/?>/g, "\n")
    .replace(/<[^>]*>/g, "")
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean);

  return lines
    .map(
      line => `<div class="bullet-line">• ${line}</div>`
    )
    .join("");
};


const raw = Number(item?.ingFont || 1.1);
    // 🔹 Extract parts
    const sizeType = Math.floor(raw);
    const colorType = Number((raw % 1).toFixed(1));
    
    // 🔹 Find size
    const sizeOption = FONT_SIZE_OPTIONS.find(
      (s) => s.type === sizeType
    );
    const fontSizeIng = sizeOption?.value || 25;
    
    // 🔹 Find color
    const colorOption = FONT_COLOR_OPTIONS.find(
      (c) => c.type === colorType
    );
    const fontColorIng = colorOption?.value || "#000000";


    //

    const rawIns = Number(item?.insFont || 1.1);
        // 🔹 Extract parts
        const sizeTypeIns = Math.floor(rawIns);
        const colorTypeIns = Number((rawIns % 1).toFixed(1));
        
        // 🔹 Find size
        const sizeOptionIns = FONT_SIZE_OPTIONS.find(
          (s) => s.type === sizeTypeIns
        );
        const fontSizeIns = sizeOptionIns?.value || 25;
        
        // 🔹 Find color
        const colorOptionIns = FONT_COLOR_OPTIONS.find(
          (c) => c.type === colorTypeIns
        );
        const fontColorIns = colorOptionIns?.value || "#000000";



  const imageDisplay = imageRecipeDisplay || item.image;

       return (
    <StyledPaper sx={{ boxShadow: "none" }}>
      <ImageContainer>
        <ImageElement src={imageDisplay} alt="Recipe" />
      </ImageContainer>
      <Textdiv>
        <TitleAuthorContainer>
          {/* Content for the right div goes here */}
          <Grid container spacing={1} direction="column">
            {/* Upper layer */}
            <Grid item xs={12}>
              
            <Typography variant="h3" style={{ color: '#7A6D8E  ', fontFamily: 'Special Elite', fontSize: '3rem'}}>
            {item.title}
          </Typography>

<Typography variant="h3" style={{ color: '#7A6D8E  ', fontFamily: 'Special Elite', fontSize: '2rem'}}>
            {item.author}
              </Typography>
            </Grid>
          </Grid>
        </TitleAuthorContainer>
        <MiddleContainer>
        <CategoriesContainer>
        <img src={categories} alt="Difficulty Icon" style={{ width: '40px', height: '40px' }} />
        <Typography variant="subtitle1" style={{ display: 'flex', alignItems: 'center', marginLeft: '30px' }}>
        <div>
  {item.selectedCategories && (
    <CategoryChip label={item.selectedCategories} />
  )}
</div>

          <div style={{ marginLeft: '10px',fontSize: '20px', color: '#72708B', fontWeight: 'bold' }}>
            קטגוריות
          </div>
        </Typography>
      </CategoriesContainer>
          <NumservesContainer>
          <img src={numserves} alt="Difficulty Icon" style={{ width: '40px', height: '40px' }} />

          <Typography variant="subtitle1" style={{ display: 'flex', alignItems: 'center' }}>
          
            <div >

            <CategoryChip label={item.numserves} /> {/* Styled component for numserves */}
                </div>
                <div style={{ marginLeft: '10px',fontSize: '20px', color: '#72708B', fontWeight: 'bold' }}>
            מספר מנות
            </div>

              </Typography>
          </NumservesContainer>
          <LevelContainer>
          <img src={leveldifficulty} alt="Difficulty Icon" style={{ width: '160px', height: '160px' }} />

<Typography variant="subtitle1" style={{ display: 'flex', alignItems: 'center' }}>

  <div >

  <CategoryChip label={item.level} /> {/* Styled component for numserves */}
      </div>
      <div style={{ marginLeft: '10px',fontSize: '20px', color: '#72708B ', fontWeight: 'bold' }}>
רמת קושי
  </div>

    </Typography>

          </LevelContainer>


        </MiddleContainer>

        <Grid container item xs={12} spacing={1}>
          <Grid item xs={6}>
            <InstructionsContainer>
              <Typography variant="h3" style={{ color: '#697388', fontFamily: 'Special Elite', fontSize: '2rem' }}>הוראות הכנה</Typography>
<Typography
  sx={{
   fontFamily: 'Lato, sans-serif',
       fontSize: `${fontSizeIng}px`,
    color: fontColorIng || "#FFFFFF",
    direction: 'rtl',
    lineHeight: 1.6,
    '& p': {
      margin: 0,
    },
  }}
  
dangerouslySetInnerHTML={{
    __html: formatWithBullets(item?.ingredients),
  }}/>           </InstructionsContainer>
          </Grid>
          <Grid item xs={6}>
            <IngredientsContainer>
              <Typography variant="h3" style={{ color: '#697388 ', fontFamily: 'Special Elite', fontSize: '2rem' }}>מרכיבים </Typography>
<Typography
  sx={{
    fontFamily: 'Lato, sans-serif',
       fontSize: `${fontSizeIns}px`,
    color: fontColorIns || "#FFFFFF",
    direction: 'rtl',
    lineHeight: 1.6,
    '& p': {
      margin: 0,
    },
  }}
dangerouslySetInnerHTML={{
    __html: formatWithBullets(item?.instructions),
  }}/>
              </IngredientsContainer>
          </Grid>
        </Grid>
      
      </Textdiv>
    </StyledPaper>
  );
};


export default ItemDisplay;