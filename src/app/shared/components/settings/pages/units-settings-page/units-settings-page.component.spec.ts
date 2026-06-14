import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitsSettingsPageComponent } from './units-settings-page.component';
import { SettingsService } from '../../settings.service';
import { MetricSystemEnum } from '../../metric-system.enum';
import { provideMockSettingsService } from 'testing/test-mocks';

describe('UnitsSettingsPageComponent', () => {
  let component: UnitsSettingsPageComponent;
  let fixture: ComponentFixture<UnitsSettingsPageComponent>;
  let settings: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitsSettingsPageComponent],
      providers: [provideMockSettingsService()],
    })
      .overrideComponent(UnitsSettingsPageComponent, { set: { template: '' } })
      .compileComponents();

    fixture = TestBed.createComponent(UnitsSettingsPageComponent);
    component = fixture.componentInstance;
    settings = TestBed.inject(SettingsService);
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('persists the metric system', () => {
    component.onMetricSystemChanged(MetricSystemEnum.Mi);
    expect(settings.setMetricSystem).toHaveBeenCalledWith(MetricSystemEnum.Mi);
  });
});
