module.exports = function override(config, env) {
  // Добавьте или измените настройку publicPath
  config.output.publicPath = '/';

  return config;
};