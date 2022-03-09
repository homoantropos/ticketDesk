import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, Subject, throwError} from "rxjs";
import {Seat} from "../../shared/interfaces";
import {environment} from "../../../environments/environment";
import {FilterRequest} from "../../shared/services/filterRequestFilterValuesService";

@Injectable({
  providedIn: 'root'
})

export class SeatService {

  error$: Subject<string> = new Subject<string>();
  seat: Seat | undefined = undefined;

  constructor(
    private http: HttpClient
  ) { }

  createSeat(seats: Array<Seat>): Observable<{seats: Array<Seat>, message: string}> {
    return this.http.post<{seats: Array<Seat>, message: string}>(`${environment.dbUrl}/seat/create`, seats);
  }

  updateSeats(seats: Array<Seat>): Observable<{ seats: Array<Seat>, message: string }> {
    return this.http.patch<{seats: Array<Seat>, message: string}>( `${environment.dbUrl}/seat`, seats);
  }

  deleteSeats(ids: Array<number>): Observable<any> {
    let fd = new FormData();
    ids.map(
      id => fd.set(`${id}`, id.toString())
    )
    return this.http.delete<any>(`${environment.dbUrl}/seat`, {body: ids});
  }

  getAllSeats(fr: FilterRequest): Observable<Array<Seat>> {
    return this.http.get<Array<Seat>> (`${environment.dbUrl}/seat?sectionName=${fr.sectionName}&row=${fr.row}&seatNumber=${fr.seatNumber}`);
  }

  getSeatById(id: number): Observable<Seat> {
    return this.http.get<Seat> (`${environment.dbUrl}/seat/${id}`);
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

  initFilterRequest(): FilterRequest {
    return {
      sectionName: '',
      row: '',
      seatNumber: ''
    }
  }

}
