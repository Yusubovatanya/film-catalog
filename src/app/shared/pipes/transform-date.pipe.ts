import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'transformDate'
})
export class TransformDatePipe implements PipeTransform {

  transform(release_date: any): any {
    if (isNaN(release_date)) {
      return release_date.slice(0, 4)
    } else {
     return +moment(release_date, "YYYY-MM-DD").format('YYYY');
    }
  }

}
