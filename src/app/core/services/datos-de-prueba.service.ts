import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { NotaPedido } from '../interfaces/nota-pedido.interface';

@Injectable()
export class DatosDePruebaService {

    private readonly TIEMPO_DE_REPUESTA = 1000;

    private data: NotaPedido[] = [
        { 
            id: 1,
            sticker: 'SLT_89-55661',
            fecha: '2021/04/01',
            nombres: 'Juan Felipe',
            apellidos: 'Ballesteros Granados',
            telefono: '555-889011',
            estado: 'Cancelado',
            sku: '101001',
            descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
            cantidad: 10,
            np: '3516'
        },
        { 
            id: 2,
            sticker: 'SLT_89-55662',
            fecha: '2021/04/02',
            nombres: 'Tomas Alfonso',
            apellidos: 'Arrieta Mejia',
            telefono: '555-889022',
            estado: 'Creado',
            sku: '101002',
            descripcion: 'Explicabo quam voluptatibus molestiae consectetur nobis ipsum ',
            cantidad: 20,
            np: '3516'
        },
        { 
            id: 3,
            sticker: 'SLT_89-55663',
            fecha: '2021/04/03',
            nombres: 'Clara Rosa',
            apellidos: 'Quintana Restrepo',
            telefono: '555-889033',
            estado: 'En Proceso',
            sku: '101003',
            descripcion: 'id eligendi perspiciatis ducimus. ',
            cantidad: 30,
            np: '3516'
        },
        { 
            id: 4,
            sticker: 'SLT_89-55664',
            fecha: '2021/04/04',
            nombres: 'Juan Jose',
            apellidos: 'Sandoval Lopez',
            telefono: '555-889044',
            estado: 'Gestionado',
            sku: '101004',
            descripcion: 'Quas quaerat explicabo quo, ',
            cantidad: 40,
            np: '3516'
        },
        { 
            id: 5,
            sticker: 'SLT_89-55665',
            fecha: '2021/04/05',
            nombres: 'Ruben Alonso',
            apellidos: 'Cifuentes Medina',
            telefono: '555-889055',
            estado: 'Cancelado',
            sku: '101005',
            descripcion: 'voluptatibus fugit odit atque obcaecati minima labore ',
            cantidad: 50,
            np: '3516'
        },
        { 
            id: 6,
            sticker: 'SLT_89-55666',
            fecha: '2021/04/06',
            nombres: 'Carlos Andres',
            apellidos: 'Perez Gomez',
            telefono: '555-889066',
            estado: 'Creado',
            sku: '101006',
            descripcion: 'voluptatibus fugit odit atque obcaecati minima labore ',
            cantidad: 60,
            np: '3516'
        },
        { 
            id: 7,
            sticker: 'SLT_89-55677',
            fecha: '2021/04/07',
            nombres: 'Manuel Andres',
            apellidos: 'Gomez Tabarez',
            telefono: '555-889077',
            estado: 'En Proceso',
            sku: '101007',
            descripcion: 'voluptatibus fugit odit atque obcaecati minima labore ',
            cantidad: 70,
            np: '3516'
        },
        { 
            id: 8,
            sticker: 'SLT_89-55688',
            fecha: '2021/04/08',
            nombres: 'Laura Estela',
            apellidos: 'Prieto Medina',
            telefono: '555-889088',
            estado: 'Gestionado',
            sku: '101008',
            descripcion: 'voluptatibus fugit odit atque obcaecati minima labore ',
            cantidad: 80,
            np: '3516'
        },
        { 
            id: 9,
            sticker: 'SLT_89-55699',
            fecha: '2021/04/09',
            nombres: 'Jessica',
            apellidos: 'Santodomingo Mengual',
            telefono: '555-889099',
            estado: 'Cancelado',
            sku: '101009',
            descripcion: 'voluptatibus fugit odit atque obcaecati minima labore ',
            cantidad: 90,
            np: '3516'
        },
        { 
            id: 10,
            sticker: 'SLT_89-55671',
            fecha: '2021/04/10',
            nombres: 'Omar Andres',
            apellidos: 'Castrillon Lubo',
            telefono: '555-889071',
            estado: 'Gestionado',
            sku: '101071',
            descripcion: 'voluptatibus fugit odit atque obcaecati minima labore ',
            cantidad: 100,
            np: '3516'
        }
    ];

    constructor() { }

    getAll(): Observable<NotaPedido[]> {
        return new Observable(observer => {
            setTimeout(() => {
                observer.next(this.data);
                observer.complete();
            }, this.TIEMPO_DE_REPUESTA)
        });
    }

    
    getById(id: number): Observable<any> {
        const resultado = this.data.find(item => item.id === id);
        return new Observable(observer => {
            setTimeout(() => {
                observer.next(resultado);
                observer.complete();
            }, this.TIEMPO_DE_REPUESTA)
        });
    }

    getEstados(): string[] {
        const estados = ['Cancelado', 'Creado', 'En Progreso', 'Gestionado'];
        return estados;
    }

}