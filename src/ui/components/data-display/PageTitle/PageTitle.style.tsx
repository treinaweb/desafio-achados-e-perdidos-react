import { styled } from '@material-ui/core/styles';
// import {  } from '@material-ui/core';
import { PageTitleProps } from './PageTitle';

export const PageTitleContainer = styled('div')`
    margin: ${({ theme }) => theme.spacing(5) + ' ' + 0};
    text-align: center;
`;

export const PageTitleStyled = styled('h2')`
    margin: 0;
    font-size: ${({ theme }) => theme.typography.h4.fontSize};
    font-weight: 600;
    ${({ theme }) => theme.breakpoints.down('md')} {
        font-size: ${({ theme }) => theme.typography.body1.fontSize};
    }
`;

export const PageSubtitleStyled = styled('h3')`
    margin: ${({ theme }) => theme.spacing(1.5) + ' ' + 0};
    color: ${({ theme }) => theme.palette.text.primary};
    font-size: ${({ theme }) => theme.typography.body1.fontSize};
    font-weight: normal;
    ${({ theme }) => theme.breakpoints.down('md')} {
        font-size: ${({ theme }) => theme.typography.body2.fontSize};
    }
`;
