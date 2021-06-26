import { Injectable } from '@angular/core';
import { FncStoreProcedureTag } from 'src/app/modelos/FncStoreProcedureTag.model';
import { GetDataObjectModel } from 'src/app/modelos/GetDataObjectModel.model';
import { UtilesService } from '../util/utiles.service';
import { Parametro } from 'src/app/modelos/FncStoreProcedureTag.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotaDevolucionService {

 

  constructor(
    private http: HttpClient,
    private utilesService: UtilesService
  ) { }

  public constantes = this.utilesService.obtenerConstantes();

  async obtenerDetalle(sticker: string, iddespachoDtl: string): Promise<any> {
    const obtenerDetalleReprogramacion: GetDataObjectModel = {
        Tag: this.constantes.dinamicos.SLTDETNOVE,
        Parametros: `#${sticker}#${iddespachoDtl}`,
        Separador: "#"
    }
    try {
        
        let data = await this.utilesService.obtenerDatosCursor(obtenerDetalleReprogramacion);

          if (data['Value'][0]['ID_ERROR']) {
            return [];
          } else if (data['Estado'] == false) {
            return [];
          } else {
            return data['Value'];
          }
        
    } catch (error) {
        return [];
    }
  }

  async obtenerDatosMotivos(): Promise<any> {   

      const ObtenerMotivosRepro: GetDataObjectModel = {
        Tag: this.constantes.dinamicos.SLTMOTIVOS,
        Parametros: `#0`,
        Separador: "#"
      }

        try {          
            
            let motivos = await this.utilesService.obtenerDatosCursor(ObtenerMotivosRepro);

            if (motivos['Value'][0]['ID_ERROR']) {
              return [];
            } else if (motivos['Estado'] == false) {
              return [];
            } else {
              return motivos['Value'];
            }

        } catch (error) {
          return [];
        }      
  }

  
  async obtenerEncabezadoEditable(sticker: string): Promise<any> {
    const obtenerEncabezadoEditable: GetDataObjectModel = {
        Tag: this.constantes.dinamicos.SLTENCNOVE,
        Parametros: `#${sticker}`,
        Separador: "#"
    }
    try {
        
        let data = await this.utilesService.obtenerDatosCursor(obtenerEncabezadoEditable);

          if (data['Value'][0]['ID_ERROR']) {
            return null;
          } else if (data['Estado'] == false) {
            return null;
          } else {
            return data['Value'][0];
          }
        
    } catch (error) {
        return null;
    }
  }

  async obtenerMediosDevolucion(sticker: string): Promise<any> {

    const paramSticker: Parametro ={
      DateValor: "",
      DouValor: 0,
      Entrada: true,
      IntValor: 0,
      Nombre: "P_STICKER",
      StringValor: sticker,
      Tipo: "s"
    }
    const paramMedios: Parametro ={
      DateValor: "",
      DouValor: 0,
      Entrada: false,
      IntValor: 0,
      Nombre: "P_MEDIOS",
      StringValor: "string",
      Tipo: "c"
    }
  
    const arrayPar : Array<Parametro> =[];
    arrayPar.push(paramSticker, paramMedios);
  
    const obtenerMediosDevolucion: FncStoreProcedureTag ={
      Parametros: arrayPar,
      Procedimiento: "DEVOLUCIONES.PKG_NOTA_DEV_DIGITAL.PRC_OBTENER_MEDIOS_POR_NOTA",
      Tag: this.utilesService.obtenerConstantes().dinamicos.GETQUIEMED
    }

    try {
        
        let data = await this.utilesService.procesaDatosBloqueAnonimoDt(obtenerMediosDevolucion);

          if (data['Value'][0]['ID_ERROR']) {
            return [];
          } else if (data['Estado'] == false) {
            return [];
          } else {
            return data['Value'];
          }
        
    } catch (error) {
        return [];
    }
  }

  async obtenerNP(np: string): Promise<any> {
    console.log(np);
    let tienda = sessionStorage.getItem('tienda');
    const obtenerDetalleReprogramacion: GetDataObjectModel = {
        Tag: this.constantes.dinamicos.SLTBUSCANP,
        Parametros: `#${np}#${tienda}`,
        Separador: "#"
    }
    try {
        
        let data = await this.utilesService.obtenerDatosCursor(obtenerDetalleReprogramacion);

        
          if (data['Value'][0]['ID_ERROR']) {
            return null;
          } else if (data['Estado'] == false) {
            return null;
          } else {
            return data['Value'][0];
          }
        
    } catch (error) {
        return null;
    }
  }

  async llamadoServicioDevolucion(jsonServicio: any){
    try {
      let resultado = await this.http.post('http://10.23.14.94:8992/Servicios/DevolucionCierreServer/SLTApi/DevCancela/Devolucion', jsonServicio, {
          headers: this.generateBasicHeaders()
      }).toPromise();

      return resultado;
  } catch (error) {
      console.log("error", error);
      return error;
  }
  }

  protected generateBasicHeaders(): HttpHeaders {
    return new HttpHeaders({
        'Content-Type': 'application/json'
    });
} 


