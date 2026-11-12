// ./steiger.config.ts
import { defineConfig } from 'steiger'
import fsd from '@feature-sliced/steiger-plugin'

export default defineConfig([
  ...fsd.configs.recommended,
  {
    // Existing framework initialization and static assets have explicit responsibilities.
    // Keep the naming check enabled for the rest of the project.
    files: ['./src/app/providers{,/**}', './src/shared/assets{,/**}'],
    rules: {
      'fsd/segments-by-purpose': 'off',
    },
  },
])
