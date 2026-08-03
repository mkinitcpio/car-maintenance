import { DataType, Orientation } from "../rich-widget/types";

export interface Widget {
  title: string;
  icon: string;
  value: number | Date;
  transparent: boolean;
  type: DataType;
  orientation?: Orientation;
  tooltip?: string;
};