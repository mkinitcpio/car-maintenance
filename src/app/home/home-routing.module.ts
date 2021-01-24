import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { DetailComponent } from "../detail/detail.component";
import { EmptyComponent } from "../empty/empty.component";
import { CategoryDetailsComponent } from "../category-details/category-details.component";

const routes: Routes = [
  { path: "", component: EmptyComponent },
  { path: "details/:id/:name", component: DetailComponent },
  { path: "category-details/:id", component: CategoryDetailsComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
