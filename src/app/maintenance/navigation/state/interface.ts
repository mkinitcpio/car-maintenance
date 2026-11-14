export interface Category {
  id: string;
  name: string;
  parent: string;
  illustration?: string;
  type: CategoryTypeEnum;
}

export interface CategoryTree {
  id: string;
  name: string;
  parent?: string;
  illustration? : string;
  type: CategoryTypeEnum;
  children?: Array<CategoryTree>;
}

export enum CategoryTypeEnum {
  Category,
  Car,
}