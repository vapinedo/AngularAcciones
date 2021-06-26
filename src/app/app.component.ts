import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DialogoConfirmarComponent } from './componentes/componentesGenericos/dialogo-confirmar/dialogo-confirmar.component';
import { DialogoService } from './servicios/dialogo/dialogo.service';
import { UtilesService } from './servicios/util/utiles.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  titulo = 'PlantillaAngular11';
  private _unsubscribeAll: Subject<any>;
  volver = { rutaNueva: '', boton: false };
  public cambio: boolean = false;

  constructor(
    private util: UtilesService,
    private router: Router,
    private dialog: DialogoService
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.util.obtenerparametrosURL();
    this.util.obtenerTienda();
    this.util.obtenerParametrosDinamicoConfiguracion();
    this.util.titulo$.subscribe(res => {
      this.titulo = res;
    });
    this.util.volver$.subscribe(res => {
      this.volver = res;
    });
    this.loadScript('http://maps.googleapis.com/maps/api/js?key='+environment.apiKey);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  volverRuta() {
    if (this.cambio) {
      this.dialog.fijarTitulo("confirmar");
      this.dialog.fijarMensaje("¿Desea salir de la pantalla actual?");
      this.dialog.abrir(DialogoConfirmarComponent);
      this.dialog.accionConfirmarDialogo(() => {
        this.cambio = false;
        this.volverUrl();
      });
    } else {
      this.volverUrl();
    }
  }

  volverUrl() {
    if (this.volver.rutaNueva != null) {
      this.router.navigate([this.volver.rutaNueva])
    } else {
      history.back()
    }
  }

  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }


}
