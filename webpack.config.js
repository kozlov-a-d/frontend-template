var Encore = require('@symfony/webpack-encore');
// var path = require('path');

if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    .setOutputPath((!Encore.isProduction()) ? 'public/assets/build-dev' : 'public/assets/build')
    .setPublicPath((!Encore.isProduction()) ? '/assets/build-dev' : '/assets/build')
    .enableVersioning(Encore.isProduction())
    .addEntry('homepage', './frontend/assets/scripts/homepage.js')
    // .addEntry('pages', './frontend/assets/scripts/pages.js')
    .disableSingleRuntimeChunk()
    // .addAliases({
    //     '~blocks': path.resolve(__dirname, `frontend/assets/blocks/`),
    //     '~styles': path.resolve(__dirname, `frontend/assets/styles/`), 
    //     '~scripts': path.resolve(__dirname, `frontend/assets/scripts/`),
    //     '~vendor': path.resolve(__dirname, `frontend/assets/vendor/`),
    //     '~images': path.resolve(__dirname, `frontend/assets/images/`),
    // })
    // .configureCssLoader((cfg) => { 
    //     cfg.url = false; 
    // })
    // .enablePostCssLoader((options) => {
    //     options.config = {
    //         path: './'
    //     };
    // })
    // .enableSassLoader()

module.exports = Encore.getWebpackConfig();