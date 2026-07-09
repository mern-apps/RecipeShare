import React from 'react';
import Typography from '@mui/material/Typography';

const Newrecipeitemdisplay = ({ task2,getTemplateImage }) => {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <img
        src={getTemplateImage(task2.image)}
        alt="task2"
        style={{
          width: '70%',  // 100% - 30% = 70% of the original size
          height: 'auto',
          display: 'block',
          margin: 'auto' // Center the image horizontally
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          width: '80%', // Adjust width if needed
        }}
      >
        <Typography
          variant="h3"
          style={{
            color: '#ffffff',
            fontFamily: 'Special Elite',
            fontSize: '6rem',
          }}
        >
          {task2.title}
        </Typography>
      </div>
    </div>
  );
};

export default Newrecipeitemdisplay;
