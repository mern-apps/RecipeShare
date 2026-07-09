import AWS from 'aws-sdk';
import mongoose from 'mongoose';
import groupmodel from '../models/groupmodel.js';
import recipemodel from '../models/recipemodel.js';
import usermodel from '../models/usermodel.js';
import projectmodel from '../models/projectmodel.js';
import recipeAdminModel from '../models/recipeAdminModel.js';

import dotenv from 'dotenv';
dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION, // Use your region directly here
 // region: 'eu-north-1', 
  signatureVersion: 'v4',
});


export const generatePresignedUrl = async (req, res) => {

  const fileDetails = req.body;
  const { fileName, fileType, operation } = fileDetails;

  const userId = req.userId;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  if (!['upload', 'edit'].includes(operation)) {
    return res.status(400).json({ message: 'Invalid operation' });
  }

    const timestamp = Date.now();
  const key = `recipes/main/${userId}/${timestamp}/${fileName}`;


  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
    Expires: 300,
    ContentType: fileType
  };
  //check why when consolo log expries i see expires 300??
  try {
    const signedUrl = await s3.getSignedUrlPromise('putObject', params);
    const fileUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`; 
    return res.status(201).json({
      signedUrl,
      url: fileUrl,
      message: 'signedUrl + url',
    });
  } catch (err) {
    console.error('Error generating signed URL:', err);
    return res.status(500).json({ message: 'Error generating URL', error: err.message });
  }
};



export const deleteFromAmazonAndMongo = async (req, res) => {
  const fileDetails = req.body;
  const { fileName, operation } = fileDetails;
  const userId = req.userId;
  
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  if (operation !== 'delete') {
    return res.status(400).json({ message: 'Invalid operation' });
  }

  const key = `recipes/main/${userId}/${fileName}`;
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
  };

  try {
    // Step 1: Delete from S3
    await s3.deleteObject(params).promise();
    const user = await usermodel.findById(userId); // Find the user by ID
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const fileUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    user.images = user.images.filter((image) => image !== fileUrl);
    
    const updatedimages = user.images;  

    const isQnrNotEmpty = user.qnr && Object.keys(user.qnr).length > 0;
if (isQnrNotEmpty && Array.isArray(user.images) && user.images.length > 0) {
  user.hasdata = 1; 
}
else {
  user.hasdata = 0; 
}

  await user.save();


  const populatedUser = await usermodel
  .findById(userId)
  .populate('codes');
//if controller not working - check the ver before populate


return res.status(200).json({
  message: 'File deleted successfully from S3 and MongoDB',
  fileUrl,
  updatedimages,
  user: populatedUser,
});

  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ message: 'Error processing request', error: err.message });
  }
};



export const uploadmongoUrl = async (req, res) => {
  try {
    const payload = req.body;
    const { url, savedItemID, mainimageValue, isFirst } = payload;
    const userId = req.userId;

         console.log(' payload', payload);

    // 1️⃣ Check if user exists
    const user = await usermodel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
         console.log(' user', user);

    // 2️⃣ Ensure savedItemID (recipe ID) is provided
    if (!savedItemID) {
      return res.status(400).json({ message: "savedItemID is required" });
    }

    // 3️⃣ Find the recipe
    const recipe = await recipemodel.findById(savedItemID);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }


    // 4️⃣ Optional: check ownership
    if (recipe.owner.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Not authorized to update this recipe" });
    }

    // 5️⃣ Check if the URL is already the recipe image
    if (recipe.image === url) {
      return res.status(200).json({
        message: "URL already exists for this recipe, no update needed",
        url,
        recipeId: savedItemID,
      });
    }

    // 6️⃣ Update the recipe image
    recipe.image = url;
    await recipe.save();

    return res.status(200).json({
      url,
      recipe,
    });

  } catch (error) {
    console.error("❌ Error saving recipe image URL:", error);
    return res.status(500).json({ message: "Failed to save recipe image" });
  }
};

//Array of images with edit (Like Match project)
export const uploadmongoUrlArrayofimageswithedit = async (req, res) => {
  try {
    const payload = req.body;
    const { url,savedItemID, mainimageValue,isFirst } = payload;

    const userId = req.userId;

    const updatedUser = await usermodel.findById(userId); // Find the user by ID
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the URL already exists in the images array
  if (updatedUser.images.includes(url)) {
  return res.status(200).json({
    message: 'File already exists in MongoDB, no duplicate added',
    url,
    updatedimages: updatedUser.images,
    updatedUser
  });
}

    // Step 1: Place at the beginning if it's a new main image marked as first
      if (mainimageValue === 'new' && isFirst) {
      updatedUser.images.unshift(url);
    } else {
      updatedUser.images.push(url);
    }

       // Step 2: If mainimageValue is a string (previous image), move it to start
    if (mainimageValue && mainimageValue !== 'new') {
      const index = updatedUser.images.indexOf(mainimageValue);
      if (index > -1) {
        updatedUser.images.splice(index, 1);      // remove from current position
        updatedUser.images.unshift(mainimageValue); // add at the start
      }
    }

    // Add the file URL to the images array
    const updatedimages=updatedUser.images

    const isQnrNotEmpty = updatedUser.qnr && Object.keys(updatedUser.qnr).length > 0;
if (isQnrNotEmpty && Array.isArray(updatedUser.images) && updatedUser.images.length > 0) {
  updatedUser.hasdata = 1;
}
else {
  updatedUser.hasdata = 0;
}

  // Save the updated user
  await updatedUser.save();

  const populatedUser = await usermodel
  .findById(userId)
  .populate('codes');
//if controller not working - check the ver before populate

return res.status(200).json({
  message: 'File added successfully to MongoDB',
  url,
  updatedimages,
  updatedUser: populatedUser,
});


  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};




//code

export const generatePresignedUrlcodes = async (req, res) => {
  const updatedFileDetails = req.body;
  const { fileName, fileType, operation,groupName } = updatedFileDetails;

  const userId = req.userId;

    try {

  const group = await codesmodel.findOne({ group: groupName });

  if (!group) {
    return res.status(404).json({ message: 'group not found' });
  }

  const user1 = await usermodel.findById(userId);
  if (!user1 || user1.useradmin !==10) { 
    return res.status(404).json({ message: 'User not found' });
  }

  if (!['upload', 'edit'].includes(operation)) {
    return res.status(400).json({ message: 'Invalid operation' });
  }

  const key = `match/codes/${group._id}/${userId}/${fileName}`;

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
    Expires: 300,
    ContentType: fileType
  };

    const signedUrl = await s3.getSignedUrlPromise('putObject', params);
    const fileUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`; 

    return res.status(201).json({
      signedUrl,
      url: fileUrl,
      message: 'signedUrl + url',
    });
  } catch (err) {
    console.error('Error generating signed URL:', err);
    return res.status(500).json({ message: 'Error generating URL', error: err.message });
  }
};


