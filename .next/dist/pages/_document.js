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
          lineNumber: 46
        }
      }, _react2.default.createElement(_document.Head, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 47
        }
      }, _react2.default.createElement('meta', { charSet: 'UTF-8', __source: {
          fileName: _jsxFileName,
          lineNumber: 48
        }
      }), _react2.default.createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1', __source: {
          fileName: _jsxFileName,
          lineNumber: 50
        }
      }), _react2.default.createElement('meta', { httpEquiv: 'X-UA-Compatible', content: 'IE=edge,chrome=1', __source: {
          fileName: _jsxFileName,
          lineNumber: 51
        }
      }), _react2.default.createElement('title', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 53
        }
      }, 'There\u2122 - Work across timezones efficiently'), _react2.default.createElement('link', {
        href: 'https://fonts.googleapis.com/css?family=Playfair+Display:700|Work+Sans:400,600',
        rel: 'stylesheet',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 80
        }
      }), this.props.styleTags), _react2.default.createElement('body', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 87
        }
      }, _react2.default.createElement(_document.Main, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 88
        }
      }), _react2.default.createElement(_document.NextScript, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 89
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
              lineNumber: 38
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL19kb2N1bWVudC5qcyJdLCJuYW1lcyI6WyJEb2N1bWVudCIsIkhlYWQiLCJNYWluIiwiTmV4dFNjcmlwdCIsIlNlcnZlclN0eWxlU2hlZXQiLCJpbmplY3RHbG9iYWwiLCJjc3MiLCJwaG9uZSIsIkJBU0VfRk9OVF9TSVpFIiwiQkFTRV9NT0JJTEVfRk9OVF9TSVpFIiwiTXlEb2N1bWVudCIsInByb3BzIiwic3R5bGVUYWdzIiwicmVuZGVyUGFnZSIsInNoZWV0IiwicGFnZSIsImNvbGxlY3RTdHlsZXMiLCJnZXRTdHlsZUVsZW1lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTyxBQUFZLEFBQU0sQUFBTTs7OztBQUMvQixBQUFTLEFBQWtCLEFBQWM7O0FBRXpDLEFBQVMsQUFBYTs7QUFDdEIsQUFBUyxBQUFnQixBQUE2Qjs7Ozs7Ozs7QUFFdEQsb0NBQUEsQUFNaUIsc0NBTVgsa0JBQUEsQUFBTSwwQ0FaWixBQVlNLEFBQ2E7O0ksQUFjRTs7Ozs7Ozs7Ozs7NkJBVVYsQUFDUDs2QkFDRSxjQUFBLFVBQU0sTUFBTixBQUFXO29CQUFYO3NCQUFBLEFBQ0U7QUFERjtPQUFBLGtCQUNFLEFBQUM7O29CQUFEO3NCQUFBLEFBQ0U7QUFERjtBQUFBLGlEQUNRLFNBQU4sQUFBYztvQkFBZDtzQkFERixBQUNFLEFBRUE7QUFGQTtrREFFTSxNQUFOLEFBQVcsWUFBVyxTQUF0QixBQUE4QjtvQkFBOUI7c0JBSEYsQUFHRSxBQUNBO0FBREE7a0RBQ00sV0FBTixBQUFnQixtQkFBa0IsU0FBbEMsQUFBMEM7b0JBQTFDO3NCQUpGLEFBSUUsQUFFQTtBQUZBOzBCQUVBLGNBQUE7O29CQUFBO3NCQUFBO0FBQUE7QUFBQSxTQU5GLEFBTUUsQUEyQkE7Y0FBQSxBQUNPLEFBQ0w7YUFGRixBQUVNOztvQkFGTjtzQkFqQ0YsQUFpQ0UsQUFLQztBQUxEO0FBQ0UsZUFJRCxBQUFLLE1BdkNWLEFBQ0UsQUFzQ2MsQUFFZCw0QkFBQSxjQUFBOztvQkFBQTtzQkFBQSxBQUNFO0FBREY7QUFBQSx5QkFDRSxBQUFDOztvQkFBRDtzQkFERixBQUNFLEFBQ0E7QUFEQTtBQUFBLDBCQUNBLEFBQUM7O29CQUFEO3NCQTVDTixBQUNFLEFBeUNFLEFBRUUsQUFJUDtBQUpPO0FBQUE7Ozs7MENBdEQrQjtVQUFkLEFBQWMsa0JBQWQsQUFBYyxBQUNyQzs7VUFBTSxRQUFOLEFBQWMsQUFBSSxBQUNsQjtVQUFNLGtCQUFrQixlQUFBO2VBQU8saUJBQUE7dUJBQzdCLEFBQU0sNENBQWMsQUFBQyxnQ0FBRCxBQUFTOzt3QkFBVDswQkFEUyxBQUM3QixBQUFvQjtBQUFBO0FBQUEsWUFBQSxDQUFwQjtBQURzQjtBQUF4QixBQUFhLEFBR2IsT0FIYTtVQUdQLFlBQVksTUFBbEIsQUFBa0IsQUFBTSxBQUN4Qjt3Q0FBQSxBQUFZLFFBQU0sV0FBbEIsQUFDRDs7Ozs7QUFScUMsQTs7a0JBQW5CLEEiLCJmaWxlIjoiX2RvY3VtZW50LmpzP2VudHJ5Iiwic291cmNlUm9vdCI6Ii9Vc2Vycy9tb2hhbW1hZC9Eb2N1bWVudHMvZGV2L3RoZXJlL3RoZXJlLXdlYnNpdGUifQ==