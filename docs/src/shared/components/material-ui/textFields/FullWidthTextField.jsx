import * as React from 'react';
// import Box from '@mui/material/Box';
import TextField from '@janribkaui/material-ui-tailwind/TextField';

export default function FullWidthTextField() {
  return (
    // <Box sx={{ width: 500, maxWidth: '100%' }}>
    <div className="w-500 max-w-full">
      <TextField fullWidth label="fullWidth" id="fullWidth" />
    </div>
    // </Box>
  );
}
