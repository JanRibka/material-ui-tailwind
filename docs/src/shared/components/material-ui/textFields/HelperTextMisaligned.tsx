// import Box from '@mui/material/Box';
import TextField from '@janribkaui/material-ui-tailwind/TextField';

export default function HelperTextMisaligned() {
  return (
    // <Box sx={{ display: 'flex', alignItems: 'center', '& > :not(style)': { m: 1 } }}>
    <div className="flex items-center [&>:not(style)]:m-1">
      <TextField
        helperText="Please enter your name"
        id="demo-helper-text-misaligned"
        label="Name"
      />
      <TextField id="demo-helper-text-misaligned-no-helper" label="Name" />
    </div>
    // </Box>
  );
}
