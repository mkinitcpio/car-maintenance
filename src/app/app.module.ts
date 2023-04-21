import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { HomeModule } from './home/home.module';
import { DetailModule } from './detail/detail.module';
import { DashboardModule } from './dashboard/dashboard.module';

import { AppComponent } from './app.component';
import { StorageModule } from './storage/storage.module';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { EffectsModule } from '@ngrx/effects';
import { DataBaseService } from './core/database';
import { ThemeService, DarwinThemeService, LinuxThemeService, WindowsThemeService } from './core/services/theme';
import {DatabaseSelectModule} from "./database-select/database-select.module";
import { WelcomePageModule } from "./welcome-page/welcome-page.module";
import { MaintenanceModule } from "./maintenance/maintenance.module";
import { AppRoutingModule } from './app-routing.module';
import { AppGuard } from './app.guard';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { ElectronService } from '@core/services';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

enum SupportedPlatrofmsEnum {
  Windows = "Windows_NT",
  Linux = "Linux",
  Darwin = "Darwin",
}

export function ThemeFactory(electronService: ElectronService): ThemeService {
  const systemType = electronService.os.type();
  let themeServiceInstance: ThemeService = null;

  switch(systemType) {
    case SupportedPlatrofmsEnum.Darwin: {
      themeServiceInstance = new DarwinThemeService(electronService);
      break;
    }
    case SupportedPlatrofmsEnum.Windows: {
      themeServiceInstance = new WindowsThemeService(electronService);
      break;
    }
    case SupportedPlatrofmsEnum.Linux: {
      themeServiceInstance = new LinuxThemeService();
      break;
    }
  }

  return themeServiceInstance;
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    HomeModule,
    DetailModule,
    DatabaseSelectModule,
    WelcomePageModule,
    DashboardModule,
    MaintenanceModule,
    StorageModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25}),
  ],
  providers: [
    DataBaseService,
    AppGuard, {
      provide: ThemeService,
      useFactory: ThemeFactory,
      deps: [
        ElectronService,
      ]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
