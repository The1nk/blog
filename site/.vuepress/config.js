module.exports = {
  title: "AdamDavis.DEV",
  description: "The official home of the infamous developer Adam Davis",
  theme: require.resolve("../../"),
  summaryLength: 500,
  themeConfig: {
    summary: true,
    nav: [
      {
        text: "Home",
        link: "/",
        icon: "el-icon-house"
      },
      {
        text: "Projects",
        link: "/projects/",
        icon: "el-icon-folder"
      }
    ],
    sitemap: true, // enables sitemap plugin
    hostname: "https://adamdavis.dev/", // required for sitemap
    // disqus: "", // if you want to incorporate Disqus for comments replace this value else just get rid of it
    socialShare: true, // enables social share
    socialShareNetworks: ["facebook", "twitter"], // required for social share plugin
    // googleAnalytics: "", // Google Analytics tracking ID
    about: {
      fullName: "Adam Davis",
      bio: "I'm a passionate developer who enjoys new challenges",
      image: "https://pbs.twimg.com/profile_images/1188984722812215298/1isCUEpG_400x400.png"
    },
    footer: {
      contact: [
        {
          type: "twitter",
          link: "https://twitter.com/adamdavisdev"
        },
        {
          type: "github",
          link: "https://github.com/the1nk"
        },
        {
          type: "linkedin",
          link: "https://linkedin.com/in/adavis23"
        },
        {
          type: "mail",
          link: "mailto:me@adamdavis.dev"
        }
      ],
      copyright: [
        // {
        //   text: "Privacy Policy",
        //   link: "https://policies.google.com/privacy?hl=en-US"
        // },
        {
          text: "Copyright © 2019 - present Adam Davis",
          link: "https://adamdavis.dev"
        }
      ]
    }
  }
};
