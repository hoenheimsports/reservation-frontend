import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {InfoComponent} from "./info/info.component";

const routes: Routes = [{ path: '', component: InfoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoRoutingModule { }
