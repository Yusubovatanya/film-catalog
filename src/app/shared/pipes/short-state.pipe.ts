import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortState'
})
export class ShortStatePipe implements PipeTransform {

  transform(country: string): string {
    switch (country.toLowerCase()) {
      case "united states of america":
        return "USA";
      case "united kingdom":
        return "UK";
      default:
        return country
    }
  }
}
