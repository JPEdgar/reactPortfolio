"use strict";

function isSolved(board) {
  if (TestBoard(board)) {
    console.log("everything good");
  } else {
    console.log("there are problems with the board length.  not 3x3");
  }
}

function TestBoard(board) {
  if (board.length === 3) {
    // board length is good.
    board.forEach(function (section) {
      if (section.length !== 3) {
        console.log("section problems");
        return false;
      } else {
        return true;
      }
    });
  }
}

function DoSearch(board) {
  // search rows
  if (board[0][0] === board[0][1] && board[0][1] === board[0][2]) {
    console.log("top row");
  } else if (board[1][0] === board[1][1] && board[1][1] === board[1][2]) {
    console.log("middle row");
  } else if (board[2][0] === board[2][1] && board[2][1] === board[2][2]) {
    console.log("bottom row");
  } // search cols
  else if (board[0][0] === board[1][0] && board[1][0] === board[2][0]) {
      console.log("left col");
    } else if (board[0][1] === board[1][1] && board[1][1] === board[2][1]) {
      console.log("middle col");
    } else if (board[0][2] === board[1][2] && board[1][2] === board[2][2]) {
      console.log("right col");
    } // search diags
    else if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        console.log("back slash");
      } else if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        console.log("forward slash");
      }
}

var a = [0, 1, 0];
var b = [0, 3, 0];
var c = [0, 0, 0];
var board = [a, b, c];
isSolved(board); // console.log(board[0][1]) // [row #] [col #]
//   board.forEach(section => {
//     section.filter(cell => {
//         if (cell !== 0 || cell !== 1 || cell !== 2) {
//             console.log("something's wrong")
//             return false
//         }
//         else {
//             return true
//         }
//     })
//   })
//   DoSearch(board);