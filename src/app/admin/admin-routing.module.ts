import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import {AuthGuard} from "../shared/services/auth/auth.guard";
import {AdminLayoutGuard} from "../shared/services/auth/admin-layout.guard";

const routes: Routes = [{ path: '', canActivate: [AdminLayoutGuard, AuthGuard], component: AdminComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
