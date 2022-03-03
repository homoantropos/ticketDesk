import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../shared/services/user.service";
import {AlertService} from "../../../shared/services/alert.service";
import {User} from "../../../shared/interfaces";

@Component({
  selector: 'app-user-admin-page',
  templateUrl: './user-admin-page.component.html',
  styleUrls: ['./user-admin-page.component.css']
})
export class UserAdminPageComponent implements OnInit {

  // @ts-ignore
  users: Array<User>;

  searchOption = true;
  searchValue = '';
  searchField = ['email'];

  constructor(
    private userService: UserService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      users => this.users = users,
      error => this.alert.danger(error.error.message)
    );
  }

}
