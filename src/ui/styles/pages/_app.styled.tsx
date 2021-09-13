import { styled } from '@material-ui/core/styles';
// import {  } from '@material-ui/core';

export const AppContainer = styled('div')`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    padding-bottom: ${({ theme }) => theme.spacing(10)};
`;
