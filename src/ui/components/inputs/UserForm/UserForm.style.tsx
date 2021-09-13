import { styled } from '@material-ui/core/styles';
import { Button, Container } from '@material-ui/core';
import { UserFormProps } from './UserForm';

export const FormTitle = styled('h3')`
    margin: 0;
    padding: ${({ theme }) => theme.spacing()} 0;
`;

export const FormContainerStyled = styled('div')`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(2)};
    max-width: 600px;
    margin: 0 auto;
`;

export const FormButtonSubmit = styled(Button)`
    width: 100%;
    max-width: 200px;
    margin: 0 auto;
`;
FormButtonSubmit.defaultProps = {
    size: 'large',
    variant: 'contained',
    type: 'submit',
};
