'use client';
import * as React from 'react';
import { alpha } from '@mui/system/colorManipulator';
import { styled, useTheme } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import getOverlayAlpha from '../styles/getOverlayAlpha';
import { styled } from 'styled-components';
import { tv } from 'tailwind-variants';

// Styles
const PaperRoot = styled(div)``;

const paperRootVariants = tv({
  base: ['bg-background-paper', 'text-text-primary', 'transition-box-shadow'],
  variants: {
    square: {
      true: [''],
      false: ['rounded'],
    },
  },
});

const Paper = React.forwardRef(function Paper(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiPaper' });
  const theme = useTheme();

  const {
    className,
    component = 'div',
    elevation = 1,
    square = false,
    variant = 'elevation',
    ...other
  } = props;

  const ownerState = {
    ...props,
    component,
    elevation,
    square,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  if (process.env.NODE_ENV !== 'production') {
    if (theme.shadows[elevation] === undefined) {
      console.error(
        [
          `MUI: The elevation provided <Paper elevation={${elevation}}> is not available in the theme.`,
          `Please make sure that \`theme.shadows[${elevation}]\` is defined.`,
        ].join('\n'),
      );
    }
  }

  return (
    <PaperRoot
      as={component}
      ownerState={ownerState}
      className={clsx(classes.root, className, 'rounded')}
      ref={ref}
      {...other}
      style={{
        ...(variant === 'elevation' && {
          '--Paper-shadow': (theme.vars || theme).shadows[elevation],
          ...(theme.vars && {
            '--Paper-overlay': theme.vars.overlays?.[elevation],
          }),
          ...(!theme.vars &&
            theme.palette.mode === 'dark' && {
              '--Paper-overlay': `linear-gradient(${alpha(
                '#fff',
                getOverlayAlpha(elevation),
              )}, ${alpha('#fff', getOverlayAlpha(elevation))})`,
            }),
        }),
        ...other.style,
      }}
    />
  );
});

export default Paper;
