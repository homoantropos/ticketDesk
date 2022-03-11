import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Seat} from "../../../shared/interfaces";
import {Subscription} from "rxjs";
import {SeatService} from "../../services/seat.service";
import {TableSortService} from "../../../shared/services/table-sort";
import {SectionService} from "../../services/section.service";
import {AlertService} from "../../../shared/services/alert.service";
import {SeatEditorValue} from "../../interfaces";

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
        sectionNames => {
          this.sectionNames = sectionNames;
          this.creatingForm = this.fb.group({
            seats: this.fb.array([])
          });
          this.addControlsToSeatForm();
        },
        error => this.alert.danger(error.error.message ? error.error.message : error)
      );
  }

  resetSeatForm(): void {

  }

  get seats(): any {
    return this.creatingForm['controls']['seats']['controls'];
  }

  addControlsToSeatForm(value?: SeatEditorValue): void {
    const group = this.creatingForm['controls']['seats'] as FormArray;
    group.push(this.fb.group({
        sectionName: [value ? value.sectionName : '', [Validators.required]],
        startRow: [value ? value.startRow : null, [Validators.required]],
        lastRow: [value ? value.lastRow : null, [Validators.required]],
        startSeatNumber: [value ? value.startSeatNumber : null, [Validators.required]],
        lastSeatNumber: [value ? value.lastSeatNumber : null, [Validators.required]]
      })
    );
  }

  remoVeControlsFromSeatForm(seatsGroupIndex: number): void {
    const group = this.creatingForm['controls']['seats'] as FormArray;
    group.removeAt(seatsGroupIndex);
  }

  resetCreatingForm(): void {

  }

  onSubmit(seats: Array<SeatEditorValue>): void {
    seats.map(
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
