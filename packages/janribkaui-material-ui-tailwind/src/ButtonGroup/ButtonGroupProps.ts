import * as React from 'react';

import { OverridableStringUnion } from '@janribkaui/types';

import { OverrideProps } from '../OverridableComponent';

export interface ButtonGroupPropsColorOverrides {}
export interface ButtonGroupPropsVariantOverrides {}
export interface ButtonGroupPropsSizeOverrides {}

export interface ButtonGroupOwnProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  //   /**
  //    * Override or extend the styles applied to the component.
  //    */
  //   classes?: Partial<ButtonGroupClasses>;
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color?: OverridableStringUnion<
    'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
    ButtonGroupPropsColorOverrides
  >;
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, no elevation is used.
   * @default false
   */
  disableElevation?: boolean;
  /**
   * If `true`, the button keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple?: boolean;
  /**
   * If `true`, the button ripple effect is disabled.
   * @default false
   */
  disableRipple?: boolean;
  /**
   * If `true`, the buttons will take up the full width of its container.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation?: 'vertical' | 'horizontal';
  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size?: OverridableStringUnion<'small' | 'medium' | 'large', ButtonGroupPropsSizeOverrides>;
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant?: OverridableStringUnion<
    'text' | 'outlined' | 'contained',
    ButtonGroupPropsVariantOverrides
  >;
}

export interface ButtonGroupTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps & ButtonGroupOwnProps;
  defaultComponent: RootComponent;
}

export type ButtonGroupProps<
  RootComponent extends React.ElementType = ButtonGroupTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<ButtonGroupTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};
