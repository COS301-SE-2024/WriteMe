const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
import { buildConfig } from '../../wmc-utils/src/tailwind.config';

/** @type {import('tailwindcss').Config} */
export default buildConfig(__dirname);
// module.exports = {
//   content: [
//     join(
//       __dirname,
//       '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
//     ),
//     ...createGlobPatternsForDependencies(__dirname),
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };
