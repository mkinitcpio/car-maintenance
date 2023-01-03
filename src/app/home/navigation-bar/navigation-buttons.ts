import { NavigationButton } from "./interfaces";
import { NavigationEnum } from './navigation.enum';

export const navigationButtons: NavigationButton[] = [{
  icon: 'dashboard',
  route: NavigationEnum.Dashboard,
  tooltipText: "NAVIGATIONS.DASHBOARD",
},{
  icon: 'tree',
  route: NavigationEnum.Maintenance,
  tooltipText: "NAVIGATIONS.RECORDS",
},{
  icon: 'task',
  route: NavigationEnum.Events,
  tooltipText: "NAVIGATIONS.EVENTS",
},{
  icon: 'store',
  route: NavigationEnum.Storage,
  tooltipText: "NAVIGATIONS.STORAGE",
},];