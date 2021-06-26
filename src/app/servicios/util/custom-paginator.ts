import { MatPaginatorIntl } from '@angular/material/paginator';

export class CustomPaginator extends MatPaginatorIntl {
  firstPageLabel: string;
  itemsPerPageLabel: string;
  nextPageLabel: string;
  previousPageLabel: string;

  constructor() {
    super();
    this.firstPageLabel = 'Primera página';
    this.firstPageLabel = 'Última página';
    this.itemsPerPageLabel = 'Registros por página';
    this.nextPageLabel = 'Siguiente página';
    this.previousPageLabel = 'Página anterior';
  }

  /**
   * 
   * @param page número de página
   * @param pageSize tamaño de cada una de las páginas 
   * @param length tamaño de elementos
   * @returns 
   */
  getRangeLabel = function (page: number, pageSize: number, length: number) {
    if (length === 0 || pageSize === 0) {
      return '0 de ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex + ' de ' + length;
  };


}