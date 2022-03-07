import {FilterRequestInitValue} from './typesForFiltering';
import {Injectable} from '@angular/core';
import {Seat} from "../interfaces";

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

  addValueOptions(key: string, values: Array<string>): FilterRequestInitValue {
    const ini = this.getIni();
    values.map(
      value => {
        ini[key].valueOptions.push({value, option: value})
      }
    )
    return ini
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
    return this.init;
  }

  init: FilterRequestInitValue = {
    sectionName: {
      initValue: '',
      valueOptions: [
        {value: '', option: 'всі разом'}
      ]
    },
    row: {
      initValue: '',
      valueOptions: [
        {value: '', option: 'всі ряди'}
      ]
    },
    seatNumber: {
      initValue: '',
      valueOptions: [
        {value: '', option: 'всі місця'}
      ]
    }
  };

  setSelectsForSeatAdmin(seats: Array<Seat>): void {
    const sectionNames: Array<string> = [];
    const rows: Array<string> = [];
    const seatNumbers: Array<string> = [];
    Object.keys(seats).map(
      key => {
        if(!sectionNames.includes(seats[key].auditoriumSection.sectionName)) {
          sectionNames.push(seats[key].auditoriumSection.sectionName);
        }
        if(!rows.includes(seats[key].row)) {
          rows.push(seats[key].row)
        }
        if(!seatNumbers.includes(seats[key].seatNumber)) {
          seatNumbers.push(seats[key].seatNumber)
        }
      }
    )
    this.addValueOptions('sectionName', sectionNames);
    this.addValueOptions('row', rows);
    this.addValueOptions('seatNumber', seatNumbers);
  }

  resetInit(): void {
    this.init = {
      sectionName: {
        initValue: '',
        valueOptions: [
          {value: '', option: 'всі разом'}
        ]
      },
      row: {
        initValue: '',
        valueOptions: [
          {value: '', option: 'всі ряди'}
        ]
      },
      seatNumber: {
        initValue: '',
        valueOptions: [
          {value: '', option: 'всі місця'}
        ]
      }
    };
  }
}
