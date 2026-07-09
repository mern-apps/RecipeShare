import projectmodel from '../models/projectmodel.js';
import recipemodel from '../models/recipemodel.js';
import usermodel from '../models/usermodel.js';

import mongoose from 'mongoose';


export const dashboardgetallpendingrecipes = async (req, res) => {
  try {
    const userId = req.userId

    res.status(200).json(pendingRecipes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const dashboardacceptpendingrecipe = async (req, res) => {

  try {
    const { itemid } = req.body;
    const userId = req.userId

    const user = await usermodel.findById(userId);
    if (!user) {
      res.status(401).json({ message: 'user not found' });
      return;
    }
    const userCodes = user.codes;

    const recipe = await recipemodel.findById(itemid);

       if (!recipe) {
        res.status(401).json({ message: 'Recipe not found' });
        return;
      }

      const x = recipe.pendingcodes.filter((code) => userCodes.includes(code));

      // Remove the filtered codes from recipe.pendingcodes
      recipe.pendingcodes = recipe.pendingcodes.filter((code) => !userCodes.includes(code));
    
      // Add the removed codes from x to recipe.codes
      recipe.codes.push(...x);

    
      await recipe.save();


    res.status(200).json(recipe);

  } catch (error) {
    console.error('Error updating recipe:', error); // Log any errors

    res.status(404).json({ message: error.message });
  }

};

export const dashboardrejectpendingrecipe = async (req, res) => {
  try {
    const { itemid } = req.body;
    const userId = req.userId

    const user = await usermodel.findById(userId);
    if (!user) {
      res.status(401).json({ message: 'user not found' });
      return;
    }
    const userCodes = user.codes;

    const recipe = await recipemodel.findById(itemid);

       if (!recipe) {
        res.status(401).json({ message: 'Recipe not found' });
        return;
      }
    
      recipe.pendingcodes = recipe.pendingcodes.filter((code) => !userCodes.includes(code));
      
      await recipe.save();

   
    res.status(200).json(recipe);

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};