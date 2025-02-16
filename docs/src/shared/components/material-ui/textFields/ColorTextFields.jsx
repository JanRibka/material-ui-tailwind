import TextField from '@janribkaui/material-ui-tailwind/TextField';

export default function ColorTextFields() {
  return (
    <form className="[&>:not(style)]:m-2 [&>:not(style)]:w-[25ch]" noValidate autoComplete="off">
      <TextField label="Outlined secondary" color="secondary" focused />
      <TextField label="Filled success" variant="filled" color="success" focused />
      <TextField label="Standard warning" variant="standard" color="warning" focused />
    </form>
  );
}
