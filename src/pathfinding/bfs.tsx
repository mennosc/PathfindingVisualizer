import {CellData, s, e, rows, cols, speedOptions} from '../app'

export const bfs = async (grid: CellData[][], addVisited: (x: number, y: number) => void, speed: string, speeds: Array<string>) => {  
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    const queue = [s];
    const visited = new Set();

    while(queue.length) {
        const vertex : CellData = queue.shift() as CellData;

        if(vertex.row == e.row && vertex.col == e.col) {
            return;
        }

        if(!visited.has(vertex)) {
            visited.add(vertex);
            addVisited(vertex.row, vertex.col);
            await delay(speedOptions[speeds.indexOf(speed)]);

            if(vertex.row > 0 && grid[vertex.row - 1][vertex.col].isWall === false) {
                queue.push(grid[vertex.row - 1][vertex.col]);
            }

            if(vertex.col < cols - 1 && grid[vertex.row][vertex.col + 1].isWall === false) {
              queue.push(grid[vertex.row][vertex.col + 1]);
            }

            if(vertex.col > 0 && grid[vertex.row][vertex.col - 1].isWall === false) {
              queue.push(grid[vertex.row][vertex.col - 1]);
            }

            if(vertex.row < rows - 1 && grid[vertex.row + 1][vertex.col].isWall === false) {
                queue.push(grid[vertex.row + 1][vertex.col]);
            }
        }
    }
};