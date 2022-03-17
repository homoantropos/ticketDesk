import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Venue} from "../../shared/interfaces";
import {Observable, Subject, throwError} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class VenueService {

  venue: Venue | undefined = undefined;
  error$: Subject<string> = new Subject<string>();

  constructor(
    private http: HttpClient
  ) { }

  createVenue(venue: Venue): Observable<{venue: Venue, message: string}> {
    return this.http.post<{venue: Venue, message: string}>(`${environment.dbUrl}/venue/create`, venue);
  }

  updateVenue(venue: Venue): Observable<{venue: Venue, message: string}> {
    return this.http.patch<{venue: Venue, message: string}>(`${environment.dbUrl}/venue/${venue.id}`, venue);
  }

  deleteVenue(id: number): Observable<{id: number, message: string}> {
    return this.http.delete<{id: number, message: string}>(`${environment.dbUrl}/venue/${id}`);
  }

  getAllVenues(): Observable<Array<Venue>> {
    return this.http.get<Array<Venue>>(`${environment.dbUrl}/venue`);
  }

  getVenueById(id: number): Observable<Venue> {
    return this.http.get<Venue>(`${environment.dbUrl}/venue/${id}`);
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
        case('повторювані значення ключа порушують обмеження унікальності \"auditoriumSection_sectionName_key5\"'):
          this.error$.next('Така частина глядацького залу вже існує в базі даних');
          break;
      }
    }
    return throwError(error);
  }
}
