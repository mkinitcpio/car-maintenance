import { WelcomePageComponent } from "./welcome-page/welcome-page.component";

import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AppGuard } from "./app.guard";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [AppGuard],
    children: [  {
      path: 'maintenance',
      loadChildren: () => import('./maintenance/maintenance.module').then(m => m.MaintenanceModule)
    },{
      path: 'dashboard',
      loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
    },{
      path: 'storage',
      loadChildren: () => import('./storage/storage.module').then(m => m.StorageModule)
    },
   ]},
  { path: "welcome", component: WelcomePageComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
