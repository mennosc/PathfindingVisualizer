import {rows, cols, s, e, start, end, Position, CellData, speedOptions} from '../app';

export const Greedy = async (grid: CellData[][], addVisited: (x: number, y: number) => void, addShortest: (x: number, y: number) => void, speed: string, speeds: Array<string>) : Promise<void> => {
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const manhattan = (x: Position,y: Position) : number => {
        return Math.abs(x.row - y.row) + Math.abs(x.col - y.col);
    };

    const isValid = (cell: Position) => {
        return cell.row >= 0 && cell.row < rows && cell.col >= 0 && cell.col < cols && !grid[cell.row][cell.col].isWall;
    }

    const GreedyHelper = async(): Promise<Position[]> => {
        const openSet: Position[] = [start];
        const cameFrom: {[key: string]: Position | null} = {};
        cameFrom[`${start.row}-${start.col}`] = null;
    
        while(openSet.length > 0) {
            let current: Position | null = null;
            let minDistance = Infinity;
    
            // Find the neighbor with the lowest Manhattan distance to the end
            for (const neighbor of openSet) {
                const distance = manhattan(neighbor, end);
                if (distance < minDistance) {
                    minDistance = distance;
                    current = neighbor;
                }
            }
    
            if (current === null) break; // No valid path found
    
            if (current.row === end.row && current.col === end.col) {
                // Reconstruct the path
                const path: Position[] = [];
                let currentCell : Position | null = current;
                while(currentCell !== null) {
                    path.unshift(currentCell);
                    currentCell = cameFrom[`${currentCell.row}-${currentCell.col}`];
                }
    
                return path;
            }
    
            openSet.splice(openSet.indexOf(current), 1);
    
            const neighbors: Position[] = [
                { row: current.row - 1, col: current.col },
                { row: current.row + 1, col: current.col },
                { row: current.row, col: current.col - 1 },
                { row: current.row, col: current.col + 1 }
            ];
    
            for (const neighbor of neighbors) {
                if (!isValid(neighbor)) {
                    continue;
                }
    
                if (cameFrom[`${neighbor.row}-${neighbor.col}`] !== undefined) {
                    continue;
                }
    
                openSet.push(neighbor);
                addVisited(neighbor.row, neighbor.col);
                grid[neighbor.row][neighbor.col].isVisited = true;
                await delay(speedOptions[speeds.indexOf(speed)]);
                cameFrom[`${neighbor.row}-${neighbor.col}`] = current;
            }
        }
    
        return [];
    }

    const reconstructPath = async(Path: Position[]) : Promise<void> => {
        for(let node of path) {
            addShortest(node.row, node.col);
            await delay(speedOptions[speeds.indexOf(speed)]);
        }
    } 

    const path : Position[] = await GreedyHelper();
    reconstructPath(path);
};
