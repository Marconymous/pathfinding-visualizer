const GRID_HEIGHT = 10;
const GRID_WIDTH = 20;

var table: HTMLElement = document.getElementById('table');
var cells: Cell[][] = [];
var grid: HTMLElement[][];

function setup() {
    for (let y = 0; y < GRID_HEIGHT; y++) {
        let cellRow: Cell[] = [];
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
        let row: HTMLElement = document.createElement('tr');
        for (let x = 0; x < GRID_WIDTH; x++) {
            let cell: HTMLElement = document.createElement('td');
            cell.classList.add('cell', cells[y][x].state);
            cell.dataset.x = '' + x;
            cell.dataset.y = '' + y;
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
}

async function visit() {
    for (let y = 0; y < GRID_HEIGHT; y++) {
        for (let x = 0; x < GRID_WIDTH; x++) {
            let cell: HTMLElement = document.querySelector('[data-x="' + x + '"][data-y="' + y + '"]');
            if (cell.classList.contains('blank')) {
                cell.classList.remove('blank');
                cell.classList.add('visited');
                await sleep(100);
            }
        }
    }
}

let foundPaths: CellLocation[][] = [];

async function solve() {
    let start: HTMLElement = document.querySelector('.start');
    let goal: HTMLElement = document.querySelector('.goal');
    let grid: number[][] = [];

    for (let i = 0; i < GRID_HEIGHT; i++) {
        let row = [];
        for (let j = 0; j < GRID_WIDTH; j++) {
            row.push(1);
        }
        grid.push(row);
    }

    findPath(grid, { x: 0, y: 0 }, { x: 19, y: 9 });

    let best: CellLocation[];
    for (let i = 0; i < foundPaths.length; i++) {
        if (i == 0) best = foundPaths[i];
        else if (best.length > foundPaths[i].length) best = foundPaths[i];
    }

    for (let i = 0; i < best.length; i++) {
        let cell = selectCellFromGrid(best[i].x, best[i].y);
        cell.classList.remove('blank');
        cell.classList.add('visited');
        await sleep(50);
    }
}

var foundPath:boolean = false;

function findPath(grid: number[][], start: CellLocation, goal: CellLocation) {
    if (foundPath) return;

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

function neighbors(cell:CellLocation) {
    let neighbors:CellLocation[] = [];
    neighbors.push({x: cell.x - 1, y: cell.y});
    neighbors.push({x: cell.x, y: cell.y - 1});
    neighbors.push({x: cell.x + 1, y: cell.y});
    neighbors.push({x: cell.x, y: cell.y + 1});

    return neighbors;
}

function selectCellFromGrid(x: number, y: number) {
    return <HTMLElement>document.querySelector('[data-x="' + x + '"][data-y="' + y + '"]');
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

setup();