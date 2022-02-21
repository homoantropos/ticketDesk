import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription, throwError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})

export class AlertComponent implements OnInit, OnDestroy {
  @Input() delay = 3000;
  error$: Subject<string> = new Subject<string>();
  type = '';
  text = '';
  // @ts-ignore
  aSub: Subscription;

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.aSub = this.alertService.alert$.subscribe(alert => {
      this.text = alert.text;
      this.type = alert.type;

      const timeOut = setTimeout(() => {
        clearTimeout(timeOut);
        this.text = '';
        this.type = '';
      }, this.delay);
    });
  }

  private errorHandle(error: HttpErrorResponse): any {
    const message = error.error.message;
    if (message) {
      switch (message) {
        case('INVALID_PASSWORD'):
          this.error$.next('невірний пароль');
          break;
        case('EMAIL_NOT_FOUND'):
          this.error$.next('емейл не знайдено');
          break;
        case('повторювані значення ключа порушують обмеження унікальності \"result_discipline_participantId_key\"'):
          this.error$.next('Такий учасник вже зареєстрований в цій вагові категорії');
          break;
      }
    }
    return throwError(error);
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

}
