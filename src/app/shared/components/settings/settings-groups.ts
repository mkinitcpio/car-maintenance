import { SettingsGroup } from './interface';

export const settingsGroups: SettingsGroup[] = [{
  page: 'common',
  name: 'PAGES.SETTINGS.SECTIONS.COMMON',
  icon: 'discover_tune'
}, {
  page: 'appearance',
  name: 'PAGES.SETTINGS.SECTIONS.APPEARANCE',
  icon: 'palette'
}, {
  page: 'language',
  name: 'PAGES.SETTINGS.SECTIONS.LANG',
  icon: 'language',
}, {
  page: 'currency',
  name: 'PAGES.SETTINGS.SECTIONS.CURRENCY',
  icon: 'payments',
}, {
  page: 'units',
  name: 'PAGES.SETTINGS.SECTIONS.UNITS',
  icon: 'straighten'
}, {
  page: 'contact',
  name: 'PAGES.SETTINGS.SECTIONS.CONTACTS',
  icon: 'alternate_email',
  isBottom: true,
}];
