import twConfigBase from '@janribkaui/material-ui-tailwind/tailwind.config';

import type { Config } from 'tailwindcss';

const config: Pick<Config, 'content' | 'presets'> = {
  content: [
    './src/features/**/*.{js,ts,jsx,tsx}',
    './src/shared/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@janribkaui/material-ui-tailwind/**/*.{js,ts,jsx,tsx}',
    './node_modules/docs/**/*.{js,ts,jsx,tsx}',
  ],
  presets: [twConfigBase],
};

export default config;
