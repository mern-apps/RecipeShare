import React from "react";
import {
  Grid,
  Typography,
  Box,
  Chip,
  Divider,
  Stack,
} from "@mui/material";
import categoryIcon from "../../../assets/Icons/recipe1pdf/categories.png";
import leveldifficulty from "../../../assets/Icons/recipe1pdf/leveldifficulty.png";
import numserves from "../../../assets/Icons/recipe1pdf/numserves.png";
import { FONT_COLOR_OPTIONS } from '../../../assets/fontColorRecipe1.js';
import { FONT_SIZE_OPTIONS } from '../../../assets/fontSize.js';

const imageUrltemplate =
  "https://media.istockphoto.com/id/1368935114/photo/vegan-asian-recipes-assorted-brown-rice-curry-masala-poke-do.jpg?s=1024x1024&w=is&k=20&c=Ff4aFup2u0kQI57KQTjfwC4yUuT5CzzX3s0zeN8Rbew=";

const ItemDisplay1 = ({ item }) => {

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

  const imageSrc = item?.image ? item.image : imageUrltemplate;
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

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        borderRadius: 2,
        gap: 2,
      }}
    >
      {/* IMAGE */}
      <Box
        component="img"
        src={imageSrc}
        alt={item?.title}
        sx={{
          width: "100%",
          height: 250,
          objectFit: "cover",
          borderRadius: 2,
        }}
      />

      {/* TITLE + AUTHOR */}
      <Stack sx={{ px: 2, textAlign: "right" }}>
  <Typography
  sx={{
    fontFamily: "'Rubik', sans-serif", // match PDF
    fontWeight: 780,                   // Rubik-Bold
    color: "#30BFBF",
    fontSize: 55,                      // same visual size
    textAlign: "right",
    direction: "rtl",
  }}
>
  {item?.title || ""}
