import { SubSink } from 'subsink';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DatosUrl } from 'src/app/core/interfaces/datos-url';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'src/app/core/services/message.service';
import { NotaPedido } from 'src/app/core/interfaces/nota-pedido.interface';
import { NovedadesService } from 'src/app/core/services/novedades.service';

@Component({
  selector: 'app-acciones-admin',
  templateUrl: './acciones-admin.component.html',
  styleUrls: ['./acciones-admin.component.scss']
})
export class AccionesAdminComponent implements OnInit, OnDestroy {

  public panelOpenState = false;
  public data: NotaPedido[] = [];
  public datosUrl: DatosUrl = {};
  public notaPedido!: NotaPedido;
  private subscriptions = new SubSink();

  constructor(
    public dialog: MatDialog,
    private messageSvc: MessageService,
    private novedadesSvc: NovedadesService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.datosUrl = {
      modulo:  this.activatedRoute.snapshot.paramMap.get("Modulo") || '',
      sticker :this.activatedRoute.snapshot.paramMap.get("Sticker") || '',
      idTipoNovedad:  this.activatedRoute.snapshot.paramMap.get("TipoNovedad") || '',
      idDespachoDtl: this.activatedRoute.snapshot.paramMap.get("IdDespachoDtl") || ''
    }
    this._getCabeceraNotaPedido();
    // this.subscriptions.add(
    //   this.NovedadesSvc.getAccionesByIdNovedad(1)
    //     .subscribe(data => console.log('Cabecera => ', data))
    // );
  }
  
  // private _getParamFromUrl(param: string): string | null {
  //   return this.route.snapshot.paramMap.get(param);
  // }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private _getCabeceraNotaPedido(): void {
    const sticker = this.datosUrl.sticker;
    const idDespachoDtl = this.datosUrl.idDespachoDtl;

    this.subscriptions.add(
      this.novedadesSvc.getCabeceraNotaPedido(sticker, idDespachoDtl)
        .subscribe({
          next: data => {
            this.notaPedido = data[0];
          },
          error: err => this.messageSvc.error(err)
        })
    );
  }

  
}