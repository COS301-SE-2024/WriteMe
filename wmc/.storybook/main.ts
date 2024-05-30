import type { StorybookConfig } from '@storybook/react-vite';

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { mergeConfig } from 'vite';

import { URL, fileURLToPath} from 'node:url';


const config: StorybookConfig = {
  stories: ['../src/lib/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
  core: {
    builder: '@storybook/builder-vite'
  },
  framework: {
    // name: '@storybook/react-vite',
    name: '@storybook/nextjs',
    options: {},
  },
  typescript: {
    // Enables the `react-docgen-typescript` parser.
    // See https://storybook.js.org/docs/api/main-config-typescript for more information about this option.
    reactDocgen: 'react-docgen-typescript',
  },

  viteFinal: async (config) =>
    mergeConfig(config, {
      define: {
        'process.env.NODE_DEBUG': false,
      },
      resolve: {
        alias: [
          {
            find: "@writeme/wmc/",
            replacement: fileURLToPath(new URL("../src/", import.meta.url))
          }
        ]
      },
      plugins: [nxViteTsPaths()],
    }),
};

export default config;

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/recipes/storybook/custom-builder-configs
