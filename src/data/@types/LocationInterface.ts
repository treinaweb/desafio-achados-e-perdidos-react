import { ApiLinksInterface } from './ApiLinksInterface';
import { UserInterface } from './UserInterface';

export interface LocationInterface {
    id: number;
    nome: string;
    endereco: string;
    contato: string;
    descricao: string;
    imagem?: string;
}

export interface EstablishmentInterface {
    local: LocationInterface;
    usuario: UserInterface;
    links: ApiLinksInterface[];
}
