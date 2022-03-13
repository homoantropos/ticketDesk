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
import { AuditoriumSectionAdminPageComponent } from './auditorium-section-dashboard/auditorium-section-admin-page/auditorium-section-admin-page.component';
import { AuditoriumSectionListComponent } from './auditorium-section-dashboard/auditorium-section-list/auditorium-section-list.component';
import { AuditoriumSectionEditorComponent } from './auditorium-section-dashboard/auditorium-section-editor/auditorium-section-editor.component';
import { SeatsListComponent } from './seats-dashboard/seats-list/seats-list.component';
import { SeatsAdminPageComponent } from './seats-dashboard/seats-admin-page/seats-admin-page.component';
import { SeatsEditorComponent } from './seats-dashboard/seats-editor/seats-editor.component';
import { TheatreAdminPageComponent } from './theatre-dashboard/theatre-admin-page/theatre-admin-page.component';
import { TheatresListComponent } from './theatre-dashboard/theatres-list/theatres-list.component';
import { TheatreEditorComponent } from './theatre-dashboard/theatre-editor/theatre-editor.component';


@NgModule({
  declarations: [
    AdminComponent,
    UserAdminPageComponent,
    UserListComponent,
    AuditoriumSectionAdminPageComponent,
    AuditoriumSectionListComponent,
    AuditoriumSectionEditorComponent,
    SeatsListComponent,
    SeatsAdminPageComponent,
    SeatsEditorComponent,
    TheatreAdminPageComponent,
    TheatresListComponent,
    TheatreEditorComponent
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
