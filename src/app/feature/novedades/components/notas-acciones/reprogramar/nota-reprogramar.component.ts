import { SubSink } from 'subsink';
import { DatosUrl } from 'src/app/core/interfaces/datos-url';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'src/app/core/services/message.service';
import { DatetimeService } from 'src/app/core/services/datetime.service';
import { NovedadesService } from 'src/app/core/services/novedades.service';
import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { ReprogramacionCrear } from 'src/app/core/interfaces/reprogramacion-crear.interface';

@Component({
  selector: 'app-nota-reprogramar',
  templateUrl: './nota-reprogramar.component.html',
  styleUrls: ['./nota-reprogramar.component.scss']
})
export class NotaReprogramarComponent implements OnDestroy, OnChanges {

  public form: FormGroup;
  public tomorrowDate: any;
  public showSpinner = false;
  private subscriptions = new SubSink();

  /*
    Flag que indica si se puede o no
    gestionar una novedad, es decir
    1. Reprogramar
    2. Cambiar direccion
    3. Gestionar devolución
  */
  public isNovedadHabilitada = true;

  @Input() notaPedido : any = null;
  @Input() datosUrl : DatosUrl = {};

  constructor(
    private fb: FormBuilder,
    private messageSvc: MessageService,
    private datetimeSvc: DatetimeService,
    private novedadesSvc: NovedadesService
  ) {
    this.tomorrowDate = this.datetimeSvc.getTomorrow(); 
    this.form = this.fb.group({
      sticker: ['', Validators.required],
      fechaReprogramacion: ['', Validators.required],
      idDespachoDetalle: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.form.controls.sticker.setValue(this.datosUrl.sticker);
    this.form.controls.idDespachoDetalle.setValue(this.datosUrl.idDespachoDtl);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.notaPedido = changes.notaPedido.currentValue ? 
      changes.notaPedido.currentValue : null;

    this.isNovedadHabilitada = (this.notaPedido?.FLAG_PANTALLA_ACCION === 0) ?
      false : true; 
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.showSpinner = true;
      const nuevaRepro: ReprogramacionCrear = this._prepareDataBeforeSend(this.form.value);

      this.subscriptions.add(
        this.novedadesSvc.guardarReprogramacion(nuevaRepro)
          .subscribe({
            next: data => {
              console.log(data);  
              if (data[0].ID > 0){
                this.messageSvc.success();
              }else{
                this.messageSvc.error('No se pudo realizar la reprogramación');
              }
            },
            error: err => {
              this.showSpinner = false;
              this.messageSvc.error(err);
            },
            complete: () => this.showSpinner = false
          })
      );
    }
    return;
  }

  private _prepareDataBeforeSend(data: any): ReprogramacionCrear {
    const reprogramacion: ReprogramacionCrear = {
      sticker: data.sticker,
      idDespachoDetalle: data.idDespachoDetalle,
      fechaReprogramacion: this.datetimeSvc.dateToDayMonthYearh(data.fechaReprogramacion._d)
    }
    return reprogramacion;
  }

  onFormReset(): void {
    this.form.reset();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}