import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

import { MaintenanceComponent } from "./maintenance.component";
import { EmptyComponent } from "./empty/empty.component";
import { CategoryDetailsComponent } from "./category-details/category-details.component";
import { DetailComponent } from "./detail/detail.component";
import { MaintenanceHome } from "./home/maintenance.home";

const routes: Routes = [
  {
    path: "",
    component: MaintenanceComponent,
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "home",
      },
      {
        path: "home",
        component: MaintenanceHome,
      },
      {
        path: "category-details/:id",
        component: CategoryDetailsComponent,
      },
      {
        path: "details/:id/:parentId/:name",
        component: DetailComponent,
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
