import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home.component";
import { DetailComponent } from "../detail/detail.component";
import { EmptyComponent } from "../empty/empty.component";

const routes: Routes = [
      { path: "", component: EmptyComponent },
      { path: "details/:id/:name", component: DetailComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
