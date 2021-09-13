import React, { useEffect, useReducer } from 'react';
import produce from 'immer';
import { UserInterface, UserType } from 'data/@types/UserInterface';
import { LoginService } from 'data/services/LoginService';
import useApi from 'data/hooks/useApi.hook';
import {
    CidadeInterface,
    EnderecoInterface,
} from 'data/@types/EnderecoInterface';
import { ApiService, linksResolver } from 'data/services/ApiService';
import {
    EstablishmentInterface,
    LocationInterface,
} from 'data/@types/LocationInterface';
import { ApiLinksInterface } from 'data/@types/ApiLinksInterface';

export const initialState = {
    user: {
        id: 0,
        nome: '',
        email: '',
    } as UserInterface,
    userLinks: [] as ApiLinksInterface[],
    location: {
        id: 0,
        nome: '',
        endereco: '',
        contato: '',
        descricao: '',
        imagem: '',
    } as LocationInterface,
    isLogging: true,
};

type InitialStateType = typeof initialState;

type UserAction =
    | 'SET_USER'
    | 'SET_LOGGING'
    | 'SET_LOCATION'
    | 'SET_ESTABLISHMENT'
    | 'SET_USER_LINKS';

export type UserActionType = {
    type: UserAction;
    payload?: unknown;
};

export interface UserReducerInterface {
    userState: InitialStateType;
    userDispatch: React.Dispatch<UserActionType>;
}

const reducer = (
    state: InitialStateType,
    action: UserActionType
): InitialStateType => {
    const nextState = produce(state, (draftState) => {
        switch (action.type) {
            case 'SET_USER':
                draftState.user = action.payload as UserInterface;
                draftState.isLogging = false;
                break;
            case 'SET_LOCATION':
                draftState.location = action.payload as LocationInterface;
                break;
            case 'SET_USER_LINKS':
                draftState.userLinks = action.payload as ApiLinksInterface[];
                break;
            case 'SET_ESTABLISHMENT':
                draftState.user = (
                    action.payload as EstablishmentInterface
                ).usuario;
                draftState.location = (
                    action.payload as EstablishmentInterface
                ).local;
                draftState.userLinks = (
                    action.payload as EstablishmentInterface
                ).links;
                draftState.isLogging = false;
                break;
            case 'SET_LOGGING':
                draftState.isLogging = action.payload as boolean;
                break;
        }
    });
    return nextState;
};

export function useUserReducer(): UserReducerInterface {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        getEstablishment();
    }, [state.user.id]);

    async function getEstablishment() {
        try {
            const establishment = await LoginService.getEstablishment();
            if (establishment) {
                dispatch({ type: 'SET_ESTABLISHMENT', payload: establishment });
            } else {
                dispatch({ type: 'SET_LOGGING', payload: false });
            }
        } catch (error) {
            /**/
        }
    }

    return { userState: state, userDispatch: dispatch };
}
