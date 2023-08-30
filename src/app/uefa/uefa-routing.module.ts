import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UefaPage } from './uefa.page';

const routes: Routes = [
  {
    path: 'uefa',
    component: UefaPage,
    children: [
      {
        path: 'leagues',
        loadChildren: () => import('../leagues/leagues.module').then(m => m.LeaguesPageModule)
      },
      {
        path: 'favorites',
        loadChildren: () => import('../favorites/favorites.module').then(m => m.FavoritesPageModule)
      },
      {
        path: 'schedules',
        loadChildren: () => import('../schedules/schedules.module').then(m => m.SchedulesPageModule)
      },

      {
        path: '',
        redirectTo: '/uefa/leagues',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/uefa/leagues',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class UefaPageRoutingModule {}
