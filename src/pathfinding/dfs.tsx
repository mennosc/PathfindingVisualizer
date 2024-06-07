import {CellData, Position, end, start, e, s, cols, rows, speedOptions} from "../app"

export const dfs = async (grid: CellData[][], addVisited: (x: number, y: number) => void, speed: string, speeds: Array<String>) : Promise<void> => {
    let path : Array<CellData> = [];
  
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  
    const isValid = (row: number, col: number) : boolean => {
      return col >= 0 && col < cols && row >= 0 && row < rows && !grid[row][col].isVisited && !grid[row][col].isWall;
    };
  
    const dfsHelper = async (row: number, col: number) : Promise<boolean> => {
      if(row === e.row && col === e.col) {
        path.push({row: row, col: col, isWall: false, isStart: false, isVisited: true, isWeight: false, isEnd: false, isShortest: false});
        return true;
      }
    
      addVisited(row, col);
      grid[row][col].isVisited = true;
      await delay(speedOptions[speeds.indexOf(speed)]);
  
      let x = [0, 0, 1, -1];
      let y = [1, -1, 0, 0];
    
      for(let i = 0; i < 4; i++) {
        let newX = row + x[i];
        let newY = col + y[i];
    
        if(isValid(newX, newY)) {
          if(await dfsHelper(newX, newY)) {
            return true;
          }
          path.pop();
        }
      }
      return false;
    }
  
    await dfsHelper(start.row, start.col);
  }