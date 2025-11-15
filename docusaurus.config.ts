import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";

const config: Config = {
  title: 'Bryan Dady',
  tagline: 'Welcome',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://bryandady.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        sidebarPath: './sidebars.ts',
        editUrl: 'https://github.com/bcdady/bryandady.com/tree/main/',
      },
    ],
    [
      '@docusaurus/plugin-content-blog',
      {
        showReadingTime: true,
        editUrl: 'https://github.com/bcdady/bryandady.com/tree/main/',
        feedOptions: {
          type: null, // disables RSS/Atom/JSON feeds. See https://github.com/bcdady/bryandady.com/issues/50
        },
      },
    ],
    ['@docusaurus/plugin-content-pages', {}],
    ['@docusaurus/plugin-sitemap', {}],
  ],

  themes: [
    [
      '@docusaurus/theme-classic',
      {
        customCss: './src/css/custom.css',
      },
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Bryan Dady',
      logo: {
        // Thank you https://www.vecteezy.com/
        alt: 'Laptop with code on screen',
        src: 'img/laptop.webp',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'Sidebar',
          position: 'left',
          label: 'Hello',
        },
        { to: '/blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/bcdady',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Hello',
              to: '/docs/intro',
            },
            {
              label: 'Résumé',
              to: '/resume',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'LinkedIn',
              href: 'https://linkedin.com/in/bryandady',
            },
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/users/1709178/bcdady',
            },
            {
              label: 'Discord',
              href: 'https://discord.com/channels/@bcdady',
            },
            {
              label: 'Threads',
              href: 'https://threads.net/@bcdady',
            },
            {
              label: 'BlueSky',
              href: 'https://bsky.app/profile/bcdady.bsky.social',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'About Me',
              to: 'https://about.me/bryandady',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/bcdady',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Bryan Dady. Built with <a href="https://docusaurus.io/docs/blog" target="_blank" rel="noopener noreferrer">Docusaurus</a>.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;
