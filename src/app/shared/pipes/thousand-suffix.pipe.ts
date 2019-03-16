import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousandSuffix'
})
export class ThousandSuffixPipe implements PipeTransform {

  private static readonly SUFFIXES = ['k', 'M', 'G', 'T', 'P', 'E'];

  transform(value: number, decimal?: number): string {
    let result;

    if (Number.isNaN(value)) {
      result = null;
    } else if (value < 1000) {
      result = value;
    } else {
      const exp = Math.floor(Math.log(value) / Math.log(1000));

      result = (value / Math.pow(1000, exp)).toFixed(decimal) + ThousandSuffixPipe.SUFFIXES[exp - 1];
    }

    return result;
  }

}
