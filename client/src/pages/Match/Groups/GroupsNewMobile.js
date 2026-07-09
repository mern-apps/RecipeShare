import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BlockPageGroupsMobile from '../../Components/Block/BlockPageGroupsMobile';
import { getallcodespage } from '../../actions/groupactions';


const categoriesList = ['sport', 'nature', 'culture', 'food'];

const GroupsNewMobile = () => {
  



  return (
    <Box sx={{ p: 2 }}>

    </Box>
  );
};

export default GroupsNewMobile;
