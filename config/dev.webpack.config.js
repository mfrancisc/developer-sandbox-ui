const { resolve } = require('path');
const config = require('@redhat-cloud-services/frontend-components-config');
const commonPlugins = require('./plugins');

const { config: webpackConfig, plugins } = config({
  rootFolder: resolve(__dirname, '../'),
  debug: true,
  deployment: process.env.BETA ? 'beta/apps' : 'apps',
  useProxy: true,
  localChrome: '/Users/hq/SoftwareDev/arivepr/insights-chrome/build/',
  appUrl: process.env.BETA ? '/beta/openshift/sandbox' : '/openshift/sandbox',
  env: process.env.BETA ? 'stage-beta' : 'stage-stable',
  standalone: Boolean(process.env.STANDALONE),
});
plugins.push(...commonPlugins);

module.exports = {
  ...webpackConfig,
  plugins,
};
