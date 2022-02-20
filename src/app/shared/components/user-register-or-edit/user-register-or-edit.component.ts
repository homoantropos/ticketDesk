import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../interfaces";
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Params} from "@angular/router";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-user-register-or-edit',
  templateUrl: './user-register-or-edit.component.html',
  styleUrls: ['./user-register-or-edit.component.css']
})

export class UserRegisterOrEditComponent implements OnInit {

  // @ts-ignore
  userForm: FormGroup;
  // @ts-ignore
  minDate: Date;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.minDate = this.userService.getYear();
    this.userForm = this.createForm(this.userService.emptyUserFormInitValue);
    console.log(this.userForm.value);
  }

  createForm(user: User): FormGroup {
    return this.fb.group({
      email: [user.email, [Validators.email, Validators.required]],
      password: [user.password, [Validators.required, Validators.minLength(6)]],
      birthday: [user.birthday, [Validators.required]],
      surname: [user.surname],
      name: [user.name],
      role: [user.role],
      profilePictureSrc: [user.profilePictureSrc]
    })
  }

  onSubmit(user: User): void {

  }

}
