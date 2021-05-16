var table = document.getElementById('table');
var cells = [];
function setup() {
    for (var y = 0; y < 10; y++) {
        var cellRow = [];
        for (var x = 0; x < 20; x++) {
            cellRow.push({ y: y, x: x, state: 'blank' });
        }
        cells.push(cellRow);
    }
    cells[0][0].state = 'start';
    cells[9][19].state = 'goal';
    setupTable();
}
function setupTable() {
    for (var y = 0; y < 10; y++) {
        var row = document.createElement('tr');
        for (var x = 0; x < 20; x++) {
            var cell = document.createElement('td');
            cell.classList.add('cell', cells[y][x].state);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
}
function start() {
}
setup();
