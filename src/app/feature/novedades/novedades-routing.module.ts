import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccionesAdminComponent } from './pages/acciones/acciones-admin.component';
import { ReprogramacionesAdminComponent } from './pages/reprogramaciones/reprogramaciones-admin.component';

const routes: Routes = [
  // { path: '', component: ReprogramacionesAdminComponent, data: { breadcrumb: 'Reprogramadas' } },
  { path: 'acciones/:Sticker/:IdDespachoDtl/:TipoNovedad/:Modulo', component: AccionesAdminComponent, data: { breadcrumb: 'Acciones' } },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class NovedadesRoutingModule { }