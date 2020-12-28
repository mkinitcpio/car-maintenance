export interface Category {
  id: string;
  name: string;
  parent: string;
}

export interface CategoryTree {
  id: string;
  name: string;
  parent?: string;
  children?: Array<CategoryTree>;
}