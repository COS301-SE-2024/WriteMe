import "../../apps/writeme/app/global.css";

import { Preview } from '@storybook/react';
import { withThemeByClassName } from '@storybook/addon-themes';

const preview: Preview = {
  // ...
  parameters: {
    // ...
    nextjs: {
      appDirectory: true,
    },
  },
};

export default preview;


export const decorators = [
  withThemeByClassName({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'light',
  }),
];
