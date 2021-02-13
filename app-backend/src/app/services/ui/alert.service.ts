import { ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector } from '@angular/core';

import { AlertComponent } from '../../share/components/alert/alert.component';
import { AlertContainerComponent } from '../../share/components/alert/alert-container.component';
import { AlertLevel } from './../../share/enums/alert-level';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private alertContainerRef: ComponentRef<AlertContainerComponent>;
  private alertRef: ComponentRef<AlertComponent>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {
    // 1. Create a component reference from the component
    this.alertContainerRef = this.componentFactoryResolver
      .resolveComponentFactory(AlertContainerComponent)
      .create(this.injector);

    // 2. Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(this.alertContainerRef.hostView);

    // 3. Get DOM element from component
    const domElem = (this.alertContainerRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    // 4. Append DOM element to the body
    document.body.appendChild(domElem);
  }

  public show(config: { level?: AlertLevel, title?: string, message?: string, timeout?: number }): void {

    // 1. Create a component reference from the component
    this.alertRef = this.componentFactoryResolver
      .resolveComponentFactory(AlertComponent)
      .create(this.injector);

    // 2. Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(this.alertRef.hostView);

    // 3. Get DOM element from component
    const domElem = (this.alertRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    // 4. Append DOM element to the body
    const firstNode = document.querySelector('#pnlAlertContainer').firstChild;
    document.querySelector('#pnlAlertContainer').insertBefore(domElem, firstNode);

    this.alertRef.instance.destroy = () => {
      this.alertRef.destroy();
    };
    this.alertRef.instance.title = config.title;
    this.alertRef.instance.message = config.message;
    this.alertRef.instance.timeout = (config.timeout) ? config.timeout : 5000;
    switch (config.level) {
      case AlertLevel.Success:
        this.alertRef.instance.level = 'alert-success';
        break;
      case AlertLevel.Warning:
        this.alertRef.instance.level = 'alert-warning';
        break;
      case AlertLevel.Danger:
        this.alertRef.instance.level = 'alert-danger';
        break;
      case AlertLevel.Info:
        this.alertRef.instance.level = 'alert-info';
        break;
      default:
        this.alertRef.instance.level = 'alert-info';
        break;
    }
  }
}
