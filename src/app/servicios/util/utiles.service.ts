import { Injectable } from '@angular/core';

import * as moment from 'moment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constantes } from 'src/app/constantes/Constantes';
/**Modelos */
import { GetDataObjectModel } from 'src/app/modelos/GetDataObjectModel.model'
/**Material */
import { MatSnackBar } from '@angular/material/snack-bar';
import { RespuestaApi } from 'src/app/modelos/RespuestaApi.model';
import { InterfazGenerica } from 'src/app/interfaces/InterfazOperacionesGenericas';
import { FncStoreProcedureTag } from 'src/app/modelos/FncStoreProcedureTag.model';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { AnimationPlayer, style, animate, AnimationBuilder } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { RespuestaAccesoDatos } from 'src/app/core/models/respuesta-acceso-datos.model';

const params = new URLSearchParams(window.location.search);

@Injectable({
    providedIn: 'root'
})
export class UtilesService implements InterfazGenerica {
    public constantes = this.obtenerConstantes();

    public tituloSubject = new BehaviorSubject<string>("Titulo");
    public titulo$ = this.tituloSubject.asObservable();

    public volverSubject = new BehaviorSubject<any>({ rutaNueva: '', boton: false });
    public volver$ = this.volverSubject.asObservable();
    private splashScreenEl: any;

    
    constructor(
        private snackBar: MatSnackBar,
        private http: HttpClient,
        private _router: Router,
        @Inject(DOCUMENT) private _document: any,
        private _animationBuilder: AnimationBuilder,
    ) {
        this.iniciarSplash();
    }

    async procesaDatosBloqueAnonimoDt(objetoProcedimiento: FncStoreProcedureTag): Promise<RespuestaApi> {
        return await this.http.post<RespuestaApi>(this.constantes.getFncStoreProcedureTagDt(),
            objetoProcedimiento).toPromise();
    }

    async procesaDatosBloqueAnonimo32(objetoProcedimiento: FncStoreProcedureTag): Promise<RespuestaApi> {
        return await this.http.post<RespuestaApi>(this.constantes.getFncStoreProcedureTagDt(),
            objetoProcedimiento).toPromise();
    }

    // async obtenerDatosCursor(objetoObtener: GetDataObjectModel): Promise<RespuestaApi> {
    //     return await this.http.post<RespuestaApi>(this.constantes.getGetDtObjTag(),
    //         objetoObtener).toPromise().then(r => r);
    // }

    async obtenerDatosCursor(objetoObtener: GetDataObjectModel): Promise<RespuestaApi> {
        return await this.http.post<RespuestaApi>(this.constantes.getGetDtObjTag(),
            objetoObtener, {headers: this.obtenerToken()}).toPromise().then(r => r);
    }

    obtenerToken (): HttpHeaders{
        return new HttpHeaders({
            "Content-Type": "application/json", Authorization: 'Bearer ' + sessionStorage.getItem('fullToken')
          });
    }

    /**
     * Presenta los mensajes de error para la aplicación
     * @param mensaje - Variable de tipo string que presenta el mensaje al usuario
     * @param panelClass - Variable que indica el color del panel
     * @param duracion - Variable que indica la duración en pantalla
     */
    mostrarSnacbarMensaje(mensaje: string, panelClass: string = 'error-snackbar', duracion: number = 10000) {
        //this._fuseService.hide();
        this.snackBar.open(mensaje, 'X', {
            duration: duracion,
            panelClass: [panelClass],
            verticalPosition: 'top',
            horizontalPosition: 'end'
        });
    }

    /**
     * @param fecha Fecha 
     * @param formato formato a revolver
     */
    castearFecha(fecha: string, formato?: string) {
        if (fecha) {
            return moment(fecha).format(formato || 'DD/MM/YYYY HH:mm:ss');
        } else {
            return '';
        }
    }

    /**
     * Remueve los observable que no estan ciendo usados
     * @return funcion que no retorna datos
     */
    removeObservable(elemento: { observers: any[]; }) {
        for (let key in elemento.observers) {
            if (+key + 1 < elemento.observers.length) {
                elemento.observers.splice(+key, 1);
            }
        }
    }

