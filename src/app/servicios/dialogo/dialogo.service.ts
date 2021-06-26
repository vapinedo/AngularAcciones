import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { OperacionesDialogo } from 'src/app/interfaces/OperacionesDialogo';

const dialogConfig = new MatDialogConfig();
@Injectable({
  providedIn: 'root'
})
export class DialogoService implements OperacionesDialogo {
  public mensaje!: string;
  public titulo!: string;
  private dialogRef!: any;
  public confirmar!: any;
  constructor(
    private dialog: MatDialog,
  ) { }
  /**
   * Cierra cuadro de dialogo
   * @param accionDespues bandera que define si es necesaria una acción después de cerrar el cuadro de dialogo
   */
  cerrar(accionDespues: boolean = false): void {
    if (this.dialogRef) {
      this.dialogRef.close();
      this.fijarTitulo('');
      this.fijarMensaje('');
      if (accionDespues) {
        this.dialogRef.afterClosed().subscribe(this.confirmar);
      }
    }
  }
  /**
   * Abre un cuadro de dialogo con un mensaje, útil para usarse
   * como animación de cargando
   * @param componente Componente que de tipo mat-dialog-content seleccionado para renderizar
   * @param tipo el tipo de dialogo que se puede construir, seleccionar de DialogoService.TipoDialogo
   * @param mensaje mensaje que se rederizará junto al componente
   * @param titulo titulo del cuadro de dialogo
   * @returns este metodo no retorna ningún valor
   */
  abrir(componente: any) {
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialogRef = this.dialog.open(componente, dialogConfig);
  }
  /**
   * Fija el titulo del cuadro de dialogo
   * @param titulo titulo para cuadro de dialogo
   */
  fijarTitulo(titulo: string): void {
    this.titulo = titulo ? titulo : '';
  }


  /**
   * Fija el mensaje para el cuadro de dialogo
   * @param mensaje mensaje para el cuadro de dialogo
   */
  fijarMensaje(mensaje: string): void {
    this.mensaje = mensaje ? mensaje : '';
  }
  /**
   * Permite sobre escribir las acciones después de dar click en botón confirmar
   * @param confirmar función para sobre escribir con acciones después de confirmar}
   */
  accionConfirmarDialogo(confirmar: any): void {
    this.confirmar = confirmar;
  }
}
