import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DetailTeamComponent } from './detail-team/detail-team.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./uefa/uefa.module').then(m => m.UefaPageModule)
  },
  { path: 'uefa/t/:teamId', component: DetailTeamComponent },
  { path: 'uefa/t/:leagueName/:teamId', component: DetailTeamComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
