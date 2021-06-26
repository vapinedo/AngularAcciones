import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GetDataObjectModel } from "../models/get-data-object";
import { UtilesService } from "src/app/servicios/util/utiles.service";
import { RespuestaAccesoDatos } from "../models/respuesta-acceso-datos.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { map, pluck } from 'rxjs/operators';
import { AlmacenamientoMapa } from "../interfaces/almacenamiento-mapa.interface";
@Injectable()
export class MapaService {
  private readonly baseUrl: string = environment.host;
  private readonly endPointPaquetesCursor: string = 'FncStoreProcedureTagDt';
  
  constructor(private http: HttpClient,
    private util: UtilesService) { }

  obtenerDepartamentos(): Observable<any> {
    let peticion = new GetDataObjectModel(`${this.util.obtenerConstantes().dinamicos.GETDPRTMTO}`, `#`, '#');
    return this.http.post<any>(`${this.util.obtenerConstantes().getGetDtObjTag()}`, peticion);
  }


  obtenerCiudadesDept(idDepartamento: string): Observable<any> {
    let peticion = new GetDataObjectModel(`${this.util.obtenerConstantes().dinamicos.GETCIDADPT}`, `#${idDepartamento}`, '#');
    return this.http.post<RespuestaAccesoDatos>(`http://10.23.14.95:8995/Servicios/AccesoDatos_1.0.0/api/SGL/GetDtObjTag`, peticion);
  }

  consultarApiNormalizacion(ciudad: any, direccion: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*',
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'es-CO,es-419;q=0.9,es;q=0.8,en;q=0.7',
      'Connection': 'keep-alive'
    });

    //return this.http.get(this.util.obtenerConstantes().configuracion.geoReferenciacionUrl + '?ciudad=' + ciudad + '&direccion=' + encodeURIComponent(direccion) + '&centroide=true');
    return this.http.get(this.util.obtenerConstantes().configuracion.geoReferenciacionUrl + '?ciudad=' + ciudad + '&direccion=' + encodeURIComponent(direccion) + '&centroide=true', { headers });


  }

  guardarCambioDireccion(): Observable<any> {
    let peticion = new GetDataObjectModel(`${this.util.obtenerConstantes().dinamicos.GETDPRTMTO}`, `#`, '#');
    return this.http.post<any>(`${this.util.obtenerConstantes().getGetDtObjTag()}`, peticion);
  }

  guardarDireccion(almacenamientoMapa: AlmacenamientoMapa): Observable<any> {
    const body = {
      "Tag": "GETNPCOENT",
      "Procedimiento": "PKG_SLT_CONTROL_ENTREGAS.PRC_CE_ACT_CRE",
      "Parametros": [
        {
          "Tipo": "s",
          "IntValor": 0,
          "DouValor": 0,
          "DateValor": "",
          "Entrada": true,
          "StringValor": `${almacenamientoMapa.sticker}`,
          "Nombre": "P_STICKER_O_NOTA"
        },
        {
          "Tipo": "s",
          "IntValor": 0,
          "DouValor": 0,
          "DateValor": "",
          "Entrada": true,
          "StringValor": "DIREC",
          "Nombre": "P_TIPO_CONSULTA"
        },
        {
          "Tipo": "s",
          "IntValor": 0,
          "DouValor": 0,
          "DateValor": "",
          "Entrada": true,
          "StringValor": `#${almacenamientoMapa.sticker}#${almacenamientoMapa.idDespachoDtl}#${almacenamientoMapa.fechaReprog}#${almacenamientoMapa.idDireccion}#${almacenamientoMapa.latitud}#${almacenamientoMapa.longitud}`,
          "Nombre": "P_PARAMETROS"
        },
        {
          "Tipo": "c",
          "IntValor": 0,
          "DouValor": 0,
          "DateValor": "",
          "Entrada": false,
          "StringValor": "",
          "Nombre": "P_SALIDA"
        }
      ]
    };
    return this.http.post(`${this.baseUrl}/${this.endPointPaquetesCursor}`, body)
      .pipe(pluck('Value'));
  }
}
