/**
 * Shared helpers for component specs: locale data registration (needed by the
 * numberSeparator / date pipes), animation + http providers, and Material dialog
 * doubles.
 */
import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import localeRu from '@angular/common/locales/ru';
import { EnvironmentProviders, Provider } from '@angular/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { of } from 'rxjs';

import { provideMockElectronService, provideMockSettingsService } from './test-mocks';

registerLocaleData(localeEn);
registerLocaleData(localeRu);

/**
 * A no-op `MatIconRegistry`: the real app registers every `<mat-icon svgIcon>`
 * from asset URLs in `AppComponent`, which never runs in unit tests. Without
 * this, `<mat-icon>` logs async "Error retrieving icon ..." noise (harmless, but
 * noisy). The fake resolves any icon to an empty SVG with no HTTP fetch.
 * `MatIcon` only ever calls these three methods.
 */
export function createFakeMatIconRegistry(): Partial<MatIconRegistry> {
  return {
    getNamedSvgIcon: () =>
      of(document.createElementNS('http://www.w3.org/2000/svg', 'svg') as SVGElement),
    getDefaultFontSetClass: () => ['material-symbols-rounded'],
    classNameForFontAlias: (alias: string) => alias,
  };
}

/** Providers most component specs need: animations, http, doubles, and a silent icon registry. */
export function commonComponentProviders(): (Provider | EnvironmentProviders)[] {
  return [
    provideNoopAnimations(),
    provideHttpClient(),
    provideMockElectronService(),
    provideMockSettingsService(),
    { provide: MatIconRegistry, useFactory: createFakeMatIconRegistry },
  ];
}

export interface MatDialogRefMock {
  close: jasmine.Spy;
  afterClosed: jasmine.Spy;
}

export function createMatDialogRefMock(): MatDialogRefMock {
  return {
    close: jasmine.createSpy('MatDialogRef.close'),
    afterClosed: jasmine.createSpy('MatDialogRef.afterClosed'),
  };
}

/** Provide a Material dialog ref double plus the injected dialog data. */
export function provideDialog(data: any = {}, ref: MatDialogRefMock = createMatDialogRefMock()): Provider[] {
  return [
    { provide: MatDialogRef, useValue: ref },
    { provide: MAT_DIALOG_DATA, useValue: data },
  ];
}
