import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorHttpService } from '../servicios/interceptor-http/interceptor-http.service';

import { MapaService } from './services/mapa.service';
import { TiendaService } from './services/tienda.service';
import { MessageService } from './services/message.service';
import { DatetimeService } from './services/datetime.service';
import { NovedadesService } from './services/novedades.service';
import { DatosDePruebaService } from './services/datos-de-prueba.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    HttpClientModule,
    FormsModule
  ],
  providers: [
    MapaService,
    TiendaService,
    MessageService,
    DatetimeService,
    NovedadesService,
    DatosDePruebaService,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorHttpService,
      multi: true
    }
  ]
})
export class CoreModule { }
