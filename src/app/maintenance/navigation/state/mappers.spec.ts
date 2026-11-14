import { categoriesMapper } from './mappers';
import { Category, CategoryTypeEnum } from './interface';

const cat = (over: Partial<Category>): Category =>
  ({ id: '', name: '', parent: null, type: CategoryTypeEnum.Category, ...over } as Category);

describe('categoriesMapper', () => {
  it('returns only top-level categories (those without a parent)', () => {
    const tree = categoriesMapper([
      cat({ id: '1', name: 'Engine' }),
      cat({ id: '2', name: 'Oil', parent: '1' }),
      cat({ id: '3', name: 'Brakes' }),
    ]);

    expect(tree.map((node) => node.id)).toEqual(['1', '3']);
  });

  it('nests children under their parent', () => {
    const [engine] = categoriesMapper([
      cat({ id: '1', name: 'Engine' }),
      cat({ id: '2', name: 'Oil', parent: '1' }),
      cat({ id: '3', name: 'Filter', parent: '1' }),
    ]);

    expect(engine.children.map((child) => child.id)).toEqual(['2', '3']);
  });

  it('gives leaf categories an empty children array', () => {
    const [, brakes] = categoriesMapper([
      cat({ id: '1', name: 'Engine' }),
      cat({ id: '3', name: 'Brakes' }),
    ]);

    expect(brakes.children).toEqual([]);
  });

  it('defaults illustration to null and type to Category', () => {
    const [node] = categoriesMapper([
      { id: '1', name: 'Engine', parent: null } as Category,
    ]);

    expect(node.illustration).toBeNull();
    expect(node.type).toBe(CategoryTypeEnum.Category);
  });

  it('defaults a child type when it is undefined', () => {
    const [engine] = categoriesMapper([
      cat({ id: '1', name: 'Engine' }),
      { id: '2', name: 'Oil', parent: '1' } as Category,
    ]);

    expect(engine.children[0].type).toBe(CategoryTypeEnum.Category);
  });

  it('does not mutate the original category objects', () => {
    const child = { id: '2', name: 'Oil', parent: '1' } as Category;
    categoriesMapper([cat({ id: '1', name: 'Engine' }), child]);

    expect(child.type).toBeUndefined();
  });
});
