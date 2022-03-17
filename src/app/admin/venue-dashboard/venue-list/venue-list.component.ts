import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Venue} from "../../../shared/interfaces";
import {Router} from "@angular/router";
import {AlertService} from "../../../shared/services/alert.service";
import {TableSortService} from "../../../shared/services/table-sort";
import {VenueService} from "../../services/venue.service";

@Component({
  selector: 'app-venue-list',
  templateUrl: './venue-list.component.html',
  styleUrls: ['./venue-list.component.css']
})
export class VenueListComponent implements OnInit {

  @Input() venues: Array<Venue>;

  paginatorStartPageNumber = 0;
  itemsPerPage = 10;

  venueId: number = 0;

  sortDirection = true;
  showDeleteConfirmation = false;
  option = 'місце проведення';

  @Output() showButton: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() idSectionToRemove: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private router: Router,
    private venueService: VenueService,
    private alert: AlertService,
    private sortService: TableSortService
  ) { }

  ngOnInit(): void {
  }

  callDeletion(id: number): void {
    this.showDeleteConfirmation = true;
    this.venueId = id;
  }

  onDelete(confirm: boolean): void {
    if (confirm) {
      this.venueService.deleteVenue(this.venueId)
        .subscribe(
          (response: {message: string}) => {
            this.alert.success(response.message);
            this.showDeleteConfirmation = false;
            this.showButton.emit(false);
            this.idSectionToRemove.emit(this.venueId);
            this.venueService.venue = undefined;
          },
          error => {
            this.venueService.errorHandle(error);
          }
        );
      if (this.venueService.error$) {
        this.venueService.error$.subscribe(
          message => this.alert.danger(message)
        );
      }
    } else {
      this.showDeleteConfirmation = false;
      this.alert.warning('Видалення скасованою');
    }
  }

  goToVenueEditor(id?: number): void {
    this.router.navigateByUrl(`admin/venue/edit/${id}`);
  }

  sortTable(sortOption: any): void {
    this.sortDirection = this.sortService.sortTableByStringValues(sortOption, this.venues, this.sortDirection);
  }
}
