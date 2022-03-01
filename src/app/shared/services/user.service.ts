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

  registerUser(user: User, image?: File): Observable<User > {
    const fd = new FormData();
    Object.keys(user).map(
      // @ts-ignore
      key => fd.set(key, user[key])
    )
    if(image) {
      fd.append('image', image, image.name);
    }
    return this.http.post<User>(`${environment.dbUrl}/user/register`, fd);
  }

  updateUser(user: User, image?: File): Observable<User> {
    const fd = new FormData();
    Object.keys(user).forEach(
      // @ts-ignore
      key => fd.append(key, user[key])
    )
    if(image) {
      fd.append('image', image, image.name);
    }
    return this.http.patch<User>(`${environment.dbUrl}/user/${user.id}`, fd);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${environment.dbUrl}/user/${id}`);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.dbUrl}/user/${id}`)
  }

  errorHandle(error: HttpErrorResponse): any {
    const message = error.error.message;
    switch (message) {
      case('повторювані значення ключа порушують обмеження унікальності \"user_email_key4\"'):
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
    role: 'user',
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
