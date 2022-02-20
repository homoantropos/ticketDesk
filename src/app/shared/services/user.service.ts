import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) {
  }


  private _emptyUserFormInitValue: User = {
    email: '',
    password: '',
    birthday: this.getYear(),
    surname: '',
    name: '',
    role: '',
    profilePictureSrc: ''
  }

  get emptyUserFormInitValue() {
  return this._emptyUserFormInitValue;
  }

  getYear(): Date {
    let date = new Date();
    date.setFullYear(date.getFullYear() - 12);
    return date;
  }
}
