let table: HTMLElement = document.getElementById('table');
var cells: Cell[][] = [];

function setup() {
    for (let y = 0; y < 10; y++) {
        let cellRow: Cell[] = [];
        for (let x = 0; x < 20; x++) {
            cellRow.push({ y: y, x: x, state: 'blank' });
        }
        cells.push(cellRow);
    }

    cells[0][0].state = 'start';
    cells[9][19].state = 'goal';

    setupTable();
}

function setupTable() {
    for (let y = 0; y < 10; y++) {
        let row: HTMLElement = document.createElement('tr');
        for (let x = 0; x < 20; x++) {
            let cell: HTMLElement = document.createElement('td');
            cell.classList.add('cell', cells[y][x].state);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
}

function start() {
    
}

setup();