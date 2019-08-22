const isDev = process.env.NODE_ENV !== "production"
module.exports = {
  transpileDependencies: ['object-hash'],
  lintOnSave: isDev,
  devServer: {
    overlay: {
      warnings: false,
      errors: true,
      proxy: 'http://localhost:3000/backend/index.php' //Это скажет серверу разработки проксировать любые неизвестные запросы (запросы, которые не соответствуют статическому файлу) на адрес http://localhost:4000.
    }
  },
  publicPath: isDev ? './' : './js/video-uploader',
  assetsDir: './',   // "./", //По умолчанию: '' - Каталог (относительно outputDir) для хранения сгенерированных статических ресурсов (js, css, img, fonts).
  outputDir: 'dist',   // "dist",
  indexPath: 'index.html',  // "index.html", //умолч -'index.html'-относительно outputDir
  filenameHashing: false,

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

    config.module
      .rule("i18n")
      .resourceQuery(/blockType=i18n/)
      .type("javascript/auto")
      .use("i18n")
      .loader("@kazupon/vue-i18n-loader")
      .end();

    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule.use("vue-svg-loader").loader("vue-svg-loader");
  },

  pluginOptions: {
    i18n: {
      locale: "ru",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: true
    },
    foo: {}
  },

  // ...other vue-cli plugin options...
  pwa: {
    name: 'Video uploader',
    msTileColor: '#00FF3C',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    // workboxPluginMode: 'InjectManifest'
  }
};

// https://bootstrap-vue.js.org/docs/reference/images/#vue-cli-3-support
