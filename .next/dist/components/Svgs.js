"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Slack = exports.Triangle = exports.Rect = exports.Circle = exports.LogoType = exports.CornerHandle = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/mohammad/Documents/dev/there/there-website/components/Svgs.js";
var CornerHandle = exports.CornerHandle = function CornerHandle() {
  return _react2.default.createElement("svg", { width: "112", height: "52", viewBox: "0 0 112 52", __source: {
      fileName: _jsxFileName,
      lineNumber: 2
    }
  }, _react2.default.createElement("path", {
    fill: "#EDEDED",
    fillRule: "evenodd",
    d: "M104.5 44.5V0h7v51.5H0v-7h104.5z",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 3
    }
  }));
};

var LogoType = exports.LogoType = function LogoType() {
  return _react2.default.createElement("svg", { width: "192", height: "54", viewBox: "0 0 192 54", __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    }
  }, _react2.default.createElement("path", {
    fill: "#474747",
    fillRule: "evenodd",
    d: "M44.6 53c-2.8 0-4.2-.8-4.2-2.3V2.2C40.4.7 41.8 0 44.6 0h2c2.7 0 4.1.7 4.1 2.2v18.2a14 14 0 0 1 4.3-3.5 12 12 0 0 1 5.6-1.3c3.6 0 6.2 1 8 2.8 1.7 1.8 2.6 4.7 2.6 8.6v23.7c0 1.5-1.4 2.2-4.2 2.2h-2c-2.8 0-4.2-.7-4.2-2.2V28.5c0-2.9-1.5-4.4-4.5-4.4a5 5 0 0 0-3.3 1.3c-1 .8-1.7 1.7-2.3 2.8v22.5c0 1.5-1.4 2.2-4.2 2.2h-2zm-27.2 0c-2.8 0-4.2-.8-4.2-2.3V12.9H2.1c-.7 0-1.3-.2-1.6-.8-.3-.5-.5-1.4-.5-2.7V7.3C0 6 .2 5.2.5 4.6c.3-.5.9-.8 1.6-.8h33.1c.8 0 1.3.3 1.6.8.3.6.5 1.5.5 2.7v2.1c0 1.3-.2 2.2-.5 2.7-.3.6-.8.8-1.6.8H24.1v37.8c0 1.5-1.4 2.2-4.2 2.2h-2.5zm63.3-4.6c3 3.3 7.6 5 13.7 5A29.2 29.2 0 0 0 105 51c1.4-.8 2.1-1.7 2.1-2.8 0-.5-.2-1.1-.6-2-.4-.8-.8-1.6-1.5-2.3-.5-.7-1-1-1.5-1l-1.5.5a42 42 0 0 1-3.4 1.2c-1 .3-2.3.4-3.6.4-2.4 0-4.3-.5-5.6-1.6-1.4-1.1-2.2-3-2.4-5.7h17.8c.5 0 1.2-.5 2.1-1.6 1-1.1 1.5-2 1.5-2.5 0-5.4-1.2-9.7-3.7-13-2.4-3.4-6.2-5-11.4-5-5.3 0-9.5 1.4-12.5 4.5s-4.5 8-4.5 14.5c0 5.9 1.5 10.4 4.5 13.7zM97 25.8c.8 1.2 1.2 3 1.2 5H87c.7-4.6 2.8-7 6.3-7 1.7 0 3 .7 3.8 2zm20.4 27.1c-2.8 0-4.2-.7-4.2-2.2V28.5a39 39 0 0 0-.6-8.4c-.2-.7-.2-1.2-.2-1.5 0-.7 1-1.3 2.8-1.7 1.9-.3 3.6-.5 5-.5.9 0 1.4.3 1.8 1l.7 2 .3 1.5c.9-1.6 2-2.9 3-3.8a7 7 0 0 1 4.6-1.5c1.5 0 2.6.4 3.1 1.2a4 4 0 0 1 1 2.6c0 1-.3 2.2-.7 3.7-.4 1.4-1 2.2-1.5 2.2L131 25l-1.8-.3c-1.3 0-2.4.4-3.4 1.1a9 9 0 0 0-2.2 2.4v22.5c0 1.5-1.4 2.2-4.2 2.2h-2zm22.4-4.5c3 3.3 7.7 5 13.8 5A29.2 29.2 0 0 0 164 51c1.5-.8 2.2-1.7 2.2-2.8 0-.5-.2-1.1-.6-2-.4-.8-.9-1.6-1.5-2.3-.5-.7-1-1-1.5-1l-1.6.5-3.3 1.2c-1.1.3-2.3.4-3.6.4-2.4 0-4.3-.5-5.7-1.6-1.3-1.1-2.1-3-2.3-5.7h17.8c.5 0 1.2-.5 2.1-1.6 1-1.1 1.5-2 1.5-2.5 0-5.4-1.3-9.7-3.7-13-2.5-3.4-6.3-5-11.4-5-5.4 0-9.5 1.4-12.6 4.5-3 3.1-4.5 8-4.5 14.5 0 5.9 1.5 10.4 4.5 13.7zm16.3-22.6c.9 1.2 1.3 3 1.3 5h-11.3c.7-4.6 2.8-7 6.3-7 1.6 0 2.9.7 3.7 2zm28.5-12c.2.2.4.3.7.3h.4c.3 0 .5 0 .7-.3l2-3.5c0-.3.2-.5.3-.6v6.6c0 .3.4.5 1 .5h.5c.6 0 1-.2 1-.5V6.1c0-.4-.4-.6-1-.6h-.9c-.5 0-.8.2-1 .5l-2.7 4.7-.1.3-.2-.3-2.6-4.7c-.2-.3-.5-.5-1-.5h-.9c-.6 0-1 .2-1 .6v10.2c0 .3.4.5 1 .5h.5c.6 0 1-.2 1-.5V9.7l.3.6 2 3.5zm-11 2.5c0 .3.3.5 1 .5h.5c.7 0 1-.2 1-.5V7.7h2.5c.2 0 .3 0 .4-.2l.1-.6v-.5l-.1-.6c0-.2-.2-.2-.4-.2H171c-.1 0-.2 0-.3.2l-.1.6v1.1l.4.2h2.6v8.6z",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    }
  }));
};

