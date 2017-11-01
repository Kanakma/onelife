webpackHotUpdate(0,{

/***/ 565:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _axios = __webpack_require__(4);

var _axios2 = _interopRequireDefault(_axios);

var _Auth = __webpack_require__(5);

var _Auth2 = _interopRequireDefault(_Auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AdminParser = function (_React$Component) {
  _inherits(AdminParser, _React$Component);

  function AdminParser(props) {
    _classCallCheck(this, AdminParser);

    var _this = _possibleConstructorReturn(this, (AdminParser.__proto__ || Object.getPrototypeOf(AdminParser)).call(this, props));

    _this.state = {
      filename: ''
    };
    return _this;
  }

  _createClass(AdminParser, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'container clearfix' },
        _react2.default.createElement(
          'div',
          { className: 'bg-title' },
          _react2.default.createElement(
            'h4',
            null,
            '\u041F\u0430\u0440\u0441\u0435\u0440\u044B'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'my-content' },
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'col-md-4 col-xs-12 col-sm-6', style: { padding: '0px 7.5px' } },
              _react2.default.createElement('img', { className: 'img-responsive subject-img', alt: 'user', src: __webpack_require__(159) }),
              _react2.default.createElement(
                'div',
                { className: 'white-box' },
                _react2.default.createElement(
                  'h4',
                  null,
                  '\u041F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u0438'
                ),
                _react2.default.createElement(
                  'button',
                  { onClick: this.toggleModal, style: { paddingLeft: '5%', paddingRight: '5%' }, className: 'btn btn-inverse waves-effect waves-light m-r-10' },
                  '\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C'
                )
              )
            )
          )
        )
      );
    }
  }]);

  return AdminParser;
}(_react2.default.Component);

exports.default = AdminParser;
// <AddEventNotificationModal
//   show={this.state.isOpen}
//   onClose={this.toggleModalClose}/>

/***/ })

})