import { Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
// import {  } from '@material-ui/core';
// import { ListItemProps } from './ListItem';

export const ItemsList = styled('ul')`
    display: flex;
    flex-direction: column;
    list-style-type: none;
    margin: 0;
    padding: 0;
    gap: ${({ theme }) => theme.spacing(6)};
    ${({ theme }) => theme.breakpoints.down(768)} {
        gap: ${({ theme }) => theme.spacing(3)};
        max-width: 450px;
        margin: 0 auto;
    }
`;

export const ListItemContainer = styled('li')`
    display: flex;
    gap: ${({ theme }) => theme.spacing(8)};
    align-items: center;
    ${({ theme }) => theme.breakpoints.down(768)} {
        gap: ${({ theme }) => theme.spacing(3)};
        justify-content: space-between;
    }
`;

export const ItemPicture = styled('img')`
    width: 400px;
    height: 278px;
    ${({ theme }) => theme.breakpoints.down(768)} {
        width: 120px;
        height: 84px;
    }
`;
export const ItemPicturePlaceholder = styled(ItemPicture)`
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.palette.grey[400]};
    background-color: ${({ theme }) => theme.palette.grey[200]};
    i {
        font-size: 80px;
        ${({ theme }) => theme.breakpoints.down(768)} {
            font-size: 40px;
        }
    }
`;

export const InformationContainer = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing(3)};
    ${({ theme }) => theme.breakpoints.down(768)} {
        gap: ${({ theme }) => theme.spacing()};
    }
`;

export const ItemName = styled('h3')`
    margin: 0;
`;

export const ItemDescription = styled('span')``;

export const ActionButton = styled(Button)``;
ActionButton.defaultProps = {
    variant: 'contained',
};
