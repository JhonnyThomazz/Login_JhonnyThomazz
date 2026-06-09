export interface Estoque{
    id?: number;
    localizacao: string;
    quantidade: number;
    produtos?: {
        id: number;
    };
}