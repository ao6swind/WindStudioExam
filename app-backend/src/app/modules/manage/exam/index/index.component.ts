import { Component, OnInit } from '@angular/core';

import { AlertService } from './../../../../services/ui/alert.service';
import { DrawerService } from './../../../../services/ui/drawer.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {

  constructor(
    private drawer: DrawerService,
    private alert: AlertService
  ) { }

  ngOnInit() { 
    
  }

  onBtnAddExamClicked(): void {
    
  }

}
