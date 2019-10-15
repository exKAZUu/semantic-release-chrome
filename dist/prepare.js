"use strict";

exports.__esModule = true;
exports.default = void 0;

var _error = _interopRequireDefault(require("@semantic-release/error"));

var _archiver = _interopRequireDefault(require("archiver"));

var _fsExtra = require("fs-extra");

var _fs = require("fs");

var _path = require("path");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const prepareManifest = (manifestPath, version, logger) => {
  const manifest = (0, _fsExtra.readJsonSync)(manifestPath);
  (0, _fsExtra.writeJsonSync)(manifestPath, _extends({}, manifest, {
    version
  }), {
    spaces: 2
  });
  logger.log('Wrote version %s to %s', version, manifestPath);
};

const zipFolder = (asset, distFolder, version, logger) => {
  const zipPath = (0, _path.resolve)(asset);
  const output = (0, _fs.createWriteStream)(zipPath);
  const archive = (0, _archiver.default)('zip', {
    zlib: {
      level: 9
    }
  });
  archive.pipe(output);
  archive.directory(distFolder, false);
  archive.finalize();
  logger.log('Wrote zipped file to %s', zipPath);
};

const prepare = ({
  manifestPath,
  distFolder,
  asset
}, {
  nextRelease,
  logger
}) => {
  if (!asset) {
    throw new _error.default("Option 'asset' was not included in the prepare config. Check the README.md for config info.", 'ENOASSET');
  }

  const version = nextRelease.version;
  const normalizedDistFolder = distFolder || 'dist';
  prepareManifest(manifestPath || `${normalizedDistFolder}/manifest.json`, version, logger);
  zipFolder(asset, normalizedDistFolder, version, logger);
};

var _default = prepare;
exports.default = _default;
//# sourceMappingURL=prepare.js.map