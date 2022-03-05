import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {AuditoriumSection} from "../../../shared/interfaces";
import {Router} from "@angular/router";
import {SectionService} from "../../services/section.service";
import {AlertService} from "../../../shared/services/alert.service";
import {TableSortService} from "../../../shared/services/table-sort";

@Component({
  selector: 'app-auditorium-section-list',
  templateUrl: './auditorium-section-list.component.html',
  styleUrls: ['./auditorium-section-list.component.css']
})

export class AuditoriumSectionListComponent implements OnInit, OnChanges {

  @Input() sections: Array<AuditoriumSection> = [];

  paginatorStartPageNumber = 0;
  itemsPerPage = 10;

  sectionId: number = 0;

  sortDirection = true;
  showDeleteConfirmation = false;
  option = 'секцію глядацького залу';

  @Output() showButton: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() sectionForEditing: EventEmitter<AuditoriumSection> = new EventEmitter<AuditoriumSection>();

  constructor(
    private router: Router,
    public sectionService: SectionService,
    private alert: AlertService,
    private sortService: TableSortService
  ) {
  }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges) {
    this.sections = [...changes['sections'].currentValue];
  }

  goToSectionEditor(section: AuditoriumSection): void {
    this.sectionForEditing.emit(section);
    this.showButton.emit(true);
  }

  callDeletion(id: number): void {
    this.showDeleteConfirmation = true;
    this.sectionId = id;
  }

  onDelete(confirm: boolean): void {
    if (confirm) {
      this.sectionService.deleteSection(this.sectionId)
        .subscribe(
          (response: {message: string}) => {
            this.alert.success(response.message);
            this.sections = this.sections.filter(c => c.id !== this.sectionId);
          },
          error => {
            this.sectionService.errorHandle(error);
          }
        );
      if (this.sectionService.error$) {
        this.sectionService.error$.subscribe(
          message => this.alert.danger(message)
        );
      }
    } else {
      this.alert.warning('Видалення скасованою');
    }
    this.showDeleteConfirmation = false;
    this.showButton.emit(false);
    this.sectionForEditing.emit(undefined);
  }


  sortTable(sortOption: any): void {
    this.sortDirection = this.sortService.sortTableByStringValues(sortOption, this.sections, this.sortDirection);
  }

}
