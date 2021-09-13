import { useContext, useEffect, useState, useCallback, useMemo } from 'react';
import {
    CadastroObjetoFormInterface,
    EntregaFormInterface,
} from 'data/@types/FormInterface';
import { LostObjectInterface } from 'data/@types/LostObjectInterface';
import {
    ApiService,
    ApiServiceHateoas,
    linksResolver,
} from 'data/services/ApiService';
import { useForm } from 'react-hook-form';
import { UserContext } from 'data/contexts/UserContext';
import { useApiHateoas } from '../useApi.hook';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormSchemaService } from 'data/services/FormSchemaService';
import { ObjectService } from 'data/services/ObjectService';

type DialogAction = 'EDIT' | 'ERASE' | 'RETURN' | '';

export default function useGerenciamentoObjetos() {
    const { userState } = useContext(UserContext),
        { userLinks } = userState,
        [lostObjectsList, setLostObjectsList] = useState<LostObjectInterface[]>(
            []
        ),
        filteredLostObjectsList = useMemo(
            () => lostObjectsList.sort((obj) => (obj.entregue === 0 ? -1 : 1)),
            [lostObjectsList]
        ),
        getLostObjectsList = useCallback(_getLostObjectsList, [userLinks]),
        [selectedObject, setSelectedObject] = useState({
            id: 0,
        } as LostObjectInterface),
        [currentAction, setCurrentAction] = useState<DialogAction>(''),
        returnForm = useForm<EntregaFormInterface>({
            resolver: yupResolver(FormSchemaService.returnObject()),
        }),
        editForm = useForm<CadastroObjetoFormInterface>({
            resolver: yupResolver(FormSchemaService.newObject()),
        }),
        [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        getLostObjectsList();
    }, [userLinks, getLostObjectsList]);

    function _getLostObjectsList() {
        ApiServiceHateoas(
            userLinks,
            'listar_objetos_local',
            async (request) => {
                const response = await request<LostObjectInterface[]>();
                setLostObjectsList(response.data);
            }
        );
    }

    function selectObject(object: LostObjectInterface, action: DialogAction) {
        setSelectedObject(object);
        setCurrentAction(action);
        if (action === 'EDIT') {
            editForm.setValue('nome', object.nome);
            editForm.setValue('descricao', object.descricao);
        }
    }

    function onDialogClose() {
        setSelectedObject({ id: 0 } as LostObjectInterface);
        setCurrentAction('');
        returnForm.reset();
    }

    function onEdit(data: CadastroObjetoFormInterface) {
        if (selectedObject.id) {
            ApiServiceHateoas(
                selectedObject.links,
                'atualizar_objeto',
                async (request) => {
                    if (data.imagem_objeto) {
                        savePicture();
                    }
                    await request({
                        data: {
                            ...selectedObject,
                            nome: data.nome,
                            descricao: data.descricao,
                        },
                    });
                    onDialogClose();
                    getLostObjectsList();
                    setSnackbarMessage('Objeto atualizado com sucesso');
                }
            );
        }
    }

    function savePicture() {
        ApiServiceHateoas(
            selectedObject.links,
            'definir_imagem_objeto',
            async (request) => {
                const picture = editForm.getValues('imagem_objeto');

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

    function onErase() {
        if (selectedObject.id) {
            ApiServiceHateoas(
                selectedObject.links,
                'apagar_objeto',
                async (request) => {
                    await request();
                    onDialogClose();
                    getLostObjectsList();
                    setSnackbarMessage('Objeto apagado com sucesso');
                }
            );
        }
    }

    function onReturn(data: EntregaFormInterface) {
        if (selectedObject.id) {
            ApiServiceHateoas(
                selectedObject.links,
                'definir_dono_objeto',
                async (request) => {
                    const requestData = {
                        ...data,
                        dono_cpf: data.dono_cpf.replace(/\D/g, ''),
                    } as EntregaFormInterface;

                    await request({
                        data: requestData,
                    });
                    onDialogClose();
                    getLostObjectsList();
                    setSnackbarMessage('Objeto devolvido com sucesso');
                }
            );
        }
    }

    function hasActions(lostObject: LostObjectInterface) {
        return (
            linksResolver(lostObject.links, 'definir_dono_objeto') !== undefined
        );
    }

    return {
        filteredLostObjectsList,
        selectedObject,
        currentAction,
        selectObject,
        onDialogClose,
        onEdit,
        onErase,
        onReturn,
        returnForm,
        editForm,
        snackbarMessage,
        setSnackbarMessage,
        hasActions,
    };
}
