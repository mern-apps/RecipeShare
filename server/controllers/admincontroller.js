
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import blockmodel from '../models/blockmodel.js';
import usermodel from '../models/usermodel.js';

export const getadminblockdata = async (req, res) => {
  try {
    let blockData = await blockmodel.findOne();

     if (!blockData) {
      // No block found → create a new one with default values
      blockData = new blockmodel({
        groups: false,
        find: false,
        match: false,
        user: false,
        homepage: false,
      });
      await blockData.save();
      console.log('Created new block data:', blockData);
    }

    return res.status(200).json({ blockData });
  } catch (error) {
    console.error('Error fetching block data:', error);
    res.status(500).json({ message: 'Error fetching block data' });
  }
};

export const adminblockdata = async (req, res) => {
  const userId = req.userId

  try {
      const user1 = await usermodel.findById(userId);
      if (!user1 || user1.useradmin !==10) { 
        return res.status(404).json({ message: 'User not found' });
      }
    let { groups, find, match, user, homepage } = req.body;

    await blockmodel.deleteMany({});

    const blockData = new blockmodel({ groups, find, match, user,homepage });
    await blockData.save();

    res.status(201).json({ blockData });
  } catch (error) {
    console.error('Error updating block data:', error);
    res.status(500).json({ message: 'Error updating block data' });
  }
};

