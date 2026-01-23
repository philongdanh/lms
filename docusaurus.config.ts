import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import { themes as prismThemes } from 'prism-react-renderer';

const config: Config = {
  title: 'LMS Documentation',
  favicon: 'img/favicon.svg',
  future: {
    v4: true,
  },
  url: 'http://localhost',
  baseUrl: '/',
  organizationName: 'idlongggg',
  projectName: 'lms-docs',
  onBrokenLinks: 'warn',
  presets: [
    [
      'classic',
      {
        docs: {
          path: '.',
          include: [
            'blueprint/**/*.md',
            'spec/**/*.md',
            'qa/**/*.md',
            'docs/**/*.md',
            'README.md',
          ],
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.ts'),
          exclude: [
            '**/generated/**',
            '**/templates/**',
            '**/node_modules/**',
            '**/build/**',
            '**/dist/**',
          ],
          remarkPlugins: [
            [
              require('remark-d2'),
              {
                compilePath: 'static/d2',
                linkPath: '/d2',
                ext: 'svg',
                defaultD2Opts: [
                  '--layout=elk',
                  '--sketch',
                  '--font-regular=./static/fonts/google-sans-code/GoogleSansCode-Regular.ttf',
                  '--font-bold=./static/fonts/google-sans-code/GoogleSansCode-Bold.ttf',
                  '--font-italic=./static/fonts/google-sans-code/GoogleSansCode-Regular.ttf',
                  '--font-semibold=./static/fonts/google-sans-code/GoogleSansCode-SemiBold.ttf',
                ],
              },
            ],
          ],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    image: 'img/favicon.svg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'LMS',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'blueprint',
          label: 'Blueprint',
          position: 'left',
        },
        {
          type: 'docSidebar',
          sidebarId: 'spec',
          label: 'Spec',
          position: 'left',
        },
        {
          type: 'docSidebar',
          sidebarId: 'qa',
          label: 'QA',
          position: 'left',
        },
        {
          type: 'dropdown',
          label: 'Docs',
          position: 'left',
          items: [
            {
              type: 'docSidebar',
              sidebarId: 'handbook',
              label: 'Handbook',
            },
            {
              type: 'docSidebar',
              sidebarId: 'onboarding',
              label: 'Onboarding',
            },
          ],
        },
      ],
    },
    footer: {
      copyright: `© ${new Date().getFullYear()} LMS - Danh Phi Long`,
    },
    zoom: {
      selector: '.markdown img',
      background: {
        light: 'rgb(255, 255, 255)',
        dark: 'rgb(50, 50, 50)',
      },
    },
    prism: {
      theme: prismThemes.nightOwl,
    },
  } satisfies Preset.ThemeConfig,
  plugins: ['docusaurus-plugin-image-zoom'],
};

export default config;
