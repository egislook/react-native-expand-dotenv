var dotEnv = require('dotenv');
var fs = require('fs');
var sysPath = require('path');
var env = require('process').env;

module.exports = function (data) {
  var t = data.types;

  return {
    visitor: {
      ImportDeclaration: function(path, state) {
        var options = state.opts;

        if (options.replacedModuleName === undefined)
        return;

        var configDir = options.configDir ? options.configDir : './';
        var configFile = options.filename ? options.filename : '.env';
        var packageFile = options.package ? options.package : 'package.json';

        if (path.node.source.value === options.replacedModuleName) {
          var npm_package = require(sysPath.join(configDir, packageFile))
          var config = dotEnv.config({ path: sysPath.join(configDir, configFile), silent: true }) || {};
          var platformPath = (env.BABEL_ENV === 'development' || env.BABEL_ENV === undefined)
            ? configFile + '.development'
            : configFile + '.production';
          var config = Object.assign(config, dotEnv.config({ path: sysPath.join(configDir, platformPath), silent: true }));
          var config = Object.keys(config).reduce((obj, key) => {
            obj[key] = config[key].includes('$npm_package_')
              ? npm_package[config[key].replace('$npm_package_', '')]
              : config[key]
            return obj
          }, {});

          path.node.specifiers.forEach(function(specifier, idx){

            var localId = specifier.local.name;
            var binding = path.scope.getBinding(localId);
            if (specifier.type === "ImportDefaultSpecifier") {
              return binding.referencePaths.forEach(refPath => refPath.replaceWith(t.valueToNode(config)));
            }

            var importedId = specifier.imported.name;

            if(!(config.hasOwnProperty(importedId))) {
              throw path.get('specifiers')[idx].buildCodeFrameError('Try to import dotenv variable "' + importedId + '" which is not defined in any ' + configFile + ' files.')
            }

            binding.referencePaths.forEach(refPath => refPath.replaceWith(t.valueToNode(config[importedId])));
          })

          path.remove();
        }
      }
    }
  }
}
