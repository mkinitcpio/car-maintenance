import { NavigationButton } from "./interfaces";
import { NavigationEnum } from './navigation.enum';

export const navigationButtons: NavigationButton[] = [{
  icon: 'dashboard',
  route: NavigationEnum.Dashboard,
  text: "NAVIGATIONS.DASHBOARD",
},{
  icon: 'records',
  route: NavigationEnum.Maintenance,
  text: "NAVIGATIONS.RECORDS",
},{
  icon: 'events',
  route: NavigationEnum.Events,
  text: "NAVIGATIONS.EVENTS",
},{
  icon: 'store',
  route: NavigationEnum.Storage,
  text: "NAVIGATIONS.STORAGE",
},];