var Circle = exports.Circle = function Circle() {
  return _react2.default.createElement("svg", { width: "45", height: "45", viewBox: "0 0 45 45", __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    }
  }, _react2.default.createElement("path", {
    fill: "#78EFFF",
    d: "M45 22.5a22.5 22.5 0 1 1-45 0 22.5 22.5 0 0 1 45 0z",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    }
  }));
};

var Rect = exports.Rect = function Rect() {
  return _react2.default.createElement("svg", { width: "22", height: "44", __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    }
  }, _react2.default.createElement("path", { fill: "#FAEA5A", d: "M0 0h22v44H0V0z", __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    }
  }));
};

var Triangle = exports.Triangle = function Triangle() {
  return _react2.default.createElement("svg", { width: "52", height: "45", __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    }
  }, _react2.default.createElement("path", { fill: "#FFBD70", d: "M30 0l26 45H4L30 0z", __source: {
      fileName: _jsxFileName,
      lineNumber: 38
    }
  }));
};

var Slack = exports.Slack = function Slack() {
  return _react2.default.createElement("svg", { width: "66", height: "66", __source: {
      fileName: _jsxFileName,
      lineNumber: 43
    }
  }, _react2.default.createElement("path", {
    fill: "#2D333A",
    transform: "rotate(-18.5 106.5 -68.2)",
    d: "M9.3 0H0v9h9.3V0z",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44
    }
  }), _react2.default.createElement("path", {
    fill: "#2D333A",
    d: "M63.2 24C56.4 1.1 46.6-4 24 2.7 1.2 9.6-4 19.4 2.8 42 9.6 64.8 19.4 70 42 63.2 64.8 56.4 70 46.6 63.2 24zM51.8 38.5l-4.3 1.5 1.5 4.4c.6 1.8-.4 3.7-2.2 4.3a3.5 3.5 0 0 1-4.3-2.2L41 42.3l-8.8 3 1.5 4.4c.6 1.8-.4 3.8-2.2 4.3a3.5 3.5 0 0 1-4.3-2.2l-1.5-4.3-4.3 1.4a3.5 3.5 0 0 1-4.3-2.2c-.6-1.8.4-3.7 2.2-4.3l4.3-1.4-2.9-8.5-4.3 1.4a3.5 3.5 0 0 1-4.3-2.2c-.6-1.8.4-3.7 2.2-4.3l4.2-1.4-1.4-4.5a3.4 3.4 0 0 1 6.5-2.1l1.4 4.4 8.8-3-1.4-4.4a3.4 3.4 0 0 1 6.5-2.1l1.4 4.4 4.3-1.4a3.4 3.4 0 0 1 2.2 6.5L42.5 25l2.8 8.5 4.3-1.4a3.4 3.4 0 0 1 2.2 6.4z",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49
    }
  }));
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvU3Zncy5qcyJdLCJuYW1lcyI6WyJDb3JuZXJIYW5kbGUiLCJMb2dvVHlwZSIsIkNpcmNsZSIsIlJlY3QiLCJUcmlhbmdsZSIsIlNsYWNrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7Ozs7QUFBTyxJQUFNLHNDQUFlLFNBQWYsQUFBZSxlQUFBO3lCQUMxQixjQUFBLFNBQUssT0FBTCxBQUFXLE9BQU0sUUFBakIsQUFBd0IsTUFBSyxTQUE3QixBQUFxQztnQkFBckM7a0JBQUEsQUFDRTtBQURGO0dBQUE7VUFDRSxBQUNPLEFBQ0w7Y0FGRixBQUVXLEFBQ1Q7T0FIRixBQUdJOztnQkFISjtrQkFGd0IsQUFDMUIsQUFDRTtBQUFBO0FBQ0U7QUFIQyxBQVVQOztBQUFPLElBQU0sOEJBQVcsU0FBWCxBQUFXLFdBQUE7eUJBQ3RCLGNBQUEsU0FBSyxPQUFMLEFBQVcsT0FBTSxRQUFqQixBQUF3QixNQUFLLFNBQTdCLEFBQXFDO2dCQUFyQztrQkFBQSxBQUNFO0FBREY7R0FBQTtVQUNFLEFBQ08sQUFDTDtjQUZGLEFBRVcsQUFDVDtPQUhGLEFBR0k7O2dCQUhKO2tCQUZvQixBQUN0QixBQUNFO0FBQUE7QUFDRTtBQUhDLEFBVVA7O0FBQU8sSUFBTSwwQkFBUyxTQUFULEFBQVMsU0FBQTt5QkFDcEIsY0FBQSxTQUFLLE9BQUwsQUFBVyxNQUFLLFFBQWhCLEFBQXVCLE1BQUssU0FBNUIsQUFBb0M7Z0JBQXBDO2tCQUFBLEFBQ0U7QUFERjtHQUFBO1VBQ0UsQUFDTyxBQUNMO09BRkYsQUFFSTs7Z0JBRko7a0JBRmtCLEFBQ3BCLEFBQ0U7QUFBQTtBQUNFO0FBSEMsQUFTUDs7QUFBTyxJQUFNLHNCQUFPLFNBQVAsQUFBTyxPQUFBO3lCQUNsQixjQUFBLFNBQUssT0FBTCxBQUFXLE1BQUssUUFBaEIsQUFBdUI7Z0JBQXZCO2tCQUFBLEFBQ0U7QUFERjtHQUFBLDBDQUNRLE1BQU4sQUFBVyxXQUFVLEdBQXJCLEFBQXVCO2dCQUF2QjtrQkFGZ0IsQUFDbEIsQUFDRTtBQUFBOztBQUZHLEFBTVA7O0FBQU8sSUFBTSw4QkFBVyxTQUFYLEFBQVcsV0FBQTt5QkFDdEIsY0FBQSxTQUFLLE9BQUwsQUFBVyxNQUFLLFFBQWhCLEFBQXVCO2dCQUF2QjtrQkFBQSxBQUNFO0FBREY7R0FBQSwwQ0FDUSxNQUFOLEFBQVcsV0FBVSxHQUFyQixBQUF1QjtnQkFBdkI7a0JBRm9CLEFBQ3RCLEFBQ0U7QUFBQTs7QUFGRyxBQU1QOztBQUFPLElBQU0sd0JBQVEsU0FBUixBQUFRLFFBQUE7eUJBQ25CLGNBQUEsU0FBSyxPQUFMLEFBQVcsTUFBSyxRQUFoQixBQUF1QjtnQkFBdkI7a0JBQUEsQUFDRTtBQURGO0dBQUE7VUFDRSxBQUNPLEFBQ0w7ZUFGRixBQUVZLEFBQ1Y7T0FIRixBQUdJOztnQkFISjtrQkFERixBQUNFLEFBS0E7QUFMQTtBQUNFO1VBSUYsQUFDTyxBQUNMO09BRkYsQUFFSTs7Z0JBRko7a0JBUGlCLEFBQ25CLEFBTUU7QUFBQTtBQUNFO0FBUkMiLCJmaWxlIjoiU3Zncy5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvbW9oYW1tYWQvRG9jdW1lbnRzL2Rldi90aGVyZS90aGVyZS13ZWJzaXRlIn0=