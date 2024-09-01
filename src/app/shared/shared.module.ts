import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { EnumToArrayPipe } from './pipes/enum-to-array.pipe';

@NgModule({
  declarations: [EnumToArrayPipe],
  imports: [
    CommonModule,
  ],
  exports: [
    CommonModule,
    EnumToArrayPipe,
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