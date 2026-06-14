import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { ContactsSettingsPageComponent } from './contacts-settings-page.component';
import { commonComponentProviders } from 'testing/component-setup';

describe('ContactsSettingsPageComponent', () => {
  let component: ContactsSettingsPageComponent;
  let fixture: ComponentFixture<ContactsSettingsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactsSettingsPageComponent, TranslateModule.forRoot()],
      providers: commonComponentProviders(),
    }).compileComponents();

    fixture = TestBed.createComponent(ContactsSettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates and exposes the contacts list', () => {
    expect(component).toBeTruthy();
    expect(component.contacts().length).toBeGreaterThan(0);
  });
});