    async obtenerTienda(): Promise<boolean> {
        const obtenerTiendaUsuario: GetDataObjectModel = {
            Tag: this.constantes.dinamicos.GETTUSUARI,
            Parametros: `#${sessionStorage.getItem("usuario")}`,
            Separador: "#"
        }
        try {
            const datosTienda = await this.obtenerDatosCursor(obtenerTiendaUsuario);
            sessionStorage.setItem("tienda", datosTienda.Value[0].ORG_LVL_NUMBER);
            sessionStorage.setItem("nombreTienda", datosTienda.Value[0].ORG_NAME_FULL);
            sessionStorage.setItem("nombreUsuario", datosTienda.Value[0].NOMBRE_CONTACTO);
            sessionStorage.setItem("documento", datosTienda.Value[0].DOCUMENTO);
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Retorna el string del usuario que esta usando la aplicación
     */
    obtenerUsuario(): string {
        return sessionStorage.getItem('usuario') || "No encontrado";
    }

    /**
     * Obtiene una instancia del archivo constantes
     */
    obtenerConstantes(): Constantes {
        return Constantes.obtenerInstancia();
    }

    /**
     * obtiene parametros generales para la aplicación
     */
    async obtenerParametrosDinamicoConfiguracion(): Promise<void> {
        const obtenerParametrosConfiguracion: GetDataObjectModel = {
            Tag: this.constantes.dinamicos.SLTCONFIG,
            Parametros: `#${this.constantes.dinamicos.JUNIGCONCF}`,
            Separador: "#"
        }
        try {
            const datosConfiguracion = await this.obtenerDatosCursor(obtenerParametrosConfiguracion);
            if (datosConfiguracion){
                this.obtenerConstantes().configuraciones = datosConfiguracion.Value[0];
            }
        } catch (error) {
            this.mostrarSnacbarMensaje(error, "", 500);
        }
    }
    /**
     * Función que consulta los permisos del usuario
     */
    async obtenerRolesUsuario(): Promise<boolean> {
        const obtenerRolUsuario: GetDataObjectModel = {
            Tag: "string",
            Parametros: "",
            Separador: "#"
        }
        try {
            const datosRolUsuario = await this.obtenerDatosCursor(obtenerRolUsuario);
            sessionStorage.setItem('permisos', JSON.stringify(datosRolUsuario.Value[0]));
            return true;
        } catch (error) {
            sessionStorage.removeItem('permisos');
            return false;
        }
    }

    /**
     * Funcion que remueve una variable de sessionStorage
     * @param nombre variable que bucas el parámetro 
     */
    removerVariableSession(nombre: string): void {
        sessionStorage.removeItem(nombre);
    }

    /**
     * obtiene valores enviados en url, relacionados con el token
     */
    obtenerparametrosURL() {
        if (params.get("token")) {
            const cod: string = params.get("token") || '';
            sessionStorage.setItem("fullToken", cod || '');
            let tokenVector = cod.split(";");
            sessionStorage.setItem("usuario", tokenVector[0]);
        } else {
            this._router.navigate(['/paginaerror']);
        }
    }

  

    /**
     * Setea el titulo a agregar
     * @param titulo titulo a agregar en app.component
     */
    asignarTitulo(titulo: string): void {
        this.tituloSubject.next(titulo);
    }

    /**
     * envia si desea el boton de volver
     * @param ruta objeto con booleano para mostrar y ruta a redireccionar
    */
    asignarBotonVolver(ruta: string): void {
        this.volverSubject.next(ruta);
    }

    /**
     * inicia el splash
     * @private
     */
    private iniciarSplash(): void {
        this.splashScreenEl = this._document.body.querySelector('#splash');
        if (this.splashScreenEl) {
            this._router.events
                .pipe(
                    filter((event => event instanceof NavigationEnd)),
                    take(1)
                )
                .subscribe(() => {
                    setTimeout(() => {
                        this.hide();
                    });
                });
        }
    }
    /**
     * Esconde el splash
     */
    hide(): void {
        const player: AnimationPlayer =
            this._animationBuilder
                .build([
                    style({ opacity: '1' }),
                    animate('10ms ease', style({
                        opacity: '0',
                        zIndex: '-10'
                    }))
                ]).create(this.splashScreenEl);

        setTimeout(() => {
            player.play();
            this.splashScreenEl.remove();
        }, 120);

    }

    obtenerConfiguracion(): Observable<any> {       
        let peticion = new GetDataObjectModel(`${this.obtenerConstantes().dinamicos.SLTCONFIG}`, `#${this.obtenerConstantes().dinamicos.JUNIGCONCF}`, '#');
        return this.http.post<RespuestaAccesoDatos>(`${this.obtenerConstantes().getGetDtObjTag()}`, peticion);
    }

}
