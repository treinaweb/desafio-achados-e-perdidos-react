import { styled } from '@mui/material/styles';
import { LinearProgress, Theme, Typography } from '@mui/material';

import { PasswordStrengthProps } from './PasswordStrength';

export const Component = styled('div')<PasswordStrengthProps>`
    background-color: white;
    color: black;
`;

export const PasswordStrengthLabel = styled('span', {
    shouldForwardProp: (prop) => prop !== 'value',
})<{ value: number }>`
    font-weight: bold;
    color: ${({ theme, value }) => handleBarColor(theme, value)};
`;

export const PasswordStrengthBar = styled(LinearProgress)`
    margin-top: ${({ theme }) => theme.spacing()};
    .MuiLinearProgress-bar {
        background-color: ${({ theme, value }) => handleBarColor(theme, value)};
    }
    &.MuiLinearProgress-root {
        background-color: ${({ theme }) => theme.palette.grey[200]};
    }
`;

function handleBarColor(theme: Theme, value = 0): string {
    if (value < 34) return theme.palette.error.main;

    if (value >= 34 && value < 67) return theme.palette.warning.main;

    return theme.palette.success.main;
}
