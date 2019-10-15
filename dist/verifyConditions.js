"use strict";

exports.__esModule = true;
exports.default = void 0;

var _error = _interopRequireDefault(require("@semantic-release/error"));

var _aggregateError = _interopRequireDefault(require("aggregate-error"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const configMessage = 'Check the README.md for config info.';

const createErrorPATH = (param, code) => new _error.default(`No ${param} specified inside PATH. ${configMessage}`, code);

const verifyConditions = () => {
  const {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN
  } = process.env;
  const errors = [];

  if (!GOOGLE_CLIENT_ID) {
    errors.push(createErrorPATH('GOOGLE_CLIENT_ID', 'EGOOGLECLIENTID'));
  }

  if (!GOOGLE_CLIENT_SECRET) {
    errors.push(createErrorPATH('GOOGLE_CLIENT_SECRET', 'EGOOGLECLIENTSECRET'));
  }

  if (!GOOGLE_REFRESH_TOKEN) {
    errors.push(createErrorPATH('GOOGLE_REFRESH_TOKEN', 'EGOOGLEREFRESHTOKEN'));
  }

  if (errors.length > 0) {
    throw new _aggregateError.default(errors);
  }
};

var _default = verifyConditions;
exports.default = _default;
//# sourceMappingURL=verifyConditions.js.map