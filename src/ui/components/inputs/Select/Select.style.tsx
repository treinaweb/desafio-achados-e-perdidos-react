import { styled } from '@mui/material/styles';
import { Select, SelectProps } from '@mui/material';

// import { SelectProps } from './Select';

export const SelectStyled = styled(Select)<SelectProps>`
    &.MuiInputBase-root {
        background-color: ${({ theme }) => theme.palette.grey[50]};
    }
    .MuiOutlinedInput-notchedOutline {
        border-color: ${({ theme }) => theme.palette.grey[100]};
    }
`;
