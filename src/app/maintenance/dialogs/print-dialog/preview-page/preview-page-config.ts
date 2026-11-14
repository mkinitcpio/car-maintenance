export interface PreviewPageConfig {
  showTablesCostResult: boolean;
  orientation: 'vertical' | 'horizontal';
  columns: Array<ColumnConfig>
}

export interface ColumnConfig {
  id: string;
  name: string;
  visible: boolean;
}