import { ComponentType } from 'react';

import { DefaultTheme } from '@janribka/private-theming';
import styledEngineStyled, {
  internal_processStyles as processStyles,
} from '@janribka/styled-engine';
import capitalize from '@janribka/utils/capitalize';
import { isPlainObject } from '@janribka/utils/deepmerge';
import getDisplayName from '@janribka/utils/getDisplayName';

import createTheme from '../createTheme';
import { CreateJRStyled } from './createStyledProps';

function isEmpty(obj: object) {
  return Object.keys(obj).length === 0;
}

// https://github.com/emotion-js/emotion/blob/26ded6109fcd8ca9875cc2ce4564fee678a3f3c5/packages/styled/src/utils.js#L40
function isStringTag(tag: string | ComponentType<any>) {
  return (
    typeof tag === 'string' &&
    // 96 is one less than the char code
    // for "a" so this is checking that
    // it's a lowercase character
    tag.charCodeAt(0) > 96
  );
}

// Update /system/styled/#api in case if this changes
export function shouldForwardProp(prop: PropertyKey): boolean {
  return prop !== 'ownerState' && prop !== 'theme' && prop !== 'sx' && prop !== 'as';
}

export const systemDefaultTheme = createTheme();

const lowercaseFirstLetter = (string: string) => {
  if (!string) {
    return string;
  }
  return string.charAt(0).toLowerCase() + string.slice(1);
};

function resolveTheme({
  defaultTheme,
  theme,
  themeId,
}: {
  defaultTheme: any;
  theme: any;
  themeId: any;
}) {
  return isEmpty(theme) ? defaultTheme : theme[themeId] || theme;
}

function defaultOverridesResolver(slot: string) {
  if (!slot) {
    return null;
  }
  return (props: any, styles: any) => styles[slot];
}

function processStyleArg(
  callableStyle: any,
  {
    ownerState,
    ...props
  }: {
    [x: string]: any;
    ownerState: any;
  },
): any {
  const resolvedStylesArg =
    typeof callableStyle === 'function' ? callableStyle({ ownerState, ...props }) : callableStyle;

  if (Array.isArray(resolvedStylesArg)) {
    return resolvedStylesArg.flatMap((resolvedStyle) =>
      processStyleArg(resolvedStyle, { ownerState, ...props }),
    );
  }

  const mergedState = { ...props, ...ownerState, ownerState };

  if (
    !!resolvedStylesArg &&
    typeof resolvedStylesArg === 'object' &&
    Array.isArray(resolvedStylesArg.variants)
  ) {
    const { variants = [], ...otherStyles } = resolvedStylesArg;
    let result = otherStyles;
    variants.forEach((variant: any) => {
      let isMatch = true;
      if (typeof variant.props === 'function') {
        isMatch = variant.props(mergedState);
      } else {
        Object.keys(variant.props).forEach((key) => {
          if (ownerState?.[key] !== variant.props[key] && props[key] !== variant.props[key]) {
            isMatch = false;
          }
        });
      }
      if (isMatch) {
        if (!Array.isArray(result)) {
          result = [result];
        }
        result.push(
          typeof variant.style === 'function' ? variant.style(mergedState) : variant.style,
        );
      }
    });
    return result;
  }
  return resolvedStylesArg;
}

