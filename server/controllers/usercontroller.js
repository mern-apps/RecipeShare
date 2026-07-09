import usermodel from '../models/usermodel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import recipemodel from '../models/recipemodel.js';
import recipeAdminModel from '../models/recipeAdminModel.js';
import projectmodel from '../models/projectmodel.js';
import groupmodel from '../models/groupmodel.js';
dotenv.config();


const stripHtmlToPlainText = (html) => {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, "")  // remove all HTML tags
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean)
    .join("\n");
};

export const signin = async (req, res) => {

  const formData = req.body; 
  const { email, password } = formData;

  try {
  // await recipemodel.deleteMany({});
   // await recipeAdminModel.deleteMany({});
  //  await projectmodel.deleteMany({});
  //  await groupmodel.deleteMany({});
    //await usermodel.deleteMany({ email: { $ne: 'Omer-Admin@Admin.com' } });

      const user = await usermodel
  .findOne({ email })
  .select('+password')
  .populate('codes');


    
    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

      // Exclude password from the response
      //const { password: _, ...rest } = user.toObject();
      //const userWithoutPassword = { _id: user._id, ...rest };
      
   const token = jwt.sign({ _id: user._id, firstName: user.firstName }, process.env.JWT_SECRET, { expiresIn: '1h' });

    if (user.cookie === 1) {
            console.log('cookie sent:');
      res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax' });
      return res.status(200).json({ user });
      
    } else {
      // If cookie is not 1, just send user data without the cookie
      return res.status(200).json({
        token,
        user
      });
    }
    } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

   
export const signup = async (req, res) => {

  const updatedFormData = req.body; 
  const { firstName,lastName, email, password,cookie } = updatedFormData;

  try {

    let useremailverify = await usermodel.findOne({ email });
    if (useremailverify) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const useradmin = email === 'Omer-Admin@Admin.com' ? 10 : 1;
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create the user

    const user = await usermodel.create({
      firstName,
      lastName,
      email,
      useradmin,
      password: hashedPassword,
      cookie,
    });

    // Create the token
    const token = jwt.sign({ _id: user._id, firstName: user.firstName}, process.env.JWT_SECRET, { expiresIn: '1h' });
  
    if (user.cookie === 1) {
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
        path: '/', 
      });


      return res.status(200).json({ user });

    } else {
      // If cookie is not 1, just send user data without the cookie
      return res.status(200).json({ token, user });

    }
 } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


export const signinbyid = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: User ID mismatch' });
    }

    const updateduser = await usermodel
    .findById(userId)
    .populate('codes');

    
    if (!updateduser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ updateduser });

  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const logout = async (req, res) => {
  try {
   
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      path: '/',
    });

    res.status(200).json({ message: 'Logged out successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const cookieedit = async (req, res) => {
  try {
    const userId = req.userId
    const { cookieState } = req.body;

    if (!userId) {
      return res.status(401).json({ message: 'No user ID found in the token' });
    }

    const user = await usermodel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    } 

  
    const token = jwt.sign({ _id: user._id, firstName: user.firstName}, process.env.JWT_SECRET, { expiresIn: '1h' });

  if (cookieState === 1) {
    res.cookie('token', token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'strict' 
    });
  } else {
    res.clearCookie('token', { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'strict' 
    });
  }

    user.cookie = cookieState;
    await user.save();


    return res.status(200).json({ message: 'Cookie preference updated', updatedcookie: user.cookie });

  } catch (error) {
    console.error('Error in cookieedit:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};



  export const saveprofiledata = async (req, res) => {
    const profileData = req.body;
    const userId = req.userId
          console.log('userId:', userId);
      console.log('profileData:', profileData);

    try {
    
        const updatedUser = await usermodel.findById(userId);
      console.log('updatedUser:', updatedUser);

            // If url is valid (not null and not "new"), move it to the start of images array
            //It is for Edit images only in case the user delete image and add the same one.// need to check if it relevant if the URL is now uniqe
    if (profileData.url && profileData.url !== 'new') {
      const imageIndex = updatedUser.images.indexOf(profileData.url);

      if (imageIndex > -1) {
        // Remove it from its current position
        updatedUser.images.splice(imageIndex, 1);
        // Add it to the start
        updatedUser.images.unshift(profileData.url);
      }
    }
        
      await updatedUser.save();
    res.status(200).json({ updatedUser });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };