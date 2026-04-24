import { defineConfig } from 'cypress';
import react from '@vitejs/plugin-react';
import { defineConfig as defineViteConfig } from 'vite';

export default defineConfig({
  video: true,
  viewportWidth: 1440,
  viewportHeight: 900,
  e2e: {
    baseUrl: 'http://localhost:5173',
    specPattern: 'cypress/e2e/**/*.cy.{ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',
  },
  component: {
    specPattern: 'cypress/component/**/*.cy.{ts,tsx}',
    devServer: {
      framework: 'react',
      bundler: 'vite',
      viteConfig: defineViteConfig({
        plugins: [react()],
      }),
    },
    supportFile: 'cypress/support/component.ts',
  },
});
