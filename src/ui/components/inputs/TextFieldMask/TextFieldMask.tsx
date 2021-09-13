import React from 'react';
import InputMask from 'react-input-mask';
import { OutlinedTextFieldProps } from '@material-ui/core';
import TextField from '../TextField/TextField';
// import { Component } from './TextFieldMask.style';

export interface TextFieldMaskProps
    extends Omit<OutlinedTextFieldProps, 'variant'> {
    mask: string;
}

const TextFieldMask: React.FC<TextFieldMaskProps> = ({
    mask,
    value,
    onChange,
    onBlur,
    ...props
}) => {
    return (
        <InputMask
            mask={mask}
            value={value as string}
            onChange={onChange}
            onBlur={onBlur}
        >
            {() => {
                return <TextField {...props} variant={'outlined'} />;
            }}
        </InputMask>
    );
};

export default TextFieldMask;
