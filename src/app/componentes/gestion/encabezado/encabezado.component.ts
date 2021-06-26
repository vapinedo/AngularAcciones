import { Component, OnInit } from '@angular/core';
import { DialogoService } from 'src/app/servicios/dialogo/dialogo.service';
import { UtilesService } from 'src/app/servicios/util/utiles.service';
import { DialogoConfirmarComponent } from '../../componentesGenericos/dialogo-confirmar/dialogo-confirmar.component';
import { SplashComponent } from '../../componentesGenericos/splash/splash.component';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss']
})
export class EncabezadoComponent implements OnInit {

  constructor(
    public dialogo: DialogoService,
    private util: UtilesService
  ) { }

  ngOnInit(): void {
    this.util.asignarTitulo("Gestión");
  }


}
