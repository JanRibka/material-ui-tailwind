'use client';
import * as React from 'react';
import deepmerge from '@janribkaui/utils/deepmerge';
import InputBase from '../InputBase';
import { styled } from 'styled-components';
import { useDefaultProps } from '../DefaultPropsProvider';
import {
  InputBaseRootBase,
  inputBaseRootVariants,
  InputBaseInputBase,
  inputBaseInputVariants,
} from '../InputBase/InputBase';
import { tv } from 'tailwind-variants';
import { mergeStyles } from '../utils';
import useFormControl from '../FormControl/useFormControl';
import formControlState from '../FormControl/formControlState';

const InputRootBase = styled(InputBaseRootBase)`
  .hover {
    // Reset on touch devices, it doesn't add specificity
    @media (hover: none) {
      // TODO: Use tailwind hover-none instead
      border-bottom: 1px solid rgba(0, 0, 0, 0.42);
    }
  }

  .hover-dark {
    // Reset on touch devices, it doesn't add specificity
    @media (hover: none) {
      // TODO: Use tailwind hover-none instead
      border-bottom: 1px solid rgba(255, 255, 255, 0.7);
    }
  }

  &::before {
    content: '\u00a0'; // Tailwind CSS does not support space content
  }
`;

const inputRootVariants = tv({
  base: ['relative'],
  variants: {
    formControl: {
      true: ['group-has-[label]:mt-[16px]'],
      false: [],
    },
    disableUnderline: {
      true: ['before:content-[""]'],
      false: [
        'before:border-b-[1px]',
        'before:border-solid',
        'before:border-b-[rgba(0,0,0,0.42)] dark:before:border-b-[rgba(255,255,255,0.7)]',
        'before:left-0',
        'before:bottom-0',
        'before:right-0',
        'before:transition-border-bottom-color',
        'before:duration-shorter',
        'before:pointer-events-none',
        'before:absolute',
        'after:left-0',
        'after:bottom-0',
        "after:content-['']",
        'after:absolute',
        'after:right-0',
        'after:scale-x-0',
        'after:transition-transform after:duration-shorter after:ease-out',
        'after:pointer-events-none', // Transparent to the hover style.
      ],
    },
    error: {
      true: ['before:border-b-error', 'after:border-b-error'],
      false: [
        'hover:before:border-b-[2px] hover:before:border-b-solid hover:before:border-b-text-primary',
        'hover:hover dark:hover:hover-dark',
      ],
    },
    color: {
      primary: [],
      secondary: [],
      info: [],
      success: [],
      warning: [],
      error: [],
    },
    focused: {
      true: [],
      false: [],
    },
    disabled: {
      true: ['before:border-b-dotted'],
      false: [],
    },
  },
  compoundVariants: [
    {
      focused: true,
      disableUnderline: false,
      className: ['after:scale-x-100', 'after:translate-x-0'],
    },
    {
      disableUnderline: false,
      color: 'primary',
      className: 'after:border-b-[2px] after:border-b-solid after:border-b-primary',
    },
    {
      disableUnderline: false,
      color: 'secondary',
      className: 'after:border-b-[2px] after:border-b-solid after:border-b-secondary',
    },
    {
      disableUnderline: false,
      color: 'info',
      className: 'after:border-b-[2px] after:border-b-solid after:border-b-info',
    },
    {
      disableUnderline: false,
      color: 'success',
      className: 'after:border-b-[2px] after:border-b-solid after:border-b-success',
    },
    {
      disableUnderline: false,
      color: 'warning',
      className: 'after:border-b-[2px] after:border-b-solid after:border-b-warning',
    },
    {
      disableUnderline: false,
      color: 'error',
      className: 'after:border-b-[2px] after:border-b-solid after:border-b-error',
    },
    {
      disabled: false,
      error: false,
      className: [
        'hover:before:border-b-[2px]',
        'hover:before:border-solid',
        'hover:before:border-b-text-primary',
        'hover-none:before:border-b-[1px]',
        'hover-none:before:border-solid',
        'hover-none:before:border-b-[rgba(0, 0, 0, 0.42)] dark:hover-none:before:border-b-[rgba(255, 255, 255, 0.7)]',
      ],
    },
  ],
  defaultVariants: { formControl: false, disableUnderline: false },
  extend: [inputBaseRootVariants],
});

const InputInput = styled(InputBaseInputBase)``;

const Input = React.forwardRef(function Input(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'JrInput' });
  const {
    disableUnderline = false,
    components = {},
    componentsProps: componentsPropsProp,
    fullWidth = false,
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

  const inputRoot = React.useMemo(
    () => ({
      ...InputRootBase,
    }),
    [],
  );

  const inputRootVariantsFilled = inputRootVariants({
    formControl: !!jrFormControl,
    disableUnderline: props.disableUnderline,
    multiline,
    size: fcs.size,
    fullWidth,
    error: fcs.error,
    color: fcs.color || 'primary',
    focused: fcs.focused,
  });

  inputRoot.className = mergeStyles('JrInput-root', inputRootVariantsFilled);

  const inputInput = React.useMemo(
    () => ({
      ...InputInput,
      className: mergeStyles(
        'JrInput-input',
        inputBaseInputVariants({
          disableInjectingGlobalStyles: props.disableInjectingGlobalStyles,
          size: fcs.size,
          multiline,
          type,
        }),
      ),
    }),
    [],
  );

  const RootSlotProps =
    !!!slots.root && !!!components.Root ? { className: inputRoot.className } : undefined;
  const InputSlotProps =
    !!!slots.input && !!!components.Input ? { className: inputInput.className } : undefined;
  const inputComponentsProps = { root: { ...RootSlotProps }, input: { ...InputSlotProps } };

  const componentsProps =
    (slotProps ?? componentsPropsProp)
      ? deepmerge(slotProps ?? componentsPropsProp, inputComponentsProps)
      : inputComponentsProps;

  const RootSlot = slots.root ?? components.Root ?? inputRoot;
  const InputSlot = slots.input ?? components.Input ?? inputInput;

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

if (Input) {
  Input.jrName = 'Input';
}

export default Input;