</Typography>

        {item?.author && (
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 300,
              fontFamily: "'Playfair Display', serif",
              color: "#6C757D",
              fontSize: 40,
              textAlign: "right",
            }}
          >
           {item.author}
          </Typography>
        )}
      </Stack>

      {/* METADATA ROW — centered, 70% width */}
      <Box
        sx={{
          width: "70%",
          mx: "auto",
          px: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* CATEGORY */}


        {/* SERVES */}
<Stack
  direction="column"
  alignItems="center"
  spacing={0.5}
  sx={{
    position: "relative",
    pt: 4, // space reserved so text doesn't collide
  }}
>
  {/* FLOATING ICON */}
  <Box
    component="img"
    src={leveldifficulty}
    alt="רמת קושי"
    sx={{
      position: "absolute",
      top: -170,        // move upward over white background
      width: 270,       // bigger icon
      height: 350,
      objectFit: "contain",
      opacity: 0.7,
      zIndex: 2,
      pointerEvents: "none",
    }}
  />
         <Typography
  sx={{
    fontFamily: "'Rubik', sans-serif",
    fontWeight: 600,
    color: "#30BFBF",
    fontSize: 35,
    lineHeight: "1.1",      // 🔑 key fix
    display: "block",
  }}
>
            רמת קושי
          </Typography>
 <Typography variant="body1" sx={{ fontWeight: 500,fontSize: 24, color: "#000" }}>
            {item?.level || "-"}
          </Typography>
        </Stack>

<Stack
  direction="column"
  alignItems="center"
  spacing={0.5}
  sx={{
    position: "relative",
    pt: 4, // space reserved so text doesn't collide
  }}
>
  {/* FLOATING ICON */}

  <Box
    component="img"
    src={numserves}
    alt="מספר מנות"
    sx={{
      position: "absolute",
      top: -170,        // move upward over white background
      width: 270,       // bigger icon
      height: 350,
      objectFit: "contain",
      opacity: 0.7,
      zIndex: 2,
      pointerEvents: "none",
    }}
  />

          <Typography
  sx={{
    fontFamily: "'Rubik', sans-serif",
    fontWeight: 600,
    color: "#30BFBF",
    fontSize: 35,
    lineHeight: "1.1",      // 🔑 key fix
    display: "block",
  }}
>
            מנות
          </Typography>
 <Typography variant="body1" sx={{ fontWeight: 500,fontSize: 24, color: "#000" }}>
            {item?.numserves || "-"}
          </Typography>
        </Stack>

<Stack
  direction="column"
  alignItems="center"
  spacing={0.5}
  sx={{
    position: "relative",
    pt: 4, // space reserved so text doesn't collide
  }}
>
  {/* FLOATING ICON */}
  <Box
    component="img"
    src={categoryIcon}
    alt="קטגוריה"
    sx={{
      position: "absolute",
      top: -170,        // move upward over white background
      width: 270,       // bigger icon
      height: 350,
      objectFit: "contain",
      opacity: 0.7,
      zIndex: 2,
      pointerEvents: "none",
    }}
  />

  {/* TEXT */}
<Typography
  sx={{
    fontFamily: "'Rubik', sans-serif",
    fontWeight: 600,
    color: "#30BFBF",
    fontSize: 35,
    lineHeight: "1.1",      // 🔑 key fix
    display: "block",
  }}
>
    קטגוריה
  </Typography>

 {item?.selectedCategories && (
 <Typography variant="body1" sx={{ fontWeight: 500,fontSize: 24, color: "#000" }}>
    {item.selectedCategories}
  </Typography>
)}
</Stack>




        {/* LEVEL */}

      </Box>

      {/* INGREDIENTS + INSTRUCTIONS */}
      <Grid
        container
        spacing={2}
        sx={{
          px: 2,
          pb: 2,
          alignItems: "stretch", // ensures shared height
        }}
      >
        {/* INGREDIENTS */}
<Grid item xs={12} md={3.8}>           <Typography
            variant="h6"
            sx={{
              fontWeight: 250,
              //borderBottom: "1px solid #D0D6DD",
              fontFamily: "'Spectral', serif",
              color: "#30BFBF",
              textAlign: "right",
              fontSize: 45,
            }}
          >
            מצרכים
          </Typography>

            <Box
           sx={{
              fontFamily: "'Inter', sans-serif",
              lineHeight: 1.4,
            fontSize: `${fontSizeIng}px`,
    color: fontColorIng || "#FFFFFF",
              "& .bullet-line": {
                textIndent: "-20px",   // 🔥 מושך את ה• שמאלה
                paddingRight: "20px",  // 🔥 מזיז את הטקסט ימינה
                marginBottom: "6px",
              },
            }}
          dangerouslySetInnerHTML={{
              __html: formatWithBullets(item?.ingredients),
            }}/>
                  </Grid>
          
                  {/* CENTERED DIVIDER */}
                 <Grid
            item
            md={0.4}
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              alignItems: "stretch", // make grid item stretch vertically
            }}
          >
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                backgroundColor: "#D0D6DD",
                width: "2px",
                borderRadius: 1,
                height: "500px", // fixed height in px
              }}
            />
          </Grid>
          
                  {/* INSTRUCTIONS */}
          <Grid item xs={12} md={7.3}> 
                      <Typography
                      variant="h6"
                       sx={{
                        fontWeight: 250,
                        //borderBottom: "1px solid #D0D6DD",
                        fontFamily: "'Spectral', serif",
                        color: "#30BFBF",
                        textAlign: "right",
                        fontSize: 40,
                      }}
                    >
                      הוראות הכנה
                    </Typography>
          
                            <Box
           sx={{
              fontFamily: "'Inter', sans-serif",
   fontSize: `${fontSizeIns}px`,
    color: fontColorIns || "#FFFFFF",
              lineHeight: 1.4,
              "& .bullet-line": {
                textIndent: "-20px",   // 🔥 מושך את ה• שמאלה
                paddingRight: "20px",  // 🔥 מזיז את הטקסט ימינה
                marginBottom: "6px",
              },
            }}
          dangerouslySetInnerHTML={{
              __html: formatWithBullets(item?.instructions),
            }}/>
                  </Grid>
           
                </Grid>
              </Box>
  );
};
export default ItemDisplay1;
