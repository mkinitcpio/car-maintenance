export interface PreviewPageConfig {
  showTablesCostResult: boolean;
  columns: Array<ColumnConfig>
}

export interface ColumnConfig {
  id: string;
  name: string;
  visible: boolean;
}