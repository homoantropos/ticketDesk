import {FilterRequestInitValue} from './typesForFiltering';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class FilterRequestInitValues {

  setInitValue(addedValue: FilterRequestInitValue): FilterRequestInitValue {
    const ini = this.getIni();
    Object.keys(addedValue)
      .map(
        key => {
          ini[key] = addedValue[key];
        }
      );
    return ini;
  }

  getInitValue(values?: Array<string>): FilterRequestInitValue {
    const ini = this.addYear();
    if (values && values.length > 0) {
      Object.keys(ini)
        .map(
          key => {
            if (!values.includes(key)) {
              delete ini[key];
            }
          }
        );
    }
    return ini;
  }

  addYear(): FilterRequestInitValue {
    let startYear = 2021;
    const actualYear = new Date().getFullYear();
    const years = {
      years: {
        initValue: `${actualYear}`,
        valueOptions: [
          {value: '', option: 'За весь час'}
        ]
      }
    };
    for (startYear; startYear <= actualYear; startYear++) {
      years.years.valueOptions.push({value: `${startYear}`, option: `${startYear}`});
    }
    return this.setInitValue(years);
  }

  getIni(): FilterRequestInitValue {
    return {
      sectionName: {
        initValue: '',
        valueOptions: [
          {value: 'партер', option: 'партер'},
          {value: 'дансінг', option: 'дансінг'},
          {value: '', option: 'всі разом'}
        ]
      },
      row: {
        initValue: '',
        valueOptions: [
          {value: '1', option: '1'},
          {value: '2', option: '2'},
          {value: '', option: 'всі ряди'}
        ]
      },
      seatNumber: {
        initValue: '',
        valueOptions: [
          {value: '1', option: '1'},
          {value: '2', option: '2'},
          {value: '', option: 'всі місця'}
        ]
      }
    };
  }
}
