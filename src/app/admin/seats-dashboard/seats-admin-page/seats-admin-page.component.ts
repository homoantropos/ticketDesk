import {Component, OnInit} from '@angular/core';
import {SeatService} from "../../services/seat.service";
import {AlertService} from "../../../shared/services/alert.service";
import {Seat} from "../../../shared/interfaces";
import {FilterRequestInitValues} from "../../../shared/config/filterRequestFilterValues";
import {FilterRequest, FilterRequestInitValue} from "../../../shared/config/typesForFiltering";

@Component({
  selector: 'app-seats-admin-page',
  templateUrl: './seats-admin-page.component.html',
  styleUrls: ['./seats-admin-page.component.css']
})
export class SeatsAdminPageComponent implements OnInit {

  seats: Array<Seat> = [];

  setSeats(seats: Array<Seat>): void {
    if (typeof seats !== 'undefined') {
      seats.map(
        seat => {
          let ids: Array<number> = [];
          if (seat.id) ids.push(seat.id);
          this.removeSeats(ids);
          this.seats.unshift(seat);
        }
      );
      this.removeSeats(undefined);
    } else {
      this.removeSeats(undefined);
    }
  }

  seat: Seat | undefined = undefined;

  removeSeats(ids: Array<number> | undefined): void {
    if (typeof ids !== 'undefined') {
      ids.map(
        id => this.seats = this.seats.filter(st => st.id !== id)
      )
    }
    this.seats = [...this.seats];
  }

  loading = false;
  showEditor = false;

  searchOption = true;
  searchValue = '';
  searchField = ['auditoriumSection', 'sectionName'];

  initFilterValues = ['sectionName', 'row', 'seatNumber'];
  fr: FilterRequest = {};
  frInit: FilterRequestInitValue = {};

  constructor(
    private seatService: SeatService,
    private alert: AlertService,
    public friv: FilterRequestInitValues
  ) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.seatService.getAllSeats(this.seatService.initFilterRequest())
      .subscribe(
        seats => {
          this.seats = seats.slice();
          const sectionNames: Array<string> = [];
          const rows: Array<string> = [];
          const seatNumbers: Array<string> = [];
          Object.keys(seats).map(
            key => {
              console.log(seats[key].auditoriumSection.sectionName);
              if(!sectionNames.includes(seats[key].auditoriumSection.sectionName)) {
                sectionNames.push(seats[key].auditoriumSection.sectionName);
                console.log(seats[key].auditoriumSection.sectionName);
              }
              if(!rows.includes(seats[key].row)) {
                rows.push(seats[key].row)
              }
              if(!seatNumbers.includes(seats[key].seatNumber)) {
                seatNumbers.push(seats[key].seatNumber)
              }
            }
          )
          this.frInit = this.friv.addValueOptions('sectionName', sectionNames);
          this.frInit = this.friv.addValueOptions('row', rows);
          this.frInit = this.friv.addValueOptions('seatNumber', seatNumbers);
          this.loading = false;
        },
        error => {
          this.alert.danger(error.error.message);
          this.loading = false;
        }
      )
  }

  filterSeats(fr: FilterRequest): void {
    this.loading = true;
    this.seatService.getAllSeats(fr)
      .subscribe(
      seats => {
        this.seats = seats.slice();
        this.loading = false;
      },
      error => {
        this.alert.danger(error.error.message);
        this.loading = false;
      }
    )
  }

  showSectionEditor(condition: boolean): void {
    this.showEditor = condition;
    this.seat = this.seatService.seat;
    this.searchValue = '';
  }
}
