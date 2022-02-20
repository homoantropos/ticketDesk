import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../interfaces";
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Params} from "@angular/router";
import {switchMap} from "rxjs";
import {DateManipulationService} from "../../services/date-manipulation.service";
import {AgeValidator} from "../../services/age-validator";

@Component({
  selector: 'app-user-register-or-edit',
  templateUrl: './user-register-or-edit.component.html',
  styleUrls: ['./user-register-or-edit.component.css']
})

export class UserRegisterOrEditComponent implements OnInit {

  // @ts-ignore
  userForm: FormGroup;
  today = new Date();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public userService: UserService,
    public dPs: DateManipulationService
  ) {
  }

  ngOnInit(): void {
    this.userForm = this.createForm(this.userService.emptyUserFormInitValue);
  }

  createForm(user: User): FormGroup {
    return this.fb.group({
      email: [user.email, [Validators.required, Validators.email]],
      password: [user.password, [Validators.required, Validators.minLength(6)]],
      birthday: [user.birthday, [Validators.required, AgeValidator]],
      surname: [user.surname],
      name: [user.name],
      phoneNumber: [user.phoneNumber,
        Validators.pattern("^((\\+38-?)|0)[\ )(.]*(0)[0-9]{2}[\ )(.]*[0-9]{3}[\ )(.]*[0-9]{2}[\ )(.]*[0-9]{2}$")],
      role: [user.role],
      profilePictureSrc: [user.profilePictureSrc]
    })
  }

  onSubmit(user: User): void {
    this.userService.registerUser(user)
      .subscribe(
        user => console.log(user)
      )
  }

}
