import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Bryan Dady",
  tagline: "Welcome",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://bryandady.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "bcdady", // Usually your GitHub org/user name.
  projectName: "bryandady.com", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "Bryan Dady",
      logo: {
        // Thank you https://www.vecteezy.com/
        alt: "Laptop with code on screen",
        src: "img/laptop.jpg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "Sidebar",
          position: "left",
          label: "Hello",
        },
        { to: "/blog", label: "Blog", position: "left" },
        {
          href: "https://github.com/bcdady",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Hello",
              to: "/docs/intro",
            },
          ],
        },
        {
          title: "Social",
          items: [
            {
              label: "LinkedIn",
              href: "https://linkedin.com/in/bryandady",
            },
            {
              label: "Stack Overflow",
              href: "https://stackoverflow.com/users/1709178/bcdady",
            },
            {
              label: "Discord",
              href: "https://discord.com/channels/@bcdady",
            },
            {
              label: "Threads",
              href: "https://threads.net/@bcdady",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/bcdady",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              to: "/blog",
            },
            {
              label: "GitHub",
              href: "https://github.com/bcdady",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Bryan Dady. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
