import { CadastroObjetoFormInterface } from 'data/@types/FormInterface';
import { LostObjectInterface } from 'data/@types/LostObjectInterface';
import { ApiServiceHateoas } from 'data/services/ApiService';
import { useForm } from 'react-hook-form';
import { useState, useContext } from 'react';
import { UserContext } from 'data/contexts/UserContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormSchemaService } from 'data/services/FormSchemaService';
import { ObjectService } from 'data/services/ObjectService';

export default function useCadastroObjeto() {
    const { userState } = useContext(UserContext),
        { userLinks } = userState,
        formMethods = useForm<CadastroObjetoFormInterface>({
            resolver: yupResolver(FormSchemaService.newObject()),
        }),
        [isDialogOpen, setIsDialogOpen] = useState(false);

    function onSubmit(data: CadastroObjetoFormInterface) {
        ApiServiceHateoas(
            userLinks,
            'adicionar_objeto_local',
            async (request) => {
                const newObject = (
                    await request<LostObjectInterface>({
                        data: {
                            nome: data.nome,
                            descricao: data.descricao,
                        },
                    })
                ).data;

                if (data.imagem_objeto) {
                    // @ts-ignore
                    savePicture(newObject);
                }

                setIsDialogOpen(true);
            }
        );
    }

    function savePicture(newObject: LostObjectInterface) {
        ApiServiceHateoas(
            newObject.links,
            'definir_imagem_objeto',
            async (request) => {
                const picture = formMethods.getValues('imagem_objeto');

                try {
                    const userData = ObjectService.jsonToFormData({
                        imagem_objeto: picture,
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
        isDialogOpen,
    };
}
