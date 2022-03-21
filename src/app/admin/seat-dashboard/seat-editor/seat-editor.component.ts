import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {Seat, Venue} from "../../../shared/interfaces";
import {TableSortService} from "../../../shared/services/table-sort";
import {SeatService} from "../../services/seat.service";
import {SeatsArraySerializationService} from "../../services/seats-array-serialization.service";

export interface SeatEditorFormInitValue {
  venueHall: string,
  hallSection: string,
  startRow: number,
  lastRow: number,
  startSeatNumber: number,
  lastSeatNumber: number,
  typeOfSeat: string,
}

@Component({
  selector: 'app-seat-editor',
  templateUrl: './seat-editor.component.html',
  styleUrls: ['./seat-editor.component.css']
})

export class SeatEditorComponent implements OnInit, OnDestroy {

  seatEditorForm: FormGroup;

  @Input() venue: Venue;
  @Input() seats: Array<Seat>;
  @Output() seats$: EventEmitter<Array<Seat>> = new EventEmitter<Array<Seat>>();

  formValue: Array<SeatEditorFormInitValue> = [];

  currentSeat: Seat;

  constructor(
    private fb: FormBuilder,
    private seatService: SeatService,
    private sortService: TableSortService,
    private seatsReducer: SeatsArraySerializationService
  ) {
  }

  ngOnInit(): void {
    this.seatEditorForm = this.fb.group({
      valueForSeatsGen: this.fb.array([])
    });
    if (this.seats.length > 0) {
      this.formValue = this.seatsReducer.serializeSeatsArray(this.seats);
      this.formValue.map(
        initValue => this.addValueForSeatsGenControl(initValue)
      )
    } else {
      this.addValueForSeatsGenControl();
    }
  }

  get valueForSeatsGen(): FormArray {
    return this.seatEditorForm['controls']['valueForSeatsGen'] as FormArray;
  }

  addValueForSeatsGenControl(initValue?: SeatEditorFormInitValue): void {
    this.valueForSeatsGen.push(
      this.fb.group({
        venueHall: [initValue ? initValue.venueHall : ''],
        hallSection: [initValue ? initValue.hallSection : ''],
        startRow: [initValue ? initValue.startRow : null],
        lastRow: [initValue ? initValue.lastRow : null],
        startSeatNumber: [initValue ? initValue.startSeatNumber : null],
        lastSeatNumber: [initValue ? initValue.lastSeatNumber : null],
        typeOfSeat: [initValue ? initValue.typeOfSeat : '']
      })
    )
  }

  removeSeatsControl(index: number): void {
    this.valueForSeatsGen.removeAt(index);
  }

  onSubmit(value: any): void {
    let seats = [];
    value.map(

    )
    console.log(value);
  }

  ngOnDestroy() {
    this.formValue = [];
  }

}
