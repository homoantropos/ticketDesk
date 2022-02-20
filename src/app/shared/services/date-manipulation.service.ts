import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateManipulationService {

  constructor() {
  }

  dateProvide(value: { year: number, month: number, day: number }): Date {
    return new Date(value.year, value.month, value.day);
  }

  provideDuration(startDay: Date, finishDay: Date): number {
    // @ts-ignore
    return Math.round((1 + (finishDay - startDay) / (1000 * 24 * 60 * 60)));
  }

  ageCount(birthday: any,): number {
    birthday = new Date(birthday);
    let age = (new Date()).getFullYear() - birthday.getFullYear();
    if(((new Date()).getDate() - birthday.getDate()) < 0) {
      age = age - 1;
    }
    return age;
  }

  ageCheck(birthday: any, minAge: number): boolean {
    let age = this.ageCount(birthday);
    return age < minAge;
  }
}
