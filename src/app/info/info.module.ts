import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from "../shared/shared.module";
import { InfoComponent } from './info/info.component';
import {InfoRoutingModule} from "./info-routing.module";



@NgModule({
  declarations: [
    InfoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    InfoRoutingModule
  ]
})
export class InfoModule { }
