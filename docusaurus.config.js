async function createConfig() {
  const remarkD2 = (await import('remark-d2')).default;

  /** @type {import('@docusaurus/types').Config} */
  const config = {
    title: 'LMS Documentation',
    favicon: 'img/favicon.svg',

    url: 'http://localhost',
    baseUrl: '/',
    organizationName: 'idlongggg',
    projectName: 'lms-docs',
    trailingSlash: false,

    onBrokenLinks: 'warn',

    markdown: {
      mermaid: true,
    },

    themes: ['@docusaurus/theme-mermaid'],

    presets: [
      [
        'classic',
        /** @type {import('@docusaurus/preset-classic').Options} */ ({
          docs: {
            path: 'docs',
            routeBasePath: '/',
            sidebarPath: './sidebars.js',
            exclude: ['**/templates/**', '**/node_modules/**'],
            remarkPlugins: [
              [
                remarkD2,
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
          blog: false,
          theme: {
            customCss: './src/css/custom.css',
          },
        }),
      ],
    ],

    themeConfig: {
      navbar: {
        title: 'LMS',
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'specs',
            label: 'Specs',
            position: 'left',
          },
          {
            type: 'docSidebar',
            sidebarId: 'design',
            label: 'Design',
            position: 'left',
          },
          {
            type: 'docSidebar',
            sidebarId: 'api',
            label: 'API',
            position: 'left',
          },
          {
            type: 'dropdown',
            label: 'Guides',
            position: 'left',
            items: [
              {
                type: 'docSidebar',
                sidebarId: 'userGuide',
                label: 'User',
              },
              {
                type: 'docSidebar',
                sidebarId: 'devGuide',
                label: 'Dev',
              },
            ],
          },
          {
            type: 'docSidebar',
            sidebarId: 'changelog',
            label: "What's New",
            position: 'right',
          },
          {
            href: 'https://github.com/idlongggg/lms-docs',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `© ${new Date().getFullYear()} LMS - Danh Phi Long`,
      },
    },
  };

  return config;
}

module.exports = createConfig;
