const path = require('path');

module.exports = {
    stories: ['../frontend/**/*.stories.(js|mdx)'],
    addons: ['@storybook/addon-knobs/register', '@storybook/addon-docs'],
    webpackFinal: async (config, { configType }) => {

        config.module.rules.push({
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
            include: path.resolve(__dirname, '../'),
        });

        return config;
    },
};
