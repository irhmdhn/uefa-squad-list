import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LeaguesPage } from './leagues.page';
import { LeaguesPageRoutingModule } from './leagues-routing.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    LeaguesPageRoutingModule,

  ],

  declarations: [LeaguesPage]
})
export class LeaguesPageModule {}
