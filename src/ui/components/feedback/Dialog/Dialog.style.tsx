import { styled } from '@material-ui/core/styles';
import {
    Dialog as MuiDialog,
    DialogTitle as MuiDialogTitle,
    DialogContent as MuiDialogContent,
    DialogActions as MuiDialogActions,
    IconButton as MuiIconButton,
    Divider,
} from '@material-ui/core';
import { DialogProps } from './Dialog';

export const DialogContainer = styled(MuiDialog)``;

export const DialogTitle = styled(MuiDialogTitle)`
    position: relative;

    background-color: ${({ theme }) => theme.palette.primary.main};
    color: ${({ theme }) =>
        theme.palette.getContrastText(theme.palette.primary.main)};
    ${({ theme }) => theme.breakpoints.down('md')} {
        &.MuiDialogTitle-root {
            padding: ${({ theme }) => theme.spacing(1.5)};
        }
    }
    .MuiTypography-root {
        font-size: ${({ theme }) => theme.typography.body1.fontSize};
    }
`;

export const DialogSubtitle = styled('h3')`
    color: ${({ theme }) => theme.palette.primary.main};
    font-size: ${({ theme }) => theme.typography.body1.fontSize};
    margin: ${({ theme }) => 0 + ' ' + 0 + ' ' + theme.spacing(3)};
`;

export const CloseButon = styled(MuiIconButton)`
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    i {
        font-size: ${({ theme }) => theme.typography.pxToRem(16)};
        color: ${({ theme }) =>
            theme.palette.getContrastText(theme.palette.primary.main)};
    }
`;

export const DialogContent = styled(MuiDialogContent)`
    &.MuiDialogContent-root {
        padding: ${({ theme }) => theme.spacing(1.5)};
        ${({ theme }) => theme.breakpoints.up('md')} {
            padding: ${({ theme }) =>
                theme.spacing(3) + ' ' + theme.spacing(6) + ' ' + 0};
        }
    }
`;

export const DialogDivider = styled(Divider)`
    padding-top: ${({ theme }) => theme.spacing(3)};
`;

export const DialogActions = styled(MuiDialogActions)`
    ${({ theme }) => theme.breakpoints.up('md')} {
        &.MuiDialogActions-root {
            position: relative;
            gap: ${({ theme }) => theme.spacing(2)};
            padding: ${({ theme }) =>
                theme.spacing(3) + ' ' + theme.spacing(6)};
            &::before {
                content: '';
                position: absolute;
                top: 0;
                right: ${({ theme }) => theme.spacing(6)};
                left: ${({ theme }) => theme.spacing(6)};
                height: 1px;
                background-color: ${({ theme }) => theme.palette.grey[200]};
            }
        }
    }
`;
