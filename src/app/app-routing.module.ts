import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListuserComponent } from './listuser/listuser.component';
import { LoginComponent } from './login/login.component';
import { RegistrerComponent } from './registrer/registrer.component';

const routes: Routes = [
  { path: "", redirectTo: 'home', pathMatch: "full" },
  { path: "login", component: LoginComponent, pathMatch: "full" },
  { path: "registrer", component: RegistrerComponent, pathMatch: "full" },
  { path: "list_users", component: ListuserComponent, pathMatch: "full" }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
