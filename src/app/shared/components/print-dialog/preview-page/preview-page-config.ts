export interface PreviewPageConfig {
  columns: Array<ColumnConfig>
}

export interface ColumnConfig {
  id: string;
  name: string;
  visible: boolean
}