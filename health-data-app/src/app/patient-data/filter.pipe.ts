import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchFilter: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchFilter) {
      return items;
    }

    searchFilter = searchFilter.toLowerCase();

    return items.filter(item => {
      let values = `${item.familyName} ${item.givenName} ${item.zip} ${item.languageCode}`;
      
      if (values.toLowerCase().includes(searchFilter)) {
        console.log(values);
        return item;
      }
      
    })



  }

}
