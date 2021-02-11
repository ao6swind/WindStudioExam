import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel-group',
  templateUrl: './panel-group.component.html',
  styleUrls: ['./panel-group.component.scss'],
})
export class PanelGroupComponent implements OnInit {

  @Input() marginLeft = '0';

  constructor() { }

  ngOnInit() {}

}
