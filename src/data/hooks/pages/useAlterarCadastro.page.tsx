import { CadastroLocalFormInterface } from 'data/@types/FormInterface';
import { ApiServiceHateoas } from 'data/services/ApiService';
import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { ExternalServicesContext } from 'data/contexts/ExternalServicesContext';
import { UserContext } from 'data/contexts/UserContext';
import { EstablishmentInterface } from 'data/@types/LocationInterface';
import { LoginService } from 'data/services/LoginService';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormSchemaService } from 'data/services/FormSchemaService';
import { ObjectService } from 'data/services/ObjectService';

export function useAlterarCadastro() {
    const { userDispatch, userState } = useContext(UserContext),
        { userLinks } = userState,
        formMethods = useForm<CadastroLocalFormInterface>({
            resolver: yupResolver(FormSchemaService.locationData()),
        }),
        [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false),
        [snackbarMessage, setSnackbarMessage] = useState('');

    function onSubmit(data: CadastroLocalFormInterface) {
        ApiServiceHateoas(userLinks, 'atualizar_local', async (request) => {
            const establishment = (
                await request<EstablishmentInterface>({
                    data: {
                        ...data,
                        local: {
                            ...data.local,
                            imagem_local: undefined,
                        },
                        usuario: {
                            ...data.usuario,
                            password: data.usuario.password || undefined,
                            password_confirmation:
                                data.usuario.password_confirmation || undefined,
                        },
                    },
                })
            ).data;

            if (data.local.imagem_local) {
                savePicture();
            }

            userDispatch({
                type: 'SET_ESTABLISHMENT',
                payload: establishment,
            });

            setSnackbarMessage('Dados atualizados com suceso');
        });
    }

    function savePicture() {
        ApiServiceHateoas(
            userLinks,
            'definir_imagem_local',
            async (request) => {
                const picture = formMethods.getValues('local.imagem_local');

                try {
                    const userData = ObjectService.jsonToFormData({
                        imagem_local: picture,
                    });
                    await request({
                        data: userData,
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                } catch (error) {
                    /**/
                }
            }
        );
    }

    function onDeleteAccount(canDeleteAccount = false) {
        setDeleteDialogOpen(false);
        if (canDeleteAccount) {
            ApiServiceHateoas(userLinks, 'apagar_local', async (request) => {
                await request();
                LoginService.logout();
                window.location.reload();
            });
        }
    }

    function startDeleteAccount() {
        setDeleteDialogOpen(true);
    }

    return {
        formMethods,
        onSubmit,
        onDeleteAccount,
        startDeleteAccount,
        isDeleteDialogOpen,
        snackbarMessage,
        setSnackbarMessage,
    };
}
