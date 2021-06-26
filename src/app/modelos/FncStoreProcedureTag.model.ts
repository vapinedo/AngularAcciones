export interface FncStoreProcedureTag {
    Parametros: Array<Parametro>;
    Procedimiento: string;
    Tag: string;
}

export interface Parametro {
    DateValor: string;
    DouValor: number;
    Entrada: boolean;
    IntValor: number;
    Nombre: string;
    StringValor: string;
    Tipo: string;
}
