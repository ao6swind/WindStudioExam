import { Component, ElementRef, NgZone, OnInit } from '@angular/core';
declare const $: any;
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {

  title = '';
  message = '';
  id = `alert-${Date.now()}`;
  level = 'alert-info';
  timeout = 5000;
  destroy: () => void = null;

  constructor(private zone: NgZone, private host: ElementRef<HTMLElement>) { }

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        this.zone.runTask(() => {
          $(`.${this.id}`).alert('close');
          setTimeout(() => {
            this.zone.runTask(() => {
              this.host.nativeElement.remove();
            });
          }, this.timeout);
        });
      }, this.timeout);
    });
  }

  onBtnCloseClicked(): void {
    setTimeout(() => {
      this.zone.runTask(() => {
        this.host.nativeElement.remove();
        this.destroy();
      });
    }, this.timeout);
  }

}
