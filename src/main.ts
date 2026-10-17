import { enableProdMode, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { AppComponent } from './app/app.component';
import { AppRoutes } from './app/app.routes';
import { CoreModule } from './app/core/core.module';
import { SharedModule } from './app/shared/shared.module';
import { DataBaseService } from './app/core/database';
import { AppGuard } from './app/app.guard';
import { ThemeService, DarwinThemeService, LinuxThemeService, WindowsThemeService } from './app/core/services/theme';
import { ElectronService } from '@core/services';
import { APP_CONFIG, appConfig } from './app/app.config';
import { AppConfig } from './environments/environment';

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
  const systemType = electronService.os.type() as SupportedPlatrofmsEnum;
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

registerLocaleData(localeRu, 'ru');

if (AppConfig.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection(),
    provideRouter(AppRoutes),
    provideAnimations(),
    provideHttpClient(),
    importProvidersFrom(
      CoreModule,
      SharedModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      }),
      StoreModule.forRoot({}),
      EffectsModule.forRoot([]),
      StoreDevtoolsModule.instrument({ maxAge: 25 }),
    ),
    DataBaseService,
    AppGuard,
    {
      provide: ThemeService,
      useFactory: ThemeFactory,
      deps: [
        ElectronService,
      ]
    }, {
      provide: APP_CONFIG,
      useValue: appConfig,
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {appearance: 'outline'}
    },
  ],
})
.catch(err => console.error(err));
