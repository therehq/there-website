'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.retinaImage = undefined;

var _styledComponents = require('styled-components');

var retinaImage = exports.retinaImage = function retinaImage(url, ext) {
  var suffix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '@2x';
  return (0, _styledComponents.css)(['background-image:url(', ');@media only screen and (-webkit-min-device-pixel-ratio:1.3),not all,not all,only screen and (min-resolution:125dpi),only screen and (min-resolution:1.3dppx){background-image:url(', ');}'], url + '.' + ext, url + suffix + '.' + ext);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL3JldGluYUltYWdlLmpzIl0sIm5hbWVzIjpbImNzcyIsInJldGluYUltYWdlIiwidXJsIiwiZXh0Iiwic3VmZml4Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsQUFBUyxBQUFULEFBRUE7O0FBQU8sSUFBTSxvQ0FBYyxTQUFkLEFBQWMsWUFBQyxBQUFELEtBQU0sQUFBTixLQUFBO01BQVcsQUFBWCw2RUFBb0IsQUFBcEI7U0FBOEIsQUFBOUIscVBBQ0QsTUFBTSxBQUFOLE1BQVksQUFEWCxLQVFDLE1BQU0sQUFBTixTQUFlLEFBQWYsTUFBcUIsQUFSdEI7QUFBcEIiLCJmaWxlIjoicmV0aW5hSW1hZ2UuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL21vaGFtbWFkL0RvY3VtZW50cy9kZXYvdGhlcmUvdGhlcmUtd2Vic2l0ZSJ9