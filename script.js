"use strict";

const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = '#000000';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 100;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

canvas.addEventListener('mousedown', (event) => {
    isDrawing = true;
    [lastX , lastY] = [event.offsetX, event.offsetY];
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseout', () => isDrawing = false);
canvas.addEventListener('mouseup', () => isDrawing = false);

function draw(event) {
    if(!isDrawing) {
        return;
    }
    
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    [lastX , lastY] = [event.offsetX, event.offsetY];

    hue++;
    if(hue>=360) {
        hue = 0;
    }

    if(ctx.lineWidth>=100 || ctx.lineWidth<=1) {
        direction = !direction;
    }

    if(direction) {
        ctx.lineWidth++;
    } else {ctx.lineWidth--;};
}
