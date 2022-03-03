import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../shared/interfaces";
import {TableSortService} from "../../../shared/services/table-sort";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @Input() users: Array<User> = [];
  paginatorStartPageNumber = 0;
  itemsPerPage = 10;

  sortDirection = true;

  userId = 0;

  @Output() showButton: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private sortService: TableSortService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  editUser(id?: number): void {
    this.router.navigateByUrl(`admin/edit/${id}`)
  }

  sortTable(sortOption: any): void {
    this.sortDirection = this.sortService.sortTableByStringValues(sortOption, this.users, this.sortDirection);
  }
}
