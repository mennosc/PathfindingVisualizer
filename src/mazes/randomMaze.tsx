import {rows, cols} from '../app'

export const randomMaze = (addWall: (x: number, y: number) => void) : void => {
      for(let i = 0; i < rows; i++) {
          for(let j = 0; j < cols; j++) {
              let r = Math.random();
              if(r > 0.75) {
                  addWall(i, j);
              }
          }
      }
  }