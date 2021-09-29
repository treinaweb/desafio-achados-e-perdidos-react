import { CadastroLocalFormInterface } from 'data/@types/FormInterface';
import { ApiServiceHateoas } from 'data/services/ApiService';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { ExternalServicesContext } from 'data/contexts/ExternalServicesContext';
import { UserContext } from 'data/contexts/UserContext';
import { LocationInterface } from 'data/@types/LocationInterface';
import { LoginService } from 'data/services/LoginService';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormSchemaService } from 'data/services/FormSchemaService';
import { ObjectService } from 'data/services/ObjectService';

export function useCadastroUsuario() {
    const { externalServicesState } = useContext(ExternalServicesContext),
        { externalServices } = externalServicesState,
        { userDispatch } = useContext(UserContext),
        formMethods = useForm<CadastroLocalFormInterface>({
            resolver: yupResolver(FormSchemaService.newLocationData()),
        });

    function onSubmit(data: CadastroLocalFormInterface) {
        ApiServiceHateoas(externalServices, 'criar_local', async (request) => {
            try {
                const establishment = (
                    await request<LocationInterface>({
                        data: {
                            ...data.local,
                            usuario: data.usuario,
                        },
                    })
                ).data;

                await LoginService.login({
                    email: data.usuario.email,
                    password: data.usuario.password,
                });

                if (data.local.imagem_local) {
                    savePicture(establishment);
                }

                userDispatch({
                    type: 'SET_ESTABLISHMENT',
                    payload: establishment,
                });
            } catch (error) {
                // @ts-ignore
                if (error.response.data['usuario.email']) {
                    formMethods.setError('usuario.email', {
                        type: 'cadastrado',
                        message: 'E-mail já cadastrado',
                    });
                }
            }
        });
    }

    function savePicture(newEstablishment: LocationInterface) {
        ApiServiceHateoas(
            newEstablishment.links,
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

    return {
        formMethods,
        onSubmit,
    };
}
