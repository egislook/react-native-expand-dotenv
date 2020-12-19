var path = require('path');

module.exports = (ctx, extra = {}) => ({
  plugins: [
    [require('babel-plugin-expand-dotenv'), {
      replacedModuleName: 'react-native-expand-dotenv',
      configDir: path.resolve(__dirname, '../../', extra.dirname || '')
    }],
  ],
});
