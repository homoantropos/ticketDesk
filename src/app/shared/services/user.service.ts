import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../interfaces";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) {
  }

  registerUser(user: User): Observable<User > {
    return this.http.post<User>(`${environment.dbUrl}/user/register`, user);
  }

  private _emptyUserFormInitValue: User = {
    email: '',
    password: '',
    birthday: this.getYear(),
    surname: '',
    name: '',
    phoneNumber: '',
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
