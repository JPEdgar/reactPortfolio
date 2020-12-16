"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StartNode = exports.CellDetails = exports.GridDetails = void 0;
var GridDetails = {
  numRows: 4,
  numCols: 3,
  cellSize: 40,
  margin: 50
};
exports.GridDetails = GridDetails;
var CellDetails = {
  className: "unvisitedNode",
  xLoc: 0,
  yLoc: 0,
  moveX: 0,
  moveY: 0
};
exports.CellDetails = CellDetails;
var StartNode = {
  className: "startNode",
  xLoc: 1,
  yLoc: 2,
  moveX: 0,
  moveY: 0
};
exports.StartNode = StartNode;