export const uploadmongoUrlcode = async (req, res) => {
  try {
    const imageObject = req.body;
    const { url,groupName } = imageObject;

    const userId = req.userId;

    const user1 = await usermodel.findById(userId);
    if (!user1 || user1.useradmin !==10) { 
      return res.status(404).json({ message: 'User not found' });
    }

     const group = await codesmodel.findOne({ group: groupName });

    if (!group) {
      return res.status(404).json({ message: 'group not found' });
    }

    // Check if the URL already exists in the images array
   // if (group.image === url) {
    //  return res.status(200).json({ message: 'user.image already contains the url' });
    //}

    // Add the file URL to the images array
    group.image = url;

  // Save the updated user
  await group.save();

    return res.status(200).json({
      message: 'File added successfully to MongoDB',
      url,
      group
    });
    

  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};





//editcode
/////not active controller - no client that ask it!!!!!!!!!
export const deleteFromAmazonAndMongoeditcode = async (req, res) => {
  const fileDetails = req.body;
  const { fileName, operation } = fileDetails;
  const userId = req.userId;

 
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  const user1 = await usermodel.findById(userId);
  if (!user1 || user1.useradmin !==10) { 
    return res.status(404).json({ message: 'User not found' });
  }


  if (operation !== 'delete') {
    return res.status(400).json({ message: 'Invalid operation' });
  }
///need to find  group!!!!!!!!!!!!
  const key = `match/codes/${group._id}/${userId}/${fileName}`;
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
  };

  try {
    // Step 1: Delete from S3
    await s3.deleteObject(params).promise();
    const user = await usermodel.findById(userId); // Find the user by ID
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const fileUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    const code = await codesmodel.findOne({ image: fileUrl }); // Find the document with the matching URL
 if (code) {
      code.image = null;
      await code.save();
      console.log('Image URL removed from database');
    }


    return res.status(200).json({
      message: 'File deleted successfully from S3 and MongoDB',
      fileUrl,
      code
    });
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ message: 'Error processing request', error: err.message });
  }
};


