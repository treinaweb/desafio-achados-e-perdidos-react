import { Button } from '@material-ui/core';
import { UserContext } from 'data/contexts/UserContext';
import React, { useContext } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Link from 'ui/components/navigation/Link/Link';

import TextField from '../../TextField/TextField';
import TextFieldMask from '../../TextFieldMask/TextFieldMask';
import { UserFormProps } from '../UserForm';

import { FormButtonSubmit, FormContainerStyled } from '../UserForm.style';

export const AdminForm: React.FC<{ isRegister?: boolean }> = ({
    isRegister = false,
}) => {
    const { user } = useContext(UserContext).userState,
        {
            register,
            formState: { errors },
            control,
        } = useFormContext();

    return (
        <>
            <TextField
                label={'Nome'}
                {...register('usuario.nome')}
                defaultValue={user.nome}
                error={errors?.usuario?.nome !== undefined}
                helperText={errors?.usuario?.nome?.message}
            />
            <TextField
                label={'E-mail'}
                {...register('usuario.email')}
                defaultValue={user.email}
                error={errors?.usuario?.email !== undefined}
                helperText={errors?.usuario?.email?.message}
            />
            <TextField
                label={'Senha'}
                type={'password'}
                {...register('usuario.password')}
                error={errors?.usuario?.password !== undefined}
                helperText={errors?.usuario?.password?.message}
                required={isRegister}
            />
            <TextField
                label={'Confirmar Senha'}
                type={'password'}
                {...register('usuario.password_confirmation')}
                error={errors?.usuario?.password_confirmation !== undefined}
                helperText={errors?.usuario?.password_confirmation?.message}
                required={isRegister}
            />
        </>
    );
};
