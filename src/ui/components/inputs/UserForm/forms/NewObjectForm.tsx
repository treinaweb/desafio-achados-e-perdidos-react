import { Button } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Link from 'ui/components/navigation/Link/Link';
import FileField from '../../FileField/FileField';

import TextField from '../../TextField/TextField';
import TextFieldMask from '../../TextFieldMask/TextFieldMask';
import { UserFormProps } from '../UserForm';

import { FormButtonSubmit, FormContainerStyled } from '../UserForm.style';

export const NewObjectForm: React.FC<UserFormProps> = () => {
    const {
        register,
        formState: { errors },
        control,
    } = useFormContext();

    return (
        <>
            <TextField
                label={'Nome do Objeto'}
                {...register('nome')}
                error={errors?.nome !== undefined}
                helperText={errors?.nome?.message}
            />
            <TextField
                label={'Descrição'}
                {...register('descricao')}
                error={errors?.descricao !== undefined}
                helperText={errors?.descricao?.message}
            />

            <Controller
                name={'imagem_objeto'}
                defaultValue={''}
                control={control}
                render={({ field }) => (
                    <FileField
                        label={'Foto do Objeto'}
                        onChange={(files) => field.onChange(files[0])}
                        inputProps={{ accept: '.jpeg, .jpg, .png' }}
                        required={false}
                    />
                )}
            />
        </>
    );
};
