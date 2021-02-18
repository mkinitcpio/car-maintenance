export interface Category {
  id: string;
  name: string;
  parent: string;
  illustration?: string;
}

export interface CategoryTree {
  id: string;
  name: string;
  parent?: string;
  illustration? : string;
  children?: Array<CategoryTree>;
}