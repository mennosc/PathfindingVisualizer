import {rows, cols} from '../app';

export const recursiveDivision = (addWall: (x: number, y: number) => void) : void => {
    const randomInt = (min: number, max: number) : number => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const addBorder = () : void => {
        for(let i = 0; i < cols; i++) {
          addWall(0, i);
          addWall(rows - 1, i);
        }
      
        for(let i = 0; i < rows; i++) {
          addWall(i, 0);
          addWall(i, cols - 1);
        }
    }
    
    const chooseOrientation = (height: number, width: number) : string => {
        if(height > width) {
          return 'H';
        } else if(width > height) {
          return  'V';
        } else {
          return Math.random() < 0.5 ? 'H' : 'V';
        }
    };
      

    const recursiveDivisionHelper = (startRow: number, endRow: number, startCol: number, endCol: number, orientation: string) : void => {
        if(endRow - startRow < 2 || endCol - startCol < 2) {
          return;
        }
    
        const isHorizontal = (orientation == 'H');
    
        if(isHorizontal) {
          const wallRow = randomInt(startRow + 1, endRow - 1);
          const passageCol = randomInt(startCol + 1, endCol - 1);
          for(let i = startCol; i <= endCol; i++) {
            if(i !== passageCol) {
              addWall(wallRow, i);
            }
          }
          recursiveDivisionHelper(startRow, wallRow - 1, startCol, endCol, chooseOrientation(wallRow - startRow, endCol - startCol));
          recursiveDivisionHelper(wallRow + 1, endRow, startCol, endCol, chooseOrientation(endRow - wallRow, endCol - startCol));
        } else {
          const wallCol = randomInt(startCol + 1, endCol - 1);
          const passageRow = randomInt(startRow + 1, endRow - 1);
          for(let i = startRow; i <= endRow; i++) {
            if(i !== passageRow) {
              addWall(i, wallCol);
            }
          }
    
          recursiveDivisionHelper(startRow, endRow, startCol, wallCol - 1, chooseOrientation(endRow - startRow, wallCol - startCol));
          recursiveDivisionHelper(startRow, endRow, wallCol + 1, endCol, chooseOrientation(endRow - startRow, endCol - wallCol));
   }
}

addBorder();
recursiveDivisionHelper(0, rows - 1, 0, cols - 1, chooseOrientation(rows, cols));

};



  