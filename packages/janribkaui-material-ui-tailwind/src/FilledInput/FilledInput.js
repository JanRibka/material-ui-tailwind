'use client';
import * as React from 'react';
import deepmerge from '@janribkaui/utils/deepmerge';
import { styled } from 'styled-components';
import { useDefaultProps } from '../DefaultPropsProvider';
import InputBase, {
  InputBaseRootBase,
  inputBaseRootVariants,
  InputBaseInputBase,
  inputBaseInputVariants,
} from '../InputBase/InputBase';
import { mergeStyles } from '../utils';
import { tv } from 'tailwind-variants';
import useFormControl from '../FormControl/useFormControl';
import formControlState from '../FormControl/formControlState';

const FilledInputRoot = styled(InputBaseRootBase)`
  &::before {
    content: '\u00a0'; // Tailwind CSS does not support space content
  }
`;

const filledInputRootVariants = tv({
  base: [
    'relative',
    'bg-filledInput-bg dark:bg-filledInput-bg',
    'rounded-tl-borderRadius',
    'rounded-tr-borderRadius',
    ' transition-background-color duration-shorter ease-out',
    'hover:bg-filledInput-hoverBg hover:hover-none:bg-filledInput-bg',
    'has-[input:disabled]:bg-filledInput-disabledBg',
  ],
  variants: {
    disableUnderline: {
      true: [],
      false: [
        'after:left-0',
        'after:bottom-0',
        'after:content-[""]',
        'after:absolute',
        'after:right-0',
        'after:scale-x-0',
        'after:transition-transform after:duration-shorter after:ease-out',
        'after:pointer-events-none',
        'before:border-b-[1px] before:border-solid before:border-b-[rgba(0,0,0,0.42)] before:dark:border-b-[rgba(255,255,255,0.7)]',
        'before:left-0',
        'before:bottom-0',
        'before:absolute',
        'before:right-0',
        'before:transition-border-bottom-color before:duration-shorter',
        'before:pointer-events-none',
        'has-[input:disabled]:hover:before:border-b-[1px] has-[input:disabled]:hover:before:border-solid has-[input:disabled]:hover:before:border-b-text-primary',
        'has-[input:disabled]:before:border-dotted',
      ],
    },
    error: {
      true: [],
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
    startAdornment: {
      true: 'pl-[12px]',
      false: '',
    },
    endAdornment: {
      true: 'pr-[12px]',
      false: '',
    },
    multiline: {
      true: 'p-[25px 12px 8px]',
      false: '',
    },
    size: {
      small: '',
    },
    hiddenLabel: { true: '', false: '' },
    focused: {
      true: [
        'bg-filledInput-bg',
        'hover:bg-filledInput-bg',
        'after:scale-x-100 after:translate-x-0',
      ],
      false: [],
    },
  },
  compoundVariants: [
    {
      disableUnderline: false,
      error: true,
      className: ['before:border-error', 'after:border-error'],
    },
    {
      disableUnderline: false,
      color: 'primary',
      className: 'after:border-b-[2px] after:border-solid after:border-b-primary',
    },
    {
      disableUnderline: false,
      color: 'secondary',
      className: 'after:border-b-[2px] after:border-solid after:border-b-secondary',
    },
    {
      disableUnderline: false,
      color: 'error',
      className: 'after:border-b-[2px] after:border-solid after:border-b-error',
    },
    {
      disableUnderline: false,
      color: 'info',
      className: 'after:border-b-[2px] after:border-solid after:border-b-info',
    },
    {
      disableUnderline: false,
      color: 'success',
      className: 'after:border-b-[2px] after:border-solid after:border-b-success',
    },
    {
      disableUnderline: false,
      color: 'warning',
      className: 'after:border-b-[2px] after:border-solid after:border-b-warning',
    },
    {
      multiline: true,
      size: 'small',
      className: ['pt-[21px]', 'pb-[4px]'],
    },
    {
      multiline: true,
      hiddenLabel: true,
      className: ['pt-[16px]', 'pb-[17px]'],
    },
    {
      multiline: true,
      hiddenLabel: true,
      size: 'small',
      className: ['pt-[8px]', 'pb-[9px]'],
    },
  ],
  extend: inputBaseRootVariants,
});

const FilledInputInput = styled(InputBaseInputBase)``;

const filledInputInputVariants = tv({
  base: [
    'pt-[25px]',
    'pr-[12px]',
    'pb-[8px]',
    'pl-[12px]',
    'autofill:rounded-t-[inherit]',
    'autofill:rounded-tr-[inherit]',
    'dark:[&:autofill]:shadow-[0_0_0_100px_#266798_inset]',
    'dark:[&:autofill]:text-white',
    'dark:[&:autofill]:caret-white',
  ],
  variants: {
    size: {
      small: ['pt-[21px]', 'pb-[4px]'],
    },
    hiddenLabel: {
      true: ['pt-[16px]', 'pb-[17px]'],
      false: '',
    },
    startAdornment: {
      true: 'pl-0',
      false: '',
    },
    endAdornment: {
      true: 'pr-0',
      false: '',
    },
    multiline: {
      true: ['pt-0', 'pb-0', 'pl-0', 'pr-0'],
      false: [],
    },
  },
  compoundVariants: [
    {
      hiddenLabel: false,
      size: 'small',
      className: ['pt-[8px]', 'pb-[9px]'],
    },
  ],
  extend: inputBaseInputVariants,
});

const FilledInput = React.forwardRef(function FilledInput(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'JrFilledInput' });

  const {
    disableUnderline = false,
    components = {},
    componentsProps: componentsPropsProp,
    fullWidth = false,
    hiddenLabel, // declare here to prevent spreading to DOM
    inputComponent = 'input',
    multiline = false,
    slotProps,
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

  const filledInputRoot = React.useMemo(
    () => ({
      ...FilledInputRoot,
    }),
    [],
  );

  const filledInputRootVariantsFilled = filledInputRootVariants({
    disableUnderline,
    error: fcs.error,
    color: fcs.color,
    startAdornment: props.startAdornment,
    endAdornment: props.endAdornment,
    multiline,
    size: fcs.size,
    hiddenLabel,
    fullWidth,
    focused: fcs.focused,
  });

  filledInputRoot.className = mergeStyles('JrFilledInput-root', filledInputRootVariantsFilled);

  const filledInputInput = React.useMemo(
    () => ({
      ...FilledInputInput,
      className: mergeStyles(
        'JrFilledInput-input',
        filledInputInputVariants({
          size: props.size,
          hiddenLabel,
          startAdornment: props.startAdornment,
          endAdornment: props.endAdornment,
          multiline,
        }),
      ),
    }),
    [props.size, hiddenLabel, props.startAdornment, props.endAdornment, multiline],
  );

  // const filledInputComponentsProps = { root: { ownerState }, input: { ownerState } };
  const RootSlotProps =
    !!!slots.root && !!!components.Root ? { className: filledInputRoot.className } : undefined;
  const InputSlotProps =
    !!!slots.input && !!!components.Input ? { className: filledInputInput.className } : undefined;
  const filledInputComponentsProps = { root: { ...RootSlotProps }, input: { ...InputSlotProps } };

  const componentsProps =
    (slotProps ?? componentsPropsProp)
      ? deepmerge(filledInputComponentsProps, slotProps ?? componentsPropsProp)
      : filledInputComponentsProps;

  const RootSlot = slots.root ?? components.Root ?? filledInputRoot;
  const InputSlot = slots.input ?? components.Input ?? filledInputInput;

  return (
    <InputBase
      slots={{ root: RootSlot, input: InputSlot }}
      slotProps={componentsProps}
      fullWidth={fullWidth}
      inputComponent={inputComponent}
      multiline={multiline}
      ref={ref}
      type={type}
      {...other}
    />
  );
});

if (FilledInput) {
  FilledInput.jrName = 'Input';
}

export default FilledInput;
