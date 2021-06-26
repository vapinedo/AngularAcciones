import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';

import { SubSink } from 'subsink';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Tienda } from 'src/app/core/interfaces/tienda.interface';
import { TiendaService } from 'src/app/core/services/tienda.service';
import { DatosDePruebaService } from 'src/app/core/services/datos-de-prueba.service';
@Component({
  selector: 'app-filtro-notas',
  templateUrl: './filtro-notas.component.html',
  styleUrls: ['./filtro-notas.component.scss']
})
export class FiltroNotasComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public tiendas: Tienda[] = [];
  public estados: string[] = [];
  private yearMonthDay = 'YYYY-MM-DD';
  private subscriptions = new SubSink();
  public filteredTiendas!: Observable<string[]>;
  public filteredEstados!: Observable<string[]>;
  public options = ['Calle 80', 'Centro', 'Norte', 'Principal'];
  
  @Output() onFilterChange = new EventEmitter;
  private filterValues = { fechaInicio: '', fechaFin: '' };
  
  constructor(
    private fb: FormBuilder,
    private TiendaSvc: TiendaService,
    private datosDePruebaSvc: DatosDePruebaService
  ) { 
    this.form = this.fb.group({
      tienda: [''],
      estado: [''],
      fechaFin: [''],
      fechaInicio: ['']
    });
    this.estados = datosDePruebaSvc.getEstados();
  } 

  ngOnInit(): void {
    this._setTiendas();
    this._fieldListener();

    this.filteredTiendas = this.form.controls.tienda.valueChanges.pipe(
      startWith(''),
      map(value => this._filterTienda(value))
    );
    this.filteredEstados = this.form.controls.estado.valueChanges.pipe(
      startWith(''),
      map(value => this._filterEstado(value))
    );
  }
  
  private _filterTienda(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterEstado(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.estados.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  private _setTiendas(): void {
    this.subscriptions.add(
      this.TiendaSvc.getAll()
        .subscribe({
          next: data => {
            this.tiendas = data;
          },
          error: err => console.log(err)
        })
    );
  }

  private _fieldListener(): void {
    this.subscriptions.add(
      this.form.controls.tienda.valueChanges
        .subscribe(data => {
          if (data) {
            console.log(data);
          }
        })
    );
    this.subscriptions.add(
      this.form.controls.fechaFin.valueChanges
        .subscribe(data => {
          if (data) {
            this.filterValues.fechaFin = this.form.controls.fechaFin.value.format(this.yearMonthDay);
            this.onFilterChange.emit(this.filterValues);
          }
        })
        );
        this.subscriptions.add(
          this.form.controls.fechaInicio.valueChanges
          .subscribe(data => {
            if (data) {
              this.filterValues.fechaInicio = this.form.controls.fechaInicio.value.format(this.yearMonthDay);
              this.onFilterChange.emit(this.filterValues);
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  
}