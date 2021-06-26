import { ToastrService } from 'ngx-toastr';
import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

import { SubSink } from 'subsink';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotaPedido } from 'src/app/core/interfaces/nota-pedido.interface';
import { DatosDePruebaService } from 'src/app/core/services/datos-de-prueba.service';
import { NotaDevolucionService } from 'src/app/servicios/nota-devolucion/nota-devolucion.service';
import { UtilesService } from 'src/app/servicios/util/utiles.service';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { DialogoService } from 'src/app/servicios/dialogo/dialogo.service';
import { SplashComponent } from 'src/app/componentes/componentesGenericos/splash/splash.component';
import { NovedadSku } from 'src/app/modelos/novedad-sku';
import * as JsonToXML from "js2xmlparser";
@Component({
  selector: 'app-nota-devolucion',
  templateUrl: './nota-devolucion.component.html',
  styleUrls: ['./nota-devolucion.component.scss']
})
export class NotaDevolucionComponent implements OnInit, OnDestroy {

  public isNovedadHabilitada = true;
  @Input() notaP : any = null;

  sticker: string ='';
  idDespachoDtl: string = '';
  public formHeader: FormGroup;
  public form: FormGroup[] = [];
  public data: any[] = [];
  private subscriptions = new SubSink();
  public motivos= [];
  encabezadoEditable: any = [];
  correos: Array<any> = [];
  telefonos: Array<any> = [];
  medios: any = [];
  public cantidadADevolver: number = 0;
  tieneDevolucion: boolean = false;
  
  public opcionesDevolucion: Array<any> = [
    { VALOR: 'Refacturar', NOMBRE: 'Refacturar' },
    { VALOR: 'Devolver valor pagado a cliente', NOMBRE: 'Devolver valor pagado a cliente' },
];
  nombreGestion: string ='';
  public buscarNP: string = '';
  public notaPedido: string = '';
  public mostrarMedios: boolean = false;
  public mostrarNotas: boolean = false;
  showInputCorreo: boolean = false;
    showInputTelefono: boolean = false;
    formTelefono: FormGroup;
    metodoDevolucion: string = "";

