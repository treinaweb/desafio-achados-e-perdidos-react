import { styled } from '@mui/material/styles';
// import {  } from '@mui/material';

export const AppContainer = styled('div')`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    padding-bottom: ${({ theme }) => theme.spacing(10)};
`;
