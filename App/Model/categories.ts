import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export default class Category extends Model {
  static table = 'categories';
  // @ts-ignore
  @field('name') name: string | undefined;
  // @ts-ignore
  @field('description') description: string | undefined;
}
