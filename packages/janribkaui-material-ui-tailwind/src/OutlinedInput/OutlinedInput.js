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
    '[&_.JrOutlinedInput-notchedOutline]:hover:border-text-primary',
    'hover-none:[&_.JrOutlinedInput-notchedOutline]:hover:border-[rgba(0, 0, 0, 0.23)]',
    'hover-none:[&_.JrOutlinedInput-notchedOutline]:dark:hover:border-[rgba(255, 255, 255, 0.23)]',
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
      true: ['px-[14px] py-[16.5px]'],
      false: [],
    },
    size: {
      small: [],
    },
    focused: {
      true: ['[&_.JrOutlinedInput-notchedOutline]:border-[2px]'],
      false: [],
    },
    color: {
      primary: [],
      secondary: [],
      error: [],
      info: [],
      success: [],
      warning: [],
    },
  },

  compoundVariants: [
    { multiline: true, size: 'small', className: ['px-[14px] py-[8.5px]'] },
    {
      focused: true,
      color: 'primary',
      className: [
        '[&_.JrOutlinedInput-notchedOutline]:border-primary',
        "[&_.JrOutlinedInput-notchedOutline]:hover:border-primary'",
      ],
    },
    {
      focused: true,
      color: 'secondary',
      className: [
        '[&_.JrOutlinedInput-notchedOutline]:border-secondary',
        "[&_.JrOutlinedInput-notchedOutline]:hover:border-secondary'",
      ],
    },
    {
      focused: true,
      color: 'error',
      className: [
        '[&_.JrOutlinedInput-notchedOutline]:border-error',
        "[&_.JrOutlinedInput-notchedOutline]:hover:border-error'",
      ],
    },
    {
      focused: true,
      color: 'info',
      className: [
        '[&_.JrOutlinedInput-notchedOutline]:border-info',
        "[&_.JrOutlinedInput-notchedOutline]:hover:border-info'",
      ],
    },
    {
      focused: true,
      color: 'success',
      className: [
        '[&_.JrOutlinedInput-notchedOutline]:border-success',
        "[&_.JrOutlinedInput-notchedOutline]:hover:border-success'",
      ],
    },
    {
      focused: true,
      color: 'warning',
      className: [
        '[&_.JrOutlinedInput-notchedOutline]:border-warning',
        "[&_.JrOutlinedInput-notchedOutline]:hover:border-warning'",
      ],
    },
  ],
  extend: inputBaseRootVariants,
});

const NotchedOutlineRoot = styled(NotchedOutline)``;

const notchedOutlineRootVariants = tv({
  base: [
    'border-[rgba(0,0,0,0.23)]',
    'dark:border-[rgba(255,255,255,0.23)]',
    'group-has-[input:checked]:border-[2px]',
  ],
  variants: {
    error: {
      true: ['bg-error'],
      false: [],
    },
  },
  disabled: {
    true: ['bg-action-disabled'],
    false: [],
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
      small: ['p-[14px] py-[8.5px]'],
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

  const outlinedInputRoot = React.useMemo(
    () => ({
      ...OutlinedInputRoot,
    }),
    [],
  );

  const outlinedInputRootVariantsFilled = outlinedInputRootVariants({
    startAdornment: props.startAdornment,
    endAdornment: props.endAdornment,
    multiline: props.multiline,
    size: props.size,
    fullWidth: props.fullWidth,
    color: fcs.color || 'primary',
    focused: fcs.focused,
  });

  outlinedInputRoot.className = mergeStyles(
    'JrOutlinedInput-root',
    outlinedInputRootVariantsFilled,
  );

  const outlinedInputInput = React.useMemo(
    () => ({
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
    }),
    [
      props.size,
      props.multiline,
      props.startAdornment,
      props.endAdornment,
      props.disableInjectingGlobalStyles,
      type,
    ],
  );

  const RootSlotProps =
    !!!slots.root && !!!components.Root ? { className: outlinedInputRoot.className } : undefined;
  const InputSlotProps =
    !!!slots.input && !!!components.Input ? { className: outlinedInputInput.className } : undefined;

  const RootSlot = slots.root ?? components.Root ?? outlinedInputRoot;
  const InputSlot = slots.input ?? components.Input ?? outlinedInputInput;
  // TODO: font-family: "Roboto", "Helvetica", "Arial", sans-serif; is missing here. Maybe it is enough to put it as a default font in tw config
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
            notchedOutlineRootVariants({
              error: fcs.error,
              disabled: fcs.disabled,
            }),
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
