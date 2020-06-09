const Encore = require('@symfony/webpack-encore');
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

const myPath = {
    html: {
        entry: ['./frontend/templates'],
        resolve: 'frontend/templates/',
    },
    dist: './public',
};

function generateHtmlPlugins(templateDir) {
    const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
    return templateFiles
        .filter((item) => item.split('.')[0][0] !== '_' && item.split('.')[1])
        .map((item) => {
            const parts = item.split('.');
            const name = parts[0];
            const extension = parts[1];
            return new HtmlWebpackPlugin({
                filename: `../../${name}.html`,
                template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
                inject: false,
            });
        });
}

Encore.setOutputPath(!Encore.isProduction() ? 'public/assets/build-dev' : 'public/assets/build')
    .setPublicPath(!Encore.isProduction() ? '/assets/build-dev' : '/assets/build')
    .cleanupOutputBeforeBuild()
    .enableVersioning(Encore.isProduction())
    .addEntry('homepage', './frontend/scripts/homepage.ts')
    .addEntry('pages', './frontend/scripts/pages.ts')
    .addEntry('demo', './frontend/scripts/demo.ts')
    .addEntry('builder', './frontend/scripts/builder.ts')
    .addEntry('landing', './frontend/scripts/landing.ts')
    .addStyleEntry('content', './frontend/styles/content.scss')
    .disableSingleRuntimeChunk()
    .splitEntryChunks()
    .configureSplitChunks((splitChunks) => {
        splitChunks.name = 'common';
        splitChunks.minSize = 0;
    })
    .enableTypeScriptLoader()
    .enableSassLoader()
    .configureCssLoader((cfg) => {
        cfg.url = false;
    })
    .enablePostCssLoader((options) => {
        options.config = {
            path: './',
        };
    })
    .enableVueLoader()
    .addLoader({
        test: /\.twig$/,
        use: ['twig-loader'],
    })
    .addLoader({
        test: /\.html$/,
        include: path.resolve(__dirname, myPath.html.resolve),
        use: ['raw-loader'],
    });

if (!Encore.isProduction()) {
    Encore.addPlugin( new BrowserSyncPlugin({
        host: 'localhost',
        port: 3000,
        server: { baseDir: [myPath.dist] }
    }))
}
const config = Encore.getWebpackConfig();

const htmlPlugins = (() => {
    let results = [];
    myPath.html.entry.forEach((item) => {
        results = results.concat(generateHtmlPlugins(item));
    });
    return results;
})();

config.plugins = config.plugins.concat(htmlPlugins);

module.exports = config;
