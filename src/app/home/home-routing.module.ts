import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home.component";
import { DetailComponent } from "../detail/detail.component";
import { EmptyComponent } from "../empty/empty.component";

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent,
    children: [
      { path: "", component: EmptyComponent },
      { path: "details/:id", component: DetailComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
