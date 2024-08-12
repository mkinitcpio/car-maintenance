import { ColumnSchema } from '@shared/components/table/interfaces';

export const columnSchemas: ColumnSchema[] = [{
  key: 'name',
  name: 'RECORDS_TABLE.NAME',
  type: 'text',
  order: 1,
  visible: true,
},{
  key: 'cost',
  name: 'RECORDS_TABLE.EXPENSE',
  type: 'cost',
  order: 2,
  visible: true,
},{
  key: 'mileage',
  name: 'RECORDS_TABLE.MILEAGE',
  type: 'mileage',
  order: 3,
  visible: true,
},{
  key: 'date',
  name: 'RECORDS_TABLE.DATE',
  type: 'date',
  order: 5,
  visible: true,
},{
  key: 'notes',
  name: 'RECORDS_TABLE.COMMENT',
  type: 'note',
  order: 6,
  visible: true,
}];