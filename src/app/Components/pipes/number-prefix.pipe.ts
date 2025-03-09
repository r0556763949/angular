import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberPrefix'
})
export class NumberPrefixPipe implements PipeTransform {
  transform(value: string, index: number): string {
    return `${index + 1}. ${value}`;
  }
}
