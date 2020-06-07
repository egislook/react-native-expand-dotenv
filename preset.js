var path = require('path');
var plugin = require('./index');

module.exports = () => ({
  plugins: [
    [plugin, {
      configDir: path.resolve(__dirname, "../../")
    }],
  ],
});
