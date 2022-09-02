import { ApiLinksInterface } from './ApiLinksInterface';

export interface LocationListItemInterface {
    id: number;
    contato: string;
    descricao: string;
    endereco: string;
    imagem?: string;
    links: ApiLinksInterface[];
    nome: string;
    data_cadastro: string;
}
