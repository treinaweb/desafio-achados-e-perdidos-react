import { Button } from '@mui/material';
import { UserContext } from 'data/contexts/UserContext';
import React, { useContext } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Link from 'ui/components/navigation/Link/Link';
import FileField from '../../FileField/FileField';

import TextField from '../../TextField/TextField';
import TextFieldMask from '../../TextFieldMask/TextFieldMask';
import { UserFormProps } from '../UserForm';

import { FormButtonSubmit, FormContainerStyled } from '../UserForm.style';

export const LocationForm: React.FC<UserFormProps> = () => {
    const { location } = useContext(UserContext).userState,
        {
            register,
            formState: { errors },
            control,
        } = useFormContext();

    return (
        <>
            <TextField
                label={'Nome do local'}
                {...register('local.nome')}
                defaultValue={location.nome}
                error={errors?.local?.nome !== undefined}
                helperText={errors?.local?.nome?.message}
            />
            <TextField
                label={'Endereço'}
                {...register('local.endereco')}
                defaultValue={location.endereco}
                error={errors?.local?.endereco !== undefined}
                helperText={errors?.local?.endereco?.message}
            />
            <TextField
                label={'Modos de contato'}
                {...register('local.contato')}
                defaultValue={location.contato}
                error={errors?.local?.contato !== undefined}
                helperText={errors?.local?.contato?.message}
            />
            <TextField
                label={'Descrição'}
                {...register('local.descricao')}
                defaultValue={location.descricao}
                error={errors?.local?.descricao !== undefined}
                helperText={errors?.local?.descricao?.message}
            />
            <Controller
                name={'local.imagem_local'}
                defaultValue={''}
                control={control}
                render={({ field }) => (
                    <FileField
                        label={'Foto do Local'}
                        onChange={(files) => field.onChange(files[0])}
                        inputProps={{ accept: '.jpeg, .jpg, .png' }}
                        required={false}
                    />
                )}
            />
        </>
    );
};
