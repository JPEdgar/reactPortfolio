"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _BuildCell = _interopRequireDefault(require("./BuildCell"));

var _GridDetails = require("./GridDetails");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function InitializeGrid() {
  var grid = [];

  for (var i = 0; i < _GridDetails.GridDetails.numCols; i++) {
    grid.push([]);

    for (var j = 0; j < _GridDetails.GridDetails.numRows; j++) {
      grid[i].push((0, _BuildCell["default"])(i, j));
    }
  }

  return grid;
}

var _default = InitializeGrid;
exports["default"] = _default;