import FilledInput from '@janribkaui/material-ui-tailwind/FilledInput';
import FormControl from '@janribkaui/material-ui-tailwind/FormControl';
import FormHelperText from '@janribkaui/material-ui-tailwind/FormHelperText';
import Input from '@janribkaui/material-ui-tailwind/Input';
import InputLabel from '@janribkaui/material-ui-tailwind/InputLabel';
import OutlinedInput from '@janribkaui/material-ui-tailwind/OutlinedInput';

export default function ComposedTextField() {
  return (
    <form className="[&>:not(style)]:m-2" noValidate autoComplete="off">
      <FormControl variant="standard">
        <InputLabel htmlFor="component-simple">Name</InputLabel>
        <Input id="component-simple" defaultValue="Composed TextField" />
      </FormControl>
      <FormControl variant="standard">
        <InputLabel htmlFor="component-helper">Name</InputLabel>
        <Input
          id="component-helper"
          defaultValue="Composed TextField"
          aria-describedby="component-helper-text"
        />
        <FormHelperText id="component-helper-text">Some important helper text</FormHelperText>
      </FormControl>
      <FormControl disabled variant="standard">
        <InputLabel htmlFor="component-disabled">Name</InputLabel>
        <Input id="component-disabled" defaultValue="Composed TextField" />
        <FormHelperText>Disabled</FormHelperText>
      </FormControl>
      <FormControl error variant="standard">
        <InputLabel htmlFor="component-error">Name</InputLabel>
        <Input
          id="component-error"
          defaultValue="Composed TextField"
          aria-describedby="component-error-text"
        />
        <FormHelperText id="component-error-text">Error</FormHelperText>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="component-outlined">Name</InputLabel>
        <OutlinedInput id="component-outlined" defaultValue="Composed TextField" label="Name" />
      </FormControl>
      <FormControl variant="filled">
        <InputLabel htmlFor="component-filled">Name</InputLabel>
        <FilledInput id="component-filled" defaultValue="Composed TextField" />
      </FormControl>
    </form>
  );
}
