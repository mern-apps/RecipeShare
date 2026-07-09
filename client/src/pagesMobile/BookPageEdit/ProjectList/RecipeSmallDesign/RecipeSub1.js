import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from '@mui/material';

const RecipeSub1 = ({ task }) => {
  if (!task) return null;

  return (
    <Card
      sx={{
        width: 160,
        height: 170,
        borderRadius: 1.5,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 2,
        transition: '0.3s',
        direction: 'rtl',
        cursor: 'pointer',
        overflow: 'hidden',

        '&:hover': {
          boxShadow: 4,
          transform: 'translateY(-1px) scale(1.02)',
        },
      }}
    >
      {/* IMAGE */}
      <CardMedia
        component="img"
        height="90" // 50%
        image={task.image}
        alt={task.title}
        sx={{
          objectFit: 'cover',
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
        }}
      />

      {/* CONTENT */}
      <CardContent
        sx={{
          flexGrow: 1,
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          alignItems: 'center',
          p: 1,
          '&:last-child': {
            pb: 1,
          },
        }}
      >
        {/* TITLE + AUTHOR */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{
              textAlign: 'right',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              direction: 'rtl',
              width: '100%',
              fontSize: '1.2rem', // 50%
              lineHeight: 1.2,
            }}
          >
            {task.title}
          </Typography>

          {task.author && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                textAlign: 'right',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                direction: 'rtl',
                width: '100%',
                fontSize: '1rem',
                lineHeight: 1.2,
              }}
            >
              {task.author}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default RecipeSub1;