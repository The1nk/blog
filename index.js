const removeMd = require("remove-markdown");

module.exports = (themeConfig, ctx) => {
  themeConfig = Object.assign(themeConfig, {
    summary: !!themeConfig.summary,
    summaryLength:
      typeof themeConfig.summaryLength === "number"
        ? themeConfig.summaryLength
        : 400,
    pwa: !!themeConfig.pwa
  });

  themeConfig.heroImage =
    themeConfig.heroImage || "https://source.unsplash.com/800x600/?code";

  const defaultBlogPluginOptions = {
    directories: [
      {
        id: "post",
        dirname: "_posts",
        path: "/",
        // layout: 'IndexPost', defaults to `Layout.vue`
        itemLayout: "Post",
        frontmatter: { title: "Home" },
        itemPermalink: "/:year/:month/:day/:slug",
        pagination: {
          lengthPerPage: 10
        }
      }
    ],
    frontmatters: [
      {
        id: "tag",
        keys: ["tag", "tags"],
        path: "/tag/",
        // layout: 'Tag',  defaults to `FrontmatterKey.vue`
        frontmatter: { title: "Tag" },
        pagination: {
          lengthPerPage: 5
        }
      }
    ]
  };

  const { modifyBlogPluginOptions } = themeConfig;

  const blogPluginOptions =
    typeof modifyBlogPluginOptions === "function"
      ? modifyBlogPluginOptions(defaultBlogPluginOptions)
      : defaultBlogPluginOptions;

  const plugins = [
    "disqus",
    "seo",
    "reading-time",
    "smooth-scroll",
    "reading-progress",
    "@vuepress/medium-zoom",
    "@vuepress/nprogress",
    ["@vuepress/blog", blogPluginOptions],
    [
      "@vuepress/search",
      {
        searchMaxSuggestions: 10
      }
    ],
    [
      "vuepress-plugin-mailchimp",
      {
        title: "Newsletter",
        content: "Subscribe to get the latest content. No spam, ever.",
        endpoint: "https://dev.us4.list-manage.com/subscribe/post?u=a96fe3cb0269c8cd86803c11c&amp;id=fd313fd85a"
      }
    ]
  ];

  if (themeConfig.socialShare && themeConfig.socialShareNetworks) {
    plugins.push(
      ["social-share", { networks: themeConfig.socialShareNetworks }]
    )
  }

  if (themeConfig.sitemap && themeConfig.hostname) {
    plugins.push([
      "sitemap",
      {
        hostname: themeConfig.hostname
      }
    ]);
  }

  if (themeConfig.googleAnalytics) {
    plugins.push([
      "@vuepress/google-analytics",
      {
        ga: themeConfig.googleAnalytics
      }
    ]);
  }

  if (themeConfig.pwa) {
    plugins.push([
      "@vuepress/pwa",
      {
        serviceWorker: true,
        updatePopup: true
      }
    ]);
  }

  const config = {
    plugins,
    define: {
      THEME_BLOG_PAGINATION_COMPONENT: themeConfig.paginationComponent
        ? themeConfig.paginationComponent
        : "Pagination"
    }
  };

  /**
   * Generate summary.
   */
  if (themeConfig.summary) {
    config.extendPageData = function (pageCtx) {
      const strippedContent = pageCtx._strippedContent;
      if (!strippedContent) {
        return;
      }
      pageCtx.summary =
        removeMd(
          strippedContent
            .trim()
            .replace(/^#+\s+(.*)/, "")
            .slice(0, themeConfig.summaryLength)
        ) + " ...";
    };
  }

  return config;
};
