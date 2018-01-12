'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _document = require('next/dist/server/document.js');

var _document2 = _interopRequireDefault(_document);

var _styledComponents = require('styled-components');

var _media = require('../utils/media');

var _rem = require('../utils/rem');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/mohammad/Documents/dev/there/there-website/pages/_document.js?entry';

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  html,\n  body {\n    margin: 0;\n    padding: 0;\n    font-family: "Work Sans", sans-serif;\n    font-size: ', 'px;\n    overflow-x: hidden;\n    overflow-y: auto;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n\n    ', ';\n  }\n\n  *, *:before, *:after {\n    box-sizing: border-box;\n  }\n\n  ::selection {\n    background: black;\n    color: white;\n  }\n'], ['\n  html,\n  body {\n    margin: 0;\n    padding: 0;\n    font-family: "Work Sans", sans-serif;\n    font-size: ', 'px;\n    overflow-x: hidden;\n    overflow-y: auto;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n\n    ', ';\n  }\n\n  *, *:before, *:after {\n    box-sizing: border-box;\n  }\n\n  ::selection {\n    background: black;\n    color: white;\n  }\n']);

(0, _styledComponents.injectGlobal)(_templateObject, _rem.BASE_FONT_SIZE, (0, _media.phone)((0, _styledComponents.css)(['font-size:', 'px;'], _rem.BASE_MOBILE_FONT_SIZE)));

var crispScript = '\n  window.$crisp=[];window.CRISP_WEBSITE_ID="bb14ccd2-0869-40e7-b0f1-b520e93db7e1";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();\n';

var mailChimpScript = '\n  !function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/6ea1cb2726621ef9a2563a17c/8f912a6c5c65deff04cb0d7e3.js");\n';

var MyDocument = function (_Document) {
  (0, _inherits3.default)(MyDocument, _Document);

  function MyDocument() {
    (0, _classCallCheck3.default)(this, MyDocument);

    return (0, _possibleConstructorReturn3.default)(this, (MyDocument.__proto__ || (0, _getPrototypeOf2.default)(MyDocument)).apply(this, arguments));
  }

  (0, _createClass3.default)(MyDocument, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement('html', { lang: 'en', __source: {
          fileName: _jsxFileName,
          lineNumber: 54
        }
      }, _react2.default.createElement(_document.Head, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 55
        }
      }, _react2.default.createElement('meta', { charSet: 'UTF-8', __source: {
          fileName: _jsxFileName,
          lineNumber: 56
        }
      }), _react2.default.createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1', __source: {
          fileName: _jsxFileName,
          lineNumber: 58
        }
      }), _react2.default.createElement('meta', { httpEquiv: 'X-UA-Compatible', content: 'IE=edge,chrome=1', __source: {
          fileName: _jsxFileName,
          lineNumber: 59
        }
      }), _react2.default.createElement('title', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 61
        }
      }, 'There\u2122 - Work across timezones efficiently'), _react2.default.createElement('meta', {
        name: 'google-site-verification',
        content: 'XKtisJxke0C2Hpeb8rgDk6yPDLRZj3PDR3-UtNZ04Ac',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 63
        }
      }), _react2.default.createElement('link', {
        href: 'https://fonts.googleapis.com/css?family=Playfair+Display:700|Work+Sans:400,600',
        rel: 'stylesheet',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 93
        }
      }), _react2.default.createElement('script', {
        type: 'text/javascript',
        dangerouslySetInnerHTML: { __html: crispScript },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 98
        }
      }), _react2.default.createElement('script', {
        id: 'mcjs',
        dangerouslySetInnerHTML: { __html: mailChimpScript },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 103
        }
      }), this.props.styleTags), _react2.default.createElement('body', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 110
        }
      }, _react2.default.createElement(_document.Main, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 111
        }
      }), _react2.default.createElement(_document.NextScript, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 112
        }
      })));
    }
  }], [{
    key: 'getInitialProps',
    value: function getInitialProps(_ref) {
      var renderPage = _ref.renderPage;

      var sheet = new _styledComponents.ServerStyleSheet();
      var page = renderPage(function (App) {
        return function (props) {
          return sheet.collectStyles(_react2.default.createElement(App, (0, _extends3.default)({}, props, {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 46
            }
          })));
        };
      });
      var styleTags = sheet.getStyleElement();
      return (0, _extends3.default)({}, page, { styleTags: styleTags });
    }
  }]);

  return MyDocument;
}(_document2.default);

