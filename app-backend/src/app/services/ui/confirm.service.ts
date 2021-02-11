import { ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector } from '@angular/core';

import { ConfirmComponent } from '../../share/components/confirm/confirm.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  private componentRef: ComponentRef<ConfirmComponent>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {

  }

  public show(parameters: {
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    hasCancel?: boolean;
    confirmed?: () => void;
  }): void {
    // 1. Create a component reference from the component
    this.componentRef = this.componentFactoryResolver
      .resolveComponentFactory(ConfirmComponent)
      .create(this.injector);

    // 2. Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(this.componentRef.hostView);

    // 3. Get DOM element from component
    const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    // 4. Append DOM element to the body
    document.body.appendChild(domElem);

    this.componentRef.instance.title =
      parameters.title != null ? parameters.title : '';
    this.componentRef.instance.message =
      parameters.message != null ? parameters.message : '';
    this.componentRef.instance.confirmText =
      parameters.confirmText != null ? parameters.confirmText : '確認';
    this.componentRef.instance.cancelText =
      parameters.cancelText != null ? parameters.cancelText : '取消';
    this.componentRef.instance.hasCancel =
      parameters.hasCancel != null ? parameters.hasCancel : true;
    this.componentRef.instance.confirmed =
      parameters.confirmed != null ? parameters.confirmed : null;
    this.componentRef.instance.destroy = () => {
      this.componentRef.destroy();
    }
  }
}
