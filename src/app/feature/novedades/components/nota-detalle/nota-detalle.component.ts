import { Component, OnDestroy, OnInit } from '@angular/core';

import { SubSink } from 'subsink';
import { NotaPedido } from 'src/app/core/interfaces/nota-pedido.interface';
import { DatosDePruebaService } from 'src/app/core/services/datos-de-prueba.service';
@Component({
  selector: 'app-nota-detalle',
  templateUrl: './nota-detalle.component.html',
  styleUrls: ['./nota-detalle.component.scss']
})
export class NotaDetalleComponent implements OnInit, OnDestroy {

  public data: NotaPedido[] = [];
  private subscriptions = new SubSink();

  constructor(
    private datosDePruebaSvc: DatosDePruebaService,
  ) {}

  ngOnInit(): void {
    this._setDataSource();
  }

  private _setDataSource(): void {
    this.subscriptions.add(
      this.datosDePruebaSvc.getAll()
        .subscribe({
          next: data => {
            this.data = data;
          },
          error: err => console.log(err)
        })
    );
  }
  
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}