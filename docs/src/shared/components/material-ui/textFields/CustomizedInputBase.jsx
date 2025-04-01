import * as React from 'react';
// import Paper from '@mui/material/Paper';
import InputBase from '@janribkaui/material-ui-tailwind/InputBase';
// import Divider from '@janribkaui/material-ui-tailwind/Divider';
import IconButton from '@janribkaui/material-ui-tailwind/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon from '@mui/icons-material/Search';
// import DirectionsIcon from '@mui/icons-material/Directions';
import { FaDirections, FaSearch } from 'react-icons/fa';
import { MdMenu } from 'react-icons/md';

export default function CustomizedInputBase() {
  return (
    // <Paper
    //   component="form"
    //   sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    // >
    <form className="px-1 py-0.5 flex items-center w-[400px] shadow-3 rounded">
      <IconButton className="p-2.5" aria-label="menu">
        <MdMenu />
      </IconButton>
      <InputBase
        className="ml-px flex-1"
        placeholder="Search Google Maps"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton type="button" className="p-2.5" aria-label="search">
        <FaSearch />
      </IconButton>
      {/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /> */}
      <IconButton color="primary" className="p-2.5" aria-label="directions">
        <FaDirections />
      </IconButton>
    </form>
    // </Paper>
  );
}