  constructor(
    private fbHeader: FormBuilder,
    private fb: FormBuilder,
    private fbTelefono: FormBuilder,
    private notaDevolucionService: NotaDevolucionService,
    private utilesService: UtilesService,
    private activatedRoute: ActivatedRoute,
    public dialogService: DialogoService
  ) {
    
    this.formHeader = this.fbHeader.group({
      correoControl: ['', [Validators.required]],
      usuario: ['', [Validators.required]],
      telefonoControl: ['', [Validators.required]],
      devolucionAcordada: ['', [Validators.required]]
      
    });
    this.formTelefono = this.fbTelefono.group({
      telefonoNuevo: [''],
      correoNuevo: [''],
      medioControl: ['', [Validators.required]],
      notaPedidoControl: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    //this._setDataSource();
    //this.sticker ='266880409033';
    this.sticker = this.activatedRoute.snapshot.paramMap.get("Sticker") || '';
    this.idDespachoDtl = this.activatedRoute.snapshot.paramMap.get("IdDespachoDtl") || '';

    this.obtenerDatos();
    this.obtenerMotivos();
    console.log(this.data);
    this.obtenerEncabezadoEditable();
    
    this.obtenerMediosDevolucion();

    //this.asignarFormulario(this.data);
  }

  
  ngOnChanges(changes: SimpleChanges): void {
    this.notaP = changes.notaP.currentValue ? 
      changes.notaP.currentValue : null;

    this.isNovedadHabilitada = (this.notaP?.FLAG_PANTALLA_ACCION === 0) ?
      false : true; 
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  asignarFormulario(data: NotaPedido[]) : void {
    let i = 0;
    data.forEach( element => {
      this.form[i] = this.fb.group({
        cantidadDevolver: [''],
        movitoDevolucion: ['']
      });
      i++;
    });
  }

  limpiarCampos(): void {
    this.form.forEach( element => {
      element.reset();
    });

    this.formHeader.reset();
  }

  async guardar(){
    

    if(this.validarCampos()){
      if(this.cantidadADevolver >0){
        

        this.dialogService.abrir(SplashComponent);

        var tipoDevolucion = 0;
        var idMotivoDevTotal: number = 0;
        var tipoReprogramacion: number = 1;

        this.data.forEach(function (value: any) {

          if(value['CANTIDAD_ENVIADA'] != value['CANTIDAD_DEVOLVER'] ){
            tipoDevolucion=1; //devolucion parcial
          }

        });

        if (tipoDevolucion == 0) {
          idMotivoDevTotal = this.data[0]['MOTIVO_DEVOLVER'];
          this.data.forEach(function (value: any) {

              if (value['MOTIVO_DEVOLVER'] != idMotivoDevTotal) {
                  idMotivoDevTotal = 0;
              }


          });
        }

      
        var resultadoServicio: any = await this.llamadoServicioDevolucion(this.data, tipoDevolucion );

        if (resultadoServicio['codigoRespuesta'] == 0) {
          if (resultadoServicio['resultado'][0]['CODIGO_INTERNO'] != -1) {
            this.procedimientoGuardar(this.sticker, this.data, tipoDevolucion, idMotivoDevTotal, tipoReprogramacion);
            this.utilesService.mostrarSnacbarMensaje(`Guardado exitosamente`, 'success-snackbar');
  
          }else{

          }this.utilesService.mostrarSnacbarMensaje(`Error al realizar el proceso`, 'warning-snackbar');
          
        }else
        {
          this.utilesService.mostrarSnacbarMensaje(`Error al realizar el proceso`, 'warning-snackbar');
        }

        this.dialogService.cerrar();


      }else{
        this.utilesService.mostrarSnacbarMensaje(`Ingrese un valor a devolver de algún producto`, 'warning-snackbar');
      }
    }


  }


  async obtenerDatos() {
    this.data = await this.notaDevolucionService.obtenerDetalle(this.sticker,this.idDespachoDtl);
    console.log(this.data);


    this.data.forEach(function (value: any) {
      value['CANTIDAD_ENTREGADA'] = 0;
      value['CANTIDAD_DEVOLVER'] = 0;
      value['CANTIDAD_REENVIO'] = 0;
      value['CANTIDAD_REPROGRAMACION'] = 0;
  });
  
  }

  async obtenerMotivos() {
    this.motivos = await this.notaDevolucionService.obtenerDatosMotivos();
    
  }

  async obtenerEncabezadoEditable() {
    try{
      this.encabezadoEditable = await this.notaDevolucionService.obtenerEncabezadoEditable(this.sticker);
      this.buildCorreos();
      this.buildTelefonos();
    } catch (error) {
      this.utilesService.mostrarSnacbarMensaje("Error al obtener datos encabezado")

  }
    
  }

  async obtenerMediosDevolucion() {
    this.medios = await this.notaDevolucionService.obtenerMediosDevolucion(this.sticker);
    
  }

  seleccionCorreo = (event:any) => {
    if (event.value.id === 0) {
        this.showInputCorreo = true;
        this.formTelefono.controls['correoNuevo'].enable();

    } else {
        this.showInputCorreo = false;
        this.formTelefono.controls['correoNuevo'].disable();
    }
}

seleccionTelefono = (event: any) => {

    if (event.value.id == 0) {
        this.showInputTelefono = true;
        this.formTelefono.controls['telefonoNuevo'].enable();
    } else {
        this.showInputTelefono = false;
        this.formTelefono.controls['telefonoNuevo'].disable();
    }
}


  buildCorreos = () => {
    this.correos.push({
        id: 0,
        descripcion: 'otro'
    });

    // Obtener correos
    if (this.encabezadoEditable) {
        if (this.encabezadoEditable['EMAIL'] != null) {
            this.correos.push({
                id: 1,
                descripcion: this.encabezadoEditable['EMAIL']
            });
        }
    }
}

buildTelefonos = () => {
    this.telefonos.push({
        id: 0,
        descripcion: 'otro'
    });

    //obtener telefonos
    if (this.encabezadoEditable) {
        if (this.encabezadoEditable['TELEFONO'] != null) {
            let telefonos: Array<string> = this.encabezadoEditable['TELEFONO'].split("-")
            telefonos.forEach((telefono, i) => {
                if (telefono) {
                    this.telefonos.push({
                        id: i + 1,
                        descripcion: telefono
                    })
                }
            });
        }
    }
}

cambioMetodoDevolucion(item: any) {
  this.mostrarMedios = false;
  this.mostrarNotas = false;

  if (item == this.opcionesDevolucion[0]['VALOR']) {
      this.mostrarNotas = true;

  } else if (item == this.opcionesDevolucion[1]['VALOR']) {
      this.mostrarMedios = true;

  }

}


async accionBuscarNP() {
  let data:any = '';

  if (this.buscarNP) {
      data = await this.notaDevolucionService.obtenerNP(this.buscarNP);
      
      
  }

  if (data) {
      this.notaPedido = data['NOTA_PEDIDO'];
  } else {
      this.notaPedido = '';
      this.utilesService.mostrarSnacbarMensaje(`La nota pedido ${this.buscarNP} no fue encontrada.`, 'warning-snackbar');
  }

}


validarCampos() {
  var valido = true;

  
  this.formHeader.get('devolucionAcordada')!.markAsTouched();
  this.formHeader.get('correoControl')!.markAsTouched();
  this.formHeader.get('usuario')!.markAsTouched();
  this.formHeader.get('telefonoControl')!.markAsTouched();


  if(!this.formHeader.invalid){
        
      if (this.nombreGestion == null || this.nombreGestion == "" || this.metodoDevolucion == "") {
        valido = false
    }

    if (this.formHeader.get('correoControl')!.value['id'] == null) {
        valido = false;
    }
    else if (this.formHeader.get('correoControl')!.value['id'] == 0) {
      this.formTelefono.get('correoNuevo')!.setValidators(
        [Validators.required,Validators.pattern('[a-zA-Z0-9]+[_\\w\\.\\-]*[a-zA-Z0-9]+@[a-zA-Z0-9][_\\w\\.\\-]*[a-zA-Z0-9]\\.[a-zA-Z][a-zA-Z\\.]*')]);
        this.formTelefono.get('correoNuevo')!.markAsTouched();
        if (this.formTelefono.get('correoNuevo')!.invalid) {
            valido = false;
        }
    }

    if (this.formHeader.get('telefonoControl')!.value['id'] == null) {
        valido = false;
    }
    else if (this.formHeader.get('telefonoControl')!.value['id'] == 0) {
      this.formTelefono.get('telefonoNuevo')!.setValidators([Validators.required]);
        this.formTelefono.get('telefonoNuevo')!.markAsTouched();
        if (this.formTelefono.get('telefonoNuevo')!.invalid) {
            valido = false;
        }
    }


    if (this.metodoDevolucion == this.opcionesDevolucion[0]['VALOR']) {
      this.formTelefono.get('notaPedidoControl')!.setValidators([Validators.required]);
      this.formTelefono.get('notaPedidoControl')!.markAsTouched();

        if (this.notaPedido == null || this.notaPedido == "") {
            valido = false;
        }
    }

    if (this.metodoDevolucion == this.opcionesDevolucion[1]['VALOR']) {
      this.formTelefono.get('medioControl')!.setValidators([Validators.required]);
      this.formTelefono.get('medioControl')!.markAsTouched();

        if (this.formTelefono.get('medioControl')!.value == null || this.formTelefono.get('medioControl')!.value == "") {
            valido = false;
        }
    }else{
      valido = false;
      
    }
  }else{
    valido = false
  }
  
  if(!valido){
    this.utilesService.mostrarSnacbarMensaje(`Faltan campos obligatorios por llenar`, 'warning-snackbar');
  }

  return valido;
}

jsonCabeceraServicio() {

  var jsonCabecera = {
      "cliente": {
          "celular": "",
          "ciudad": this.encabezadoEditable['ID_CIUDAD'],
          "correo": this.formHeader.get('correoControl')!.value['id'] != 0 ? this.formHeader.get('correoControl')!.value['descripcion'] : this.formTelefono.get('correoNuevo')!.value,
          "direccion": this.encabezadoEditable['DIRECCION'],
          "identificacion": this.encabezadoEditable['IDENTIFICACION'],
          "nombre": this.encabezadoEditable['NOMBRE'],
          "telefono": this.formHeader.get('telefonoControl')!.value['id'] != 0 ? this.formHeader.get('telefonoControl')!.value['descripcion'] : this.formTelefono.get('telefonoNuevo')!.value,
          "tipoCliente": this.encabezadoEditable['ID_TIPO_CLIENTE'],
          "tipoIdentificacion": this.encabezadoEditable['ID_TIPO_IDENTIF']

      }
  };
  return jsonCabecera
}


jsonDevolucionServicio() {
  var fechaComp = moment(this.encabezadoEditable['FECHA_COMPRA']);

  var jsonDevolucion = {
      "fechaCompra": fechaComp.format('DD-MM-YYYY'),
      "idDevolTemp": 0,
      "idAlmacenDevolucion": parseInt(sessionStorage.getItem("tienda") || '{}'),
      "idAlmacenPago": this.encabezadoEditable['ID_ALMACEN_PAGO'],
      "idAlmacenEntrega": this.encabezadoEditable['ID_ALM_ENT'],
      "sistemaOrigen": "SAPS",
      "sticker": this.encabezadoEditable['STICKER'],
      "identificacionEmpleado": "0",
      "stickerPadre": this.encabezadoEditable['STI_PADRE'],
      "terminalPago": this.encabezadoEditable['TERMINAL_PAGO'],
      "transaccion": this.encabezadoEditable['TRANSACCION'],
      "medioDevolucion": this.formTelefono.get('medioControl')!.value ? this.formTelefono.get('medioControl')!.value  : "",
      "usuarioGestor": this.nombreGestion,
      "solucionDevolucion": this.metodoDevolucion,
      "notaPedido": this.notaPedido,
      "flagCompleta": 1,
      "usuario": sessionStorage.getItem('usuario'),
      "causalDevolucionCompleta": 0,
      "modulo": "36", //sessionStorage.getItem('modulo')!.toString(),
      "cedula": "0"
  };

  return jsonDevolucion;
}

  
llamadoServicioDevolucion(novedades: any[], tipoDevolucion: number = 0) {

  var completa: boolean = true;
  var motivoDevolucion: number = 0;
  var detalleNotaDto = Array();

  var jsonCabecera = this.jsonCabeceraServicio();
  var jsonDevolucion = this.jsonDevolucionServicio();


  novedades.forEach(element => {
      if (element['CANTIDAD_ENVIADA'] != element['CANTIDAD_DEVOLVER']) {
          completa = false;
      }

      if (!motivoDevolucion) {
          motivoDevolucion = element['MOTIVO_DEVOLVER'];
      }

      if (element['CANTIDAD_DEVOLVER'] != 0) {
          var objeto = {
              "causalDevolucion": element['MOTIVO_DEVOLVER'],
              "codigoProducto": element['SKU'],
              "unidadesDevueltas": element['CANTIDAD_DEVOLVER']
          }
          detalleNotaDto.push(objeto);
      }
  });

  jsonDevolucion.flagCompleta = tipoDevolucion;
  jsonDevolucion.causalDevolucionCompleta = completa ? motivoDevolucion : 0;

  var jsonDetalle = Object.assign({ detalleNotaDto });
  var completeData = Object.assign({}, jsonCabecera, jsonDetalle, jsonDevolucion);


  return this.notaDevolucionService.llamadoServicioDevolucion(completeData);

}


contarDevoluciones() {

  this.cantidadADevolver = 0;
  this.data.forEach(element => {

      this.cantidadADevolver += element['CANTIDAD_DEVOLVER'];

  });

  if (this.cantidadADevolver > 0) {
    this.tieneDevolucion = true;
  } else {
      this.tieneDevolucion = false;
  }
}


  onkeyUpDevolver(elemnt: any) {

    if(elemnt.CANTIDAD_DEVOLVER != undefined && elemnt.CANTIDAD_DEVOLVER != null){

      if(elemnt.CANTIDAD_DEVOLVER > elemnt.CANTIDAD_ENVIADA){
        elemnt.CANTIDAD_DEVOLVER = elemnt.CANTIDAD_ENVIADA
      }
    }
    this.contarDevoluciones();
  }

  
  onKeydown(evento: any) {
    const teclaPresionada = evento.key;
    const elemento = evento.target;
    const teclaPresionadaEsUnNumero =
        Number.isInteger(parseInt(teclaPresionada));

    const sePresionoUnaTeclaNoAdmitida =
        teclaPresionada != 'ArrowDown' &&
        teclaPresionada != 'ArrowUp' &&
        teclaPresionada != 'ArrowLeft' &&
        teclaPresionada != 'ArrowRight' &&
        teclaPresionada != 'Backspace' &&
        teclaPresionada != 'Delete' &&
        teclaPresionada != 'Enter' &&
        !teclaPresionadaEsUnNumero;

    const comienzaPorCero =
        elemento.value.length === 0 &&
        teclaPresionada == 0;

    if (sePresionoUnaTeclaNoAdmitida || comienzaPorCero) {
        evento.preventDefault();
    }
}

  async procedimientoGuardar(sticker: string, novedades: any[], tipoDevolucion: any
    , motivoDevoTotal: any, tipoReprograma: any){
    
      let novedadesParaProcesar: NovedadSku[] = [];

        var pUsuario = this.utilesService.obtenerUsuario();

        for (const novedad of novedades) {
            let novedadCorto = new NovedadSku(novedad);
            novedadesParaProcesar.push(novedadCorto);
        }
      
        var dataXML='';
        dataXML= JsonToXML.parse("NOVEDADES", { NOV: novedadesParaProcesar });
        dataXML = dataXML.replace(/null/g, '');

        var respuesta = await this.notaDevolucionService.guardarDevolucion(sticker,dataXML, tipoDevolucion, motivoDevoTotal, tipoReprograma, pUsuario );
        



  }


}