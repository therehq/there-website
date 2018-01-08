'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _polished = require('polished');

var _media = require('../utils/media');

var _Container = require('../components/Container');

var _AppScreenshot = require('../components/AppScreenshot');

var _AppScreenshot2 = _interopRequireDefault(_AppScreenshot);

var _Svgs = require('../components/Svgs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/mohammad/Documents/dev/there/there-website/sections/Hero.js';


var Hero = function Hero() {
  return _react2.default.createElement(Wrapper, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    }
  }, _react2.default.createElement(ContentWrapper, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    }
  }, _react2.default.createElement(Photo, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    }
  }, _react2.default.createElement(_AppScreenshot2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    }
  })), _react2.default.createElement(Texts, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    }
  })));
};

exports.default = Hero;


var Texts = function Texts() {
  return _react2.default.createElement(TextsWrapper, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    }
  }, _react2.default.createElement(IconImage, { src: '/static/there-icon.svg', alt: 'There\u2122 app', __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    }
  }), _react2.default.createElement(LogoTypeWrapper, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    }
  }, _react2.default.createElement(_Svgs.LogoType, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    }
  })), _react2.default.createElement(Description, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    }
  }, 'Your friends & teammates\' time? Ah, There!'), _react2.default.createElement(DownloadSection, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    }
  }, _react2.default.createElement(DownloadButton, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    }
  }, 'Download'), _react2.default.createElement(DownloadNotes, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    }
  }, 'Available for macOS, other platforms soon!')));
};

var Wrapper = _styledComponents2.default.header.withConfig({
  displayName: 'Hero__Wrapper',
  componentId: 'prn8p6-0'
})(['display:grid;grid-template-columns:1fr minmax(auto,', 'px) 1fr;padding-top:70px;', ';'], _Container.WIDE_WIDTH, (0, _media.phone)((0, _styledComponents.css)(['grid-template-columns:1fr;'])));

var ContentWrapper = _styledComponents2.default.div.withConfig({
  displayName: 'Hero__ContentWrapper',
  componentId: 'prn8p6-1'
})(['grid-column:1 / 3;display:flex;', ';'], (0, _media.phone)((0, _styledComponents.css)(['grid-column:1;flex-direction:column;'])));

var Photo = _styledComponents2.default.div.withConfig({
  displayName: 'Hero__Photo',
  componentId: 'prn8p6-2'
})(['flex:0 1 auto;display:flex;flex-direction:row-reverse;overflow:hidden;padding-right:80px;padding-bottom:30px;padding-top:10px;', ';', ';'], (0, _media.mobile)((0, _styledComponents.css)(['padding-right:50px;'])), (0, _media.phone)((0, _styledComponents.css)(['order:2;padding:15px 0;margin-top:90px;'])));

var TextsWrapper = _styledComponents2.default.div.withConfig({
  displayName: 'Hero__TextsWrapper',
  componentId: 'prn8p6-3'
})(['flex:1 0 320px;padding-top:80px;', ';', ';'], (0, _media.mobile)((0, _styledComponents.css)(['padding-top:40px;padding-right:40px;'])), (0, _media.phone)((0, _styledComponents.css)(['padding-top:0;padding-right:40px;padding-left:', 'px;'], _Container.SIDE_PADDINGS)));

var IconImage = _styledComponents2.default.img.withConfig({
  displayName: 'Hero__IconImage',
  componentId: 'prn8p6-4'
})(['display:block;']);

var LogoTypeWrapper = _styledComponents2.default.div.withConfig({
  displayName: 'Hero__LogoTypeWrapper',
  componentId: 'prn8p6-5'
})(['margin-top:40px;', ';'], (0, _media.phone)((0, _styledComponents.css)(['margin-top:30px;'])));

var Description = _styledComponents2.default.p.withConfig({
  displayName: 'Hero__Description',
  componentId: 'prn8p6-6'
})(['margin:25px 0 0 0;color:', ';', ';'], function (p) {
  return p.theme.colors.greyText;
}, (0, _media.phone)((0, _styledComponents.css)(['margin:20px 0 0 0;'])));

var DownloadSection = _styledComponents2.default.div.withConfig({
  displayName: 'Hero__DownloadSection',
  componentId: 'prn8p6-7'
})(['margin-top:70px;display:flex;align-items:center;', ';'], (0, _media.phone)((0, _styledComponents.css)(['margin-top:50px;'])));

