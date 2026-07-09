import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../../actions/userActions';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate


  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/');
  };

  return (
    <div>
      <Button
        onClick={handleLogout}
        variant="outlined" // Outline button style
        color="secondary"
        sx={{
      textTransform: 'none',
      fontWeight: 'bold',
      borderRadius: 3,
      border: '2px solid #D32F2F',
      px: 2,
      py: .8,
      fontSize: '1.15rem',
        background: 'linear-gradient(135deg, red ,pink )',
      color: '#fff',
      boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
      transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        transform: 'translateY(-1px)',
        boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
      },
      '&:active': {
        transform: 'translateY(0)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      },
    }}
      >
        התנתקות
      </Button>
    </div>
  );
}

export default Logout;
