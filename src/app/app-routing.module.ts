import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrationComponent } from './components/administration/administration.component';
import { HomeComponent } from './components/home/home.component';
import { LeagueAdminComponent, LeagueComponent } from './components/league/league.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { statisticsAdmin, StatisticsComponent } from './components/statistics/statistics.component';
import { TableComponent } from './components/table/table.component';
import { TeamComponent } from './components/team/team.component';
import { UserComponent } from './components/user/user.component';
import { UsersComponent } from './components/users/users.component';
import { AdminGuard } from './guard/admin.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'administration', canActivate: [AdminGuard], component: AdministrationComponent},
  {path: 'league', component: LeagueComponent},
  {path: 'list-users', canActivate: [AdminGuard], component: ListUsersComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent },
  {path: ':id/statistics', component: StatisticsComponent},
  {path: 'user', component: UserComponent},
  {path: 'users', canActivate: [AdminGuard], component: UsersComponent},
  {path: ':id/teams', component: TeamComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: ':id/table', component: TableComponent},
  {path: 'leagues', canActivate: [AdminGuard] ,component: LeagueAdminComponent},
  {path: 'statistics', canActivate: [AdminGuard], component: statisticsAdmin},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