export default function createStyled<Theme extends object = DefaultTheme>(
  input: {
    themeId?: string;
    defaultTheme?: Theme;
    rootShouldForwardProp?: (prop: PropertyKey) => boolean;
    slotShouldForwardProp?: (prop: PropertyKey) => boolean;
    // styleFunctionSx?: typeof styleFunctionSx;
  } = {},
): CreateJRStyled<Theme> {
  const {
    themeId,
    defaultTheme = systemDefaultTheme,
    rootShouldForwardProp = shouldForwardProp,
    slotShouldForwardProp = shouldForwardProp,
  } = input;

  // const systemSx = (props) => {
  //   return styleFunctionSx({ ...props, theme: resolveTheme({ ...props, defaultTheme, themeId }) });
  // };
  // systemSx.__mui_systemSx = true;

  return ((tag: any, inputOptions: any) => {
    // Filter out the `sx` style function from the previous styled component to prevent unnecessary styles generated by the composite components.
    processStyles(tag, (styles) =>
      styles.filter((style: { __mui_systemSx?: any }) => !style?.__mui_systemSx),
    );

    const {
      name: componentName,
      slot: componentSlot,
      skipVariantsResolver: inputSkipVariantsResolver,
      // skipSx: inputSkipSx,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver = defaultOverridesResolver(lowercaseFirstLetter(componentSlot)),
      ...options
    } = inputOptions;

    // if skipVariantsResolver option is defined, take the value, otherwise, true for root and false for other slots.
    const skipVariantsResolver =
      inputSkipVariantsResolver !== undefined
        ? inputSkipVariantsResolver
        : // TODO v6: remove `Root` in the next major release
          // For more details: https://github.com/mui/material-ui/pull/37908
          (componentSlot && componentSlot !== 'Root' && componentSlot !== 'root') || false;

    // const skipSx = inputSkipSx || false;

    let label;

    if (process.env.NODE_ENV !== 'production') {
      if (componentName) {
        // TODO v6: remove `lowercaseFirstLetter()` in the next major release
        // For more details: https://github.com/mui/material-ui/pull/37908
        label = `${componentName}-${lowercaseFirstLetter(componentSlot || 'Root')}`;
      }
    }

    let shouldForwardPropOption: ((props: PropertyKey) => boolean) | undefined = shouldForwardProp;

    // TODO v6: remove `Root` in the next major release
    // For more details: https://github.com/mui/material-ui/pull/37908
    if (componentSlot === 'Root' || componentSlot === 'root') {
      shouldForwardPropOption = rootShouldForwardProp;
    } else if (componentSlot) {
      // any other slot specified
      shouldForwardPropOption = slotShouldForwardProp;
    } else if (isStringTag(tag)) {
      // for string (html) tag, preserve the behavior in emotion & styled-components.
      shouldForwardPropOption = undefined;
    }

    const defaultStyledResolver = styledEngineStyled(tag, {
      shouldForwardProp: shouldForwardPropOption,
      label,
      ...options,
    });

    const transformStyleArg = (stylesArg: any) => {
      // On the server Emotion doesn't use React.forwardRef for creating components, so the created
      // component stays as a function. This condition makes sure that we do not interpolate functions
      // which are basically components used as a selectors.
      if (
        (typeof stylesArg === 'function' && stylesArg.__emotion_real !== stylesArg) ||
        isPlainObject(stylesArg)
      ) {
        return (props: any) =>
          processStyleArg(stylesArg, {
            ...props,
            theme: resolveTheme({ theme: props.theme, defaultTheme, themeId }),
          });
      }
      return stylesArg;
    };
    const muiStyledResolver = (styleArg: any, ...expressions: any[]) => {
      let transformedStyleArg = transformStyleArg(styleArg);
      const expressionsWithDefaultTheme = expressions ? expressions.map(transformStyleArg) : [];

      if (componentName && overridesResolver) {
        expressionsWithDefaultTheme.push((props: any) => {
          const theme = resolveTheme({ ...props, defaultTheme, themeId });
          if (
            !theme.components ||
            !theme.components[componentName] ||
            !theme.components[componentName].styleOverrides
          ) {
            return null;
          }
          const styleOverrides = theme.components[componentName].styleOverrides;
          const resolvedStyleOverrides: { [key: string]: any } = {};
          // TODO: v7 remove iteration and use `resolveStyleArg(styleOverrides[slot])` directly
          Object.entries(styleOverrides).forEach(([slotKey, slotStyle]) => {
            resolvedStyleOverrides[slotKey] = processStyleArg(slotStyle, { ...props, theme });
          });
          return overridesResolver(props, resolvedStyleOverrides);
        });
      }

      if (componentName && !skipVariantsResolver) {
        expressionsWithDefaultTheme.push((props: any) => {
          const theme = resolveTheme({ ...props, defaultTheme, themeId });
          const themeVariants = theme?.components?.[componentName]?.variants;
          return processStyleArg({ variants: themeVariants }, { ...props, theme });
        });
      }

      // if (!skipSx) {
      //   expressionsWithDefaultTheme.push(systemSx);
      // }

      const numOfCustomFnsApplied = expressionsWithDefaultTheme.length - expressions.length;

      if (Array.isArray(styleArg) && numOfCustomFnsApplied > 0) {
        const placeholders = new Array(numOfCustomFnsApplied).fill('');
        // If the type is array, than we need to add placeholders in the template for the overrides, variants and the sx styles.
        transformedStyleArg = [...styleArg, ...placeholders];
        transformedStyleArg.raw = [...(styleArg as any).raw, ...placeholders];
      }
      const Component = defaultStyledResolver(transformedStyleArg, ...expressionsWithDefaultTheme);

      if (process.env.NODE_ENV !== 'production') {
        let displayName;
        if (componentName) {
          displayName = `${componentName}${capitalize(componentSlot || '')}`;
        }
        if (displayName === undefined) {
          displayName = `Styled(${getDisplayName(tag)})`;
        }
        Component.displayName = displayName;
      }

      if (tag.muiName) {
        (Component as any).muiName = tag.muiName;
      }

      return Component;
    };

    if ((defaultStyledResolver as any).withConfig) {
      muiStyledResolver.withConfig = (defaultStyledResolver as any).withConfig;
    }

    return muiStyledResolver;
  }) as CreateJRStyled<Theme>;
}
