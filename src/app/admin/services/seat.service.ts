import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Seat} from "../../shared/interfaces";
import {environment} from "../../../environments/environment";
import {ActivatedRoute} from "@angular/router";
import {SeatEditorFormInitValue} from "../seat-dashboard/seat-editor/seat-editor.component";

@Injectable({
  providedIn: 'root'
})
export class SeatService {

  constructor(
    private http: HttpClient
  ) { }

  getSeats(id: number): Observable<Array<Seat>> {
    return this.http.get<Array<Seat>>(`${environment.dbUrl}/seat?venueId=${id}`);
  }

}
