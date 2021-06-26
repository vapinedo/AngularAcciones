import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Novedad } from '../interfaces/novedad.interface';
import { FiltroNovedad } from '../interfaces/filtro-novedad.interface';
import { ReprogramacionCrear } from '../interfaces/reprogramacion-crear.interface';
@Injectable()
export class NovedadesService {

    private readonly baseUrl: string = environment.host;
    private readonly endPointDinamicos: string = 'GetDtObjTag';
    private readonly endPointPaquetesCursor: string = 'FncStoreProcedureTagDt';
    private readonly endPointPaquetesNumero: string = 'FncStoreProcedureTagDt32';

    // Emit event when novedades get new data from backend
    public onNovedadesChange: EventEmitter<Novedad[]> = new EventEmitter<Novedad[]>();

    private readonly separador = '#';
    private readonly token = '?token=PERE07';
    // private readonly TIEMPO_DE_REPUESTA = 1000;

    private data: Novedad[] = [
        { 
            id: 1,
            nombre: 'Reprogramaciones',
            total: '25,567',
            porcentaje: 25,
            icono: 'event',
            path: `http://localhost:4300/${this.token}` 
        },
        { 
            id: 4,
            nombre: 'Retractos',
            total: '20,414',
            porcentaje: 20,
            icono: 'https',
            path: ''
        },
        { 
            id: 5,
            nombre: 'Recolecciones',
            total: '10,324',
            porcentaje: 10,
            icono: 'cached',
            path: ''
        },
        { 
            id: 3,
            nombre: 'Averías',
            total: '30,126',
            porcentaje: 30,
            icono: 'report_off',
            path: ''
        }
    ];

    constructor(
        private http: HttpClient
    ) {}

    // Servicios para cabecera
    getDinamico1(): Observable<any> {
        const param = '#PERE07';
        const dinamico = 'GETTUSUARI';

        const body = {
            "Tag": `${dinamico}`,
            "Parametros": `${param}`,
            "Separador": `${this.separador}`
        };
        return this.http.post(`${this.baseUrl}/${this.endPointDinamicos}`, body)
            .pipe(pluck('Value'));
    }

    getDinamico2(): Observable<any> {
        const param = '#SLTJCONENT';
        const dinamico = 'SLTCONFIG';

        const body = {
            "Tag": `${dinamico}`,
            "Parametros": `${param}`,
            "Separador": `${this.separador}`
        };
        return this.http.post(`${this.baseUrl}/${this.endPointDinamicos}`, body)
            .pipe(pluck('Value'));
    }

    getDinamico3(): Observable<any> {
        const sticker = '#261500024325';
        const dinamico = 'SLTENCNOVE';

        const body = {
            "Tag": `${dinamico}`,
            "Parametros": `${sticker}`,
            "Separador": `${this.separador}`
        };
        return this.http.post(`${this.baseUrl}/${this.endPointDinamicos}`, body)
            .pipe(pluck('Value'));
    }

    getCabeceraNotaPedido(sticker?:string, idDespachoDtl?:string): Observable<any> {
        const dinamico = 'CECABECACC';
        const body = {
            "Tag": `${dinamico}`,
            "Parametros": `#${sticker}#${idDespachoDtl}`,
            "Separador": `${this.separador}`
        };
        return this.http.post(`${this.baseUrl}/${this.endPointDinamicos}`, body)
            .pipe(pluck('Value'));
    }
    // Fin servicios para cabecera

    create(): Observable<boolean> {
        return new Observable(observer => {
            setTimeout(() => {
                observer.next(true);
                observer.complete();
            }, 2500)
        });
    }

    getTodas(): Observable<any> {
        const dinamico = 'TIPNOVCE';

        const body = {
            "Tag": `${dinamico}`,
            "Separador": `${this.separador}`,
            "Parametros": `${this.separador}`
        };
        return this.http.post(`${this.baseUrl}/${this.endPointDinamicos}`, body)
            .pipe(pluck('Value'));
    }

    getEstados(): Observable<any> {
        const dinamico = 'SELECESTCE';

        const body = {
            "Tag": `${dinamico}`,
            "Separador": `${this.separador}`,
            "Parametros": `${this.separador}`
        };
        return this.http.post(`${this.baseUrl}/${this.endPointDinamicos}`, body)
            .pipe(pluck('Value'));
    }

    getAll(): Observable<any> {
        const tienda =  -1;
        const estado = -1;
        const fechaFin = '01/05/2021';
        const fechaInicio = '01/01/2020';

        const token = '?token=PERE07';
        const dinamico = 'CANTINOVCE';

        const body = {
            "Tag": `${dinamico}`,
            "Separador": `${this.separador}`,
            "Parametros": `
                ${this.separador}${tienda}
                ${this.separador}${estado}
                ${this.separador}${fechaInicio}
                ${this.separador}${fechaFin}`
        };
        return this.http.post(`${this.baseUrl}/${this.endPointDinamicos}`, body)
            .pipe(
                pluck('Value'),
                map((data: any) => {
                    data.forEach(function(item:any) {
                        item.PATH = `http://localhost:4300/${token}`;
                        item.ICONO = 'event';
                    });
                    this.onNovedadesChange.emit(data);
                    return data;
                })
            );
    }

    getByFilter(filter: FiltroNovedad): Observable<any> {
        const token = '?token=PERE07';
        const dinamico = 'CANTINOVCE';

        const body = {
            "Tag": `${dinamico}`,
            "Separador": `${this.separador}`,
            "Parametros": `
                ${this.separador}${filter.tienda}
                ${this.separador}${filter.estado}
                ${this.separador}${filter.fechaInicio}
                ${this.separador}${filter.fechaFin}`
        };
        return this.http.post(`${this.baseUrl}/${this.endPointDinamicos}`, body)
            .pipe(
                pluck('Value'),
                map((data: any) => {
                    data.forEach(function(item:any) {
                        item.PATH = `http://localhost:4300/${token}`;
                        item.ICONO = 'event';
                    });
                    this.onNovedadesChange.emit(data);
                    return data;
                })
            );
    }

    getAccionesByIdNovedad(idNovedad: number): Observable<any> {
        const dinamico = 'SELACNOVCE';

        const body = {
            "Tag": `${dinamico}`,
            "Separador": `${this.separador}`,
            "Parametros": `${this.separador}${idNovedad}`
        };
        return this.http.post(`${this.baseUrl}/${this.endPointDinamicos}`, body)
            .pipe(pluck('Value'));
    }

    // getAll(): Observable<Novedad[]> {
    //     return new Observable(observer => {
    //         setTimeout(() => {
    //             observer.next(this.data);
    //             observer.complete();
    //         }, this.TIEMPO_DE_REPUESTA)
    //     });
    // }

    guardarReprogramacion(reprogramacion: ReprogramacionCrear): Observable<any> {
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
                    "StringValor": `${reprogramacion.sticker}`,
                    "Nombre": "P_STICKER_O_NOTA"
                },
                {
                    "Tipo": "s",
                    "IntValor": 0,
                    "DouValor": 0,
                    "DateValor": "",
                    "Entrada": true,
                    "StringValor": "REPR",
                    "Nombre": "P_TIPO_CONSULTA"
                },
                {
                    "Tipo": "s",
                    "IntValor": 0,
                    "DouValor": 0,
                    "DateValor": "",
                    "Entrada": true,
                    "StringValor": `#${reprogramacion.sticker}#${reprogramacion.idDespachoDetalle}#${reprogramacion.fechaReprogramacion}`,
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