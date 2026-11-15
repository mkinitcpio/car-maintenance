import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { ContactsSettingsPageComponent } from './contacts-settings-page.component';
import { contacts } from './contacts';
import { ElectronService } from '@core/services';
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

  it('opens the url of a contact', () => {
    const electron: any = TestBed.inject(ElectronService);

    component.onOpenContact(contacts[1]);

    expect(electron.shell.openExternal).toHaveBeenCalledWith(contacts[1].url);
  });

  it('does not open a contact without a url', () => {
    const electron: any = TestBed.inject(ElectronService);
    vi.spyOn(console, 'warn').mockImplementation(() => {});

    component.onOpenContact({ icon: 'discord', name: 'Discord' });

    expect(electron.shell.openExternal).not.toHaveBeenCalled();
  });
});