export const generatePresignedUrlBook = async (req, res) => {

  const fileDetails = req.body;
  const { fileName, fileType, operation } = fileDetails;

  const userId = req.userId;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  if (!['upload', 'edit'].includes(operation)) {
    return res.status(400).json({ message: 'Invalid operation' });
  }

  const timestamp = Date.now();
  const key = `books/main/${userId}/${timestamp}/${fileName}`;

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
    Expires: 300,
    ContentType: fileType
  };
  //check why when consolo log expries i see expires 300??
         console.log(' params', params);

  try {

    const signedUrl = await s3.getSignedUrlPromise('putObject', params);
    const fileUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`; 
    return res.status(201).json({
      signedUrl,
      url: fileUrl,
      message: 'signedUrl + url',
    });
  } catch (err) {
    console.error('Error generating signed URL:', err);
    return res.status(500).json({ message: 'Error generating URL', error: err.message });
  }
};

export const uploadmongoUrlBook = async (req, res) => {
  try {
    const payload = req.body;
    const { url, savedItemID, mainimageValue, isFirst } = payload;
    const userId = req.userId;

    // 1️⃣ Check if user exists
    const user = await usermodel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2️⃣ Ensure savedItemID (book ID) is provided
    if (!savedItemID) {
      return res.status(400).json({ message: "savedItemID is required" });
    }

    // 3️⃣ Find the book
    const book = await projectmodel.findById(savedItemID);
    if (!book) {
      return res.status(404).json({ message: "book not found" });
    }

    // 4️⃣ Optional: check ownership
     if (!book.owner.some(id => id.equals(userId))) {
     return res.status(403).json({ 
       message: "not Unauthorized" 
     });
   }

    // 5️⃣ Check if the URL is already the book image
    if (book.image === url) {
      return res.status(200).json({
        message: "URL already exists for this book, no update needed",
        url,
        bookId: savedItemID,
      });
    }

    // 6️⃣ Update the book image
    book.image = url;
    await book.save();

    return res.status(200).json({
      url,
      book,
    });

  } catch (error) {
    console.error("❌ Error saving book image URL:", error);
    return res.status(500).json({ message: "Failed to save book image" });
  }
};

export const generatePresignedUrlrecipe2 = async (req, res) => {

  const fileDetails = req.body;
  const { fileName, fileType, operation } = fileDetails;

  const userId = req.userId;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  if (!['upload', 'edit'].includes(operation)) {
    return res.status(400).json({ message: 'Invalid operation' });
  }

  const timestamp = Date.now();
  const key = `books/recipe2/${userId}/${timestamp}/${fileName}`;

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
    Expires: 300,
    ContentType: fileType
  };
  //check why when consolo log expries i see expires 300??
         console.log(' params', params);
  try {

    const signedUrl = await s3.getSignedUrlPromise('putObject', params);
    const fileUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`; 
              console.log(' signedUrl', signedUrl);
    return res.status(201).json({
      signedUrl,
      url: fileUrl,
      message: 'signedUrl + url',
    });
  } catch (err) {
    console.error('Error generating signed URL:', err);
    return res.status(500).json({ message: 'Error generating URL', error: err.message });
  }
};

