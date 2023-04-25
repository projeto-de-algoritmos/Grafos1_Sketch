import { GraphAdjList } from './graphAdjList.js';
import { Node } from './node.js';

const GRID_SIZE = 100;

const grid = document.querySelector('.grid');
const graph = new GraphAdjList();
let idCount = 1;

const modes = {
  color: 'color',
  rainbow: 'rainbow',
  eraser: 'eraser',
  fill: 'fill',
};

let mode = modes.color;
/**
 * Creates a row of a grid.
 * @returns The new row.
 */
function createRow () {
  const row = document.createElement('div');
  row.classList.add('grid-row');
  row.classList.add('flex');
  return row;
}
/**
 * Get a square's identifier.
 * @param square The square of interest.
 */
function getSquareId(square){
  return +square.id.split('_')[1];
}
/**
 * Creates a column of a grid.
 * @param row The row in which the column is inserted.
 */
function createColumn (row) {
  const square = document.createElement('div');
  square.setAttribute('id', `sq_${idCount++}`);
  const squareId = getSquareId(square);
  graph.addNode(new Node(squareId, true));
  square.classList.add('square');
  square.classList.add('undraggable');
  square.addEventListener('mouseover', changeSquareColor);
  row.appendChild(square);
}
/**
 * Create a NxN grid.
 * @param size The grid's number of rows and cols.
 */
function createGrid (size) {
  for(let i = 0; i < size; i++){
    const row = createRow();
    for(let j = 0; j < size; j++){
      createColumn(row);
    }
    grid.appendChild(row);
  }
}
/**
 * The following events must be listened to 
 * in order to control if the grid is only being
 * drawn into if the user is moving the mouse while
 * holding it down.
 */
let mouseIsBeingHeld = false;
document.addEventListener('mousedown', () => {
  mouseIsBeingHeld = true;
});
document.addEventListener('mouseup', ()=> {
  mouseIsBeingHeld = false;
});
/**
 * Checks if mouse is being moved and held down.
 * @param event The event that triggers the function.
 */
function mouseIsMovingAndHeldDown (event) {
  if(event.type === 'mouseover' && mouseIsBeingHeld) {
    return true;
  }
}
/**
 * Get a random integer between 
 * 0 and 255.
 */
function getRandomNumber(){ 
  return Math.floor(Math.random() * 1000) % 256;
}
/**
 * Changes the square color.
 * @param event The event that triggers the function.
 * @param mode The mode of painting.
 */
function changeSquareColor (event) {
  if( !mouseIsMovingAndHeldDown(event) ) return;
  if(mode === modes.color){
    event.target.style.backgroundColor = 'black';
  }
  if(mode === modes.rainbow){
    const rgb = `${getRandomNumber()},${getRandomNumber()},${getRandomNumber()}`;
    event.target.style.backgroundColor = `rgb(${rgb})`;
  }
  if(mode === modes.eraser){
    event.target.style.backgroundColor = 'white';
  }
}

createGrid(GRID_SIZE);

const rainbowButton = document.getElementById('rainbow');
const showGridButton = document.getElementById('show-grid');
const fillButton = document.getElementById('fill');
const colorButton = document.getElementById('color');
const eraserButton = document.getElementById('eraser');

rainbowButton.addEventListener('click', () => {
  mode = modes.rainbow;
});

colorButton.addEventListener('click', () => {
  mode = modes.color;
});

eraserButton.addEventListener('click', () => {
  mode = modes.eraser;
});

showGridButton.addEventListener('click', () => {
  const squares = document.getElementsByClassName('square');
  [...squares].forEach(square=>{
    square.classList.toggle('show-tracks');
  });
});