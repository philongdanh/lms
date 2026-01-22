import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'LMS Documentation',
  favicon: 'img/favicon.ico',
  future: {
    v4: true,
  },
  url: 'http://localhost',
  baseUrl: '/',
  organizationName: 'idlonggg',
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
            'quality/**/*.md',
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
  themes: [],
  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
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
          sidebarId: 'specs',
          label: 'Specs',
          position: 'left',
        },
        {
          type: 'docSidebar',
          sidebarId: 'quality',
          label: 'Quality',
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
      style: 'dark',
      copyright: `© ${new Date().getFullYear()} LMS - Danh Phi Long`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
