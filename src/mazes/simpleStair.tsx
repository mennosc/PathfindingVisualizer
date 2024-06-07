import {rows, cols} from '../app';

export const simpleStairPattern = (addWall: (x: number, y: number) => void) : void => {
    let x = 0;
    let y = Math.floor(rows / 2);
    let decrement = true;

    while(x < cols - 1) {
        while(y > 0) {
            addWall(y, x);
            x++;
            if(x == cols) {
                return;
            }
            y--;
        }

        while(y < rows - 2) {
            addWall(y, x);
            x++;
            if(x == cols) {
                return;
            }
            y++;
        }

        while(y > 0) {
            addWall(y, x);
            x++;
            if(x == cols) {
                return;
            }
            y--;
        }

    }
};