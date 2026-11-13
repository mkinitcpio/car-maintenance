import { Record } from '../../../detail/state/interface';
import { ColumnSchema } from '../table/interfaces';

export interface PrintDialogConfig {
  title?: string;
  multiply: boolean;
  columns: Array<ColumnSchema>;
  tablesData: Array<{
    title: string;
    totalCost: number;
    records: Array<Record>;
  }>
}
