export class GetDataObjectModel {
  Tag: string;
  Parametros: string;
  Separador: string;

  constructor(tag: string, parametro: string, separador: string = "#") {
    this.Tag = tag;
    this.Parametros = parametro;
    this.Separador = separador;
}
}
