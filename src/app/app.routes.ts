import { Routes } from "@angular/router";

import { AppGuard } from "./app.guard";
import { HomeComponent } from "./home/home.component";
import { WelcomePageComponent } from "./welcome-page/welcome-page.component";

export const AppRoutes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [AppGuard],
    children: [{
      path: 'maintenance',
      loadChildren: () => import('./maintenance/maintenance-routing.module').then(m => m.MaintenanceRoutingModule)
    },{
      path: 'dashboard',
      loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
    },{
      path: 'storage',
      loadComponent: () => import('./storage/storage.component').then(m => m.StorageComponent)
    },{
      path: 'events',
      loadComponent: () => import('./events/events.component').then(m => m.EventsComponent)
    },
    ],
  },
  { path: "welcome", component: WelcomePageComponent },
];
