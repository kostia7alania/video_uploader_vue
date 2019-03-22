module.exports = {
  publicPath: "./",
  assetsDir: "./dist/",

  chainWebpack: config => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap(options => {
        options["transformAssetUrls"] = {
          img: "src",
          image: "xlink:href",
          "b-img": "src",
          "b-img-lazy": ["src", "blank-src"],
          "b-card": "img-src",
          "b-card-img": "img-src",
          "b-carousel-slide": "img-src",
          "b-embed": "src"
        };
        return options;
      });
       
  },

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'ru',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
};

// https://bootstrap-vue.js.org/docs/reference/images/#vue-cli-3-support
