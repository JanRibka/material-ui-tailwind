import * as React from 'react';

import { OverridableStringUnion } from '@janribkaui/types';

import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface FormHelperTextPropsVariantOverrides {}

export interface FormHelperTextOwnProps {
  /**
   * The content of the component.
   *
   * If `' '` is provided, the component reserves one line height for displaying a future message.
   */
  children?: React.ReactNode;
  /**
   * If `true`, the helper text should be displayed in a disabled state.
   */
  disabled?: boolean;
  /**
   * If `true`, helper text should be displayed in an error state.
   */
  error?: boolean;
  /**
   * If `true`, the helper text should use filled classes key.
   */
  filled?: boolean;
  /**
   * If `true`, the helper text should use focused classes key.
   */
  focused?: boolean;
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin?: 'dense';
  /**
   * If `true`, the helper text should use required classes key.
   */
  required?: boolean;

  /**
   * The variant to use.
   */
  variant?: OverridableStringUnion<
    'standard' | 'outlined' | 'filled',
    FormHelperTextPropsVariantOverrides
  >;
}

export interface FormHelperTextTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'p',
> {
  props: AdditionalProps & FormHelperTextOwnProps;
  defaultComponent: RootComponent;
}
/**
 *
 * Demos:
 *
 * - [Text Field](https://mui.com/material-ui/react-text-field/)
 *
 * API:
 *
 * - [FormHelperText API](https://mui.com/material-ui/api/form-helper-text/)
 */
declare const FormHelperText: OverridableComponent<FormHelperTextTypeMap>;

export type FormHelperTextProps<
  RootComponent extends React.ElementType = FormHelperTextTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<FormHelperTextTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export default FormHelperText;
