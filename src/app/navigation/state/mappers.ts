import { Category, CategoryTree, CategoryTypeEnum } from './interface';

export const categoriesMapper = (categories: Array<Category>): Array<CategoryTree> => {
  return categories.map((category => {
    const { id, name, parent, illustration = null, type = CategoryTypeEnum.Category } = category;
    const children = categories.filter(c => c.parent === category.id).map((c) => {
      c = {...c};
      c.type = c.type === undefined ? CategoryTypeEnum.Category : c.type;
      return c;
    });

    return {
      id,
      name,
      parent,
      type,
      children,
      illustration,
    };
  })).filter(category => !category.parent);
};
