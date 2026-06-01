import { AfterViewInit, Component, computed, ElementRef, inject, signal, ViewChild, ViewEncapsulation } from "@angular/core";
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
import { MatDrawerMode, MatSidenav, MatSidenavContainer } from "@angular/material/sidenav";
import { ResizeObserverService } from "@shared/services/resize-observer.service";

@Component({
    selector: "app-settings",
    templateUrl: "./settings.component.html",
    styleUrls: ["./settings.component.scss"],
    encapsulation: ViewEncapsulation.None,
    providers: [
        ResizeObserverService,
    ],
    standalone: false
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
