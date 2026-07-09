import React, { useEffect } from 'react';
import { Grid, Button, Typography,Box } from '@mui/material';
import GroupsList1 from './GroupsList1'; 

const Headergroup = ({ 
    items, 
    currentpage, 
    countallgroups, 
    handleForwardClick, 
    handleBackClick, 
  }) => {


    useEffect(() => {
    }, []);

    if (!items || items.length === 0) {
        return null; // Return null to render nothing if the condition fails
      }

  return (
    <Box>
      {/* PAGINATION */}
      {countallgroups > 12 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
            mb: 2,
            px: 1,
          }}
        >
          <Button
            disabled={currentpage <= 1}
            onClick={handleBackClick}
            size="small"
          >
            הקודם
          </Button>

          <Typography sx={{ fontSize: 12, textAlign: "center" }}>
            {((currentpage - 1) * 12) + 1} -{" "}
            {((currentpage - 1) * 12) + items.length} מתוך {countallgroups}
          </Typography>

          <Button
            disabled={currentpage * 12 >= countallgroups}
            onClick={handleForwardClick}
            size="small"
          >
            הבא
          </Button>
        </Box>
      )}

      {/* LIST */}
      <GroupsList1 items={items} />
    </Box>
  );
};

export default Headergroup;

