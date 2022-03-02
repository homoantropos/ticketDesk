import {Component, OnDestroy} from '@angular/core';
import {AuthService} from "./shared/services/auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'ticketDesk';
  constructor(
    private auth: AuthService
  ) {}

  ngOnDestroy() {
    this.auth.logOut();
  }
}
