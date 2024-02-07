import { TableConfig } from './interfaces';

export const defaultTableConfig: TableConfig = {
  actions: {
    add: true,
    edit: true,
    move: true,
    delete: true,
    selectable: true,
  },
  search: true,
  export: true,
  sort: true,
  panel: false,
  columnVisibility: true,
  columnSchemas: [],
  hiddenColumns: [],
};
