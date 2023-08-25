import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import Category from '@Model/categories';
import schema from '@Model/schema';

const adapter = new SQLiteAdapter({
  schema: schema as any,
  onSetUpError: error => {
    // Database failed to load -- offer the user to reload the app or log out
    console.log(error);
  },
});

export const database = new Database({
  adapter,
  modelClasses: [Category],
});
