import { ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, EventEmitter, Injectable, Injector, Type } from '@angular/core';

import { DrawerComponent } from '../../share/components/drawer/drawer.component';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {

  componentRef: ComponentRef<DrawerComponent>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {

  }

  show(config: {
    title: string,
    component: Type<any>,
    data?: { key: string, value: any }[],
    events?: { key: string, handler: EventEmitter<any> }[] }
  ): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(config.component);

    this.componentRef = this.componentFactoryResolver
      .resolveComponentFactory(DrawerComponent)
      .create(this.injector);

    this.componentRef.instance.title = config.title;
    this.componentRef.instance.component = componentFactory;
    this.componentRef.instance.destroy = (): void => {
      this.componentRef.destroy();
    };

    if (config.data) {
      // 為了避免call by reference用這招變成call by value
      this.componentRef.instance.data = JSON.parse(JSON.stringify(config.data));
    }
    if (config.events) {
      this.componentRef.instance.events = config.events;
    }

    this.appRef.attachView(this.componentRef.hostView);

    document.body.appendChild((this.componentRef.hostView as EmbeddedViewRef<DrawerComponent>)
      .rootNodes[0] as HTMLElement);
  }

  hide(): void {
    if (this.componentRef) {
      this.componentRef.instance.isBusy = false;
      this.componentRef.instance.onBtnCloseClicked();
    }
  }

  isOpen(): boolean {
    return this.componentRef.instance.isOpen;
  }

  isBusy(): boolean {
    return this.componentRef.instance.isBusy;
  }

  setBusy(): void {
    if (this.componentRef) {
      this.componentRef.instance.isBusy = true;
    }
  }

  setIdal(): void {
    if (this.componentRef) {
      this.componentRef.instance.isBusy = false;
    }
  }
}
