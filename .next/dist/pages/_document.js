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

var heapScript = '\n  window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var r=t.forceSSL||"https:"===document.location.protocol,a=document.createElement("script");a.type="text/javascript",a.async=!0,a.src=(r?"https:":"http:")+"//cdn.heapanalytics.com/js/heap-"+e+".js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(a,n);for(var o=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","removeEventProperty","setEventProperties","track","unsetEventProperty"],c=0;c<p.length;c++)heap[p[c]]=o(p[c])};\n  heap.load("2947346854");\n';

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
          lineNumber: 59
        }
      }, _react2.default.createElement(_document.Head, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 60
        }
      }, _react2.default.createElement('meta', { charSet: 'UTF-8', __source: {
          fileName: _jsxFileName,
          lineNumber: 61
        }
      }), _react2.default.createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1', __source: {
          fileName: _jsxFileName,
          lineNumber: 63
        }
      }), _react2.default.createElement('meta', { httpEquiv: 'X-UA-Compatible', content: 'IE=edge,chrome=1', __source: {
          fileName: _jsxFileName,
          lineNumber: 64
        }
      }), _react2.default.createElement('title', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 66
        }
      }, 'There\u2122 - Work across timezones efficiently'), _react2.default.createElement('meta', {
        name: 'google-site-verification',
        content: 'XKtisJxke0C2Hpeb8rgDk6yPDLRZj3PDR3-UtNZ04Ac',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 68
        }
      }), _react2.default.createElement('link', {
        href: 'https://fonts.googleapis.com/css?family=Playfair+Display:700|Work+Sans:400,600',
        rel: 'stylesheet',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 98
        }
      }), _react2.default.createElement('script', {
        type: 'text/javascript',
        async: true,
        dangerouslySetInnerHTML: { __html: crispScript },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 103
        }
      }), _react2.default.createElement('script', {
        type: 'text/javascript',
        async: true,
        dangerouslySetInnerHTML: { __html: heapScript },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 109
        }
      }), _react2.default.createElement('script', {
        id: 'mcjs',
        async: true,
        dangerouslySetInnerHTML: { __html: mailChimpScript },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 115
        }
      }), this.props.styleTags), _react2.default.createElement('body', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 123
        }
      }, _react2.default.createElement(_document.Main, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 124
        }
      }), _react2.default.createElement(_document.NextScript, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 125
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
              lineNumber: 51
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL19kb2N1bWVudC5qcyJdLCJuYW1lcyI6WyJEb2N1bWVudCIsIkhlYWQiLCJNYWluIiwiTmV4dFNjcmlwdCIsIlNlcnZlclN0eWxlU2hlZXQiLCJpbmplY3RHbG9iYWwiLCJjc3MiLCJwaG9uZSIsIkJBU0VfRk9OVF9TSVpFIiwiQkFTRV9NT0JJTEVfRk9OVF9TSVpFIiwiY3Jpc3BTY3JpcHQiLCJtYWlsQ2hpbXBTY3JpcHQiLCJoZWFwU2NyaXB0IiwiTXlEb2N1bWVudCIsIl9faHRtbCIsInByb3BzIiwic3R5bGVUYWdzIiwicmVuZGVyUGFnZSIsInNoZWV0IiwicGFnZSIsImNvbGxlY3RTdHlsZXMiLCJnZXRTdHlsZUVsZW1lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTyxBQUFZLEFBQU0sQUFBTTs7OztBQUMvQixBQUFTLEFBQWtCLEFBQWM7O0FBRXpDLEFBQVMsQUFBYTs7QUFDdEIsQUFBUyxBQUFnQixBQUE2Qjs7Ozs7Ozs7QUFFdEQsb0NBQUEsQUFNaUIsc0NBTVgsa0JBQUEsQUFBTSwwQ0FaWixBQVlNLEFBQ2E7O0FBY25CLElBQU0sY0FBTjs7QUFJQSxJQUFNLGtCQUFOOztBQUlBLElBQU0sYUFBTjs7SUFLcUIsQTs7Ozs7Ozs7Ozs7NkJBVVYsQUFDUDs2QkFDRSxjQUFBLFVBQU0sTUFBTixBQUFXO29CQUFYO3NCQUFBLEFBQ0U7QUFERjtPQUFBLGtCQUNFLEFBQUM7O29CQUFEO3NCQUFBLEFBQ0U7QUFERjtBQUFBLGlEQUNRLFNBQU4sQUFBYztvQkFBZDtzQkFERixBQUNFLEFBRUE7QUFGQTtrREFFTSxNQUFOLEFBQVcsWUFBVyxTQUF0QixBQUE4QjtvQkFBOUI7c0JBSEYsQUFHRSxBQUNBO0FBREE7a0RBQ00sV0FBTixBQUFnQixtQkFBa0IsU0FBbEMsQUFBMEM7b0JBQTFDO3NCQUpGLEFBSUUsQUFFQTtBQUZBOzBCQUVBLGNBQUE7O29CQUFBO3NCQUFBO0FBQUE7QUFBQSxTQU5GLEFBTUUsQUFFQTtjQUFBLEFBQ08sQUFDTDtpQkFGRixBQUVVOztvQkFGVjtzQkFSRixBQVFFLEFBOEJBO0FBOUJBO0FBQ0U7Y0E2QkYsQUFDTyxBQUNMO2FBRkYsQUFFTTs7b0JBRk47c0JBdENGLEFBc0NFLEFBS0E7QUFMQTtBQUNFO2NBSUYsQUFDTyxBQUNMO2VBRkYsQUFHRTtpQ0FBeUIsRUFBRSxRQUg3QixBQUcyQixBQUFVOztvQkFIckM7c0JBM0NGLEFBMkNFLEFBTUE7QUFOQTtBQUNFO2NBS0YsQUFDTyxBQUNMO2VBRkYsQUFHRTtpQ0FBeUIsRUFBRSxRQUg3QixBQUcyQixBQUFVOztvQkFIckM7c0JBakRGLEFBaURFLEFBTUE7QUFOQTtBQUNFO1lBS0YsQUFDSyxBQUNIO2VBRkYsQUFHRTtpQ0FBeUIsRUFBRSxRQUg3QixBQUcyQixBQUFVOztvQkFIckM7c0JBdkRGLEFBdURFLEFBTUM7QUFORDtBQUNFLGVBS0QsQUFBSyxNQTlEVixBQUNFLEFBNkRjLEFBRWQsNEJBQUEsY0FBQTs7b0JBQUE7c0JBQUEsQUFDRTtBQURGO0FBQUEseUJBQ0UsQUFBQzs7b0JBQUQ7c0JBREYsQUFDRSxBQUNBO0FBREE7QUFBQSwwQkFDQSxBQUFDOztvQkFBRDtzQkFuRU4sQUFDRSxBQWdFRSxBQUVFLEFBSVA7QUFKTztBQUFBOzs7OzBDQTdFK0I7VUFBZCxBQUFjLGtCQUFkLEFBQWMsQUFDckM7O1VBQU0sUUFBTixBQUFjLEFBQUksQUFDbEI7VUFBTSxrQkFBa0IsZUFBQTtlQUFPLGlCQUFBO3VCQUM3QixBQUFNLDRDQUFjLEFBQUMsZ0NBQUQsQUFBUzs7d0JBQVQ7MEJBRFMsQUFDN0IsQUFBb0I7QUFBQTtBQUFBLFlBQUEsQ0FBcEI7QUFEc0I7QUFBeEIsQUFBYSxBQUdiLE9BSGE7VUFHUCxZQUFZLE1BQWxCLEFBQWtCLEFBQU0sQUFDeEI7d0NBQUEsQUFBWSxRQUFNLFdBQWxCLEFBQ0Q7Ozs7O0FBUnFDLEE7O2tCQUFuQixBIiwiZmlsZSI6Il9kb2N1bWVudC5qcz9lbnRyeSIsInNvdXJjZVJvb3QiOiIvVXNlcnMvbW9oYW1tYWQvRG9jdW1lbnRzL2Rldi90aGVyZS90aGVyZS13ZWJzaXRlIn0=