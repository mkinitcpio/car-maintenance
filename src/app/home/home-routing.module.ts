import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { DetailComponent } from "../detail/detail.component";
import { EmptyComponent } from "../empty/empty.component";
import { CategoryDetailsComponent } from "../category-details/category-details.component";
import { DashboardComponent } from "app/dashboard/dashboard.component";

const routes: Routes = [
  { path: "", component: EmptyComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "details/:id/:parentId/:name", component: DetailComponent },
  { path: "category-details/:id", component: CategoryDetailsComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
