import { Component, HostBinding, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent implements OnInit {

  @Input() width: number;
  @Input() unit = 'px';
  @Input() padding = true;
  @Input() backgroundColor: string;
  @HostBinding('style.flex') styleFlex = '1 1 auto';
  @HostBinding('style.min-width') styleWidth = 'auto';
  @HostBinding('style.background-color') styleBackgroundColor = 'auto';

  constructor() { }

  ngOnInit(): void {
    this.setStyle();
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.setStyle();
  }

  setStyle(): void {
    this.styleBackgroundColor = (this.backgroundColor) ? this.backgroundColor : 'transparent';
    if (window.innerWidth > 768) {
      // 如果是寬螢幕瀏覽
      this.styleFlex = `${(this.width) ? 0 : 1} 1 ${(this.width) ? this.width.toString() + this.unit : 'auto' }`;
      this.styleWidth = (this.width) ? `${this.width}${this.unit}` : 'auto';
    } else {
      // 如果是窄螢幕瀏覽
      this.styleFlex = '0 1 auto';
      this.styleWidth = 'auto';
    }
  }

}
