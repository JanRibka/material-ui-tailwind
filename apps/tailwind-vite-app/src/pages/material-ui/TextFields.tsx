import BasicTextFields from 'docs/src/shared/components/material-ui/textFields/BasicTextFields';
import ColorTextFields from 'docs/src/shared/components/material-ui/textFields/ColorTextFields';
import ComposedTextField from 'docs/src/shared/components/material-ui/textFields/ComposedTextField';

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
    </div>
  );
}
