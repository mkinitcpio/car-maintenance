import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingComponent } from './setting.component';
import { commonComponentProviders } from 'testing/component-setup';

describe('SettingComponent', () => {
  let component: SettingComponent;
  let fixture: ComponentFixture<SettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingComponent],
      providers: commonComponentProviders(),
    }).compileComponents();

    fixture = TestBed.createComponent(SettingComponent);
    component = fixture.componentInstance;
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('defaults the icon to an empty string and accepts a label', () => {
    expect(component.icon()).toBe('');

    fixture.componentRef.setInput('label', 'Language');
    expect(component.label()).toBe('Language');
  });
});
