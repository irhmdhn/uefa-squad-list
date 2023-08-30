import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UefaPageRoutingModule } from './uefa-routing.module';

import { UefaPage } from './uefa.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    UefaPageRoutingModule
  ],
  declarations: [UefaPage]
})
export class UefaPageModule {}
