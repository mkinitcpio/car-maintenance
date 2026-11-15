import { AppConfig } from 'environments/environment';

export interface Contact {
  icon: string;
  name: string;
  url?: string;
  info?: string;
}

const links = AppConfig.links;

export const contacts: Contact[] = [{
  icon: 'telegram',
  name: 'Telegram',
  url: links.telegram,
  info: '@Mkinitcpio',
}, {
  icon: 'github',
  name: 'Github issues',
  url: links.issues,
}, {
  icon: 'discord',
  name: 'Discord',
  url: links.discord,
}];
