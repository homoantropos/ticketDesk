import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {SharedModule} from "../shared/shared.module";
import { UserDashboardComponent } from './users-admin/user-dashboard/user-dashboard.component';
import { UserListComponent } from './users-admin/user-list/user-list.component';


@NgModule({
  declarations: [
    AdminComponent,
    UserDashboardComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatToolbarModule,
    MatMenuModule,
    SharedModule
  ]
})
export class AdminModule { }
