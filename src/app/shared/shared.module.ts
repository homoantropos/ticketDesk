import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {HttpClientModule} from "@angular/common/http";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSortModule} from "@angular/material/sort";
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS,
  MatMomentDateModule,
  MomentDateAdapter
} from "@angular/material-moment-adapter";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatRadioModule} from "@angular/material/radio";
import {UserRegisterOrEditComponent} from './components/user-register-or-edit/user-register-or-edit.component';
import {LoaderComponent} from './components/loader/loader.component';
import { AlertComponent } from './components/alert/alert.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-foung/page-not-found.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { DeletionConfirmerComponent } from './components/deletion-confirmer/deletion-confirmer.component';
import {RouterModule} from "@angular/router";
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';


@NgModule({
  declarations: [
    UserRegisterOrEditComponent,
    LoaderComponent,
    AlertComponent,
    LoginComponent,
    PageNotFoundComponent,
    UserProfileComponent,
    DeletionConfirmerComponent,
    ResetPasswordComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatAutocompleteModule,
        MatNativeDateModule,
        MatRadioModule,
        HttpClientModule,
        MatIconModule,
        RouterModule
    ],
  exports: [
    AlertComponent,
    FormsModule,
    LoaderComponent,
    LoginComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    MatRadioModule,
    HttpClientModule,
    MatIconModule,
    PageNotFoundComponent,
    ReactiveFormsModule,
    ResetPasswordComponent,
    UserRegisterOrEditComponent,
    UserProfileComponent
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'uk'}, {provide: MAT_DATE_LOCALE, useValue: 'uk'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}}
  ]
})
export class SharedModule {
}
