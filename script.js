const canvas = document.getElementById("tronCanvas");
const ctx = canvas.getContext("2d");

// grid stuff

const gridSize = 75;
const cellSize = canvas.width / gridSize;

function position(number) {
    return number * cellSize;
}

function drawLine(x, y, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = "rgba(0, 0, 0, 0.5)"
    ctx.stroke();
}

for (let i = 0; i < gridSize; i++) {
    drawLine(position(i), 0, position(i), 750);
    drawLine(0, position(i), 750, position(i));
}

// player stuff

let xP1 = position(10);
let yP1 = position(37);
let xP2 = position(65);
let yP2 = position(37);
let directionP1 = "right";
let directionP2 = "left";
let historyP1 = [];
let historyP2 = [];

function drawP1() {
    ctx.beginPath();
    ctx.rect(xP1, yP1, cellSize, cellSize);
    ctx.fillStyle = "#ffb43d";
    ctx.fill();
    ctx.closePath();
}

function drawP2() {
    ctx.beginPath();
    ctx.rect(xP2, yP2, cellSize, cellSize);
    ctx.fillStyle = "#8eb9ff";
    ctx.fill();
    ctx.closePath();
}

// collision detection

function checkCollisionP1() {
    if (historyP2.indexOf(xP1 + " " + yP1) >= 0 || historyP1.indexOf(xP1 + " " + yP1) >= 0) {
        return true;
    }
}

function checkCollisionP2() {
    if (historyP1.indexOf(xP2 + " " + yP2) >= 0 || historyP2.indexOf(xP2 + " " + yP2) >= 0) {
        return true;
    }
}

// reset

function resetGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < gridSize; i++) {
        drawLine(position(i), 0, position(i), 750);
        drawLine(0, position(i), 750, position(i));
    }
    xP1 = position(10);
    yP1 = position(37);
    xP2 = position(65);
    yP2 = position(37);
    directionP1 = "right";
    directionP2 = "left";
    historyP1 = [];
    historyP2 = [];
}

// draw stuff

function draw() {

    drawP1();
    drawP2();

    historyP1.push(xP1 + " " + yP1);
    historyP2.push(xP2 + " " + yP2);

    if (directionP1 == "down") {
        yP1 += position(1);
    }
    if (directionP1 == "right") {
        xP1 += position(1);
    }
    if (directionP1 == "up") {
        yP1 -= position(1);
    }
    if (directionP1 == "left") {
        xP1 -= position(1);
    }

    if (directionP2 == "down") {
        yP2 += position(1);
    }
    if (directionP2 == "right") {
        xP2 += position(1);
    }
    if (directionP2 == "up") {
        yP2 -= position(1);
    }
    if (directionP2 == "left") {
        xP2 -= position(1);
    }

    if (yP1 > canvas.height || xP1 > canvas.width || yP1 < 0 || xP1 < 0) {
        setTimeout(function(){ 
            resetGame();
            alert("GAME OVER, P1");    
        }, 10);
    }
    if (yP2 > canvas.height || xP2 > canvas.width || yP2 < 0 || xP2 < 0) {
        setTimeout(function(){ 
            resetGame();
            alert("GAME OVER, P2");    
        }, 10);
    }

    if (checkCollisionP1()) {
        setTimeout(function(){ 
            resetGame();
            alert("GAME OVER, P1");    
        }, 10);
    }
    if (checkCollisionP2()) {
        setTimeout(function(){ 
            resetGame();
            alert("GAME OVER, P2");    
        }, 10);
    }

}

// key handlers

document.addEventListener("keydown", p1KeyHandler, false);
document.addEventListener("keydown", p2KeyHandler, false);

function p1KeyHandler(e) {
    if (e.keyCode == 39 && directionP1 != "left") {
        directionP1 = "right";
    }
    if (e.keyCode == 37 && directionP1 != "right") {
        directionP1 = "left";
    }
    if (e.keyCode == 40 && directionP1 != "up") {
        directionP1 = "down";
    }
    if (e.keyCode == 38 && directionP1 != "down") {
        directionP1 = "up";
    }
}

function p2KeyHandler(e) {
    if (e.keyCode == 68 && directionP2 != "left") {
        directionP2 = "right";
    }
    if (e.keyCode == 65 && directionP2 != "right") {
        directionP2 = "left";
    }
    if (e.keyCode == 83 && directionP2 != "up") {
        directionP2 = "down";
    }
    if (e.keyCode == 87 && directionP2 != "down") {
        directionP2 = "up";
    }
}

// animation

setInterval(draw, 50);