import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { MileageComponent } from './mileage.component';
import { provideMockSettingsService } from 'testing/test-mocks';

describe('MileageComponent', () => {
  let component: MileageComponent;
  let fixture: ComponentFixture<MileageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MileageComponent, TranslateModule.forRoot()],
      providers: [provideMockSettingsService()],
    }).compileComponents();

    fixture = TestBed.createComponent(MileageComponent);
    component = fixture.componentInstance;
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('injects the settings service used to pick the metric system label', () => {
    expect(component.settingsService).toBeTruthy();
  });
});
