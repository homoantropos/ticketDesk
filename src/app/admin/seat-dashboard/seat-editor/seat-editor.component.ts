import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {Seat, Venue} from "../../../shared/interfaces";
import {TableSortService} from "../../../shared/services/table-sort";
import {SeatService} from "../../services/seat.service";
import {ActivatedRoute} from "@angular/router";

export interface SeatEditorFormInitValue {
  venueHall?: string,
  hallSection: string,
  startRow: number,
  lastRow: number,
  startSeatNumber: number,
  lastSeatNumber: number,
  typeOfSeat?: string,
}

@Component({
  selector: 'app-seat-editor',
  templateUrl: './seat-editor.component.html',
  styleUrls: ['./seat-editor.component.css']
})

export class SeatEditorComponent implements OnInit {

  seatEditorForm: FormGroup;

  @Input() venue: Venue;
  @Input() seats: Array<Seat>;
  @Output() seats$: EventEmitter<Array<Seat>> = new EventEmitter<Array<Seat>>();

  sortDirection = true;

  constructor(
    private fb: FormBuilder,
    private seatService: SeatService,
    private sortService: TableSortService
  ) {
  }

  ngOnInit(): void {
    this.seatEditorForm = this.fb.group({
      valueForSeatsGen: this.fb.array([])
    });
    this.addValueForSeatsGenControl(this.seats);
  }

  get valueForSeatsGen(): FormArray {
    return this.seatEditorForm['controls']['valueForSeatsGen'] as FormArray;
  }

  addValueForSeatsGenControl(seats?: Array<Seat>): void {
    if (seats.length > 0) {
      this.sortSeatsForEditor();
      const venueHalls: Array<string> = []
      seats.map(
        seat => {
          if (!venueHalls.includes(seat.venueHall)) {
            venueHalls.push(seat.venueHall);
          }
        }
      );
      console.log(venueHalls);
      venueHalls.map(
        venueHall => {
          const sts = seats.filter(seat => seat.venueHall === venueHall);
        }
      )
    } else {
      this.valueForSeatsGen.push(
        this.fb.group({
          venueHall: [''],
          hallSection: [''],
          startRow: [null],
          lastRow: [null],
          startSeatNumber: [null],
          lastSeatNumber: [null],
          typeOfSeat: ['']
        })
      )
    }
  }

  sortSeatsForEditor(): void {
    let keys = Object.keys(this.seats[0]).filter(key => !key.toLowerCase().includes('id'.toLowerCase()));
    keys = keys.sort((a, b) => keys.indexOf(b) - keys.indexOf(a));
    keys.map(
      key => {
        this.sortService.sortTableByStringValues([key], this.seats, false);
      }
    );
  }

}
