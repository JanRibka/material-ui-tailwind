import * as React from 'react';

import { OverridableStringUnion } from '@janribkaui/types';

import { ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { OverrideProps } from '../OverridableComponent';

export interface IconButtonPropsColorOverrides {}

export interface IconButtonPropsSizeOverrides {}

export interface IconButtonOwnProps {
  /**
   * The icon to display.
   */
  children?: React.ReactNode;
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'default'
   */
  color?: OverridableStringUnion<
    'inherit' | 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
    IconButtonPropsColorOverrides
  >;
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple?: boolean;
  /**
   * If given, uses a negative margin to counteract the padding on one
   * side (this is often helpful for aligning the left or right
   * side of the icon with content above or below, without ruining the border
   * size and shape).
   * @default false
   */
  edge?: 'start' | 'end' | false;
  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size?: OverridableStringUnion<'small' | 'medium' | 'large', IconButtonPropsSizeOverrides>;
}

export type IconButtonTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'button',
> = ExtendButtonBaseTypeMap<{
  props: AdditionalProps & IconButtonOwnProps;
  defaultComponent: RootComponent;
}>;

/**
 * Refer to the [Icons](https://mui.com/material-ui/icons/) section of the documentation
 * regarding the available icon options.
 *
 * Demos:
 *
 * - [Button](https://mui.com/material-ui/react-button/)
 *
 * API:
 *
 * - [IconButton API](https://mui.com/material-ui/api/icon-button/)
 * - inherits [ButtonBase API](https://mui.com/material-ui/api/button-base/)
 */
declare const IconButton: ExtendButtonBase<IconButtonTypeMap>;

export type IconButtonProps<
  RootComponent extends React.ElementType = IconButtonTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<IconButtonTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export default IconButton;
