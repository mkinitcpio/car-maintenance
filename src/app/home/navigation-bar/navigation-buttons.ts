import { NavigationButton } from "./interfaces";

export const navigationButtons: NavigationButton[] = [{
  icon: 'dashboard',
  route: 'dashboard',
  tooltipText: 'Dashboard',
},{
  icon: 'tree',
  route: 'maintenance',
  tooltipText: 'Maintenance',
},{
  icon: 'task',
  route: 'tasks',
  tooltipText: 'Tasks',
},{
  icon: 'store',
  route: 'storage',
  tooltipText: 'Storage',
},{
  icon: 'chart',
  route: 'statistic',
  tooltipText: 'Statistic',
}];