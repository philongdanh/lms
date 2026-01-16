async function createConfig() {
  const remarkD2 = (await import("remark-d2")).default;

  /** @type {import('@docusaurus/types').Config} */
  const config = {
    title: "LMS Documentation",
    favicon: "img/favicon.svg",

    url: "http://localhost",
    baseUrl: "/",
    organizationName: "idlongggg",
    projectName: "lms-docs",
    trailingSlash: false,

    onBrokenLinks: "warn",

    markdown: {
      mermaid: true,
    },

    themes: ["@docusaurus/theme-mermaid"],

    presets: [
      [
        "classic",
        /** @type {import('@docusaurus/preset-classic').Options} */ ({
          docs: {
            path: 'docs',
            routeBasePath: '/',
            sidebarPath: './sidebars.js',
            lastVersion: '1.0',
            versions: {
              current: {
                label: 'Next',
                path: 'next',
              },
              '1.0': {
                label: '1.0',
                path: '',
              },
            },
            remarkPlugins: [
              [remarkD2, {
                compilePath: "static/d2",
                linkPath: "/d2",
                ext: "svg",
                defaultD2Opts: [
                  "--sketch",
                ],
              }],
            ],
          },
          blog: false,
          theme: {
            customCss: "./src/css/custom.css",
          },
        }),
      ],
    ],

    themeConfig: {
      navbar: {
      title: "LMS",
      items: [
        {
          type: "dropdown",
          label: "Guides",
          position: "left",
          items: [
            {
              type: "docSidebar",
              sidebarId: "userGuide",
              label: "User Guide",
            },
            {
              type: "docSidebar",
              sidebarId: "devGuide",
              label: "Developer Guide",
            },
          ],
        },
        {
          type: "docSidebar",
          sidebarId: "specs",
          label: "Specs",
          position: "left",
        },
        {
          type: "docSidebar",
          sidebarId: "design",
          label: "Design",
          position: "left",
        },
        {
          type: "docSidebar",
          sidebarId: "api",
          label: "API",
          position: "left",
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
          dropdownActiveClassDisabled: true,
        },
        {
          type: "docSidebar",
          sidebarId: "changelog",
          label: "What's New",
          position: 'right',
        },
        {
          href: "https://github.com/idlongggg/lms-docs",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Documentation",
          items: [
            {
              label: "User Guide",
              to: "/user-guide/getting-started",
            },
            {
              label: "Developer Guide",
              to: "/developer-guide/setup",
            },
          ],
        },
        {
          title: "Technical",
          items: [
            {
              label: "Specifications",
              to: "/specs/",
            },
            {
              label: "Design System",
              to: "/design/",
            },
            {
              label: "API Reference",
              to: "/api/",
            },
          ],
        },
        {
          title: "Links",
          items: [
            {
              label: "GitHub Repository",
              href: "https://github.com/idlongggg/lms-docs",
            },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} LMS - Danh Phi Long`,
    },
  },
};

  return config;
}

module.exports = createConfig;
