import {Injectable} from '@angular/core';
import {User} from '../../interfaces';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AlertService} from '../alert.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public error$: Subject<string> = new Subject<string>();
  token: string | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private alert: AlertService
  ) {
  }

  getToken(): string | null {
    const expDateString = sessionStorage.getItem('auth-token-exp');
    if (expDateString !== null) {
      const expDate = new Date(expDateString);
      if (new Date() > expDate) {
        this.logOut();
        return null;
      }
    }
    return sessionStorage.getItem('auth-token');
  }

  login(user: User): Observable<any> {
    return this.http.post<{ token: string, userRole: string, userEmail: string }>(`${environment.dbUrl}/user/login`, user)
      .pipe(
        tap(
          response => {
            const authExpTime = new Date(new Date().getTime() + 60 * 60 * 1000);
            sessionStorage.setItem('auth-token-exp', authExpTime.toString());
            sessionStorage.setItem('auth-token', response.token);
            sessionStorage.setItem('user-email', response.userEmail);
            sessionStorage.setItem('role', response.userRole);
            this.setToken(response.token);
          }
        ),
        catchError(this.errorHandle.bind(this))
      );
  }

  logOut(): void {
    this.setToken(null);
    sessionStorage.clear();
    this.alert.warning('Ви вийшли з сайту');
    this.router.navigate(['/']);
  }


  isAuthenticated(): boolean {
    return !!this.token;
  }

  role(): string | null {
    return sessionStorage.getItem('role');
  }

  setToken(token: string | null): void {
    this.token = token;
  }

  private errorHandle(error: HttpErrorResponse): any {
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

