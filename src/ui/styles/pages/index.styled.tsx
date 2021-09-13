import { styled } from '@material-ui/core/styles';
// import {  } from '@material-ui/core';

export const PageContainer = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.spacing(3)};
    max-width: 500px;
    margin: 0 auto;
`;
