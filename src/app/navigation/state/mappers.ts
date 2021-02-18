import { Category, CategoryTree } from './interface';

export const categoriesMapper = (categories: Array<Category>): Array<CategoryTree> => {
  return categories.map((category => {
    const { id, name, parent, illustration = null } = category;
    const children = categories.filter(c => c.parent === category.id);

    return {
      id,
      name,
      parent,
      children,
      illustration,
    };
  })).filter(category => !category.parent);
};
