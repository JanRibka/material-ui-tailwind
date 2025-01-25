'use client';
import * as React from 'react';
import NotchedOutline from './NotchedOutline';
import useFormControl from '../FormControl/useFormControl';
import formControlState from '../FormControl/formControlState';
import { styled } from 'styled-components';
import { useDefaultProps } from '../DefaultPropsProvider';
import InputBase, {
  InputBaseRootBase,
  inputBaseRootVariants,
  InputBaseInputBase,
  inputBaseInputVariants,
} from '../InputBase/InputBase';
import { tv } from 'tailwind-variants';
import { mergeStyles } from '../utils';

const OutlinedInputRoot = styled(InputBaseRootBase)``;

const outlinedInputRootVariants = tv({
  base: [
    'relative',
    'rounded-borderRadius',
    'hover:[.MuiOutlinedInput-notchedOutline]:bg-text-primary',
    "hover-none:hover:[.MuiOutlinedInput-notchedOutline]:bg-['rgba(0, 0, 0, 0.23)']",
    "dark:hover-none:hover:[.MuiOutlinedInput-notchedOutline]:bg-['rgba(255, 255, 255, 0.23)']",
  ],
  variants: {
    startAdornment: {
      true: ['pl-[14px]'],
      false: [],
    },
    endAdornment: {
      true: ['pr-[14px]'],
      false: [],
    },
    multiline: {
      true: ['p-[16.5px 14px]'],
      false: [],
    },
    size: {
      small: [],
    },
  },
  compoundVariants: [{ multiline: true, size: 'small', className: ['p-[8.5px 14px]'] }],
  extend: inputBaseRootVariants,
});

const NotchedOutlineRoot = styled(NotchedOutline)``;

const notchedOutlineRootVariants = tv({
  base: [
    'bg-[rgba(0, 0, 0, 0.23)]',
    'dark:bg-rgba(255, 255, 255, 0.23)',
    'group-has-[input:checked]:border-[2px]',
    'has-[input:disabled]:bg-action-disabled',
  ],
  variants: {
    color: {
      primary: ['group-has-[input:focused]:bg-primary'],
      secondary: ['group-has-[input:focused]:bg-secondary'],
      error: ['group-has-[input:focused]:bg-error'],
      info: ['group-has-[input:focused]:bg-info'],
      success: ['group-has-[input:focused]:bg-success'],
      warning: ['group-has-[input:focused]:bg-warning'],
    },
    error: {
      true: ['bg-error'],
      false: [],
    },
  },
});

const OutlinedInputInput = styled(InputBaseInputBase)``;

const outlinedInputInputVariants = tv({
  base: [
    'px-[14px]',
    'py-[16.5px]',
    'autofill:rounded-t-[inherit]',
    'dark:[&:autofill]:shadow-[0_0_0_100px_#266798_inset]',
    'dark:[&:autofill]:text-white',
    'dark:[&:autofill]:caret-white',
  ],
  variants: {
    size: {
      small: ['p-[8.5px 14px]'],
    },
    multiline: {
      true: ['p-0'],
      false: [],
    },
    startAdornment: {
      true: ['pl-0'],
      false: [],
    },
    endAdornment: {
      true: ['pr-0'],
      false: [],
    },
  },
  extend: inputBaseInputVariants,
});

const OutlinedInput = React.forwardRef(function OutlinedInput(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'JrOutlinedInput' });
  const {
    components = {},
    fullWidth = false,
    inputComponent = 'input',
    label,
    multiline = false,
    notched,
    slots = {},
    type = 'text',
    ...other
  } = props;

  const jrFormControl = useFormControl();
  const fcs = formControlState({
    props,
    jrFormControl,
    states: ['color', 'disabled', 'error', 'focused', 'hiddenLabel', 'size', 'required'],
  });

  const outlinedInputInput = {
    ...OutlinedInputInput,
    className: mergeStyles(
      'JrOutlinedInput-input',
      outlinedInputInputVariants({
        size: props.size,
        multiline: props.multiline,
        startAdornment: props.startAdornment,
        endAdornment: props.endAdornment,
        disableInjectingGlobalStyles: props.disableInjectingGlobalStyles,
        type,
      }),
    ),
  };

  const outlinedInputRoot = {
    ...OutlinedInputRoot,
    className: mergeStyles(
      'JrOutlinedInput-root',
      outlinedInputRootVariants({
        startAdornment: props.startAdornment,
        endAdornment: props.endAdornment,
        multiline: props.multiline,
        size: props.size,
        fullWidth: props.fullWidth,
      }),
    ),
  };

  const RootSlot = slots.root ?? components.Root ?? outlinedInputRoot;
  const InputSlot = slots.input ?? components.Input ?? outlinedInputInput;

  const RootSlotProps =
    !!!slots.root && !!!components.Root ? { className: outlinedInputRoot.className } : undefined;
  const InputSlotProps =
    !!!slots.input && !!!components.Input ? { className: outlinedInputInput.className } : undefined;

  return (
    <InputBase
      slots={{ root: RootSlot, input: InputSlot }}
      slotProps={{
        root: RootSlotProps,
        input: InputSlotProps,
      }}
      renderSuffix={(state) => (
        <NotchedOutlineRoot
          className={mergeStyles(
            'JrOutlinedInput-notchedOutline',
            notchedOutlineRootVariants({ color: fcs.color || 'primary', error: fcs.error }),
          )}
          label={
            label != null && label !== '' && fcs.required ? (
              <React.Fragment>
                {label}
                &thinsp;{'*'}
              </React.Fragment>
            ) : (
              label
            )
          }
          notched={
            typeof notched !== 'undefined'
              ? notched
              : Boolean(state.startAdornment || state.filled || state.focused)
          }
        />
      )}
      fullWidth={fullWidth}
      inputComponent={inputComponent}
      multiline={multiline}
      ref={ref}
      type={type}
      {...other}
    />
  );
});

if (OutlinedInput) {
  OutlinedInput.jrName = 'Input';
}

export default OutlinedInput;
