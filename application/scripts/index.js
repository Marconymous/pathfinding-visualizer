var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const GRID_HEIGHT = 10;
const GRID_WIDTH = 20;
var table = document.getElementById('table');
var cells = [];
var grid;
function setup() {
    for (let y = 0; y < GRID_HEIGHT; y++) {
        let cellRow = [];
        for (let x = 0; x < GRID_WIDTH; x++) {
            cellRow.push({ y: y, x: x, state: 'blank' });
        }
        cells.push(cellRow);
    }
    cells[0][0].state = 'start';
    cells[9][19].state = 'goal';
    printTable();
}
function printTable() {
    for (let y = 0; y < GRID_HEIGHT; y++) {
        let row = document.createElement('tr');
        for (let x = 0; x < GRID_WIDTH; x++) {
            let cell = document.createElement('td');
            cell.classList.add('cell', cells[y][x].state);
            cell.dataset.x = '' + x;
            cell.dataset.y = '' + y;
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
}
function visit() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let y = 0; y < GRID_HEIGHT; y++) {
            for (let x = 0; x < GRID_WIDTH; x++) {
                let cell = document.querySelector('[data-x="' + x + '"][data-y="' + y + '"]');
                if (cell.classList.contains('blank')) {
                    cell.classList.remove('blank');
                    cell.classList.add('visited');
                    yield sleep(100);
                }
            }
        }
    });
}
let foundPaths = [];
function solve() {
    return __awaiter(this, void 0, void 0, function* () {
        let start = document.querySelector('.start');
        let goal = document.querySelector('.goal');
        let grid = [];
        for (let i = 0; i < GRID_HEIGHT; i++) {
            let row = [];
            for (let j = 0; j < GRID_WIDTH; j++) {
                row.push(1);
            }
            grid.push(row);
        }
        findPath(grid, { x: 0, y: 0 }, { x: 19, y: 9 });
        let best;
        for (let i = 0; i < foundPaths.length; i++) {
            if (i == 0)
                best = foundPaths[i];
            else if (best.length > foundPaths[i].length)
                best = foundPaths[i];
        }
        for (let i = 0; i < best.length; i++) {
            let cell = selectCellFromGrid(best[i].x, best[i].y);
            cell.classList.remove('blank');
            cell.classList.add('visited');
            yield sleep(50);
        }
    });
}
var foundPath = false;
function findPath(grid, start, goal) {
    if (foundPath)
        return;
    if (start.x == 19 && start.y == 9) {
        console.log('found goal');
        foundPath = true;
        return;
    }
    let ngh = neighbors(start);
    for (let i = 0; i < ngh.length; i++) {
        findPath(grid, ngh[i], goal);
    }
}
function neighbors(cell) {
    let neighbors = [];
    neighbors.push({ x: cell.x - 1, y: cell.y });
    neighbors.push({ x: cell.x, y: cell.y - 1 });
    neighbors.push({ x: cell.x + 1, y: cell.y });
    neighbors.push({ x: cell.x, y: cell.y + 1 });
    return neighbors;
}
function selectCellFromGrid(x, y) {
    return document.querySelector('[data-x="' + x + '"][data-y="' + y + '"]');
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
setup();