var DownloadButton = _styledComponents2.default.button.withConfig({
  displayName: 'Hero__DownloadButton',
  componentId: 'prn8p6-8'
})(['flex:0 0 auto;padding:10px 17px;font-size:20px;font-weight:600;letter-spacing:1.2px;text-transform:uppercase;background:', ';color:', ';border:none;&:hover{background:', ';}'], function (p) {
  return p.theme.colors.lightGreen;
}, function (p) {
  return p.theme.colors.green;
}, function (p) {
  return (0, _polished.darken)(0.1, p.theme.colors.lightGreen);
});

var DownloadNotes = _styledComponents2.default.p.withConfig({
  displayName: 'Hero__DownloadNotes',
  componentId: 'prn8p6-9'
})(['font-size:14px;margin:0 0 0 10px;color:', ';'], function (p) {
  return p.theme.colors.mutedText;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlY3Rpb25zL0hlcm8uanMiXSwibmFtZXMiOlsic3R5bGVkIiwiY3NzIiwiZGFya2VuIiwibW9iaWxlIiwicGhvbmUiLCJXSURFX1dJRFRIIiwiU0lERV9QQURESU5HUyIsIkFwcFNjcmVlbnNob3QiLCJMb2dvVHlwZSIsIkhlcm8iLCJUZXh0cyIsIldyYXBwZXIiLCJoZWFkZXIiLCJDb250ZW50V3JhcHBlciIsImRpdiIsIlBob3RvIiwiVGV4dHNXcmFwcGVyIiwiSWNvbkltYWdlIiwiaW1nIiwiTG9nb1R5cGVXcmFwcGVyIiwiRGVzY3JpcHRpb24iLCJwIiwidGhlbWUiLCJjb2xvcnMiLCJncmV5VGV4dCIsIkRvd25sb2FkU2VjdGlvbiIsIkRvd25sb2FkQnV0dG9uIiwiYnV0dG9uIiwibGlnaHRHcmVlbiIsImdyZWVuIiwiRG93bmxvYWROb3RlcyIsIm11dGVkVGV4dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLEFBQU8sQUFBVTs7OztBQUNqQixBQUFTOztBQUVULEFBQVMsQUFBUSxBQUFhOztBQUM5QixBQUFTLEFBQVksQUFBcUI7O0FBQzFDLEFBQU8sQUFBbUI7Ozs7QUFDMUIsQUFBUyxBQUFnQjs7Ozs7OztBQUV6QixJQUFNLE9BQU8sU0FBUCxBQUFPLE9BQUE7eUJBQ1YsY0FBRDs7Z0JBQUE7a0JBQUEsQUFDRTtBQURGO0FBQUEsR0FBQSxrQkFDRyxjQUFEOztnQkFBQTtrQkFBQSxBQUNFO0FBREY7QUFBQSxxQkFDRyxjQUFEOztnQkFBQTtrQkFBQSxBQUNFO0FBREY7QUFBQSxxQkFDRSxBQUFDOztnQkFBRDtrQkFGSixBQUNFLEFBQ0UsQUFFRjtBQUZFO0FBQUEscUNBRUYsQUFBQzs7Z0JBQUQ7a0JBTk8sQUFDWCxBQUNFLEFBSUU7QUFBQTtBQUFBO0FBTk4sQUFXQTs7a0JBQUEsQUFBZTs7O0FBRWYsSUFBTSxRQUFRLFNBQVIsQUFBUSxRQUFBO3lCQUNYLGNBQUQ7O2dCQUFBO2tCQUFBLEFBQ0U7QUFERjtBQUFBLEdBQUEsZ0NBQ0UsQUFBQyxhQUFVLEtBQVgsQUFBZSwwQkFBeUIsS0FBeEMsQUFBNEM7Z0JBQTVDO2tCQURGLEFBQ0UsQUFDQTtBQURBO3NCQUNDLGNBQUQ7O2dCQUFBO2tCQUFBLEFBQ0U7QUFERjtBQUFBLHFCQUNFLEFBQUM7O2dCQUFEO2tCQUhKLEFBRUUsQUFDRSxBQUVGO0FBRkU7QUFBQSx1QkFFRCxjQUFEOztnQkFBQTtrQkFBQTtBQUFBO0FBQUEsS0FMRixBQUtFLEFBQ0EsZ0VBQUMsY0FBRDs7Z0JBQUE7a0JBQUEsQUFDRTtBQURGO0FBQUEscUJBQ0csY0FBRDs7Z0JBQUE7a0JBQUE7QUFBQTtBQUFBLEtBREYsQUFDRSxBQUNBLDZCQUFDLGNBQUQ7O2dCQUFBO2tCQUFBO0FBQUE7QUFBQSxLQVRRLEFBQ1osQUFNRSxBQUVFO0FBVE47O0FBY0EsSUFBTSxxQ0FBQSxBQUFpQjtlQUFqQjtlQUFBO0FBQUEsQ0FBVSx1RkFBVixBQUVzQyw2QkFJeEMsa0JBQUEsQUFBTSw0QkFOVixBQUFNOztBQVdOLElBQU0sNENBQUEsQUFBd0I7ZUFBeEI7ZUFBQTtBQUFBLENBQWlCLDRDQUluQixrQkFBQSxBQUFNLDRCQUpWLEFBQU07O0FBVU4sSUFBTSxtQ0FBQSxBQUFlO2VBQWY7ZUFBQTtBQUFBLENBQVEsZ0pBV1YsbUJBQUEsQUFBTyw0QkFYTCwwQkFlRixrQkFBQSxBQUFNLDRCQWZWLEFBQU07O0FBc0JOLElBQU0sMENBQUEsQUFBc0I7ZUFBdEI7ZUFBQTtBQUFBLENBQWUsa0RBSWpCLG1CQUFBLEFBQU8sNEJBSkwsMkNBU0Ysa0JBQUEsQUFBTSw4RUFUVixBQUFNLEFBU0YsQUFHZ0I7O0FBSXBCLElBQU0sdUNBQUEsQUFBbUI7ZUFBbkI7ZUFBQTtBQUFBLENBQVksR0FBbEI7O0FBSUEsSUFBTSw2Q0FBQSxBQUF5QjtlQUF6QjtlQUFBO0FBQUEsQ0FBa0IsNkJBR3BCLGtCQUFBLEFBQU0sNEJBSFYsQUFBTTs7QUFRTixJQUFNLHlDQUFBLEFBQXFCO2VBQXJCO2VBQUE7QUFBQSxDQUFjLDBDQUVULGFBQUE7U0FBSyxFQUFBLEFBQUUsTUFBRixBQUFRLE9BQWIsQUFBb0I7QUFGekIsR0FJRixrQkFBQSxBQUFNLDRCQUpWLEFBQU07O0FBU04sSUFBTSw2Q0FBQSxBQUF5QjtlQUF6QjtlQUFBO0FBQUEsQ0FBa0IsNkRBTXBCLGtCQUFBLEFBQU0sNEJBTlYsQUFBTTs7QUFXTixJQUFNLDRDQUFBLEFBQXdCO2VBQXhCO2VBQUE7QUFBQSxDQUFpQixxTEFTUCxhQUFBO1NBQUssRUFBQSxBQUFFLE1BQUYsQUFBUSxPQUFiLEFBQW9CO0FBVDlCLEdBVUssYUFBQTtTQUFLLEVBQUEsQUFBRSxNQUFGLEFBQVEsT0FBYixBQUFvQjtBQVZ6QixHQWNZLGFBQUE7U0FBSyxzQkFBQSxBQUFPLEtBQUssRUFBQSxBQUFFLE1BQUYsQUFBUSxPQUF6QixBQUFLLEFBQTJCO0FBZGxELEFBQU07O0FBa0JOLElBQU0sMkNBQUEsQUFBdUI7ZUFBdkI7ZUFBQTtBQUFBLENBQWdCLG9EQUdYLGFBQUE7U0FBSyxFQUFBLEFBQUUsTUFBRixBQUFRLE9BQWIsQUFBb0I7QUFIL0IsQUFBTSIsImZpbGUiOiJIZXJvLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9tb2hhbW1hZC9Eb2N1bWVudHMvZGV2L3RoZXJlL3RoZXJlLXdlYnNpdGUifQ==