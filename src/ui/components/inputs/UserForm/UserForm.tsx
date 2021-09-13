import React from 'react';
import { FormContainerStyled } from './UserForm.style';

export interface UserFormProps {
    children?: React.ReactElement;
}

export const UserFormContainer = FormContainerStyled;

const UserForm: React.FC<UserFormProps> = () => {
    return (
        <div>
            <div>UserForm</div>
        </div>
    );
};

export interface UserDataFormProps extends UserFormProps {
    cadastro?: boolean;
}

export default UserForm;

export * from './forms/AdminForm';
export * from './forms/LocationForm';
export * from './forms/LoginForm';
export * from './forms/NewObjectForm';
export * from './forms/ObjectReturnForm';
