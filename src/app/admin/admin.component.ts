import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../shared/services/auth/auth.service";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @Input() title = 'адмін панель';

  constructor(
    private router: Router,
    public auth: AuthService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
  }

  goToMainPage(): void {
    this.router.navigate(['main']);
  }

  goToUserProfile(): void {
    if(this.auth.isAuthenticated()) {
      this.router.navigateByUrl(`main/profile/${this.auth.getUserId()}`)
    } else {
      this.alert.warning('Ви не авторизовані! Увійдіть на сайт для продовження.')
      this.router.navigate(['main', 'login']);
    }
  }

}
