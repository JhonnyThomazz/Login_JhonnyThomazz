import {Estoque} from "./Estoque"

export interface Produto {
    id?: number;
    nome: string;
    descricao: string;
    preco: number;
    url: string;
    estoque?: Estoque;
}