export const uploadmongoUrlrecipe2 = async (req, res) => {
  try {
    const payload = req.body;
    const { url, savedItemID } = payload;
    const userId = req.userId;

    // 1️⃣ Check if user exists
    const user = await usermodel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2️⃣ Ensure savedItemID (book ID) is provided
    if (!savedItemID) {
      return res.status(400).json({ message: "savedItemID is required" });
    }

    const recipe2 = await recipemodel.findById(savedItemID);
    if (!recipe2) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // 4️⃣ Optional: check ownership
    if (recipe2.owner.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Not authorized to update this recipe2" });
    }

   // 5️⃣ Check if the URL is already the recipe image
    if (recipe2.image === url) {
      return res.status(200).json({
        message: "URL already exists for this recipe, no update needed",
        url,
        recipeId: savedItemID,
      });
    }
    recipe2.image = url;
    await recipe2.save();
    return res.status(200).json({
      url,
      recipe2,
    });

  } catch (error) {
    console.error("❌ Error saving book image URL:", error);
    return res.status(500).json({ message: "Failed to save book image" });
  }
};

export const generatePresignedUrlGroup = async (req, res) => {

  const fileDetails = req.body;
  const { fileName, fileType, operation } = fileDetails;

  const userId = req.userId;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  if (!['upload', 'edit'].includes(operation)) {
    return res.status(400).json({ message: 'Invalid operation' });
  }

  const timestamp = Date.now();
  const key = `groups/main/${userId}/${timestamp}/${fileName}`;

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
    Expires: 300,
    ContentType: fileType
  };
  //check why when consolo log expries i see expires 300??
  try {

    const signedUrl = await s3.getSignedUrlPromise('putObject', params);
    const fileUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`; 
    return res.status(201).json({
      signedUrl,
      url: fileUrl,
      message: 'signedUrl + url',
    });
  } catch (err) {
    console.error('Error generating signed URL:', err);
    return res.status(500).json({ message: 'Error generating URL', error: err.message });
  }
};

export const uploadmongoUrlGroup = async (req, res) => {
  try {
    const payload = req.body;
    const { url, savedItemID, mainimageValue, isFirst } = payload;
    const userId = req.userId;

    // 1️⃣ Check if user exists
    const user = await usermodel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2️⃣ Ensure savedItemID (Group ID) is provided
    if (!savedItemID) {
      return res.status(400).json({ message: "savedItemID is required" });
    }

    // 3️⃣ Find the Group
    const group = await groupmodel.findById(savedItemID);
    if (!group) {
      return res.status(404).json({ message: "group not found" });
    }

    // 4️⃣ Optional: check ownership
    if (!group.owner.some(id => id.equals(userId))) {
  return res.status(403).json({ 
    message: "not Unauthorized" 
  });
}

    // 5️⃣ Check if the URL is already the group image
    if (group.image === url) {
      return res.status(200).json({
        message: "URL already exists for this group, no update needed",
        url,
        groupId: savedItemID,
      });
    }

    // 6️⃣ Update the group image
    group.image = url;
    await group.save();

    return res.status(200).json({
      url,
      group,
    });

  } catch (error) {
    console.error("❌ Error saving group image URL:", error);
    return res.status(500).json({ message: "Failed to save group image" });
  }
};

export const generatePresignedUrlAdmin = async (req, res) => {

  const fileDetails = req.body;
  const { fileName, fileType, operation, section } = fileDetails;  // <-- include section

  const userId = req.userId;
    console.log('userId:', userId);

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

    const user1 = await usermodel.findById(userId);
       // if (!user1 || user1.useradmin !==10) { 
        //  return res.status(401).json({ message: 'User not found' });
       // }
         if (!user1) { 
          return res.status(401).json({ message: 'User not found' });
        }
  if (!['upload', 'edit'].includes(operation)) {
    return res.status(405).json({ message: 'Invalid operation' });
  }

   if (!["books", "groups"].includes(section)) {
    return res.status(406).json({ message: "Invalid section" });
  }

  const timestamp = Date.now();
  const key = `${section}/${timestamp}/${fileName}`;

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
    Expires: 300,
    ContentType: fileType
  };
  //check why when consolo log expries i see expires 300??
         console.log(' params', params);

  try {

    const signedUrl = await s3.getSignedUrlPromise('putObject', params);
    const fileUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`; 
              console.log(' signedUrl', signedUrl);
    return res.status(201).json({
      signedUrl,
      url: fileUrl,
      message: 'signedUrl + url',
    });
  } catch (err) {
    console.error('Error generating signed URL:', err);
    return res.status(500).json({ message: 'Error generating URL', error: err.message });
  }
};

