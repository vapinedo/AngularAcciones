import { Component, OnInit } from '@angular/core';
import { DialogoService } from 'src/app/servicios/dialogo/dialogo.service';

@Component({
  selector: 'app-dialogo-confirmar',
  templateUrl: './dialogo-confirmar.component.html',
  styleUrls: ['./dialogo-confirmar.component.scss']
})
export class DialogoConfirmarComponent implements OnInit {

  constructor(public dialogo: DialogoService) { }

  ngOnInit(): void {
  }

  confirmar(): void {

  }

}