async guardarDevolucion(sticker: string, xmlNovedades: any, tipoDevolucion: any
  , motivoDevoTotal: any, tipoReprograma: any, usuario: string): Promise<any> {

  const paramSticker: Parametro ={
    DateValor: "",
    DouValor: 0,
    Entrada: true,
    IntValor: 0,
    Nombre: "P_STICKER",
    StringValor: sticker,
    Tipo: "s"
  }
  const paramInformacion: Parametro ={
    DateValor: "",
    DouValor: 0,
    Entrada: true,
    IntValor: 0,
    Nombre: "P_INFORMACION",
    StringValor: sticker,
    Tipo: "i"
  }
  const paramDireccion: Parametro ={
    DateValor: "",
    DouValor: 0,
    Entrada: true,
    IntValor: 0,
    Nombre: "P_DIRECCION",
    StringValor: "d",
    Tipo: "s"
  }
  const paramTelefono: Parametro ={
    DateValor: "",
    DouValor: 0,
    Entrada: true,
    IntValor: 0,
    Nombre: "P_TELEFONO",
    StringValor: "d",
    Tipo: "s"
  }
  const paramPersonaNomb: Parametro ={
    DateValor: "",
    DouValor: 0,
    Entrada: true,
    IntValor: 0,
    Nombre: "P_PERSONA_NOMB",
    StringValor: "d",
    Tipo: "s"
  }
  const paramApellido: Parametro ={
    DateValor: "",
    DouValor: 0,
    Entrada: true,
    IntValor: 0,
    Nombre: "P_PERSONA_APEL",
    StringValor: "d",
    Tipo: "s"
  }
  const paramTipoDev: Parametro ={
    DateValor: "",
    DouValor: 0,
    Entrada: true,
    IntValor: 0,
    Nombre: "P_TIPO_DEV",
    StringValor: tipoDevolucion,
    Tipo: "i"
  }
  const paramTipoReprog: Parametro ={
    DateValor: "",
    DouValor: 0,
    Entrada: true,
    IntValor: 0,
    Nombre: "P_TIPO_REPROG",
    StringValor: tipoReprograma,
    Tipo: "i"
  }
  const paramMotivo: Parametro ={
    DateValor: "",
    DouValor: 0,
    Entrada: true,
    IntValor: 0,
    Nombre: "P_MOTIVO",
    StringValor: motivoDevoTotal,
    Tipo: "i"
  }
  const paramUsuario: Parametro ={
    DateValor: "",
    DouValor: 0,
    Entrada: true,
    IntValor: 0,
    Nombre: "P_USUARIO",
    StringValor: usuario,
    Tipo: "s"
  }
  const paramXml: Parametro ={
    DateValor: "",
    DouValor: 0,
    Entrada: true,
    IntValor: 0,
    Nombre: "P_DATA_XML",
    StringValor: xmlNovedades,
    Tipo: "s"
  }
  
  const paramCursor: Parametro ={
    DateValor: "",
    DouValor: 0,
    Entrada: false,
    IntValor: 0,
    Nombre: "P_CURSOR",
    StringValor: "string",
    Tipo: "c"
  }

  const arrayPar : Array<Parametro> =[];
  arrayPar.push(paramSticker, paramInformacion, paramDireccion, paramTelefono, 
    paramPersonaNomb, paramApellido, paramTipoDev, paramTipoReprog, paramMotivo, 
    paramUsuario, paramXml, paramCursor);

  const guardaObjetoDevolucion: FncStoreProcedureTag ={
    Parametros: arrayPar,
    Procedimiento: "PKG_SLT_CONTROL_ENTREGAS.PRC_NOVEDADES_GUARDAR",
    Tag: this.utilesService.obtenerConstantes().dinamicos.SLTREPROGR
  }

  try {
      
      let data = await this.utilesService.procesaDatosBloqueAnonimoDt(guardaObjetoDevolucion);

        if (data['Value'][0]['ID_ERROR']) {
          return [];
        } else if (data['Estado'] == false) {
          return [];
        } else {
          return data['Value'];
        }
      
  } catch (error) {
      return [];
  }
}


}