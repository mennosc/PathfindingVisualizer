import React, { useState } from 'react';
import Navbar from './navbar';
import Tools from './tools';
import Grid from './grid';

export interface Position {
    row: number;
    col: number;
}

export interface CellData {
    isStart: boolean;
    isEnd: boolean;
    isWall: boolean;
    isWeight: boolean;
    isShortest: boolean;
    isVisited: boolean;
    row: number;
    col: number;
}

export const [rows, cols] = [29, 70];
export const start : Position = {row: 14, col: 20};
export const end : Position = {row: 18, col: 65};
export const s: CellData = {isEnd: false, isStart: true, isShortest: false, isVisited: false, isWall: false, isWeight: false, row: start.row, col: start.col};
export const e: CellData = {isEnd: true, isStart: false, isShortest: false, isVisited: false, isWall: false, isWeight: false, row: end.row, col: end.col};
export const algorithms = ["Dijkstra's Algorithm", "A* Search", "Greedy Best-first Search", "Breadth-first Search", "Depth-first Search"];
export const speedOptions = [100, 50, 2];

const App: React.FC = () => {
    const [algorithm, setAlgorithm] = useState<string>('');
    const [walls, setWalls] = useState<Position[]>([]);
    const [weights, setWeights] = useState<Position[]>([]);
    const [visited, setVisited] = useState<Position[]>([]);
    const [shortest, setShortest] = useState<Position[]>([]);
    const [grid, setGrid] = useState<CellData[][]>([]);

    const handleAlgorithmChange = (algorithm: string) => {
        setAlgorithm(algorithm);
    };

    const addWall = (x: number, y: number) : void => {
        const wall : Position = {row: x, col: y};
        setWalls(prevWalls => [...prevWalls, wall]);
    };

    const addShortest = (x: number, y: number) : void => {
        const node : Position = {row: x, col: y};
        setShortest(prevNodes => [...prevNodes, node]);
    }

    const clearGrid = () : void => {
        setWalls([]);
        setVisited([]);
        setShortest([]);
        setWeights([]);
    };

    const addVisited = (x: number, y: number) : void => {
        const node : Position = {row: x, col: y};
        setVisited(prevNodes => [...prevNodes, node]);
    }

    const addWeight = (x: number, y: number) => {
        const weight : Position = {row: x, col: y};
        setWeights(prevWeights => [...prevWeights, weight]);
    };
    
    const clearWalls = () => {
        setWalls([]);
    }

    const clearWeights = () => {
        setWeights([]);
    }

    const clearPath = () => {
        setShortest([]);
        setVisited([]);
    }

    return (
        <>
        <React.StrictMode>
            <Navbar algorithm={algorithm} onAlgorithmChange={handleAlgorithmChange} clearWalls={clearWalls} clearWeights={clearWeights} addWall={addWall} addWeight={addWeight} grid={grid} addVisited={addVisited} shortest={shortest} addShortest={addShortest} clearGrid={clearGrid} clearPath={clearPath}/>
            <Tools />
            <Grid algorithms={algorithms} algorithm={algorithm} walls={walls} weights={weights} setWalls={setWalls} addWall={addWall} setGrid={setGrid} grid={grid} clearWalls={clearWalls} clearWeights={clearWeights} visited={visited} shortest={shortest}/>
        </React.StrictMode>
    </>
    );
};

export default App;



