import React, {FC} from 'react';
import "./styles/Tools.css";

const Tools : FC  = () => {
    return (
        <div className="tools">
            <ul className="div">
                <li className="tool-item">
                    <div className="start"></div>
                    Start Node
                </li>
                <li className="tool-item"><div className="target"></div>Target Node</li>
                <li className="tool-item"><div className="object"></div>Bomb Node</li>
                <li className="tool-item"><div className="weight"></div>Weight Node</li>
                <li className="tool-item"><div className="unvisited"></div>Start Node</li>
                <li className="tool-item">
                    <div className="visited-blue"></div>
                    <div className="visited-purple"></div>
                    Visited Nodes
                </li>
                <li className="tool-item"><div className="shortest-path"> </div>Shortest-Path Node</li>
                <li className="tool-item"><div className="wall-node"></div>Wall Node</li>
            </ul>
        </div>
    );
}

export default Tools;