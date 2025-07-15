const draggableDiv = document.getElementById('draggable-div');
let isDragging = false;
let offsetX, offsetY;

draggableDiv.addEventListener('mousedown', (e) => {
    isDragging = true;
    
    offsetX = e.clientX - draggableDiv.offsetLeft;
    offsetY = e.clientY - draggableDiv.offsetTop;
    console.log(offsetX,offsetY);
    
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    draggableDiv.style.left = e.clientX - offsetX + 'px';
    draggableDiv.style.top = e.clientY - offsetY + 'px';
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});