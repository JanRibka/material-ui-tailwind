import { Theme as SystemTheme, ThemeOptions as SystemThemeOptions } from '@janribkaui/system';

import { Components } from './components';
// import { Mixins, MixinsOptions } from './createMixins';
import { Palette, PaletteOptions } from './createPaletteOld';
import { ColorSystemOptions, CssVarsPalette, CssVarsTheme } from './createThemeWithVars';
import { Transitions, TransitionsOptions } from './createTransitionsOld';
import { Typography, TypographyOptions } from './createTypography';

// import { Shadows } from './shadows';
// import { ZIndex, ZIndexOptions } from './zIndex';

/**
 * To disable custom properties, use module augmentation
 *
 * @example
 * declare module '@janribkaui/material-ui-tailwind/styles' {
 *   interface CssThemeVariables {
 *     enabled: true;
 *   }
 * }
 */
export interface CssThemeVariables {}

type CssVarsOptions = CssThemeVariables extends {
  enabled: true;
}
  ? ColorSystemOptions
  : {};

export interface ThemeOptions extends Omit<SystemThemeOptions, 'zIndex'>, CssVarsOptions {
  // mixins?: MixinsOptions;
  components?: Components<Omit<Theme, 'components'>>;
  palette?: PaletteOptions;
  // shadows?: Shadows;
  transitions?: TransitionsOptions;
  typography?: TypographyOptions | ((palette: Palette) => TypographyOptions);
  // zIndex?: ZIndexOptions;
  unstable_strictMode?: boolean;
  // unstable_sxConfig?: SxConfig;
}

interface BaseTheme extends SystemTheme {
  // mixins: Mixins;
  palette: Palette & (CssThemeVariables extends { enabled: true } ? CssVarsPalette : {});
  // shadows: Shadows;
  transitions: Transitions;
  typography: Typography;
  // zIndex: ZIndex;
  unstable_strictMode?: boolean;
}

// shut off automatic exporting for the `BaseTheme` above
export {};

type CssVarsProperties = CssThemeVariables extends { enabled: true }
  ? Pick<
      CssVarsTheme,
      | 'applyStyles'
      | 'colorSchemes'
      | 'colorSchemeSelector'
      | 'cssVarPrefix'
      | 'defaultColorScheme'
      | 'getCssVar'
      | 'getColorSchemeSelector'
      | 'generateThemeVars'
      | 'generateStyleSheets'
      // | 'generateSpacing'
      | 'shouldSkipGeneratingVar'
      | 'vars'
    >
  : {};

/**
 * Our [TypeScript guide on theme customization](https://mui.com/material-ui/guides/typescript/#customization-of-theme) explains in detail how you would add custom properties.
 */
export interface Theme extends BaseTheme, CssVarsProperties {
  cssVariables?: false;
  components?: Components<BaseTheme>;
  // unstable_sx: (props: SxProps<Theme>) => CSSObject;
  // unstable_sxConfig: SxConfig;
}

/**
 * @deprecated
 * Use `import { createTheme } from '@janribkaui/material-ui-tailwind/styles'` instead.
 */
export function createJRTheme(options?: ThemeOptions, ...args: object[]): Theme;

/**
 * Generate a theme base on the options received.
 * @param options Takes an incomplete theme object and adds the missing parts.
 * @param args Deep merge the arguments with the about to be returned theme.
 * @returns A complete, ready-to-use theme object.
 */
export default function createThemeNoVars(options?: ThemeOptions, ...args: object[]): Theme;