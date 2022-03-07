import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Seat} from "../../../shared/interfaces";
import {Router} from "@angular/router";
import {AlertService} from "../../../shared/services/alert.service";
import {TableSortService} from "../../../shared/services/table-sort";
import {SeatService} from "../../services/seat.service";

@Component({
  selector: 'app-seats-list',
  templateUrl: './seats-list.component.html',
  styleUrls: ['./seats-list.component.css']
})
export class SeatsListComponent implements OnInit, OnChanges {

  @Input() seats: Array<Seat> = [];

  paginatorStartPageNumber = 0;
  itemsPerPage = 10;

  ids: Array<number> = [];

  sortDirection = true;
  showDeleteConfirmation = false;
  option = 'глядацьке місце';

  @Output() showButton: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() idSeatToRemove: EventEmitter<Array<number>> = new EventEmitter<Array<number>>();

  constructor(
    private router: Router,
    public seatService: SeatService,
    private alert: AlertService,
    private sortService: TableSortService
  ) {
  }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges) {
    this.seats = [...changes['seats'].currentValue];
  }

  goToSeatEditor(seat: Seat): void {
    this.seatService.seat = seat;
    this.showButton.emit(true);
  }

  callDeletion(ids: Array<number>): void {
    this.showDeleteConfirmation = true;
    this.ids = ids.slice();
  }

  onDelete(confirm: boolean): void {
    if (confirm) {
      this.seatService.deleteSeats(this.ids)
        .subscribe(
          (response: {message: string}) => {
            this.alert.success(response.message);
            this.showDeleteConfirmation = false;
            this.showButton.emit(false);
            this.idSeatToRemove.emit(this.ids);
            this.seatService.seat = undefined;
          },
          error => {
            this.seatService.errorHandle(error);
          }
        );
      if (this.seatService.error$) {
        this.seatService.error$.subscribe(
          message => this.alert.danger(message)
        );
      }
    } else {
      this.showDeleteConfirmation = false;
      this.alert.warning('Видалення скасованою');
    }
  }

  sortTable(sortOption: any): void {
    this.sortDirection = this.sortService.sortTableByStringValues(sortOption, this.seats, this.sortDirection);
  }

}
