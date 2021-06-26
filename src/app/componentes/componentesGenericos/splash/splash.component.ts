import { Component, OnInit } from '@angular/core';
import { DialogoService } from 'src/app/servicios/dialogo/dialogo.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {
  public mensaje!: string;
  constructor(
    public splash: DialogoService
  ) { }

  ngOnInit(): void {

  }

}
