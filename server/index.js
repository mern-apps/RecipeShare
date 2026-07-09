import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// Import routes

import presignedUrlRoutes from './routes/presignedUrlRoutes.js';
import presignedUrlRoutescookie from './routes/presignedUrlRoutescookie.js';

import userRoutes from './routes/userRoutes.js';
import userRoutescookie from './routes/userRoutescookie.js';

import adminRoutes from './routes/adminRoutes.js';
import adminRoutescookie from './routes/adminRoutescookie.js';


import allrecipespageRoutes from './routes/allrecipespageRoutes.js';
import allrecipespageRoutescookie from './routes/allrecipespageRoutescookie.js';

import recipesRoutes from './routes/recipesRoutes.js';
import recipesRoutescookie from './routes/recipesRoutescookie.js';

import projectsRoutes from './routes/projectsRoutes.js';
import projectsRoutescookie from './routes/projectsRoutescookie.js';

import groupsRoutes from './routes/groupsRoutes.js';
import groupsRoutescookie from './routes/groupsRoutescookie.js';

import grouppageRoutes from './routes/grouppageRoutes.js';
import grouppageRoutescookie from './routes/grouppageRoutescookie.js';


dotenv.config();
console.log("🔍 MONGODB_URI =", process.env.MONGODB_URI);

const app = express();
const port = process.env.PORT || 5000; 


app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cookieParser());
//app.use(cors());

const allowedOrigins = process.env.NODE_ENV === 'production'
  ? ['http://localhost:3000'] // replace with 'https://logicmatching.com', 'https://www.logicmatching.com' - your actual frontend URLs
  : ['http://localhost:3000'];

const corsOptions = {
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));


app.use('/user', userRoutes);
app.use('/usercookie', userRoutescookie);

app.use('/admin', adminRoutes);
app.use('/admincookie', adminRoutescookie);

app.use('/presigned-url', presignedUrlRoutes);
app.use('/presigned-urlcookie', presignedUrlRoutescookie);

app.use('/recipes', recipesRoutes);
app.use('/recipescookie', recipesRoutescookie);

app.use('/allrecipespage', allrecipespageRoutes);
app.use('/allrecipespagecookie', allrecipespageRoutescookie);

app.use('/projects', projectsRoutes);
app.use('/projectscookie', projectsRoutescookie);

app.use('/groups', groupsRoutes);
app.use('/groupscookie', groupsRoutescookie);

app.use('/grouppage', grouppageRoutes);
app.use('/grouppagecookie', grouppageRoutescookie);



const connection_url = process.env.MONGODB_URI;
//console.log(`MongoDB URI: ${connection_url}`);

//mongoose.connect(connection_url, {
 // useUnifiedTopology: true,
//})
mongoose.connect(connection_url)

  .then(() => {
        console.log("✅ MongoDB connected successfully");
    //consider to remove 0000 if error
   app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
  })
  .catch((error) => {
    console.error(`Error connecting to MongoDB: ${error.message}`);
  });

