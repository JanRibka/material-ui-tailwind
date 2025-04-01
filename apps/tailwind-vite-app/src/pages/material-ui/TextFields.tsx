import BasicTextFields from 'docs/src/shared/components/material-ui/textFields/BasicTextFields';
import ColorTextFields from 'docs/src/shared/components/material-ui/textFields/ColorTextFields';
import ComposedTextField from 'docs/src/shared/components/material-ui/textFields/ComposedTextField';
import CustomizedInputBase from 'docs/src/shared/components/material-ui/textFields/CustomizedInputBase';
import FormattedInputs from 'docs/src/shared/components/material-ui/textFields/FormattedInputs';
import FormPropsTextFields from 'docs/src/shared/components/material-ui/textFields/FormPropsTextFields';
import FullWidthTextField from 'docs/src/shared/components/material-ui/textFields/FullWidthTextField';
import HelperTextAligned from 'docs/src/shared/components/material-ui/textFields/HelperTextAligned';
import HelperTextMisaligned from 'docs/src/shared/components/material-ui/textFields/HelperTextMisaligned';

// import CustomizedInputsStyleOverrides from 'docs/src/shared/components/material-ui/textFields/CustomizedInputsStyleOverrides';

export default function TextFields() {
  return (
    <div>
      <h1>TextFields</h1>
      <section>
        <h2>Basic Text Fields</h2>
        <div className="demo-container">
          <BasicTextFields />
        </div>
      </section>
      <section>
        <h2> Color Text Fields</h2>
        <div className="demo-container">
          <ColorTextFields />
        </div>
      </section>
      <section>
        <h2> Composed Text Field</h2>
        <div className="demo-container">
          <ComposedTextField />
        </div>
      </section>
      <section>
        <h2> Customized Input Base</h2>
        <div className="demo-container">
          <CustomizedInputBase />
        </div>
      </section>
      {/* <section>
        <h2> Customized Inputs Style Overrides</h2>
        <div className="demo-container">
          <CustomizedInputsStyleOverrides />
        </div>
      </section>*/}
      <section>
        <h2> Form Props Text Fields</h2>
        <div className="demo-container">
          <FormPropsTextFields />
        </div>
      </section>
      <section>
        <h2> Formatted Inputs</h2>
        <div className="demo-container">
          <FormattedInputs />
        </div>
      </section>
      <section>
        <h2> Full Width Text Field</h2>
        <div className="demo-container">
          <FullWidthTextField />
        </div>
      </section>
      <section>
        <h2> Helper Text Aligned</h2>
        <div className="demo-container">
          <HelperTextAligned />
        </div>
      </section>
      <section>
        <h2> Helper Text Misaligned</h2>
        <div className="demo-container">
          <HelperTextMisaligned />
        </div>
      </section>
    </div>
  );
}
