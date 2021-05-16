import React from 'react';
import './Grid.css';

function Grid() {
    let tableContent = React.createElement('tbody');

    for (let i = 0; i < 10; i++) {
        let row = React.createElement('tr', {className: 'row'});
        for (let j = 0; j < 20; j++) {
            let cell = React.createElement('td', {className: 'cell'});
            row.appendChild(cell);
        }
        tableContent.appendChild(row);
    }

    const returnContent = tableContent;

    return (
      <table>
          {returnContent}
      </table>
    );
  }
  
  export default Grid;