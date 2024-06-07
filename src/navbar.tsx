import React, { useState, useEffect } from 'react';
import './styles/Navbar.css';
import { dijkstra } from './pathfinding/dijkstra';
import { dfs } from './pathfinding/dfs';
import { bfs } from './pathfinding/bfs';
import { simpleStairPattern } from './mazes/simpleStair';
import { randomWeight } from './mazes/randomWeight';
import { randomMaze } from './mazes/randomMaze';
import { recursiveDivision } from './mazes/recursiveDivision';
import { AStar } from './pathfinding/aStar';
import { Greedy } from './pathfinding/greedy';

import {Position, rows, cols, start, end, CellData, s, e, algorithms} from './app';

interface NavbarProps {
  algorithm: string;
  shortest: Position[];
  grid: CellData[][];
  clearGrid: () => void;
  clearWalls: () => void;
  clearWeights: () => void;
  clearPath: () => void;
  addWall: (x: number, y: number) => void;
  addWeight: (x: number, y: number) => void;
  addVisited: (x: number, y: number) => void;
  addShortest: (x: number, y: number) => void;
  onAlgorithmChange: (selectedAlgorithm: string) => void;
}

const mazes = ["Recursive Division", "Basic Random Maze", "Basic Weight Maze", "Simple Stair Pattern"];
const speeds = ["Slow", "Normal", "Fast"];
const visualizeText = ["Dijkstra", "A*", "Greedy", "BFS", "DFS"];

const Navbar: React.FC<NavbarProps> = ({algorithm, onAlgorithmChange, clearWalls, clearWeights, addWall, addWeight, grid, addVisited, shortest, addShortest, clearGrid, clearPath}) => {
  const [maze, setMaze] = useState('');
  const [speed, setSpeed] = useState('Fast');
  const [visualize, setVisualizeText] = useState('Visualize!');

  const handleMazeChange = (maze: string) => {
    setMaze(maze);
    clearGrid();
    if(maze == "Simple Stair Pattern") {
      simpleStairPattern(addWall);
    } else if(maze == "Basic Random Maze") {
      randomMaze(addWall);
    } else if(maze == "Basic Weight Maze") {
      randomWeight(addWeight);
    } else if(maze == "Recursive Division") {
      recursiveDivision(addWall);
    }
  };

const handleAlgorithmChange = () : void => {
  if(algorithm === "Breadth-first Search") {
    bfs(grid, addVisited, speed, speeds);
  } else if(algorithm === "Depth-first Search") {
    dfs(grid, addVisited, speed, speeds);
  } else if(algorithm === "Dijkstra's Algorithm") {
    dijkstra(grid, addVisited, addShortest, speed, speeds);
  } else if(algorithm === "A* Search") {
    console.log("calling astar");
    AStar(grid, addVisited, addShortest, speed, speeds);
  } else {
    Greedy(grid, addVisited, addShortest, speed, speeds);
  }
};

  const handleSpeedChange = (speed: string) => {
    setSpeed(speed);
  }

  useEffect(() => {
    if(algorithm !== "") {
      let index = algorithms.indexOf(algorithm);
      setVisualizeText(`Visualize ${visualizeText[index]}!`);
    }
  });

  const renderAlgorithms = algorithms.map((algorithm, index) => (
    <li key={index}>
      <a className="dropdown-item dropdown-listitem" onClick = {() => onAlgorithmChange(algorithm)} href="#">{algorithm}</a>  
    </li>
  ));

  const renderMazes = mazes.map((maze, index) => (
    <li key={index}>
      <a className="dropdown-item dropdown-listitem" onClick={() => handleMazeChange(maze)} href="#">{maze}</a>
    </li>
  ));

  const renderSpeed = speeds.map((speedOption, index) => (
    <li key={index}>
      <a className="dropdown-item dropdown-listitem" onClick={() => handleSpeedChange(speedOption)}href="#">{speedOption}</a>
    </li>
  ));

  return (
    <div className="navbarDiv">
      <nav className="navbar navbar-inverse">
      <div className="navbar-header">
        <a href="#" onClick={() => window.location.reload()} className="navbar-brand">Pathfinding Visualizer</a>
      </div>
      <ul className="nav list-inline">
        <li className="dropdown mr-100">
          <a className="dropdown-toggle" href="#" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Algorithms</a>
          <ul className="dropdown-menu navbar-inverse" aria-labelledby="dropdownMenuButton">
            {renderAlgorithms}
          </ul>
        </li>
        <li className="dropdown mr-100">
          <a className="dropdown-toggle" href="#" id="dropdownMazeButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Mazes & Patterns</a>
          <ul className="dropdown-menu navbar-inverse" aria-labelledby="dropdownMazeButton">
            {renderMazes}
          </ul>
        </li>
        <li className="nav-btn mr-100"><a href="#">Add Bomb</a></li>
        <li className="visualize mr-100"><a href="#" onClick={() => handleAlgorithmChange()}>{visualize}</a></li>
        <li className="nav-btn mr-100"><a href="#" onClick={() => clearWalls()}>Clear Walls</a></li>
        <li className="nav-btn mr-100"><a href="#" onClick={() => clearWeights()}>Clear Weights</a></li>
        <li className="nav-btn mr-100"><a href="#" onClick={() => clearPath()}>Clear Path</a></li>
        <li className="dropdown mr-100">
          <a className="dropdown-toggle mr-100" href="#" id="dropdownSpeedButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{speed || 'Speed: '}</a>
      
          <ul className="dropdown-menu navbar-inverse" aria-labelledby="dropdownSpeedButton">
            {renderSpeed}
          </ul>
        </li>
      </ul>
      </nav>
    </div>
    );
};

export default Navbar;