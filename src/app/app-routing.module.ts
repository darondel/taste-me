import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'musics', pathMatch: 'full' },
  { path: 'musics', canActivate: [AuthGuard], loadChildren: './music/pages/top-tracks/top-tracks.module#TopTracksPageModule' },
  { path: 'login', loadChildren: './auth/pages/sign-in/sign-in.module#SignInPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
