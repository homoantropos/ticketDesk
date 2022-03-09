import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuditoriumSection, Seat} from "../../../shared/interfaces";
import {Subscription} from "rxjs";
import {SeatService} from "../../services/seat.service";
import {TableSortService} from "../../../shared/services/table-sort";
import {SectionService} from "../../services/section.service";
import {AlertService} from "../../../shared/services/alert.service";

@Component({
  selector: 'app-seats-editor',
  templateUrl: './seats-editor.component.html',
  styleUrls: ['./seats-editor.component.css']
})

export class SeatsEditorComponent implements OnInit {

  creatingForm: FormGroup;

  sectionNames: Array<string>;

  showSeatForm = false;
  submitted = false;

  cSub: Subscription;

  createOrEditLabelName: string;
  private creatOrEditor = true;

  setCreatOrEditor(condition: boolean): void {
    this.creatOrEditor = condition;
  }

  get creatorOrEditor(): boolean {
    return this.creatOrEditor;
  }

  constructor(
    private fb: FormBuilder,
    private sectionService: SectionService,
    private seatService: SeatService,
    private sortService: TableSortService,
    private alert: AlertService
  ) {
  }

  ngOnInit(): void {
    this.sectionService.getSectionNames()
      .subscribe(
        sectionNames => this.sectionNames = sectionNames,
        error => this.alert.danger(error.error.message)
      );
    this.creatingForm = this.fb.group({
      seats: this.fb.array([
        this.fb.group({
          sectionName: ['', [Validators.required]],
          startRow: [null],
          lastRow: [null],
          startSeatNumber: [null],
          lastSeatNumber: [null]
        })
      ])
    });
    console.log(this.seats.value[0].startSeatNumber);
    // console.log(this._seatForm);
  }

  resetSeatForm(): void {

  }

  get seats(): FormArray {
    return this.creatingForm.controls['seats'] as FormArray
  }

  addControlsToSeatForm(seat: Seat, formArray: FormArray): FormArray {
    formArray.push(this.fb.group({
        sectionName: [seat.auditoriumSection.sectionName, []],
        row: [seat.row],
        seatNumber: [seat.seatNumber]
      })
    );
    return formArray;
  }

  remoVeControlsFromSeatForm(seats: Array<Seat>): void {

  }

  onSubmit(someVal: [{
    startRow: number,
    lastRow: number,
    startSeatNumber: number,
    lastSeatNumber: number,
    sectionName: string
  }]): void {
    console.log(someVal);
    someVal.map(
      value => {
        let finish = value.lastRow;
        const seats: Array<Seat> = [];
        for (let row = value.startRow; row <= finish; row++) {
          for (let seatNumber = value.startSeatNumber; seatNumber <= value.lastSeatNumber; seatNumber++) {
            const seat = {
              row,
              seatNumber,
              auditoriumSection: {
                sectionName: value.sectionName
              },
            }
            seats.push(seat);
          }
        }
        this.seatService.createSeat(seats)
          .subscribe(
            res => console.log(res),
            error => this.alert.danger(error.error.message)
          );
      }
    )
  }
}
