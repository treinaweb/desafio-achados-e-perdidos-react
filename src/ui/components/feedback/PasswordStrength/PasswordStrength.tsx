import { LinearProgress, Typography } from '@material-ui/core';
import React, { useMemo } from 'react';
import { passwordStrength } from 'check-password-strength';
// import {  } from '@material-ui/core';
import {
    PasswordStrengthBar,
    PasswordStrengthLabel,
} from './PasswordStrength.style';

export interface PasswordStrengthProps {
    children?: React.ReactNode;
    password: string;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
    const strength = password ? passwordStrength(password).id : 0,
        strengthValue = ((strength + 1) / 4) * 100;

    return (
        <div style={{ gridArea: 'password-strength' }}>
            <Typography
                variant={'body2'}
                component={'span'}
                color={'textSecondary'}
            >
                Nível da senha:&nbsp;
                <PasswordStrengthLabel value={strengthValue}>
                    {strength === 0 && 'FRACA'}
                    {strength === 1 && 'MÉDIA'}
                    {strength === 2 && 'FORTE'}
                </PasswordStrengthLabel>
            </Typography>

            <PasswordStrengthBar
                value={strengthValue}
                variant={'determinate'}
            />
        </div>
    );
};

export default PasswordStrength;
