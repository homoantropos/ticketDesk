import {Injectable, OnInit} from '@angular/core';
import {Seat} from "../../shared/interfaces";
import {SeatEditorFormInitValue} from "../seat-dashboard/seat-editor/seat-editor.component";
import {TableSortService} from "../../shared/services/table-sort";

@Injectable({
  providedIn: 'root'
})
export class SeatsArraySerializationService implements OnInit {

  formValue: Array<SeatEditorFormInitValue> = [];
  seats: Array<Seat> = [];

  constructor(
    private sortService: TableSortService
  ) {
  }

  ngOnInit() {
  }

  createGroup(seat: Seat): void {
    this.formValue.push({
      venueHall: seat.venueHall ? seat.venueHall : '',
      hallSection: seat.hallSection ? seat.hallSection : '',
      startRow: seat.row,
      lastRow: null,
      startSeatNumber: seat.seatNumber,
      lastSeatNumber: null,
      typeOfSeat: seat.typeOfSeat,
    });
  }

  setGroup(seat: Seat): void {
    const value = this.formValue.filter(v => v.startRow === seat.row && v.hallSection === seat.hallSection &&
      v.venueHall === seat.venueHall)
    let id = this.formValue.indexOf(value[0]);
    if (this.formValue[id].lastSeatNumber < seat.seatNumber) {
      this.formValue[id].lastSeatNumber = seat.seatNumber;
    }
  }

  seatsAreInSameRow(seat1: Seat, seat2: Seat): boolean {
    return (
      seat2.typeOfSeat === seat1.typeOfSeat &&
      (seat2.seatNumber - seat1.seatNumber === 1) &&
      seat1.row === seat2.row &&
      seat1.hallSection === seat2.hallSection &&
      seat1.venueHall === seat2.venueHall
    );
  }

  initValuesChain(initValue1: SeatEditorFormInitValue, initValue2: SeatEditorFormInitValue): boolean {
    return (
      initValue1.venueHall === initValue2.venueHall &&
      initValue1.hallSection === initValue2.hallSection &&
      initValue1.startSeatNumber === initValue2.startSeatNumber &&
      initValue1.lastSeatNumber === initValue2.lastSeatNumber &&
      initValue1.typeOfSeat === initValue2.typeOfSeat
    );
  }

  serializeSeatsArray(seats: Array<Seat>): Array<SeatEditorFormInitValue> {
    this.formValue = [];
    this.seats = this.sortSeats(seats).slice();
    if (seats.length > 0) {
      let currentSeat = seats[0];
      this.createGroup(seats[0]);
      this.seats = this.seats.slice(1);
      this.seats.map(
        seat => {
          if (this.seatsAreInSameRow(currentSeat, seat)) {
            this.setGroup(seat);
          } else {
            this.createGroup(seat);
          }
          currentSeat = seat;
        }
      );
    }
    this.formValue = this.reduceRows(this.formValue);
    return this.formValue
  }

  reduceRows(formValue: Array<SeatEditorFormInitValue>): Array<SeatEditorFormInitValue> {
    let formVal: Array<SeatEditorFormInitValue> = [];
    if (formValue.length > 0) {
      formValue.map(
        initValue => {
          const matchRow = formVal.find(v => this.initValuesChain(v, initValue));
          if (matchRow) {
            matchRow.lastRow = initValue.startRow;
            formVal = formVal.filter(v => !this.initValuesChain(v, initValue));
            formVal.push(matchRow);
          } else {
            formVal.push(initValue);
          }
        }
      )
    }
    formVal.map(
      v => {
        if(v.lastRow === null) {
          v.lastRow = v.startRow;
        }
      }
    )
    return formVal
  }

  sortSeats(seats: Array<Seat>): Array<Seat> {
    let keys = Object.keys(seats[0]).filter(key => !key.toLowerCase().includes('id'.toLowerCase()));
    keys = keys.sort((a, b) => keys.indexOf(b) - keys.indexOf(a));
    keys.map(
      key => {
        this.sortService.sortTableByStringValues([key], seats, false);
      }
    );
    return seats
  }

}
