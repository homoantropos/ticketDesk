import {Injectable} from '@angular/core';
import {Seat} from "../interfaces";

@Injectable({
  providedIn: 'root'
})

export class FilterRequestInitValuesService {

  private _currentFilterRequestValues: FilterRequestInitValue;

  get currentFilterRequestValues() {
    if(typeof this._currentFilterRequestValues === 'undefined') {
      this._currentFilterRequestValues = this.getIni();
    }
    return this._currentFilterRequestValues;
  }

  setCurrentFRV(newValue: FilterRequestInitValue): void {
    this._currentFilterRequestValues = {};
    this._currentFilterRequestValues = Object.assign(this._currentFilterRequestValues, newValue);
  }

  addKeyToFilterRequestValue(addedValue: FilterRequestInitValue): FilterRequestInitValue {
    const ini = this.currentFilterRequestValues;
    Object.keys(addedValue)
      .map(
        key => {
          if(typeof ini[key] === 'undefined') {
            ini[key] = addedValue[key];
          }
        }
      );
    return ini;
  }

  addValueOptionsToFilterRequestValue(key: string, values: Array<string>): FilterRequestInitValue {
    const ini = this.currentFilterRequestValues;
    values.map(
      value => {
        try {
          ini[key].valueOptions.push({value, option: value})
        } catch (error) {
          console.log(error);
        }
      }
    )
    return ini
  }

  getValueForFilterSelects(values?: Array<string>): FilterRequestInitValue {
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
    return this.addKeyToFilterRequestValue(years);
  }

  getIni(): FilterRequestInitValue {
    return {
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
    this.addValueOptionsToFilterRequestValue('sectionName', sectionNames);
    this.addValueOptionsToFilterRequestValue('row', rows);
    this.addValueOptionsToFilterRequestValue('seatNumber', seatNumbers);
  }

  resetCurrentFilterRequestValues(): void {
    this.setCurrentFRV(this.getIni());
  }
}

export type FilterRequestInitValue = {
  [key: string]: {
    initValue: string,
    valueOptions: Array<{
      value: string, option: string
    }>
  }
};

export type SelectInitOptions = Array<{
  [key: string]: {
    valueOptions: Array<{
      value: any, option: string
    }>
  }
}>;

export type FilterRequest = { [key: string]: string };
