import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../interfaces";
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AgeValidator} from "../../services/age-validator";
import {AlertService} from "../../services/alert.service";
import {switchMap} from "rxjs";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-user-register-or-edit',
  templateUrl: './user-register-or-edit.component.html',
  styleUrls: ['./user-register-or-edit.component.css']
})

export class UserRegisterOrEditComponent implements OnInit, OnDestroy {

  // @ts-ignore
  userForm: FormGroup;
  submitted = false;
  // @ts-ignore
  userId: number;
  // @ts-ignore
  uSub: Subscription;
  reset = false;
  // @ts-ignore
  createOrEditLabelName: string;
  buttonName = 'зареєсттруватись'
  private creatOrEditor = true;

  setCreatOrEditor(condition: boolean): void {
    this.creatOrEditor = condition;
  }

  get creatorOrEditor(): boolean {
    return this.creatOrEditor;
  }

  // @ts-ignore
  @ViewChild('emailInput') private emailInput: ElementRef;
  // @ts-ignore
  @ViewChild('profilePictureLoader') private profilePictureLoader: ElementRef;
  profilePictureSrc = '';
  // @ts-ignore
  profilePicture: File;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public userService: UserService,
    private alert: AlertService,
    private auth: AuthService
  ) {
  }

  ngOnInit(): void {
    if (this.route.toString().includes('edit')) {
      this.setCreatOrEditor(false);
      this.createOrEditLabelName = 'Змінити дані';
      this.buttonName = 'зберегти зміни'
      this.route.params
        .pipe(
          switchMap(
            (params: Params) => {
              this.userId = params['id'];
              return this.userService.getUserById(params['id']);
            }
          )
        ).subscribe(
          user => {
            this.userForm = this.createForm(user, this.creatorOrEditor);
            this.makeFocus();
          },
          error => this.alert.danger(error.message)
        );
    } else {
      this.userForm = this.createForm(this.userService.emptyUserFormInitValue, this.creatorOrEditor);
      this.makeFocus();
      this.createOrEditLabelName = 'Внесіть дані для реєстрації:';
    }

  }

  makeFocus(): void {
    if (typeof this.userForm.controls['email']) {
      setTimeout(() =>
        this.emailInput.nativeElement.focus(), 0
      );
    }
  }

  createForm(user: User, creatorOrEditor: boolean): FormGroup {
    const validators: Array<Validators> = [Validators.required, Validators.minLength(6)];
    let actualPasswordValidators;
    let passwordValidators;
    if(creatorOrEditor) {
      actualPasswordValidators = validators.slice(1);
      passwordValidators = validators;
    } else {
      actualPasswordValidators = validators;
      passwordValidators = validators.slice(1);
    }
    return this.fb.group({
      email: [user.email, [Validators.required, Validators.email]],
      actualPassword: ['', actualPasswordValidators],
      password: ['', passwordValidators],
      birthday: [user.birthday, [Validators.required, AgeValidator]],
      surname: [user.surname ? user.surname : ''],
      name: [user.name ? user.name : ''],
      phoneNumber: [user.phoneNumber ? user.phoneNumber : '',
        Validators.pattern("^((\\+38-?)|0)[\ )(.-]*(0)[0-9]{2}[\ )(.-]*[0-9]{3}[\ )(.-]*[0-9]{2}[\ )(.-]*[0-9]{2}$")],
      role: [user.role],
      profilePictureSrc: [user.profilePictureSrc ? user.profilePictureSrc : '']
    })
  }

  clickProfilePictureSrcInput(event: any): void {
    this.profilePictureLoader.nativeElement.click();
    this.stopEvent(event);
  }

  loadProfilePictureLoaderPreview(event: any): void {
    const file = event.target.files[0]
    this.profilePicture = file

    const reader = new FileReader()

    reader.onload = () => {
      if (reader.result)
        this.profilePictureSrc = reader.result.toString()
    }

    reader.readAsDataURL(file)
  }

  onSubmit(formValue: any): void {
    this.userForm.disable();
    this.submitted = true;
    const createdUser: User = {
      email: formValue.email.trim(),
      password: formValue.password.trim(),
      birthday: new Date(formValue.birthday),
      surname: formValue.surname.trim(),
      name: formValue.name.trim(),
      phoneNumber: formValue.phoneNumber.trim(),
      role: formValue.role.trim(),
      profilePictureSrc: formValue.profilePictureSrc
    };
    if (!this.creatorOrEditor) {
      createdUser['actualPassword'] = formValue.actualPassword.trim();
    }
    let userServiceMethod;
    if (this.creatorOrEditor) {
      userServiceMethod = this.userService.registerUser(createdUser, this.profilePicture);
    } else {
      createdUser.id = this.userId;
      userServiceMethod = this.userService.updateUser(createdUser, this.profilePicture);
    }
    this.uSub = userServiceMethod
      .subscribe(
        user => {
          this.router.navigateByUrl(`profile/${this.auth.getUserId()}`);
          // this.alert.success(dbCoachAndMessage.message);
          this.resetUserForm();
        }, error => {
          this.userService.errorHandle(error);
          if(this.auth.error$)
            this.auth.error$.subscribe(
              message => this.alert.danger(message)
            )
          this.userForm.enable();
          this.submitted = false;
        }
      );
    if (this.userService.error$) {
      this.userService.error$.subscribe(
        message =>
          this.alert.danger(message)
      );
    }
  }

  resetUserForm(): void {
    this.reset = true;
    this.userForm.reset();
  }

  goToMainPage(): void {
    this.resetUserForm();
    this.router.navigate(['main']);
  }

  stopEvent(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
  }

  ngOnDestroy(): void {
    if (this.uSub) {
      this.uSub.unsubscribe();
    }
  }

}
