import {Component, OnDestroy, OnInit} from '@angular/core';
import {SeatService} from "../../services/seat.service";
import {AlertService} from "../../../shared/services/alert.service";
import {Seat} from "../../../shared/interfaces";
import {FilterRequestInitValuesService} from "../../../shared/services/filterRequestFilterValuesService";
import {FilterRequest, FilterRequestInitValue} from "../../../shared/services/filterRequestFilterValuesService";
import {Router} from "@angular/router";

@Component({
  selector: 'app-seats-admin-page',
  templateUrl: './seats-admin-page.component.html',
  styleUrls: ['./seats-admin-page.component.css']
})
export class SeatsAdminPageComponent implements OnInit, OnDestroy {

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
    private router: Router,
    private seatService: SeatService,
    private alert: AlertService,
    public friv: FilterRequestInitValuesService
  ) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.seatService.getAllSeats(this.seatService.initFilterRequest())
      .subscribe(
        seats => {
          this.seats = seats.slice();
          this.friv.setSelectsForSeatAdmin(this.seats);
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

  goToSeatsEditor(): void {
    this.router.navigate(['admin', 'seat', 'create']);
  }

  showSectionEditor(condition: boolean): void {
    this.showEditor = condition;
    this.seat = this.seatService.seat;
    this.searchValue = '';
  }

  ngOnDestroy() {
    this.friv.resetCurrentFilterRequestValues();
  }
}
