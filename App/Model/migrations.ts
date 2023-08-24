import {
  schemaMigrations,
  addColumns,
} from '@nozbe/watermelondb/Schema/migrations';

export default schemaMigrations({
  migrations: [
    {
      toVersion: 1,
      steps: [
        addColumns({
          table: 'categories',
          columns: [{ name: 'description', type: 'string' }],
        }),
      ],
    },
  ],
});
