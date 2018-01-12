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
          lineNumber: 50
        }
      }, _react2.default.createElement(_document.Head, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 51
        }
      }, _react2.default.createElement('meta', { charSet: 'UTF-8', __source: {
          fileName: _jsxFileName,
          lineNumber: 52
        }
      }), _react2.default.createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1', __source: {
          fileName: _jsxFileName,
          lineNumber: 54
        }
      }), _react2.default.createElement('meta', { httpEquiv: 'X-UA-Compatible', content: 'IE=edge,chrome=1', __source: {
          fileName: _jsxFileName,
          lineNumber: 55
        }
      }), _react2.default.createElement('title', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 57
        }
      }, 'There\u2122 - Work across timezones efficiently'), _react2.default.createElement('meta', {
        name: 'google-site-verification',
        content: 'EIzeuUTvAAhs5zEakaJPQw1ctmmrz4tscdyJRM7amhc',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 59
        }
      }), _react2.default.createElement('link', {
        href: 'https://fonts.googleapis.com/css?family=Playfair+Display:700|Work+Sans:400,600',
        rel: 'stylesheet',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 89
        }
      }), _react2.default.createElement('script', {
        type: 'text/javascript',
        dangerouslySetInnerHTML: { __html: crispScript },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 94
        }
      }), this.props.styleTags), _react2.default.createElement('body', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 101
        }
      }, _react2.default.createElement(_document.Main, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 102
        }
      }), _react2.default.createElement(_document.NextScript, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 103
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
              lineNumber: 42
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL19kb2N1bWVudC5qcyJdLCJuYW1lcyI6WyJEb2N1bWVudCIsIkhlYWQiLCJNYWluIiwiTmV4dFNjcmlwdCIsIlNlcnZlclN0eWxlU2hlZXQiLCJpbmplY3RHbG9iYWwiLCJjc3MiLCJwaG9uZSIsIkJBU0VfRk9OVF9TSVpFIiwiQkFTRV9NT0JJTEVfRk9OVF9TSVpFIiwiY3Jpc3BTY3JpcHQiLCJNeURvY3VtZW50IiwiX19odG1sIiwicHJvcHMiLCJzdHlsZVRhZ3MiLCJyZW5kZXJQYWdlIiwic2hlZXQiLCJwYWdlIiwiY29sbGVjdFN0eWxlcyIsImdldFN0eWxlRWxlbWVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxBQUFPLEFBQVksQUFBTSxBQUFNOzs7O0FBQy9CLEFBQVMsQUFBa0IsQUFBYzs7QUFFekMsQUFBUyxBQUFhOztBQUN0QixBQUFTLEFBQWdCLEFBQTZCOzs7Ozs7OztBQUV0RCxvQ0FBQSxBQU1pQixzQ0FNWCxrQkFBQSxBQUFNLDBDQVpaLEFBWU0sQUFDYTs7QUFjbkIsSUFBTSxjQUFOOztJQUlxQixBOzs7Ozs7Ozs7Ozs2QkFVVixBQUNQOzZCQUNFLGNBQUEsVUFBTSxNQUFOLEFBQVc7b0JBQVg7c0JBQUEsQUFDRTtBQURGO09BQUEsa0JBQ0UsQUFBQzs7b0JBQUQ7c0JBQUEsQUFDRTtBQURGO0FBQUEsaURBQ1EsU0FBTixBQUFjO29CQUFkO3NCQURGLEFBQ0UsQUFFQTtBQUZBO2tEQUVNLE1BQU4sQUFBVyxZQUFXLFNBQXRCLEFBQThCO29CQUE5QjtzQkFIRixBQUdFLEFBQ0E7QUFEQTtrREFDTSxXQUFOLEFBQWdCLG1CQUFrQixTQUFsQyxBQUEwQztvQkFBMUM7c0JBSkYsQUFJRSxBQUVBO0FBRkE7MEJBRUEsY0FBQTs7b0JBQUE7c0JBQUE7QUFBQTtBQUFBLFNBTkYsQUFNRSxBQUVBO2NBQUEsQUFDTyxBQUNMO2lCQUZGLEFBRVU7O29CQUZWO3NCQVJGLEFBUUUsQUE4QkE7QUE5QkE7QUFDRTtjQTZCRixBQUNPLEFBQ0w7YUFGRixBQUVNOztvQkFGTjtzQkF0Q0YsQUFzQ0UsQUFLQTtBQUxBO0FBQ0U7Y0FJRixBQUNPLEFBQ0w7aUNBQXlCLEVBQUUsUUFGN0IsQUFFMkIsQUFBVTs7b0JBRnJDO3NCQTNDRixBQTJDRSxBQUtDO0FBTEQ7QUFDRSxlQUlELEFBQUssTUFqRFYsQUFDRSxBQWdEYyxBQUVkLDRCQUFBLGNBQUE7O29CQUFBO3NCQUFBLEFBQ0U7QUFERjtBQUFBLHlCQUNFLEFBQUM7O29CQUFEO3NCQURGLEFBQ0UsQUFDQTtBQURBO0FBQUEsMEJBQ0EsQUFBQzs7b0JBQUQ7c0JBdEROLEFBQ0UsQUFtREUsQUFFRSxBQUlQO0FBSk87QUFBQTs7OzswQ0FoRStCO1VBQWQsQUFBYyxrQkFBZCxBQUFjLEFBQ3JDOztVQUFNLFFBQU4sQUFBYyxBQUFJLEFBQ2xCO1VBQU0sa0JBQWtCLGVBQUE7ZUFBTyxpQkFBQTt1QkFDN0IsQUFBTSw0Q0FBYyxBQUFDLGdDQUFELEFBQVM7O3dCQUFUOzBCQURTLEFBQzdCLEFBQW9CO0FBQUE7QUFBQSxZQUFBLENBQXBCO0FBRHNCO0FBQXhCLEFBQWEsQUFHYixPQUhhO1VBR1AsWUFBWSxNQUFsQixBQUFrQixBQUFNLEFBQ3hCO3dDQUFBLEFBQVksUUFBTSxXQUFsQixBQUNEOzs7OztBQVJxQyxBOztrQkFBbkIsQSIsImZpbGUiOiJfZG9jdW1lbnQuanM/ZW50cnkiLCJzb3VyY2VSb290IjoiL1VzZXJzL21vaGFtbWFkL0RvY3VtZW50cy9kZXYvdGhlcmUvdGhlcmUtd2Vic2l0ZSJ9