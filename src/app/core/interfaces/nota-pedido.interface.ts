export interface NotaPedido {
  id?: number;
  sticker?: string;
  fecha?: string;
  nombres?: string;
  apellidos?: string;
  telefono?: string;
  estado?: string;
  sku: string;
  descripcion: string;
  cantidad: number;
  np?: string;

  // nuevos campos 
  NP_GCF?: string;
  STICKER?: string;
  ID_VALIDA?: string;
  ESTADO_NP?: string;
  TIPO_NOTA?: string;
  ID_ESTADO?: number;
  EMP_TRANSP?: string;
  NUMERO_RUTA?: string;
  NUMERO_VIAJE?: string;
  TIPO_ENTREGA?: string;
  FECHA_ENTREGA?: string;
  ID_EMP_TRANSP?: number;
  ID_DESPACHO_DTL?: number;
  PROMESA_CLIENTE?: string;
  ID_TIPO_ENTREGA?: number;
  ID_PROMESA_CLIENTE?: number;
  ID_TIPO_NOTA_PEDIDO?: number;
}
