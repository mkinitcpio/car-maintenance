import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

import { MaintenanceComponent } from "./maintenance.component";
import { EmptyComponent } from "app/empty/empty.component";
import { CategoryDetailsComponent } from "app/category-details/category-details.component";
import { DetailComponent } from "app/detail/detail.component";

const routes: Routes = [
  {
    path: "",
    component: MaintenanceComponent,
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "empty",
      },
      { path: "category-details/:id",
        component: CategoryDetailsComponent,
      },
      {
        path: "details/:id/:parentId/:name",
        component: DetailComponent
      },
      {
        path: "empty",
        component: EmptyComponent,
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenanceRoutingModule {}
