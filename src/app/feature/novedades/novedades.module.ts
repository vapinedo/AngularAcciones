import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { NovedadesRoutingModule } from './novedades-routing.module';

import { AgmCoreModule } from '@agm/core';
import { AccionesAdminComponent } from './pages/acciones/acciones-admin.component';
import { NotaDetalleComponent } from './components/nota-detalle/nota-detalle.component';
import { FiltroNotasComponent } from './components/filtro-notas/filtro-notas.component';
import { VentanaModalComponent } from './components/ventana-modal/ventana-modal.component';
import { NotaCabeceraComponent } from './components/notas-acciones/cabecera/nota-cabecera.component';
import { ReprogramacionesAdminComponent } from './pages/reprogramaciones/reprogramaciones-admin.component';
import { NotaDevolucionComponent } from './components/notas-acciones/devolucion/nota-devolucion.component';
import { NotaReprogramarComponent } from './components/notas-acciones/reprogramar/nota-reprogramar.component';
import { CambioDireccionComponent } from './components/notas-acciones/cambioDireccion/cambio-direccion.component';

const components = [
  NotaDetalleComponent,
  FiltroNotasComponent,
  VentanaModalComponent,
  NotaCabeceraComponent,
  AccionesAdminComponent,
  NotaDevolucionComponent,
  NotaReprogramarComponent,
  ReprogramacionesAdminComponent,
  CambioDireccionComponent
];

const entryComponents = [
  VentanaModalComponent,
];

const modules = [
  CommonModule,
  SharedModule,
  NovedadesRoutingModule,
  AgmCoreModule.forRoot({
    apiKey: 'AIzaSyCPJsMSLLVqNI2nRugDI5CJKWkUTOs425o'    
 })
];

@NgModule({
  declarations: [components],
  exports: [components],
  imports: [modules],
  entryComponents:[entryComponents] 
})
export class NovedadesModule { }
