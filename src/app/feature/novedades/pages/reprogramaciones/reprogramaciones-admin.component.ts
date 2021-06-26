import { SubSink } from 'subsink';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NovedadesService } from 'src/app/core/services/novedades.service';
import { NotaPedido } from 'src/app/core/interfaces/nota-pedido.interface';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DatosDePruebaService } from 'src/app/core/services/datos-de-prueba.service';

@Component({
  selector: 'app-reprogramaciones-admin',
  templateUrl: './reprogramaciones-admin.component.html',
  styleUrls: ['./reprogramaciones-admin.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ReprogramacionesAdminComponent implements OnInit, OnDestroy {

  public showSpinner: boolean;
  public tipoDevoluciones: any;
  public data: NotaPedido[] = [];
  private subscriptions = new SubSink();
  public expandedElement!: NotaPedido | null;
  public dataSource = new MatTableDataSource(this.data);
  public displayedColumns: string[] = ['sticker', 'fecha', 'nombres', 'apellidos', 
    'telefono', 'estado', 'id'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private NovedadesSvc: NovedadesService,
    private datosDePruebaSvc: DatosDePruebaService
  ) { 
    this.showSpinner = true;
  }

  ngOnInit(): void {
    this._setDataSource();
    this._setTipoDevoluciones();
  }

  private _setTipoDevoluciones() {
    // this.subscriptions.add(
      this.NovedadesSvc.getAll()
        .subscribe(data => this.tipoDevoluciones = data)
    // );
  }
  
  private _setDataSource(): void {
    // this.subscriptions.add(
      this.datosDePruebaSvc.getAll()
        .subscribe({
          next: data => {
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.showSpinner = false;
          },
          error: err => {
            console.log(err);
            this.showSpinner = false;
          },
          complete: () => {
            this.showSpinner = false;
          }
        })
    // );
  }
  
  onFiltersChange(event: any): void {
    console.log(event);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private createFilter(): (data: NotaPedido, filter: string) => boolean {
    let filterFunction = function (data: any, filter: any): boolean {
      let searchTerms = JSON.parse(filter);

      return data.fecha.indexOf(searchTerms.fechaInicio) !== -1
        || data.fecha.indexOf(searchTerms.fechaFin) !== -1;
    }
    return filterFunction;
  }
    
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}