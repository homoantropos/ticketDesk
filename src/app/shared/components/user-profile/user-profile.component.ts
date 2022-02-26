import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {switchMap} from "rxjs";
import {User} from "../../interfaces";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  // @ts-ignore
  user: User;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            return this.userService.getUserById(params['id']);
          }
        )
      )
      .subscribe(
        user => this.user = user
      )
  }

  goToEditor(id: number): void {
    this.router.navigateByUrl(`edit/${id}`);
  }
}
