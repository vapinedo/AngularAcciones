import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tienda } from '../interfaces/tienda.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class TiendaService {

    private endPoint: string = 'GetDtObjTag';
    private apiUrl: string = environment.host;

    constructor(
        private http: HttpClient
    ) {}

    getAll(): Observable<Tienda[]> {
        const body = {
            "Separador": "#",
            "Parametros": "#",
            "Tag": "LOKBODTDA"
        };
        return this.http.post(`${this.apiUrl}/${this.endPoint}`, body)
            .pipe(
                pluck('Value')
            );
    }

}