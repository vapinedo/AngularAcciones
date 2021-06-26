export interface OperacionesDialogo {
    /**
     * Cierra cuadro de dialogo
     * @param accionDespues bandera que define si es necesaria una acción después de cerrar el cuadro de dialogo
     */
    cerrar(accionDespues: boolean): void;
    /**
     * Abre un cuadro de dialogo con un mensaje, útil para usarse
     * como animación de cargando
     * @param componente Componente que de tipo mat-dialog-content seleccionado para renderizar
     * @param confirmar callback de la función confirmar
     */
    abrir(componente: any, confirmar?: any): void;
    /**
     * 
     * @param titulo titulo del cuadro de dialogo
     */
    fijarTitulo(titulo: string): void;
    /**
     * 
     * @param mensaje mensaje del dialogo
     */
    fijarMensaje(mensaje: string): void;
    /**
     * Permite sobre escribir las acciones después de dar click en botón confirmar
     */
    accionConfirmarDialogo(confirmar: any): void;
}
