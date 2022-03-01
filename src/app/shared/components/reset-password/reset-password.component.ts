import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  // @ts-ignore
  resetPasswordForm: FormGroup;
  message = 'Введіть елекронну пошту, указану під час реєстрації'
  submitted = false;
  @ViewChild('emailInput') emailInput!: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
    if(this.resetPasswordForm.controls['email']) {
      setTimeout(() => this.emailInput.nativeElement.focus(), 0)
    }
  }

  resetPassword(email: string): void {
    this.submitted = true;
    this.auth.resetPassword(email)
      .subscribe(
        response => {
          this.message = response.message;
          this.submitted = false;
        }, error => {
          this.message = error.error.message;
        }
      );
  }

}
