import "../../apps/writeme/app/global.css";

import { Preview } from '@storybook/react';

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
