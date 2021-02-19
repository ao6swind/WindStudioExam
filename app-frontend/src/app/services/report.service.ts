import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor() { }

  sendErrorRequest(id: string) {
    const subject = `錯題回報#程式設計課程學習資源#[${id}]`;
    const body = `老師您好，%0D%0A我發現這題似乎內容有誤%0D%0A我覺得錯誤是在：%0D%0A%0D%0A%0D%0A麻煩您查看，謝謝！%0D%0A%0D%0A錯題回報代號[${id}]`;
    window.open(`mailto:ao6swind@hotmail.com?subject=${subject}&body=${body}`)
  }
}
