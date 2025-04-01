import TextField from '@janribkaui/material-ui-tailwind/TextField';

// const customTheme = (outerTheme: Theme) =>
//   createTheme({
//     palette: {
//       mode: outerTheme.palette.mode,
//     },
//     components: {
//       MuiTextField: {
//         styleOverrides: {
//           root: {
//             '--TextField-brandBorderColor': '#E0E3E7',
//             '--TextField-brandBorderHoverColor': '#B2BAC2',
//             '--TextField-brandBorderFocusedColor': '#6F7E8C',
//             '& label.Mui-focused': {
//               color: 'var(--TextField-brandBorderFocusedColor)',
//             },
//           },
//         },
//       },
//       MuiOutlinedInput: {
//         styleOverrides: {
//           notchedOutline: {
//             borderColor: 'var(--TextField-brandBorderColor)',
//           },
//           root: {
//             [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
//               borderColor: 'var(--TextField-brandBorderHoverColor)',
//             },
//             [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
//               borderColor: 'var(--TextField-brandBorderFocusedColor)',
//             },
//           },
//         },
//       },
//       MuiFilledInput: {
//         styleOverrides: {
//           root: {
//             '&::before, &::after': {
//               borderBottom: '2px solid var(--TextField-brandBorderColor)',
//             },
//             '&:hover:not(.Mui-disabled, .Mui-error):before': {
//               borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
//             },
//             '&.Mui-focused:after': {
//               borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
//             },
//           },
//         },
//       },
//       MuiInput: {
//         styleOverrides: {
//           root: {
//             '&::before': {
//               borderBottom: '2px solid var(--TextField-brandBorderColor)',
//             },
//             '&:hover:not(.Mui-disabled, .Mui-error):before': {
//               borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
//             },
//             '&.Mui-focused:after': {
//               borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
//             },
//           },
//         },
//       },
//     },
//   });

export default function CustomizedInputsStyleOverrides() {
  return (
    <div className="grid sm:grid-cols-[1fr 1fr 1fr] gap-0.5">
      <TextField label="Outlined" />
      <TextField label="Filled" variant="filled" />
      <TextField label="Standard" variant="standard" />
    </div>
  );
}
