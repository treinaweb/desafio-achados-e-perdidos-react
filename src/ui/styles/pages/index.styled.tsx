import { styled } from '@mui/material/styles';
// import {  } from '@mui/material';

export const PageContainer = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.spacing(3)};
    max-width: 500px;
    margin: 0 auto;
`;
