import TextField from '@janribkaui/material-ui-tailwind/TextField';

export default function BasicTextFields() {
  return (
    <>
      <form className="[&>:not(style)]:m-1 [&>:not(style)]:w-[25ch]" noValidate autoComplete="off">
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        <TextField id="filled-basic" label="Filled" variant="filled" />
        <TextField id="standard-basic" label="Standard" variant="standard" />
      </form>
    </>
  );
}
