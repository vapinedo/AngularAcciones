import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnChanges {

  @Input() data: any;
  public showSpinner: boolean;
  
  constructor(
  ) {
    this.showSpinner = true;
  }
    
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.data && 
      changes.data.currentValue && changes.data.currentValue.length > 0) {
      this.showSpinner = false;
    }
  }
}