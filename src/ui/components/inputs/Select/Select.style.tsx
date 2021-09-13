import { styled } from '@material-ui/core/styles';
import { Select, SelectProps } from '@material-ui/core';

// import { SelectProps } from './Select';

export const SelectStyled = styled(Select)<SelectProps>`
    &.MuiInputBase-root {
        background-color: ${({ theme }) => theme.palette.grey[50]};
    }
    .MuiOutlinedInput-notchedOutline {
        border-color: ${({ theme }) => theme.palette.grey[100]};
    }
`;
