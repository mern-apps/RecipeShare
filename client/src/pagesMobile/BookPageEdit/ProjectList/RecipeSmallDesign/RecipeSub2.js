import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import { FONT_COLOR_OPTIONS } from '../../../../assets/fontColorRecipe2.js';
import { FONT_SIZE_OPTIONS } from '../../../../assets/fontSize.js';
import { useSelector } from 'react-redux';

const RecipeSub2 = ({ item, imageRecipeDisplay }) => {

  const book = useSelector(state => state.currentproject.currentproject);

  const imageUrltemplate =
    "https://media.istockphoto.com/id/1368935114/photo/vegan-asian-recipes-assorted-brown-rice-curry-masala-poke-do.jpg?s=1024x1024&w=is&k=20&c=Ff4aFup2u0kQI57KQTjfwC4yUuT5CzzX3s0zeN8Rbew=";

  if (!item) return null;

  const imageSrc = imageRecipeDisplay || item?.image || imageUrltemplate;

  const raw = Number(item?.ingFont || 2.1);
  const sizeType = Math.floor(raw);
  const colorType = Number((raw % 1).toFixed(1));

  const sizeOption = FONT_SIZE_OPTIONS.find(
    (s) => s.type === sizeType
  );

  // 50% smaller
  const fontSizeIng = sizeOption?.value
    ? (sizeOption.value * 4) * 0.5
    : 37.5;

  const colorOption = FONT_COLOR_OPTIONS.find(
    (c) => c.type === colorType
  );

  const fontColorIng = colorOption?.value || "#000000";

  const rawIns = Number(item?.insFont || 2.1);
  const sizeTypeIns = Math.floor(rawIns);
  const colorTypeIns = Number((rawIns % 1).toFixed(1));

  const sizeOptionIns = FONT_SIZE_OPTIONS.find(
    (s) => s.type === sizeTypeIns
  );

  // 50% smaller
  const fontSizeIns = sizeOptionIns?.value
    ? (sizeOptionIns.value * 2.5) * 0.5
    : 30;

  const colorOptionIns = FONT_COLOR_OPTIONS.find(
    (c) => c.type === colorTypeIns
  );

  const fontColorIns = colorOptionIns?.value || "#000000";

  const stripHtml = (html = "") => html.replace(/<[^>]*>/g, "");

  const wrapRichText = (html, maxCharsPerLine = 12, maxLines = 3) => {
    const text = stripHtml(html);
    const words = text.split(" ");
    const wrappedTitle = [];
    let currentLine = "";

    for (let word of words) {
      if (
        (currentLine + (currentLine ? " " : "") + word).length >
        maxCharsPerLine
      ) {
        wrappedTitle.push(currentLine);
        currentLine = word;

        if (wrappedTitle.length >= maxLines) break;
      } else {
        currentLine += (currentLine ? " " : "") + word;
      }
    }

    if (wrappedTitle.length < maxLines && currentLine) {
      wrappedTitle.push(currentLine);
    }

    return wrappedTitle.join("<br/>");
  };

  const displayTitle = wrapRichText(item?.title || "", 12, 3);
  const displayAuthor = wrapRichText(item?.author || "", 12, 3);

  return (
    <Paper
      elevation={2}
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        borderRadius: 1,
      }}
    >
      {/* Full background image */}
      <Box
        component="img"
        src={imageSrc}
        alt="cover"
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />

      {/* Overlay */}
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 1,
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <Typography
          component="div"
          sx={{
            fontWeight: 600,
            fontSize: `${fontSizeIng / 3.6}px`,
            lineHeight: 1.05,
            color: fontColorIng || "#FFFFFF",
            textShadow: "1px 1px 3px rgba(0,0,0,0.5)",
            textAlign: "center",
            direction: "rtl",
          }}
          dangerouslySetInnerHTML={{ __html: displayTitle }}
        />

        {(item?.type || []).some(t => Math.floor(t) === 10) && (
          <Typography
            component="div"
            sx={{
              fontWeight: 450,
              fontSize: `${fontSizeIns / 3.2}px`,
              lineHeight: 1.05,
              color: fontColorIns || "#FFFFFF",
              textShadow: "1px 1px 3px rgba(0,0,0,0.5)",
              textAlign: "center",
              direction: "rtl",
            }}
            dangerouslySetInnerHTML={{ __html: displayAuthor }}
          />
        )}
      </Grid>
    </Paper>
  );
};

export default RecipeSub2;