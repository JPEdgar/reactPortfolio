"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EndNode = exports.StartNode = exports.CellDetails = exports.GridDetails = void 0;
var GridDetails = {
  numRows: 6,
  numCols: 5,
  cellSize: 40,
  margin: 75
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
  xLoc: 3,
  yLoc: 4,
  moveX: 0,
  moveY: 0
};
exports.StartNode = StartNode;
var EndNode = {
  className: "endNode",
  xLoc: 1,
  yLoc: 1,
  moveX: 0,
  moveY: 0
};
exports.EndNode = EndNode;