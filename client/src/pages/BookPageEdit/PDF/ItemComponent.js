import React from 'react';
import { styled } from '@mui/system';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
//import Image from './picturecipe.jpg';
import Easy from '../../../pictures/easypic.png';

const imageUrltemplate =
  'https://media.istockphoto.com/id/1368935114/photo/vegan-asian-recipes-assorted-brown-rice-curry-masala-poke-do.jpg?s=1024x1024&w=is&k=20&c=Ff4aFup2u0kQI57KQTjfwC4yUuT5CzzX3s0zeN8Rbew=';

const A4_WIDTH = 21.0; // Width of an A4 page in centimeters
const A4_HEIGHT = 29.7; // Height of an A4 page in centimeters

const StyledPaper = styled(Paper)({
  padding: 16,
  textAlign: 'center',
  width: `${A4_WIDTH}cm`,
  height: `${A4_HEIGHT}cm`,
  border: 'none',
  outline: 'none',
  elevation: 0,
  boxShadow: '0 0 0 0 rgba(0, 0, 0, 0.1)',
});

const ImageContainer = styled('div')({
  width: '100%', // Take up the entire width
  height: '25%', // Set the height to 25% of the container height
});

const ImageElement = styled('img')({
  width: '100%',
  maxHeight: '100%', // Set the maximum height for the image
  objectFit: 'cover',
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
  border: 'none',
  outline: 'none',
  elevation: 0,
  boxShadow: '0 0 0 0 rgba(0, 0, 0, 0.1)',
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
  border: 'none',
  outline: 'none',
  elevation: 0,
  boxShadow: '0 0 0 0 rgba(0, 0, 0, 0.1)',
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
  border: 'none',
  outline: 'none',
  elevation: 0,
  boxShadow: '0 0 0 0 rgba(0, 0, 0, 0.1)',
});

const InstructionsContainer = styled(Paper)({
  width: '125%', // Adjust the width for the left column
  padding: '8px',
  boxSizing: 'border-box',
  minHeight: '450px', // Set a minimum height, adjust as needed
  marginTop: '20px', // Add marginTop as needed
  border: 'none',
  outline: 'none',
  elevation: 0,
  boxShadow: '0 0 0 0 rgba(0, 0, 0, 0.1)',
});

const ItemComponent = ({ item }) => {
  return (
    <StyledPaper sx={{ boxShadow: 'none' }}>
      <ImageContainer>
      <ImageElement src={item.image ? item.image : imageUrltemplate} alt="Recipe" />
      </ImageContainer>
      <Textdiv>
        <TitleAuthorContainer>
          <Grid container spacing={1} direction="column">
            <Grid item xs={12}>
              <Typography variant="h3" style={{ color: '#7A6D8E', fontFamily: 'Arial, sans-serif', fontSize: '3rem' }}>
                {item.title}
              </Typography>
              <Typography variant="h3" style={{ color: '#7A6D8E', fontFamily: 'Arial, sans-serif', fontSize: '2rem' }}>
                {item.author}
              </Typography>
            </Grid>
          </Grid>
        </TitleAuthorContainer>
        <MiddleContainer>
          <CategoriesContainer>
            <img src={Easy} alt="Difficulty Icon" style={{ width: '40px', height: '40px' }} />
            <Typography variant="subtitle1" style={{ display: 'flex', alignItems: 'center', marginLeft: '30px' }}>
              <div>
              {item.selectedCategories && <CategoryChip label={item.selectedCategories} />}
              </div>
              <div style={{ marginLeft: '10px', fontSize: '20px', color: '#72708B', fontWeight: 'bold' }}>
                קטגוריות
              </div>
            </Typography>
          </CategoriesContainer>
          <NumservesContainer>
            <img src={Easy} alt="Difficulty Icon" style={{ width: '40px', height: '40px' }} />
            <Typography variant="subtitle1" style={{ display: 'flex', alignItems: 'center' }}>
              <div>
                <CategoryChip label={item.numserves} />
              </div>
              <div style={{ marginLeft: '10px', fontSize: '20px', color: '#72708B', fontWeight: 'bold' }}>
                מספר מנות
              </div>
            </Typography>
          </NumservesContainer>
          <LevelContainer>
            <img src={Easy} alt="Difficulty Icon" style={{ width: '40px', height: '40px' }} />
            <Typography variant="subtitle1" style={{ display: 'flex', alignItems: 'center' }}>
              <div>
                <CategoryChip label={item.level} />
              </div>
              <div style={{ marginLeft: '10px', fontSize: '20px', color: '#72708B ', fontWeight: 'bold' }}>
                רמת קושי
              </div>
            </Typography>
          </LevelContainer>
        </MiddleContainer>
        <Grid container item xs={12} spacing={1}>
          <Grid item xs={6}>
            <InstructionsContainer>
              <Typography variant="h3" style={{ color: '#697388', fontFamily: 'Arial, sans-serif', fontSize: '2rem' }}>
                הוראות הכנה
              </Typography>
              <Typography style={{ fontFamily: 'Lato, sans-serif', fontSize: '18px', direction: 'rtl', lineHeight: '1' }} dangerouslySetInnerHTML={{ __html: item.instructions }} />
            </InstructionsContainer>
          </Grid>
          <Grid item xs={6}>
            <IngredientsContainer>
              <Typography variant="h3" style={{ color: '#697388 ', fontFamily: 'Arial, sans-serif', fontSize: '2rem' }}>
                מרכיבים
              </Typography>
              <Typography style={{ fontFamily: 'Lato, sans-serif', fontSize: '18px', direction: 'rtl', lineHeight: '1' }} dangerouslySetInnerHTML={{ __html: item.ingredients }} />
            </IngredientsContainer>
          </Grid>
        </Grid>
      </Textdiv>
    </StyledPaper>
  );
};

export default ItemComponent;
