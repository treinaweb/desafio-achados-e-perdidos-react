import React from 'react';
// import {  } from '@material-ui/core';
import {
    ItemsList,
    ListItemContainer,
    ItemPicture,
    ItemPicturePlaceholder,
    InformationContainer,
    ItemName,
    ItemDescription,
    ActionButton,
} from './ListItem.style';

export interface ListItemProps {
    picture?: string;
    name?: string;
    description?: string | JSX.Element;
    actionLabel?: string;
    href?: string;
    onClick?: () => void;
}

const ListItem: React.FC<ListItemProps> = ({
    picture,
    name,
    description,
    actionLabel,
    href,
    onClick,
}) => {
    return (
        <ListItemContainer>
            {picture ? (
                <ItemPicture src={picture} />
            ) : (
                <ItemPicturePlaceholder as={'div'}>
                    <i className={'fas fa-image'} />
                </ItemPicturePlaceholder>
            )}

            <InformationContainer>
                <ItemName>{name}</ItemName>
                <ItemDescription>{description}</ItemDescription>
                <ActionButton href={href} onClick={onClick}>
                    {actionLabel}
                </ActionButton>
            </InformationContainer>
        </ListItemContainer>
    );
};

export default ListItem;

export { ItemsList } from './ListItem.style';
