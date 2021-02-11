import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumToArray'
})
export class EnumToArrayPipe implements PipeTransform {

  /**
   * 轉換函式
   * @param value 要轉換的列舉
   * @param excludeIndex 要排外的索引
   */
  transform(
    value,
    ...excludeIndex: number[]
  ): { key: number, value: any }[] {
    return Object.keys(value)
      .filter((e) => !isNaN(+e) && excludeIndex.indexOf(+e) < 0)
      .map((o) => {
        return { key: +o, value: value[+o], };
      })
      .sort((a, b) => {
        return a.value - b.value;
      });
  }

}
