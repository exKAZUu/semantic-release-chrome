"use strict";

exports.__esModule = true;
exports.default = void 0;

var _error = _interopRequireDefault(require("@semantic-release/error"));

var _aggregateError = _interopRequireDefault(require("aggregate-error"));

var _chromeWebstoreUpload = _interopRequireDefault(require("chrome-webstore-upload"));

var _fsExtra = require("fs-extra");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const publish = async ({
  extensionId,
  target,
  asset
}, {
  logger
}) => {
  const {
    GOOGLE_CLIENT_ID: clientId,
    GOOGLE_CLIENT_SECRET: clientSecret,
    GOOGLE_REFRESH_TOKEN: refreshToken
  } = process.env;

  if (!extensionId) {
    throw new _error.default("Option 'extensionId' was not included in the publish config. Check the README.md for config info.", 'ENOEXTENSIONID');
  }

  if (!asset) {
    throw new _error.default("Option 'asset' was not included in the publish config. Check the README.md for config info.", 'ENOASSET');
  }

  const webStore = await (0, _chromeWebstoreUpload.default)({
    clientId,
    clientSecret,
    extensionId,
    refreshToken
  });
  const token = await webStore.fetchToken();
  const zipFile = (0, _fsExtra.createReadStream)(asset);
  const uploadRes = await webStore.uploadExisting(zipFile, token);

  if (uploadRes.uploadState === 'FAILURE') {
    const errors = [];
    uploadRes.itemError.forEach(err => {
      const semanticError = new _error.default(err.error_detail, err.error_code);
      errors.push(semanticError);
    });
    throw new _aggregateError.default(errors);
  }

  const publishRes = await webStore.publish(target || 'default', token);

  if (!publishRes.status.includes('OK')) {
    const errors = [];

    for (let i = 0; i < publishRes.status.length; i += 1) {
      const code = publishRes.status[i];
      const message = publishRes.statusDetail[i];
      console.log(code.includes('WARNING'), code, message, JSON.stringify({
        code,
        message
      }));

      if (code.includes('WARNING')) {
        logger.log('%s: %s', code, message);
      } else {
        const err = new _error.default(message, code);
        errors.push(err);
      }
    } // throw new AggregateError(errors)

  }

  return {
    name: 'Chrome Web Store',
    url: `https://chrome.google.com/webstore/detail/${extensionId}`
  };
};

var _default = publish;
exports.default = _default;
//# sourceMappingURL=publish.js.map