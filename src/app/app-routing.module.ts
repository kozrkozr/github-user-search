import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
	{ path: '', redirectTo: 'users', pathMatch: 'full' },
	{ path: 'users', component: FormComponent },
	{ path: 'users/:login', component: UserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
