import { Button } from '@material-ui/core';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Link from 'ui/components/navigation/Link/Link';

import TextField from '../../TextField/TextField';
import TextFieldMask from '../../TextFieldMask/TextFieldMask';
import { UserFormProps } from '../UserForm';

import { FormButtonSubmit, FormContainerStyled } from '../UserForm.style';

export const ObjectReturnForm: React.FC<UserFormProps> = () => {
    const {
        register,
        formState: { errors },
        control,
    } = useFormContext();

    return (
        <>
            <TextField
                label={'Nome do dono'}
                {...register('dono_nome')}
                error={errors?.dono_nome !== undefined}
                helperText={errors?.dono_nome?.message}
            />
            <Controller
                name={'dono_cpf'}
                defaultValue={''}
                control={control}
                render={({ field: { ref, ...inputProps } }) => (
                    <TextFieldMask
                        {...inputProps}
                        mask={'999.999.999-99'}
                        label={'CPF'}
                        style={{ gridArea: 'cpf' }}
                        error={errors?.dono_cpf !== undefined}
                        helperText={errors?.dono_cpf?.message}
                    />
                )}
            />
        </>
    );
};
