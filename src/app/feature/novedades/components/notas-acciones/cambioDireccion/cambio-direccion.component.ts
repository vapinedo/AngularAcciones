import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { } from 'googlemaps';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MapaService } from 'src/app/core/services/mapa.service';
import { UtilesService } from 'src/app/servicios/util/utiles.service';
import { Departamentos } from 'src/app/core/models/departamentos';
import { RespuestaAccesoDatos } from 'src/app/core/models/respuesta-acceso-datos.model';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { Ciudades } from 'src/app/core/models/ciudades';
import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { AlmacenamientoMapa } from 'src/app/core/interfaces/almacenamiento-mapa.interface';
import { MessageService } from 'src/app/core/services/message.service';
import { DatetimeService } from 'src/app/core/services/datetime.service';
@Component({
  selector: 'app-cambio-direccion',
  templateUrl: './cambio-direccion.component.html',
  styleUrls: ['./cambio-direccion.component.scss']
})
export class CambioDireccionComponent implements OnInit, OnChanges {

  @Input() notaPedido : any = null;
  public isNovedadHabilitada = true;

 /* public valLatitud: number = 0;
  public valLongitud: number = 0;   
  public ciudades: any = null;
  private markers: google.maps.Marker[] = [];
  public idDaneCiudad: string = "";
  public direccionInvalida: boolean = true;
  public mostrarMapa: boolean = true;*/
  
  public zoom: number = 16;
  public lat: number = 4.6097100;
  public lng: number = -74.0817500;

  public ciudad: string = "";
  public departamento: string = "";
  public ciudades: Ciudades [] = [];
  public departamentos: Departamentos [] = [];
  public direccion: string = "";
  public codDane: string = "";
  public isCambioDireccion = true;
  @ViewChild('map')
  mapElement!: ElementRef;
 // public searchElement: ElementRef;
  public map!: google.maps.Map;
  public form: FormGroup;
  idCiudad: any;
  /*
  public isGettingMap: boolean = false;
  public cargandoCiudades: boolean = false;*/
  public sticker = "";
  public idDespachoDtl = "";
  public tomorrowDate: any;

  constructor(
    private mapaService: MapaService,
    private formBuilder: FormBuilder,
    private util: UtilesService,
    private activatedRoute: ActivatedRoute,
    private messageSvc: MessageService,
    private datetimeSvc: DatetimeService,
    private datetimeService: DatetimeService
   // public dialogRef: MatDialogRef<ModalMapaComponent>
  ) {    
    this.tomorrowDate = this.datetimeSvc.getTomorrow();
    this.form = this.formBuilder.group({
      departamento: [null, Validators.compose([Validators.required])],
      ciudad: [null, Validators.compose([Validators.required])],
      direccion: [null, Validators.compose([Validators.required])],
      fechaRepro:  [null, Validators.compose([Validators.required])],
    /*  latitud: [null],
      longitud: [null]*/
  });
  
  }

  ngOnInit(): void {
    this.sticker = this.activatedRoute.snapshot.paramMap.get("Sticker") || '';
    this.idDespachoDtl = this.activatedRoute.snapshot.paramMap.get("IdDespachoDtl") || '';
    this.cargarParametros();
   // this.setGoogleMap(this.lati,this.lng);
   this.cargarDepartamentos();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.notaPedido = changes.notaPedido.currentValue ? 
      changes.notaPedido.currentValue : null;

    this.isNovedadHabilitada = (this.notaPedido?.FLAG_PANTALLA_ACCION === 0) ?
      false : true; 
  }

  cargarParametros(){
    this.util.obtenerConfiguracion().subscribe(response => {
      let rta=  response.Value as any[];
      this.util.obtenerConstantes().configuracion = JSON.parse(rta[0].JSON);      
    },
    err=>{
      console.log(err);
    }
  );
     
      
  }

  cargarDepartamentos() {   
    this.mapaService.obtenerDepartamentos().subscribe(response => {
      let lista: any[] = response.Value as any[];
      lista.forEach(element =>
        this.departamentos.push({
          nombreDpto: element.NOMBRE.toString(),
          idDpto: element.ID_DEPTO.toString()          
        })        
      );
    }    
    ); 
}
 cargarCiudadesDepart(idDep: number) {
    this.mapaService.obtenerCiudadesDept(idDep.toString()).subscribe(response => {
      let list: any[] = response.Value as any[];
      list.forEach(element =>
        this.ciudades.push({
          idCiudad: element.ID_CIUDAD.toString(),
          nombreCiudad: element.NOMBRE.toString(),
          codDane: element.CODIGO_DANE.toString()   
        })        
      );
    }
    );
  }

  consultarApiNormalizacion() {      
    this.mapaService.consultarApiNormalizacion(this.codDane, this.form.controls['direccion'].value).
      subscribe(response =>{
        this.lat = Number.parseFloat(response.data.latitude);
        this.lng = Number.parseFloat(response.data.longitude);
        this.isCambioDireccion = false;
      },
      err => {
        console.log(err);
      }
    );

   }
   guardar(){
  

    let almacenamientoMapa : AlmacenamientoMapa = {
      sticker: this.sticker,
      idDespachoDtl: this.idDespachoDtl,
      fechaReprog:  this.datetimeService.dateToDayMonthYearh(this.form.controls['fechaRepro'].value._d),
      idDireccion: this.notaPedido?.ID_DIRECCION,
      latitud: this.lat,
      longitud: this.lng,
    };
    this.mapaService.guardarDireccion(almacenamientoMapa).subscribe(response =>{

      this.messageSvc.success();
      
    }, err =>{
      this.messageSvc.error(err);
    }
    );    
   }
 /* setGoogleMap(lat: number, lang: number, direccion?: any) {
    const mapProperties = {
      center: new google.maps.LatLng(lat, lang),
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      fullscreenControl: false,
      clickableIcons: false,
      streetViewControl: false,
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
   
    this.map.addListener("click", (mapsMouseEvent) => {      
      let infoWindow = new google.maps.InfoWindow({
        position: mapsMouseEvent.latLng,
      });
      infoWindow.setContent(
        JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
      );
      const latlan = mapsMouseEvent.latLng.toJSON();
      const geocoder = new google.maps.Geocoder();
      //this.obtenerDireccion(geocoder, latlan);      
      this.form.controls['latitud'].setValue(latlan.lat.toFixed(5)); 
      this.form.controls['longitud'].setValue(latlan.lng.toFixed(5)); 
      this.setPin(latlan.lat, latlan.lng);
    });   
      this.setPin(lat, lang, direccion);
  }
  
  /*setPin(lat: number, lng: number, direccion?: any) {
    const pin = { lat: lat, lng: lng };
    this.markers.forEach(element => {
      element.setMap(null);
    });

    const marker = new google.maps.Marker({
      position: pin,
      map: this.map,
      title: `X: ${pin.lat}, Y: ${pin.lng} `
    });    
    this.markers.push(marker);   
    this.isGettingMap = false;
  }
*/

  onChangeDepartamento(idDepto: number) {   
    this.ciudades = [];
   this.cargarCiudadesDepart(idDepto);
  }
  onChangeCiudad(idCiud: any) {   
    this.codDane = idCiud;
  }
  
  
}
