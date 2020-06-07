import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SQLite } from '@ionic-native/sqlite/ngx';

import {AlchemyModule} from '../alchemy/alchemy.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AlchemyModule
  ],
  exports: [
    CommonModule,
    AlchemyModule
  ],
  providers: [
    SQLite
  ]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        SQLite
      ]
    }
  }
 }
