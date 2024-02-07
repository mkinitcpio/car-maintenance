
export interface ColumnSchema {
  key: string;
  name: string;
  type: string;
  order: number;
  visible: boolean;
}

export interface TableConfig {
  actions: {
    add: boolean;
    edit: boolean;
    move: boolean;
    delete: boolean;
    selectable: boolean;
  };
  search: boolean;
  export: boolean;
  sort: boolean;
  columnVisibility: boolean;
  panel: boolean;
  columnSchemas: Array<ColumnSchema>;
  hiddenColumns: string[];
}

export interface RowData {
  id: string;
  name: string;
}