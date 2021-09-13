import { LoginFormDataInterface } from 'data/@types/FormInterface';
import { ExternalServicesContext } from 'data/contexts/ExternalServicesContext';
import { UserContext } from 'data/contexts/UserContext';
import { FormSchemaService } from 'data/services/FormSchemaService';
import { LoginService } from 'data/services/LoginService';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export default function useLogin() {
    const formMethods = useForm<{ login: LoginFormDataInterface }>({
        resolver: yupResolver(FormSchemaService.login()),
    });
    const { externalServicesState } = useContext(ExternalServicesContext);
    const { userDispatch } = useContext(UserContext);
    const [errorMessage, setErrorMessage] = useState('');

    async function onSubmit(data: { login: LoginFormDataInterface }) {
        setErrorMessage('');
        const loginSuccess = await LoginService.login(data.login);

        if (loginSuccess) {
            const establishment = await LoginService.getEstablishment();
            userDispatch({ type: 'SET_ESTABLISHMENT', payload: establishment });
        } else {
            setErrorMessage('E-mail e/ou Senha inválidos');
        }
    }

    return {
        formMethods,
        externalServicesState,
        errorMessage,
        onSubmit,
    };
}
