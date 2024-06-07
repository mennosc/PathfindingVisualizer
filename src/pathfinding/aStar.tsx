import {rows, cols, start, end, CellData, Position, speedOptions}  from '../app';

export const AStar = async(grid: CellData[][], addVisited: (x: number, y: number) => void, addShortest: (x: number, y: number) => void, speed: string, speeds: Array<string>) : Promise<void> => {
    const manhattan = (cell: Position) => {
        return Math.abs(end.row - cell.row) + Math.abs(end.col - cell.col);
    }

    const isValid = (cell: Position) => {
        return cell.row >= 0 && cell.row < rows && cell.col >= 0 && cell.col < cols && !grid[cell.row][cell.col].isWall;
    }

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const AStarHelper = async() : Promise<Position[]> => {
        const openSet: Position[] = [start];
        const closedSet: Position[] = [];
        const cameFrom: {[key: string]: Position | null} = {};
        const gScore: {[key: string]: number} = {};

        for(let i = 0; i < rows; i++) {
            for(let j = 0; j < cols; j++) {
                const cellKey = `${i}-${j}`;
                gScore[cellKey] = Infinity;
            }
        }

        gScore[`${start.row}-${start.col}`] = 0;
    
        while(openSet.length > 0) {
            let current: Position = openSet[0];
            for(let i = 1; i < openSet.length; i++) {
                const currentKey = `${openSet[i].row}-${openSet[i].col}`;
                if(gScore[`${current.row}-${current.col}`] + manhattan(openSet[i]) < gScore[`${current.row}-${current.col}`] + manhattan(current)) {
                    current = openSet[i];
                }
            }

            if(current.row === end.row && current.col === end.col) {
                const path: Position[] = [];
                let currentCell: Position | null = current;
                while(currentCell !== undefined && currentCell !== null) {
                    path.unshift(currentCell);
                    currentCell = cameFrom[`${currentCell.row}-${currentCell.col}`];
                }
                return path;
            }   

            openSet.splice(openSet.indexOf(current), 1);
            closedSet.push(current);
            addVisited(current.row, current.col);
            await delay(speedOptions[speeds.indexOf(speed)]);

            const neighbors: Position[] = [
                {row: current.row - 1, col: current.col },
                {row: current.row + 1, col: current.col },
                {row: current.row, col: current.col - 1},
                {row: current.row, col: current.col + 1},
            ];

            for(const neighbor of neighbors) {
                if(isValid(neighbor)) {
                    const tentativeGScore = gScore[`${current.row}-${current.col}`] + 1;
                    if(closedSet.some(cell => cell.row === neighbor.row && cell.col === neighbor.col)) {
                        continue;
                    }

                    if(!openSet.some(cell => cell.row === neighbor.row && cell.col === neighbor.col)) {
                        openSet.push(neighbor);
                    } else if(tentativeGScore >= gScore[`${neighbor.row}-${neighbor.col}`]) {
                        continue;
                    }

                    cameFrom[`${neighbor.row}-${neighbor.col}`] = current;
                    gScore[`${neighbor.row}-${neighbor.col}`] = tentativeGScore;
                }
            }
        }
        return [];
    }

    const reconstructPath = async(path: Position[]) : Promise<void> => {
        for(let node of path) {
            addShortest(node.row, node.col);
            await delay(speedOptions[speeds.indexOf(speed)]);
        }
    }

    const path: Position[] = await AStarHelper();
    reconstructPath(path);
}