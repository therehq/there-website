'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SIDE_PADDINGS = exports.NORMAL_WIDTH = exports.WIDE_WIDTH = undefined;

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _rem = require('../utils/rem');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WIDE_WIDTH = exports.WIDE_WIDTH = 1200;
var NORMAL_WIDTH = exports.NORMAL_WIDTH = 900;
var SIDE_PADDINGS = exports.SIDE_PADDINGS = 25;

var Container = _styledComponents2.default.div.withConfig({
  displayName: 'Container',
  componentId: 'ljtdv5-0'
})(['max-width:', ';margin:0 auto;padding:0 ', 'px;box-sizing:content-box;'], function (p) {
  return p.wide ? (0, _rem.rem)(WIDE_WIDTH) : (0, _rem.rem)(NORMAL_WIDTH);
}, SIDE_PADDINGS);

exports.default = Container;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvQ29udGFpbmVyLmpzIl0sIm5hbWVzIjpbInN0eWxlZCIsInJlbSIsIldJREVfV0lEVEgiLCJOT1JNQUxfV0lEVEgiLCJTSURFX1BBRERJTkdTIiwiQ29udGFpbmVyIiwiZGl2IiwicCIsIndpZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxBQUFPOzs7O0FBRVAsQUFBUyxBQUFXLEFBRXBCOzs7O0FBQU8sSUFBTSxrQ0FBTixBQUFtQixBQUMxQjtBQUFPLElBQU0sc0NBQU4sQUFBcUIsQUFDNUI7QUFBTyxJQUFNLHdDQUFOLEFBQXNCOztBQUU3QixJQUFNLHVDQUFBLEFBQW1CO2VBQW5CO2VBQUE7QUFBQSxDQUFZLDZFQUNILGFBQUE7U0FBTSxFQUFBLEFBQUUsT0FBTyxjQUFULEFBQVMsQUFBSSxjQUFjLGNBQWpDLEFBQWlDLEFBQUk7QUFEOUMsR0FBTixBQUFNLEFBR1MsQUFJZjs7a0JBQUEsQUFBZSIsImZpbGUiOiJDb250YWluZXIuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL21vaGFtbWFkL0RvY3VtZW50cy9kZXYvdGhlcmUvdGhlcmUtd2Vic2l0ZSJ9