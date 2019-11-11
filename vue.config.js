const isDev = process.env.NODE_ENV == "development";
module.exports = {
    transpileDependencies: ["object-hash"],
    lintOnSave: isDev,
    devServer: {
        historyApiFallback: true, // noInfo: true,
        overlay: true, //вывод ошибок на экран
        open: false,
        hot: true,
        proxy: {
            "/api*": {
                //все запросы))
                target: "https://apcis.tmou.org/develop/api/", //'http://localhost:3000/backend/index.php' //Это скажет серверу разработки проксировать любые неизвестные запросы (запросы, которые не соответствуют статическому файлу) на адрес http://localhost:4000.
                secure: false,
                changeOrigin: true,
                onProxyRes(proxyRes, req, res) {
                    if (proxyRes.headers.location) {
                        console.log(req, res);
                        // Если есть заголовок со свойством location (Где храниться полный адрес запроса к локальному серверу)
                        let location = proxyRes.headers.location; // Сохраняем адрес зоголовка location из ответа в переменную location
                        console.log(`LOCATION: ${proxyRes.headers.location}`); // Выводит в консоль адрес до замены
                        location = location.replace("anyships.site", "anyships.site:3000"); // Заменяем адрес локального сервера на адрес webpack dev server'a
                        proxyRes.headers.location = location; // Присваиваем в заголовок location подмененный адрес из переменной location
                        console.log(`REPLACED: ${proxyRes.headers.location}`); // Выводит в консоль адрес после замены
                    }
                },
                pathRewrite: { "^/api": "" }
            }
        }
    },
    publicPath: isDev ? "./" : "././api/video-manager/dist",
    assetsDir: "./", // "./", //По умолчанию: '' - Каталог (относительно outputDir) для хранения сгенерированных статических ресурсов (js, css, img, fonts).
    outputDir: "dist", // "dist",
    indexPath: "index.html", // "index.html", //умолч -'index.html'-относительно outputDir
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
        //svgRule.use('vue-svg-loader').loader('vue-svg-loader') 
        svgRule
            .use('babel-loader')
            .loader('babel-loader')
            .end()
            .use('vue-svg-loader')
            .loader('vue-svg-loader')
    },

    pluginOptions: {
        i18n: {
            locale: "en",
            fallbackLocale: "ru",
            localeDir: "locales",
            enableInSFC: true
        },
        foo: {}
    },

    // ...other vue-cli plugin options...
    pwa: {
        name: "Video uploader",
        msTileColor: "#00FF3C",
        appleMobileWebAppCapable: "yes",
        appleMobileWebAppStatusBarStyle: "black"
            // workboxPluginMode: 'InjectManifest'
    }
};

// https://bootstrap-vue.js.org/docs/reference/images/#vue-cli-3-support