import { SubSink } from 'subsink';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'src/app/core/services/message.service';
import { NovedadesService } from 'src/app/core/services/novedades.service';

@Component({
  selector: 'app-nota-cabecera',
  templateUrl: './nota-cabecera.component.html',
  styleUrls: ['./nota-cabecera.component.scss']
})
export class NotaCabeceraComponent implements OnInit, OnDestroy {

  private subscriptions = new SubSink();
  @Input() notaPedido : any = null;

  constructor(
    private messageSvc: MessageService,
    private novedadesSvc: NovedadesService
  ) {}
  
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}