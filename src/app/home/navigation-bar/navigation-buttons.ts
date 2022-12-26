import { NavigationButton } from "./interfaces";
import { NavigationEnum } from './navigation.enum';

export const navigationButtons: NavigationButton[] = [{
  icon: 'dashboard',
  route: NavigationEnum.Dashboard,
  tooltipText: 'Dashboard',
},{
  icon: 'tree',
  route: NavigationEnum.Maintenance,
  tooltipText: 'Maintenance',
},{
  icon: 'task',
  route: NavigationEnum.Tasks,
  tooltipText: 'Tasks',
},{
  icon: 'store',
  route: NavigationEnum.Storage,
  tooltipText: 'Storage',
},{
  icon: 'chart',
  route: NavigationEnum.Statistic,
  tooltipText: 'Statistic',
}];