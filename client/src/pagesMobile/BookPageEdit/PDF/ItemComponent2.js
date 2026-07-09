import React from 'react';
import Typography from '@mui/material/Typography';
import templatebook1 from '../../../pictures/templatebook1.jpg';
import templatebook2 from '../../../pictures/templatebook2.png';
import templatebook3 from '../../../pictures/templatebook3.png';
import templatebook4 from '../../../pictures/templatebook4.png';
import templatebook5 from '../../../pictures/templatebook5.png';

const ItemComponent2 = ({ task2 }) => {

  const renderImage = (task2) => {
      console.log('Task2 object:', task2);

    if (task2.image === "templatebook1") {
      return templatebook1;
  } else if (task2.image === "templatebook2") {
    return templatebook2;
  } 
    else if (task2.image === "templatebook3") {
    return templatebook3;
  } 
  else if (task2.image === "templatebook4") {
    return templatebook4;
  } 
  else if (task2.image === "templatebook5") {
    return templatebook5;
  } 
};


  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <img
        src={renderImage(task2)}
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

export default ItemComponent2;
