import {
    FormControl,
    InputLabel,
    SelectProps as MuiSelectProps,
} from '@mui/material';
import { v4 as uuid } from 'uuid';
import React, { useEffect, useState } from 'react';
// import {  } from '@mui/material';
import { SelectStyled } from './Select.style';

export interface SelectProps extends MuiSelectProps {
    label?: string;
}

const Select: React.FC<SelectProps> = ({
    label,
    children,
    style,
    ...props
}) => {
    const [elementId, setElementId] = useState('');

    useEffect(() => {
        if (window !== undefined) {
            setElementId(uuid());
        }
    }, []);

    return (
        <FormControl variant={'outlined'} style={style}>
            <InputLabel id={elementId}>{label}</InputLabel>
            <SelectStyled labelId={elementId} {...props} label={label}>
                {children}
            </SelectStyled>
        </FormControl>
    );
};

export default Select;
