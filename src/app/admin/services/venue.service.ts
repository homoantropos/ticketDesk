import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Venue} from "../../shared/interfaces";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class VenueService {

  constructor(
    private http: HttpClient
  ) { }

  createVenue(venue: Venue): Observable<{venue: Venue, message: string}> {
    return this.http.post<{venue: Venue, message: string}>(`${environment.dbUrl}/venue`, venue);
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
}
