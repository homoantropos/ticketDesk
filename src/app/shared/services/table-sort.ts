import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableSortService {

  constructor() {
  }

  sortTableByStringValues(sortOption: Array<string>, sortedArray: Array<any>, direction: boolean): boolean {

    if (sortOption.length === 1) {
      if (typeof sortedArray[0][sortOption[0]] === 'string') {
        if (direction) {
          sortedArray.sort((a, b) => b[sortOption[0]].toLowerCase().localeCompare(a[sortOption[0]].toLowerCase()));
        } else {
          sortedArray.sort((a, b) => a[sortOption[0]].toLowerCase().localeCompare(b[sortOption[0]].toLowerCase()));
        }
      } else {
        if (direction) {
          sortedArray.sort((a, b) => b[sortOption[0]] - a[sortOption[0]]);
        } else {
          sortedArray.sort((a, b) => a[sortOption[0]] - b[sortOption[0]]);
        }
      }
    }
    if (sortOption.length === 2) {
      if (direction) {
        sortedArray.sort(
          (a, b) =>
            b[sortOption[0]][sortOption[1]].toLowerCase().localeCompare(a[sortOption[0]][sortOption[1]].toLowerCase()));
      } else {
        sortedArray.sort(
          (a, b) =>
            a[sortOption[0]][sortOption[1]].toLowerCase().localeCompare(b[sortOption[0]][sortOption[1]].toLowerCase()));
      }
    }
    if (sortOption.length === 3) {
      if (direction) {
        sortedArray.sort(
          (a, b) =>
            b[sortOption[0]][sortOption[1]][sortOption[2]]
              .toLowerCase().localeCompare(a[sortOption[0]][sortOption[1]][sortOption[2]].toLowerCase()));
      } else {
        sortedArray.sort(
          (a, b) =>
            a[sortOption[0]][sortOption[1]][sortOption[2]]
              .toLowerCase().localeCompare(b[sortOption[0]][sortOption[1]][sortOption[2]].toLowerCase()));
      }
    }
    return !direction;
  }
}
