import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../interfaces";
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AgeValidator} from "../../services/age-validator";
import {Alert, AlertService} from "../../services/alert.service";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-user-register-or-edit',
  templateUrl: './user-register-or-edit.component.html',
  styleUrls: ['./user-register-or-edit.component.css']
})

export class UserRegisterOrEditComponent implements OnInit {

  // @ts-ignore
  userForm: FormGroup;
  showUserForm = false;
  submitted = false;
  // @ts-ignore
  userId: number;

  // @ts-ignore
  uSub: Subscription;

  // @ts-ignore
  createOrEditLabelName: string;
  private creatOrEditor = true;

  setCreatOrEditor(condition: boolean): void {
    this.creatOrEditor = condition;
  }

  get creatorOrEditor(): boolean {
    return this.creatOrEditor;
  }

  @ViewChild('emailInput') emailInput!: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public userService: UserService,
    private alert: AlertService
  ) {
  }

  ngOnInit(): void {
    if (this.route.toString().includes('edit')) {
      this.setCreatOrEditor(false);
      this.createOrEditLabelName = 'Змінити';
      this.route.paramMap
        .pipe(
          switchMap(
            (params: Params) => {
              this.userId = params['id'];
              return this.userService.getUserById(params['id']);
            }
          )
        )
        .subscribe(
          coach => this.userForm = this.createForm(coach),
          error => this.alert.danger(error.message)
        );
    } else {
      this.userForm = this.createForm(this.userService.emptyUserFormInitValue);
      this.createOrEditLabelName = 'Додати';
    }
    this.userForm = this.createForm(this.userService.emptyUserFormInitValue);
    if (this.userForm) {
      setTimeout(() => {
        this.emailInput.nativeElement.focus();
      });
    }
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
        user => {
          console.log(user);
          this.router.navigate(['main']);
        }
      )
  }

}
