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
    grid = await createGridFromElements();

    searchNeighbors(+start.dataset.x, +start.dataset.y, []);

    await sleep(5000);

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

let checkedPositions: CellLocation[] = [];

function searchNeighbors(x: number, y: number, path: CellLocation[]) {
    path = [...path];
    let foundLeft: boolean = false;
    let foundUp: boolean = false;
    let foundRight: boolean = false;
    let foundDown: boolean = false;

    let alrdyChecked = false;

    for (let i = 0; i < checkedPositions.length; i++) {
        if (checkedPositions[i].x == x && checkedPositions[i].y == y) alrdyChecked = true;
    }

    if (alrdyChecked || x < 0 || x >= GRID_WIDTH || y >= GRID_HEIGHT || y < 0) return;

    for (let i: number = 0; i < path.length; i++) {
        let loc: CellLocation = path[i];

        if (x + 1 == loc.x && y == loc.y) foundRight = true;
        if (x - 1 == loc.x && y == loc.y) foundLeft = true;
        if (x == loc.x && y + 1 == loc.y) foundDown = true;
        if (x + 1 == loc.x && y - 1 == loc.y) foundUp = true;
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

async function createGridFromElements() {
    let grid: HTMLElement[][] = [];

    for (let y: number = 0; y < GRID_HEIGHT; y++) {
        let row: HTMLElement[] = [];
        for (let x: number = 0; x < GRID_WIDTH; x++) {
            row.push(selectCellFromGrid(y, x));
        }
        grid.push(row);
    }

    return grid;
}

function selectCellFromGrid(x: number, y: number) {
    return <HTMLElement>document.querySelector('[data-x="' + x + '"][data-y="' + y + '"]');
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

setup();