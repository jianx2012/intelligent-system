// const {override, fixBabelImports, addLessLoader} = require('customize-cra');
// module.exports = override(
// fixBabelImports('import', {
// libraryName: 'antd',
// libraryDirectory: 'es',
// style: true,
// }),
// addLessLoader({
// javascriptEnabled: true,
// modifyVars: {'@primary-color': '#1DA57A'},
// }),
// );
const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};