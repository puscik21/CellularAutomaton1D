// window.addEventListener('load', (event) => {
//     console.log('page is fully loaded');
// });

var context;

window.onload = function() {
    let canvas = document.getElementById("board");
    context = canvas.getContext("2d");
    let SQUARE_SIZE = canvas.height / 5;
    let NUMBER_OF_SQUARES = 5 * 5;

    console.log("Size of each square = " + SQUARE_SIZE + "px");

    drawChessboard();
};

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