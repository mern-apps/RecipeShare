import path from "path";

const fontsPath = path.join(process.cwd(), "assets/fonts");

export const registerFonts = (doc) => {



  doc.registerFont(
    "Assistant",
    path.join(fontsPath, "Assistant-Regular.ttf")
  );

  doc.registerFont(
    "Assistant-Bold",
    path.join(fontsPath, "Assistant-Bold.ttf")
  );

  doc.registerFont(
    "Heebo-Bold",
    path.join(fontsPath, "Heebo-Bold.ttf")
  );

  doc.registerFont(
    "Rubik-Bold",
    path.join(fontsPath, "Rubik-Bold.ttf")
  );

  doc.registerFont(
    "Alef-Regular",
    path.join(fontsPath, "Alef-Regular.ttf")
  );

  doc.registerFont(
    "Alef-Bold",
    path.join(fontsPath, "Alef-Bold.ttf")
  );

      console.log("REGISTERING FONTS");

};