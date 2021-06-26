import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { 
    HttpEvent, 
    HttpHeaders, 
    HttpHandler, 
    HttpRequest, 
    HttpResponse, 
    HttpSentEvent, 
    HttpUserEvent,
    HttpInterceptor, 
    HttpErrorResponse, 
    HttpProgressEvent, 
    HttpHeaderResponse, 
} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { UtilesService } from '../util/utiles.service';
@Injectable()
export class InterceptorHttpService implements HttpInterceptor {

    constructor(
        private utilesService: UtilesService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any> | HttpEvent<any>> {
        const headers = new HttpHeaders({
            // 'pragma': 'no-cache',
            // 'Cache-Control': 'no-cache',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        });
        const cloneReq = req.clone({ headers });

        return next.handle(cloneReq).pipe(
            map((event: any) => {
                if (event instanceof HttpResponse) {
                    let inValid = this.errorResponse(event.body);
                    if (inValid) {
                        return null;
                    }
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                this.erroresHttpPeticion(error.status);
                return throwError(error);
            })
        );
    }

    erroresHttpPeticion(status: number) {
        if (!status) {
            return false;
        }

        let mensaje: string = '';
        switch (status) {
            case 400:
                mensaje = 'Datos enviados insuficientes.';
                break;
            case 401:
                mensaje = 'Acceso no autorizado.';
                break;
            case 415:
                mensaje = 'Tipo de solicitud erronea.';
                break;
            case 500:
                mensaje = 'Error al ejecutar el proceso.';
                break;
            default:
                mensaje = 'Se presento un problema con la aplicación, por favor comuniquese con un administrador.';
                break;
        }
        this.utilesService.mostrarSnacbarMensaje(mensaje);
        return true;
    }

    errorResponse(data: any): boolean {
        if (data) {
            try {
                if (data['Estado'] == false && data['Value'][0].Mensaje != 'La consulta no obtuvo registros.') {
                    this.utilesService.mostrarSnacbarMensaje(data['Value'][0].Mensaje);
                    return true;
                }
            } catch (error) { }

            if (typeof data['Value'] != 'undefined' && data['Value'] != 1) {
                try {
                    if (typeof data['Value'][0].ID_ERROR != 'undefined') {
                        if (typeof data['Value'][0].DESCRIPCION != 'undefined') {
                            this.utilesService.mostrarSnacbarMensaje(data['Value'][0].DESCRIPCION);
                        } else if (typeof data['Value'][0].Mensaje != 'undefined') {
                            this.utilesService.mostrarSnacbarMensaje(data['Value'][0].Mensaje);
                        }

                        return true;
                    }
                } catch (error) { }

                try {
                    if (data['Value'] == -1) {
                        this.utilesService.mostrarSnacbarMensaje(data['Mensaje']);
                        return true;
                    }
                } catch (error) { }

                try {
                    if (data['Value'][0].Mensaje == 'La consulta no obtuvo registros.') {
                        // this.utilesService.mostrarSnacbarMensaje(data['Value'][0].Mensaje);
                        return true;
                    }
                    if (data['Value'][0].Mensaje == 'Algún parametro no es correcto.') {
                        // this.utilesService.mostrarSnacbarMensaje(data['Value'][0].Mensaje);
                        return true;
                    }
                } catch (error) { }

                try {
                    if (typeof data['Value'][0].CODIGO_INTERNO != 'undefined') {
                        if (data['Value'][0].CODIGO_INTERNO == -1.0) {
                            let mensaje = "Se presento un problema";
                            if (data['Value'][0].ESTADO_INTERNO != "--") {
                                try {
                                    mensaje += `: ${data['Value'][0].ESTADO_INTERNO}`;
                                } catch (error) { }
                            }
                            this.utilesService.mostrarSnacbarMensaje(mensaje);
                            return true;
                        }
                    }
                } catch (error) { }
            }

        }

        return false;
    }
}
