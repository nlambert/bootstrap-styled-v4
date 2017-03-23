'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _tools = require('../../styled/utilities/tools');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var propTypes = {
  tag: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]),
  children: _react.PropTypes.node.isRequired,
  right: _react.PropTypes.bool,
  className: _react.PropTypes.string,
  cssModule: _react.PropTypes.object
};

var defaultProps = {
  tag: 'div'
};

var contextTypes = {
  isOpen: _react.PropTypes.bool.isRequired
};

var DropdownMenu = function DropdownMenu(props, context) {
  var className = props.className,
      cssModule = props.cssModule,
      right = props.right,
      Tag = props.tag,
      attributes = _objectWithoutProperties(props, ['className', 'cssModule', 'right', 'tag']);

  var classes = (0, _tools.mapToCssModules)((0, _classnames2.default)(className, 'dropdown-menu', { 'dropdown-menu-right': right }), cssModule);

  return _react2.default.createElement(Tag, _extends({}, attributes, { tabIndex: '-1', 'aria-hidden': !context.isOpen, role: 'menu', className: classes }));
};

DropdownMenu.defaultProps = defaultProps;
DropdownMenu.contextTypes = contextTypes;

exports.default = DropdownMenu;