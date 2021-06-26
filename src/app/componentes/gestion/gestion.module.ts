import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { DetalleComponent } from './detalle/detalle.component';
import { PrincipalComponent } from './principal/principal.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: PrincipalComponent
  }
];
@NgModule({
  declarations: [EncabezadoComponent, DetalleComponent, PrincipalComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [EncabezadoComponent, DetalleComponent, PrincipalComponent, RouterModule],
  entryComponents: [EncabezadoComponent, DetalleComponent, PrincipalComponent]
})
export class GestionModule { }
