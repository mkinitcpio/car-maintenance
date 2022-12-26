import { NavigationEnum } from "app/home/navigation-bar/navigation.enum";

export const startPageOptions = [
  {
    name: 'Dashboard',
    value: NavigationEnum.Dashboard,
  },
  {
    name: 'Records',
    value: NavigationEnum.Maintenance,
  },
  {
    name: 'Tasks',
    value: NavigationEnum.Tasks,
  },
  {
    name: 'Storage',
    value: NavigationEnum.Storage,
  },
  {
    name: 'Statistic',
    value: NavigationEnum.Statistic,
  },
];