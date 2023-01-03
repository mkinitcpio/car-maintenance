import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

import { StorageComponent } from "./storage.component";

const routes: Routes = [
  {
    path: '',
    component: StorageComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StorageRoutingModule {}
