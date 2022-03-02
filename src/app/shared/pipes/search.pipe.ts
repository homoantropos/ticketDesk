import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})

export class SearchPipe implements PipeTransform {

  transform(list: Array<any>, searchValue: string, searchField: Array<string>): Array<any> {
    if (searchValue.trim() === undefined){
      return list;
    }
    if (searchField.length === 1){
      return list.filter(a => a[searchField[0]].toLowerCase().includes(searchValue.toLowerCase()));
    }
    if (searchField.length === 2){
      return list.filter(a => a[searchField[0]][searchField[1]].toLowerCase().includes(searchValue.toLowerCase()));
    }
    else {
      return list.filter(a =>
        a[searchField[0]][searchField[1]][searchField[2]].toLowerCase().includes(searchValue.toLowerCase()));
    }
  }
}

