import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth/auth.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {


  constructor(
    private router: Router,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  goToRegisterForm(): void {
    this.router.navigateByUrl('/main/register');
  }

  goToUserProfile(): void {
    this.router.navigateByUrl(`/main/profile/${sessionStorage.getItem('user-email')}`);
  }

  ngOnDestroy() {
    this.auth.logOut();
  }
}
