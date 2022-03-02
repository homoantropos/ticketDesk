import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {SharedModule} from "../shared/shared.module";
import { UserAdminPageComponent } from './users-dashboard/user-admin-page/user-admin-page.component';
import { UserListComponent } from './users-dashboard/user-list/user-list.component';
import {NgxPaginationModule} from "ngx-pagination";


@NgModule({
  declarations: [
    AdminComponent,
    UserAdminPageComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatToolbarModule,
    MatMenuModule,
    SharedModule,
    NgxPaginationModule
  ]
})
export class AdminModule { }
