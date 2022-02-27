import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {switchMap} from "rxjs";
import {User} from "../../interfaces";
import {AuthService} from "../../services/auth/auth.service";
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  // @ts-ignore
  user: User;
  profilePictureSrc = '';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private alert: AlertService
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
        user => {
          this.user = user;
          if(this.user.profilePictureSrc)
          this.profilePictureSrc = `http://localhost:8050/${this.user.profilePictureSrc}`
        }, error => {
          this.router.navigate(['main']);
          this.alert.danger(error.error.message);
        }
      )
  }

  goToEditor(): void {
    console.log(this.auth.getUserId());
    this.router.navigateByUrl(`edit/${this.auth.getUserId()}`);
  }
}
