import {s, e, start, end, rows, cols, CellData, Position, speedOptions} from '../app'

const nodeWeight: number = 10;

export const dijkstra = async (grid: CellData[][], addVisited: (x: number, y: number) => void, addShortest: (x: number, y: number) => void, speed: string, speeds: Array<string>) : Promise<void> => {
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  
    const DijkstraHelper = async() : Promise<{[key: string]: string | null}> => {
  
      const distances : {[key: string]: number } = {};
      const visited : Set<string> = new Set();
      const previous : {[key: string]: string | null} = {};
      
      const isValid = (row: number, col: number) : boolean => {
        return row >= 0 && row < rows && col >= 0 && col < cols && !grid[row][col].isWall && !grid[row][col].isVisited && !grid[row][col].isShortest;
      }
      
      for(let i = 0; i < rows; i++) {
        for(let j = 0; j < cols; j++) {
          const key = `${i}-${j}`;
          distances[key] = Infinity;
          previous[key] = null;
        }
      }
  
      distances[`${s.row}-${s.col}`] = 0;
  
      while(true) {
        let minDistance : number = Infinity;
        let minNode : string | null = null;
  
        for(const key in distances) {
          if(!visited.has(key) && distances[key] < minDistance) {
            minDistance = distances[key];
            minNode = key;
          }
        }
  
        if(minNode === null || minDistance === Infinity) break;
        visited.add(minNode);
  
  
        const [row, col] = minNode?.split('-').map(Number);
        addVisited(row, col);
        await delay(speedOptions[speeds.indexOf(speed)]);
  
        if(row === e.row && col === e.col) {
          break;
        }
        
        const neighbors: Position[] = [
          { row: row - 1, col: col },
          { row: row + 1, col: col },
          { row: row, col: col - 1},
          { row: row, col: col + 1},
        ];
  
        for(const neighbor of neighbors) {
          if(isValid(neighbor.row, neighbor.col)) {
            const neighborKey = `${neighbor.row}-${neighbor.col}`;
            let distance = distances[minNode] + (grid[neighbor.row][neighbor.col].isWeight ? nodeWeight : 1);
  
            if(distance < distances[neighborKey]) {
              distances[neighborKey] = distance;
              previous[neighborKey] = minNode;
            }
  
          }
        }
      }
  
      return previous;
    }
  
    const reconstructPath = (previous: {[key: string]: string | null}): Position[] => {
      const path: Position[] = [];
      let currentKey : string | null= `${end.row}-${end.col}`;
  
      while(currentKey !== null) {
        const [row, col] = currentKey.split("-").map(Number);
        path.push({row, col});
  
        if(currentKey === `${start.row}-${start.col}`) break;
  
        currentKey = previous[currentKey];
      }
  
      return path.reverse();
    }
  
    const renderShortestPath = async (path: Position[]) : Promise<void> => {
      for(let node of path) {
        grid[node.row][node.col].isShortest = true;
        grid[node.row][node.col].isVisited = false;
        addShortest(node.row, node.col);
        await delay(speedOptions[speeds.indexOf(speed)]);
      }
    }
  
    const previous: {[key: string]:string | null} = await DijkstraHelper();
    const path = reconstructPath(previous);
    await renderShortestPath(path);
  };