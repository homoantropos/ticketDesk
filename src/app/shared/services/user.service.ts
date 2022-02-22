import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {User} from "../interfaces";
import {Observable, Subject, throwError} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  error$: Subject<string> = new Subject<string>();

  constructor(
    private http: HttpClient
  ) {
  }

  registerUser(user: User): Observable<User > {
    return this.http.post<User>(`${environment.dbUrl}/user/register`, user);
  }

  updateUser(user:User): Observable<User> {
    return this.http.patch<User>(`${environment.dbUrl}/user/register`, user);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${environment.dbUrl}/user/${id}`);
  }


  errorHandle(error: HttpErrorResponse): any {
    const message = error.error.message;
    switch (message) {
      case('повторювані значення ключа порушують обмеження унікальності \"user_email_key\"'):
        this.error$.next('Такий користувач вже існує в базі даних, зміни не можуть бути збережені');
        break;
      case('Користувач звязаний з базою результатів і не може бути видалений з бази даних.'):
        this.error$.next('Користувач звязаний з базою результатів і не може бути видалений з бази даних.');
        break;
    }
    return throwError(error);
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
