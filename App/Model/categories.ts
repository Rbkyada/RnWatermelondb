import { Model } from '@nozbe/watermelondb';
import { field, writer } from '@nozbe/watermelondb/decorators';

export default class Category extends Model {
  static table = 'categories';
  // @ts-ignore
  @field('name') name: string | undefined;
  // @ts-ignore
  @field('description') description: string | undefined;
  // @ts-ignore
  // @readonly @date('created_at') createdAt;

  @writer async addCategory(name: string, description: string) {
    const newCategory = await this.collections
      .get('categories')
      .create((category: any) => {
        category.name = name;
        category.description = description;
      });
    return newCategory;
  }
}
