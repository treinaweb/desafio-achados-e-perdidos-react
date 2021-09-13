import { UserInterface } from './UserInterface';

export type RefReturn =
    | string
    | ((instance: HTMLInputElement | null) => void)
    | React.RefObject<HTMLInputElement>
    | null
    | undefined;

export interface LoginFormDataInterface {
    email: string;
    password: string;
}

export interface CadastroObjetoFormInterface {
    nome: string;
    descricao: string;
    imagem_objeto?: string;
}

export interface EntregaFormInterface {
    dono_nome: string;
    dono_cpf: string;
}

export interface CadastroLocalFormInterface {
    local: {
        nome: string;
        endereco: string;
        contato: string;
        descricao: string;
        imagem_local?: string;
    };
    usuario: {
        nome: string;
        email: string;
        password: string;
        password_confirmation: string;
    };
}
