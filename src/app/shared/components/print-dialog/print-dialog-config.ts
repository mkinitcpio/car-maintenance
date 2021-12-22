import { Record } from '../../../detail/state/interface';

export interface PrintDialogConfig {
  title?: string;
  multiply: boolean;
  tablesData: Array<{
    title: string;
    totalCost: number;
    records: Array<Record>;
  }>
}
