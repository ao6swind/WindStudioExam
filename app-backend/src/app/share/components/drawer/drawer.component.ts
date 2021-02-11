import { Component, ComponentFactory, ElementRef, EventEmitter, HostListener, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
})
export class DrawerComponent implements OnInit {

  private subscriptions: Subscription[] = [];

  @ViewChild('template', {read: ViewContainerRef}) template: ViewContainerRef;

  isOpen = false;
  isBusy = false;
  isExpand = false;
  title = '';
  data?: { key: string, value: any }[];
  events?: { key: string, handler: EventEmitter<any> }[];
  component: ComponentFactory<any>;

  destroy: () => void = null;

  constructor(private host: ElementRef<HTMLElement>) { }

  ngOnInit(): void {
    setTimeout(() => {
      const cmp = this.template.createComponent(this.component);
      if (this.data) {
        this.data.forEach((keyValue) => {
          cmp.instance[keyValue.key] = keyValue.value;
        });
      }
      if (this.events) {
        this.events.forEach((keyValue) => {
          cmp.instance[keyValue.key] = keyValue.handler;
        });
      }
      this.isOpen = true;
      document.body.style.overflow = 'hidden';
    }, 0);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }

  onBtnExpandClicked(): void {
    this.isExpand = !this.isExpand;
  }

  onBtnCloseClicked(): void {
   this.closeDrawer();
  }

  @HostListener('document:keydown.esc', ['$event'])
  onEscKeyDown(): void {
    this.closeDrawer();
  }

  private closeDrawer(): void {
    if (!this.isBusy) {
      this.isOpen = false;
      document.body.style.overflow = 'auto';
      setTimeout(() => {
        this.host.nativeElement.remove();
        this.destroy();
      }, 100);
    }
  }

}
