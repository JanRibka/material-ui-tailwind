'use client';
import * as React from 'react';

// import styleFunctionSx from '@janribkaui/system/styleFunctionSx';
import { unstable_createCssVarsProvider as createCssVarsProvider } from '@janribkaui/system';

// import { defaultConfig } from '../InitColorSchemeScript/InitColorSchemeScript';
import createTheme from './createTheme';
import { SupportedColorScheme } from './createThemeWithVars';
import createTypography from './createTypography';
import THEME_ID from './identifier';

const {
  CssVarsProvider: InternalCssVarsProvider,
  useColorScheme,
  getInitColorSchemeScript: deprecatedGetInitColorSchemeScript,
} = createCssVarsProvider<SupportedColorScheme, typeof THEME_ID>({
  themeId: THEME_ID,
  // @ts-ignore ignore module augmentation tests
  theme: () => createTheme({ cssVariables: true }),
  colorSchemeStorageKey: '',
  modeStorageKey: '',
  defaultColorScheme: {
    light: 'light',
    dark: 'dark',
  },
  resolveTheme: (theme) => {
    const newTheme = {
      ...theme,
      typography: createTypography(theme.palette, theme.typography),
    };

    // newTheme.unstable_sx = function sx(props: SxProps<CssVarsTheme>) {
    //   return styleFunctionSx({ sx: props, theme: this });
    // };

    return newTheme;
  },
});

let warnedOnce = false;

// TODO: remove in v7
// eslint-disable-next-line @typescript-eslint/naming-convention
function Experimental_CssVarsProvider(props: any) {
  if (!warnedOnce) {
    console.warn(
      [
        'JR: The Experimental_CssVarsProvider component has been ported into ThemeProvider.',
        '',
        "You should use `import { ThemeProvider } from '@janribkaui/material-ui-tailwind/styles'` instead.",
        'For more details, check out https://mui.com/material-ui/customization/css-theme-variables/usage/',
      ].join('\n'),
    );

    warnedOnce = true;
  }

  return <InternalCssVarsProvider {...props} />;
}

let warnedInitScriptOnce = false;

// TODO: remove in v7
const getInitColorSchemeScript: typeof deprecatedGetInitColorSchemeScript = (params: any) => {
  if (!warnedInitScriptOnce) {
    console.warn(
      [
        'JR: The getInitColorSchemeScript function has been deprecated.',
        '',
        "You should use `import InitColorSchemeScript from '@janribkaui/material-ui-tailwind/InitColorSchemeScript'`",
        'and replace the function call with `<InitColorSchemeScript />` instead.',
      ].join('\n'),
    );

    warnedInitScriptOnce = true;
  }
  return deprecatedGetInitColorSchemeScript(params);
};

/**
 * TODO: remove this export in v7
 * @deprecated
 * The `CssVarsProvider` component has been deprecated and ported into `ThemeProvider`.
 *
 * You should use `ThemeProvider` and `createTheme` instead:
 *
 * ```diff
 * - import { CssVarsProvider, extendTheme } from '@janribkaui/material-ui-tailwind/styles';
 * + import { ThemeProvider, createTheme } from '@janribkaui/material-ui-tailwind/styles';
 *
 * - const theme = extendTheme();
 * + const theme = createTheme({
 * +   cssVariables: true,
 * +   colorSchemes: { light: true, dark: true },
 * + });
 *
 * - <CssVarsProvider theme={theme}>
 * + <ThemeProvider theme={theme}>
 * ```
 *
 * To see the full documentation, check out https://mui.com/material-ui/customization/css-theme-variables/usage/.
 */
export const CssVarsProvider = InternalCssVarsProvider;

export { useColorScheme, getInitColorSchemeScript, Experimental_CssVarsProvider };
