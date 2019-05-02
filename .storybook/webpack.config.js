module.exports = ({ config, mode }) => {
    console.log(config.resolve.alias);
    delete config.resolve.alias['core-js'];
    return config;
};