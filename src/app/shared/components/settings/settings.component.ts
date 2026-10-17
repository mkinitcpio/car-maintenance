import { AfterViewInit, Component, computed, ElementRef, inject, signal, ViewChild, ViewEncapsulation } from "@angular/core";
import { AboutSettingsPageComponent, CommonSettingsPageComponent, ContactsSettingsPageComponent, CurrencySettingsPageComponent, LanguageSettingsPageComponent, UnitsSettingsPageComponent, AppearanceSettingsPageComponent } from './pages';
import { SettingComponent } from './setting/setting.component';
import { CmTextHeader } from '../typography/text-header/text-header';
import { CmTextBody } from '../typography/text-body/text-body';
import { MatRippleModule } from '@angular/material/core';
import { ContentContainerComponent } from '../content-container/content-container.component';
import { ButtonComponent } from '../button/button.component';
import { SwitchComponent } from '../switch/switch.component';
import { DialogComponent } from '../dialog/dialog.component';
import { ColorSelectorComponent } from '../color-selector/color-selector.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { TranslateModule } from '@ngx-translate/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from "@angular/material/dialog";
import { ColorEnum } from "./colors-enum";
import { languageOptions } from "./language-options";
import { MetricSystemEnum } from "./metric-system.enum";
import { CurrencyEnum } from "./currency.enum";
import { NavigationTabEnum } from "./navigation-tab.enum";
import { regionOptions } from "./region-options";
import { currencyOptions } from "./currency-options";

import { SettingsService } from "./settings.service";

import { colors } from './colors';
import { settingsGroups } from './settings-groups';

import { SettingsGroupType } from "./interface";
import { MatIconModule } from '@angular/material/icon';
import { MatDrawerMode, MatSidenav, MatSidenavContainer, MatSidenavModule } from "@angular/material/sidenav";
import { ResizeObserverService } from "@shared/services/resize-observer.service";

@Component({
    selector: "app-settings",
    templateUrl: "./settings.component.html",
    styleUrls: ["./settings.component.scss"],
    encapsulation: ViewEncapsulation.None,
    providers: [
        ResizeObserverService,
    ],
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatSelectModule,
        TranslateModule,
        MatDividerModule,
        MatTooltipModule,
        MatButtonToggleModule,
        ColorSelectorComponent,
        DialogComponent,
        SwitchComponent,
        ButtonComponent,
        ContentContainerComponent,
        MatRippleModule,
        MatSidenavModule,
        ContactsSettingsPageComponent,
        UnitsSettingsPageComponent,
        CommonSettingsPageComponent,
        LanguageSettingsPageComponent,
        AboutSettingsPageComponent,
        SettingComponent,
        CurrencySettingsPageComponent,
        AppearanceSettingsPageComponent,
        CmTextBody,
        CmTextHeader,
    ]
})
export class SettingsComponent implements AfterViewInit {

  @ViewChild('sidenav', { static: true })
  sidenav: MatSidenav;

  @ViewChild(MatSidenavContainer, { read: ElementRef})
  sidenavContainer: ElementRef<HTMLElement>;

  public colors = colors;
  public regionOptions = regionOptions;
  public languageOptions = languageOptions;

  public ColorEnum = ColorEnum;
  public CurrencyEnum = CurrencyEnum;
  public MetricSystemEnum = MetricSystemEnum;
  public NavigationTabEnum = NavigationTabEnum;

  public sidenavMode = signal<MatDrawerMode>('side');
  public settingsGroups = signal(settingsGroups);
  public currencyOptions$$ = signal(currencyOptions);
  public selectedSettingsGroup = signal<SettingsGroupType>('common');

  public pageTitle = computed(() => {
    const selectedGroup = this.settingsGroups().find(group => group.page === this.selectedSettingsGroup());
    return selectedGroup.name;
  });

  public dialogRef = inject<MatDialogRef<SettingsComponent>>(MatDialogRef);
  public settingsService = inject(SettingsService);
  private resizeObserverService = inject(ResizeObserverService);

  ngAfterViewInit(): void {
    const pageContentElementRef = this.sidenavContainer.nativeElement;

    this.resizeObserverService.observe(
      pageContentElementRef,
      [[793, 'over'], [Infinity, 'side']]
    ).subscribe((size: MatDrawerMode) => {
      this.sidenavMode.set(size);
      size === 'side' ? this.sidenav.open() : this.sidenav.close();
    });
  }

  public toggleSideNav(): void {
    this.sidenav.toggle();
  }

  public selectGroup(group: SettingsGroupType): void {
    this.selectedSettingsGroup.set(group);

    if(this.sidenavMode() === 'over') {
      this.sidenav.close();
    }
  }
}
