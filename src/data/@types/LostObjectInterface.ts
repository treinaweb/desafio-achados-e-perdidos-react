import { ApiLinksInterface } from './ApiLinksInterface';

export interface LostObjectInterface {
    id: number;
    nome: string;
    data_cadastro: string;
    descricao: string;
    entregue: number;
    imagem?: string;
    links: ApiLinksInterface[];
}
