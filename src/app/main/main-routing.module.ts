import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main-page/main.component';
import {UserRegisterOrEditComponent} from "../shared/components/user-register-or-edit/user-register-or-edit.component";

const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'foolMatch'},
  {path: 'main', component: MainComponent, children: [
      {path: 'register', component: UserRegisterOrEditComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
