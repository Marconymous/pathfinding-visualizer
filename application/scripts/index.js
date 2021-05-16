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
        grid = yield createGridFromElements();
        searchNeighbors(+start.dataset.x, +start.dataset.y, []);
        yield sleep(5000);
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
let checkedPositions = [];
function searchNeighbors(x, y, path) {
    let foundLeft = false;
    let foundUp = false;
    let foundRight = false;
    let foundDown = false;
    let alrdyChecked = false;
    for (let i = 0; i < checkedPositions.length; i++) {
        if (checkedPositions[i].x == x && checkedPositions[i].y == y)
            alrdyChecked = true;
    }
    if (alrdyChecked || x < 0 || x >= GRID_WIDTH || y >= GRID_HEIGHT || y < 0)
        return;
    for (let i = 0; i < path.length; i++) {
        let loc = path[i];
        if (x + 1 == loc.x && y == loc.y)
            foundRight = true;
        if (x - 1 == loc.x && y == loc.y)
            foundLeft = true;
        if (x == loc.x && y + 1 == loc.y)
            foundDown = true;
        if (x + 1 == loc.x && y - 1 == loc.y)
            foundUp = true;
    }
    console.log('' + foundLeft + '>' + foundUp + '>' + foundRight + '>' + foundDown);
    if (x == 19 && y == 9) {
        foundPaths.push(path);
        return;
    }
    if (!foundLeft) {
        let newPath = [...path];
        newPath.push({ x: x - 1, y: y });
        searchNeighbors(x - 1, y, newPath);
    }
    if (!foundUp) {
        let newPath = [...path];
        newPath.push({ x: x, y: y - 1 });
        searchNeighbors(x, y - 1, newPath);
    }
    if (!foundRight) {
        let newPath = [...path];
        newPath.push({ x: x + 1, y: y });
        searchNeighbors(x + 1, y, newPath);
    }
    if (!foundDown) {
        let newPath = [...path];
        newPath.push({ x: x, y: y + 1 });
        searchNeighbors(x, y + 1, newPath);
    }
    checkedPositions.push({ x: x, y: y });
}
function createGridFromElements() {
    return __awaiter(this, void 0, void 0, function* () {
        let grid = [];
        for (let y = 0; y < GRID_HEIGHT; y++) {
            let row = [];
            for (let x = 0; x < GRID_WIDTH; x++) {
                row.push(selectCellFromGrid(y, x));
            }
            grid.push(row);
        }
        return grid;
    });
}
function selectCellFromGrid(x, y) {
    return document.querySelector('[data-x="' + x + '"][data-y="' + y + '"]');
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
setup();
