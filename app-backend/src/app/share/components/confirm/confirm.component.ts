import { Component, ElementRef, OnInit } from '@angular/core';
declare const $: any;
@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit {

  public timestemp = new Date().getTime();
  public isBusy = false;
  public title = '';
  public message = '';
  public confirmText = '確認';
  public cancelText = '取消';
  public hasCancel = false;
  public confirmed?: () => void = null;
  public destroy: () => void = null;

  constructor(private host: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    $(`#pnlConfirm`).modal('show');
  }

  public onBtnCancelClick(): void {
    this.closeConfirmPanel();
  }

  public onBtnCloseClick(): void {
    this.closeConfirmPanel();
  }

  public onBtnConfirmClick(): void {
    if (this.confirmed !== null) {
      this.isBusy = true;
      this.confirmed();
      this.isBusy = false;
    }
    this.closeConfirmPanel();
  }

  private closeConfirmPanel(): void {
    $(`#pnlConfirm`).modal('hide');
    this.host.nativeElement.remove();
    this.destroy();
  }

}
