import {Injectable} from '@angular/core';
import {User} from '../../interfaces';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AlertService} from '../alert.service';
import jwt_decode from 'jwt-decode';

export interface DecToken {
  email: string,
  role: string,
  userId: number,
  iat: number,
  exp: number
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public error$: Subject<string> = new Subject<string>();
  private _token: string | null = null;
  // @ts-ignore
  private dec_token: DecToken;

  constructor(
    private http: HttpClient,
    private router: Router,
    private alert: AlertService
  ) {
  }

  setToken(token: string | null): void {
    this._token = token;
    token === null ? sessionStorage.clear() : sessionStorage.setItem('auth-token', token);
  }

  get token(): string | null {
    const token = sessionStorage.getItem('auth-token');
    if (this.checkSession()) {
      return token
    }
    this.logOut();
    return null;
  }

  checkSession(): boolean {
    // @ts-ignore
    const expDate = new Date(sessionStorage.getItem('auth-token-exp'));
    return expDate > new Date();
  }

  login(user: User): Observable<any> {
    return this.http.post<{ token: string }>(`${environment.dbUrl}/user/login`, user)
      .pipe(
        tap(
          response => {
            {
              const authExpTime = new Date(new Date().getTime() + 60 * 60 * 1000);
              sessionStorage.setItem('auth-token-exp', authExpTime.toString());
              this.setToken(response.token);
            }
          }
        ),
        catchError(this.errorHandle.bind(this))
      );
  }

  reset(email: string): Observable<{message: string}> {
    const body = {email};
    return this.http.post<{message: string}>(`${environment.dbUrl}/user/reset`, body);
  }

  logOut(): void {
    this.setToken(null);
    this.alert.warning('Ви вийшли з сайту');
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return this.checkSession();
  }

  accessAllowed(role: string): boolean {
    if (this.isAuthenticated()) {
      // @ts-ignore
      return role === jwt_decode(this.token).role;
    }
    return false
  }

  getUserId(): number | null {
    if (this.isAuthenticated()) {
      // @ts-ignore
      this.dec_token = jwt_decode(sessionStorage.getItem('auth-token'));
      return this.dec_token.userId;
    }
    return null
  }

  public errorHandle(error: HttpErrorResponse): any {
    const message = error.error.message;
    if (message) {
      switch (message) {
        case('INVALID_PASSWORD'):
          this.error$.next('невірний пароль');
          break;
        case('EMAIL_NOT_FOUND'):
          this.error$.next('емейл не знайдено');
          break;
        case('повторювані значення ключа порушують обмеження унікальності \\"result_discipline_participantId_key\\'):
          this.error$.next('Такий учасник вже зареєстрований в цій вагові категорії');
          break;
      }
    }
    return throwError(error);
  }

}