exports.default = MyDocument;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL19kb2N1bWVudC5qcyJdLCJuYW1lcyI6WyJEb2N1bWVudCIsIkhlYWQiLCJNYWluIiwiTmV4dFNjcmlwdCIsIlNlcnZlclN0eWxlU2hlZXQiLCJpbmplY3RHbG9iYWwiLCJjc3MiLCJwaG9uZSIsIkJBU0VfRk9OVF9TSVpFIiwiQkFTRV9NT0JJTEVfRk9OVF9TSVpFIiwiY3Jpc3BTY3JpcHQiLCJtYWlsQ2hpbXBTY3JpcHQiLCJNeURvY3VtZW50IiwiX19odG1sIiwicHJvcHMiLCJzdHlsZVRhZ3MiLCJyZW5kZXJQYWdlIiwic2hlZXQiLCJwYWdlIiwiY29sbGVjdFN0eWxlcyIsImdldFN0eWxlRWxlbWVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxBQUFPLEFBQVksQUFBTSxBQUFNOzs7O0FBQy9CLEFBQVMsQUFBa0IsQUFBYzs7QUFFekMsQUFBUyxBQUFhOztBQUN0QixBQUFTLEFBQWdCLEFBQTZCOzs7Ozs7OztBQUV0RCxvQ0FBQSxBQU1pQixzQ0FNWCxrQkFBQSxBQUFNLDBDQVpaLEFBWU0sQUFDYTs7QUFjbkIsSUFBTSxjQUFOOztBQUlBLElBQU0sa0JBQU47O0ksQUFJcUI7Ozs7Ozs7Ozs7OzZCQVVWLEFBQ1A7NkJBQ0UsY0FBQSxVQUFNLE1BQU4sQUFBVztvQkFBWDtzQkFBQSxBQUNFO0FBREY7T0FBQSxrQkFDRSxBQUFDOztvQkFBRDtzQkFBQSxBQUNFO0FBREY7QUFBQSxpREFDUSxTQUFOLEFBQWM7b0JBQWQ7c0JBREYsQUFDRSxBQUVBO0FBRkE7a0RBRU0sTUFBTixBQUFXLFlBQVcsU0FBdEIsQUFBOEI7b0JBQTlCO3NCQUhGLEFBR0UsQUFDQTtBQURBO2tEQUNNLFdBQU4sQUFBZ0IsbUJBQWtCLFNBQWxDLEFBQTBDO29CQUExQztzQkFKRixBQUlFLEFBRUE7QUFGQTswQkFFQSxjQUFBOztvQkFBQTtzQkFBQTtBQUFBO0FBQUEsU0FORixBQU1FLEFBRUE7Y0FBQSxBQUNPLEFBQ0w7aUJBRkYsQUFFVTs7b0JBRlY7c0JBUkYsQUFRRSxBQThCQTtBQTlCQTtBQUNFO2NBNkJGLEFBQ08sQUFDTDthQUZGLEFBRU07O29CQUZOO3NCQXRDRixBQXNDRSxBQUtBO0FBTEE7QUFDRTtjQUlGLEFBQ08sQUFDTDtpQ0FBeUIsRUFBRSxRQUY3QixBQUUyQixBQUFVOztvQkFGckM7c0JBM0NGLEFBMkNFLEFBS0E7QUFMQTtBQUNFO1lBSUYsQUFDSyxBQUNIO2lDQUF5QixFQUFFLFFBRjdCLEFBRTJCLEFBQVU7O29CQUZyQztzQkFoREYsQUFnREUsQUFLQztBQUxEO0FBQ0UsZUFJRCxBQUFLLE1BdERWLEFBQ0UsQUFxRGMsQUFFZCw0QkFBQSxjQUFBOztvQkFBQTtzQkFBQSxBQUNFO0FBREY7QUFBQSx5QkFDRSxBQUFDOztvQkFBRDtzQkFERixBQUNFLEFBQ0E7QUFEQTtBQUFBLDBCQUNBLEFBQUM7O29CQUFEO3NCQTNETixBQUNFLEFBd0RFLEFBRUUsQUFJUDtBQUpPO0FBQUE7Ozs7MENBckUrQjtVQUFkLEFBQWMsa0JBQWQsQUFBYyxBQUNyQzs7VUFBTSxRQUFOLEFBQWMsQUFBSSxBQUNsQjtVQUFNLGtCQUFrQixlQUFBO2VBQU8saUJBQUE7dUJBQzdCLEFBQU0sNENBQWMsQUFBQyxnQ0FBRCxBQUFTOzt3QkFBVDswQkFEUyxBQUM3QixBQUFvQjtBQUFBO0FBQUEsWUFBQSxDQUFwQjtBQURzQjtBQUF4QixBQUFhLEFBR2IsT0FIYTtVQUdQLFlBQVksTUFBbEIsQUFBa0IsQUFBTSxBQUN4Qjt3Q0FBQSxBQUFZLFFBQU0sV0FBbEIsQUFDRDs7Ozs7QUFScUMsQTs7a0JBQW5CLEEiLCJmaWxlIjoiX2RvY3VtZW50LmpzP2VudHJ5Iiwic291cmNlUm9vdCI6Ii9Vc2Vycy9tb2hhbW1hZC9Eb2N1bWVudHMvZGV2L3RoZXJlL3RoZXJlLXdlYnNpdGUifQ==