export const deleteFromAmazonAndMongoAdmin = async (req, res) => {
  const fileDetails = req.body;
  const { key, operation } = fileDetails;  // <-- include section
  const userId = req.userId;
  
   if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

    const user1 = await usermodel.findById(userId);
        if (!user1 || user1.useradmin !==10) { 
          return res.status(404).json({ message: 'User not found' });
        }
        
   if (!key) {
    return res.status(400).json({ message: "S3 key is required" });
  }

  if (operation !== 'delete') {
    return res.status(400).json({ message: 'Invalid operation' });
  }

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
  };

  try {
    // Step 1: Delete from S3
    await s3.deleteObject(params).promise();
    

return res.status(200).json({
  message: 'File deleted successfully from S3 and MongoDB',
});

  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ message: 'Error processing request', error: err.message });
  }
};


export const generatePresignedUrlAdminBest = async (req, res) => {

  const fileDetails = req.body;
  const { fileName, fileType, operation } = fileDetails;

  const userId = req.userId;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  if (!['upload', 'edit'].includes(operation)) {
    return res.status(400).json({ message: 'Invalid operation' });
  }

  const timestamp = Date.now();
  const key = `recipes/main/AdminBest/${userId}/${timestamp}/${fileName}`;

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
    Expires: 300,
    ContentType: fileType
  };
  //check why when consolo log expries i see expires 300??

  try {

    const signedUrl = await s3.getSignedUrlPromise('putObject', params);
    const fileUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`; 
              console.log(' signedUrl', signedUrl);
    return res.status(201).json({
      signedUrl,
      url: fileUrl,
      message: 'signedUrl + url',
    });
  } catch (err) {
    console.error('Error generating signed URL:', err);
    return res.status(500).json({ message: 'Error generating URL', error: err.message });
  }
};

export const uploadmongoUrlAdminBest = async (req, res) => {
  try {
    const payload = req.body;
    const { url, savedItemID, mainimageValue, isFirst } = payload;
    const userId = req.userId;

    // 1️⃣ Check if user exists
    const user = await usermodel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2️⃣ Ensure savedItemID (book ID) is provided
    if (!savedItemID) {
      return res.status(400).json({ message: "savedItemID is required" });
    }

    // 3️⃣ Find the book
    const recipe = await recipeAdminModel.findById(savedItemID);
    if (!recipe) {
      return res.status(404).json({ message: "book not found" });
    }


    // 5️⃣ Check if the URL is already the book image
    if (recipe.image === url) {
      return res.status(200).json({
        message: "URL already exists for this book, no update needed",
      });
    }

    // 6️⃣ Update the book image
    recipe.image = url;
    await recipe.save();

    return res.status(200).json({
      url,
      recipe,
    });

  } catch (error) {
    console.error("❌ Error saving book image URL:", error);
    return res.status(500).json({ message: "Failed to save book image" });
  }
};