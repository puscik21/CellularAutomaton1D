/*eslint-env browser*/

window.onload = function() {
    let canvas = document.getElementById("board");
    context = canvas.getContext("2d");
    let SQUARE_SIZE = canvas.height / 5;
    let NUMBER_OF_SQUARES = 5 * 5;

    console.log("Size of each square = " + SQUARE_SIZE + "px");
    // createBoard();
    drawChessboard();
};


function changeText(name) {
	document.getElementById(name).innerHTML = Date();
	document.getElementById(name).style.fontSize = "25px";
	document.getElementById(name).style.color = "red";
	document.getElementById(name).style.backgroundColor = "yellow";
}

//probably to be removed
function addSquare() {
  var square = document.createElement("div");
  var squareArea = document.getElementById("squareArea");
  square.className = "square";
  square.style.left = parseInt(Math.random() * 650) + "px";
  square.style.top = parseInt(Math.random() * 250) + "px";
  square.style.width = "100px";
  square.style.height = "100px";
  square.style.position = "absolute";
  square.style.backgroundColor = getRandomColor();
//  square.onclick = squareClick;
  squareArea.appendChild(square);
}

function getRandomColor() {
    return "#333333";
}

function drawChessboard() {
    const squareSize = 50;
    let canvas = document.getElementById("board");
    context = canvas.getContext("2d");
    for(let i=0; i<8; i++) {
        for(let j=0; j<8; j++) {
            context.fillStyle = ((i+j)%2==0) ? "white":"black";
            let xOffset = j*squareSize;
            let yOffset = i*squareSize;
            context.fillRect(xOffset, yOffset, squareSize, squareSize);
        }
    }
    // draw the border around the chessboard
    context.strokeStyle = "black";
    context.strokeRect(0, 0, squareSize*8, squareSize*8)
}

// alternative board
// function createBoard() {
//     var table = document.createElement("table");
//     for (var i = 1; i < 9; i++) {
//         var tr = document.createElement('tr');
//         for (var j = 1; j < 9; j++) {
//             var td = document.createElement('td');
//             if (i%2 == j%2) {
//                 td.className = "white";
//             } else {
//                 td.className = "black";
//             }
//             tr.appendChild(td);
//         }
//         table.appendChild(tr);
//     }
//     var board = document.getElementById("board2");
//     board.appendChild(table);
//
//     var trs = table.getElementsByTagName("tr")[0];
//     var cellVal = trs.cells[0];
//     cellVal.style.backgroundColor = "yellow";
// }