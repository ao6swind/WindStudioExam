import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  private pageSize = 10;

  constructor() { }

  setPageSize(size: number): void {
    this.pageSize = size;
  }

  getPageSize(): number {
    return this.pageSize;
  }
}
