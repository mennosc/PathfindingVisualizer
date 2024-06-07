import React, {useState, useEffect} from 'react';
import "./styles/Grid.css";
import {Position, rows, cols, start, end, CellData} from './app';

interface GridProps {
    algorithms: Array<string>;
    algorithm: string;
    walls: Position[];
    weights: Position[];
    visited: Position[];
    setWalls: (positions: Position[]) => void;
    addWall: (x: number, y: number) => void;
    setGrid: React.Dispatch<React.SetStateAction<CellData[][]>>;
    grid: CellData[][];
    clearWalls: (cells: CellData[][]) => void;
    clearWeights: (cells: CellData[][]) => void;
    shortest: Position[];
}

const texts = ["Dijkstra's Algorithm is weighted and guarantees the shortest path!", "A* Search is weighted and guarantees the shortest path!", "Greedy Best-first Search is weighted and does not guarantee the shortest path!", "Breath-first Search is unweighted and guarantees the shortest path!", "Depth-first Search is unweighted and does not guarantee the shortest path!"];  

const Grid : React.FC<GridProps>  = ({algorithms, algorithm, walls, weights, setWalls, addWall, setGrid, grid, clearWalls, clearWeights, visited, shortest}) => {
    const [isMouseDown, setMouseDown] = useState<boolean>(false);
    const [algorithmText, setAlgorithmText] = useState('');

    const initializeGrid = () => {
        const data : CellData[][] = [];
        for(let i = 0; i < rows; i++) {
            const row : CellData[] = [];
            for(let j = 0; j < cols; j++) {
                const isWall : boolean = walls.some(wall => wall.row === i && wall.col === j);
                const isWeight : boolean = weights.some(weight => weight.row === i && weight.col === j);
                const isVisited: boolean = visited.some(node => node.row === i && node.col === j);
                const isShortest: boolean = shortest.some(node => node.row === i && node.col === j);
                const cell: CellData = {
                    isWall: isWall,
                    isWeight: isWeight,
                    isStart: i === start.row && j === start.col,
                    isEnd: i === end.row && j === end.col,
                    isVisited: isVisited,
                    isShortest: isShortest,
                    row: i,
                    col: j,
                };

                row.push(cell);
            }
            data.push(row);
        }

        setGrid(data);
    };

    const handleWallDrag = (row: number, col: number) => {
        if(isMouseDown) {
            addWall(row, col);
            setGrid(prevGrid => {
                const newGrid = prevGrid.map((r, rowIndex) => 
                  r.map((cell, colIndex) => {
                    if (rowIndex === row && colIndex === col) {
                      return { ...cell, isWall: !cell.isWall };
                    }
                    return cell;
                  })
                );
                return newGrid;
              });
        }
      };

    const handleMouseUp = () => {
        setMouseDown(false);
    }

    const handleMouseDown = () => {
        setMouseDown(true);
    }

    const setText = () : void => {
        let index = algorithms.indexOf(algorithm);
        setAlgorithmText(texts[index]);
    }

    useEffect(() => {
        setText();
    }, [algorithm]);

    useEffect(() => {
        initializeGrid();
    }, [walls, weights, visited, shortest]);

    
    const generateTable = () => {
        return grid.map((row, i) => (
            <tr key={i} id={`row ${i}`}>
                {row.map((cell, j) => {
                    let cellClass = '';
                    if(cell.isStart) cellClass = 'start';
                    else if(cell.isEnd) cellClass = 'target';
                    else if(cell.isWall) cellClass = 'wall-node';
                    else if(cell.isWeight) cellClass = 'weight';
                    else if(cell.isVisited) cellClass = 'visited-blue';
                    if(cell.isShortest) cellClass = 'shortest-path';

                    return (
                        <td key={i * cols + j} id={`${i}-${j}`} className={cellClass} onMouseEnter={() => handleWallDrag(i, j)}></td>
                    )
            })}
            </tr>
        ));
    };

    return (
        <div className="grid">
            <div id="algorithm-text">{algorithmText}</div>
            <div className="center" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
                <table id="board" className="table-bordered">
                <tbody>
                    {generateTable()}
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default Grid;