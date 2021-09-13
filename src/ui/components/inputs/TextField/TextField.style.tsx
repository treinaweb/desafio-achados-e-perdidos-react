import { styled } from '@material-ui/core/styles';
import { TextField as MuiTextField, TextFieldProps } from '@material-ui/core';
// import { TextFieldProps } from './TextField';

export const TextFieldStyled = styled(MuiTextField)<TextFieldProps>`
    .MuiInputBase-root {
        background-color: ${({ theme }) => theme.palette.grey[50]};
    }
    .MuiOutlinedInput-notchedOutline {
        border-color: ${({ theme }) => theme.palette.grey[100]};
    }
`;
