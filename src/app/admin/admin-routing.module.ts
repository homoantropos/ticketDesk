import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import {AuthGuard} from "../shared/services/auth/auth.guard";
import {AdminLayoutGuard} from "../shared/services/auth/admin-layout.guard";
import {UserAdminPageComponent} from "./users-dashboard/user-admin-page/user-admin-page.component";
import {UserRegisterOrEditComponent} from "../shared/components/user-register-or-edit/user-register-or-edit.component";
import {
  AuditoriumSectionAdminPageComponent
} from "./auditorium-section-dashboard/auditorium-section-admin-page/auditorium-section-admin-page.component";
import {SeatsAdminPageComponent} from "./seats-dashboard/seats-admin-page/seats-admin-page.component";
import {SeatsEditorComponent} from "./seats-dashboard/seats-editor/seats-editor.component";

const routes: Routes = [
  { path: '', canActivate: [AdminLayoutGuard, AuthGuard], component: AdminComponent, children: [
      {path: 'user', children: [
          {path: '', component: UserAdminPageComponent},
          {path: 'edit/:id', component: UserRegisterOrEditComponent},
        ]},
      {path: 'section', children: [
          {path: '', component: AuditoriumSectionAdminPageComponent},
          {path: 'create', component: AuditoriumSectionAdminPageComponent},
          {path: 'edit/:id', component: AuditoriumSectionAdminPageComponent}
        ]},
      {path: 'seat', children: [
          {path: '', component: SeatsAdminPageComponent},
          {path: 'create', component: SeatsEditorComponent}
        ]}
    ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
