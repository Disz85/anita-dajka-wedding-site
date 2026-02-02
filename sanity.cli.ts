import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: 'a9d4rhz1',
    dataset: 'development',
  },
  /**
   * Typegen configuration
   */
  typegen: {
    path: './src/types/sanity.types.ts',
    schema: '../anita-dajka-wedding-cms/schema.json',
  },
});
