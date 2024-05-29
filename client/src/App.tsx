import Editor from './Components/Editor';
import './App.css';
import GameBoard from './Components/GameBoard';
import BoardContext from './Context/BoardContext';

function App() {
  return (
    <BoardContext.Provider value={{ currentPos: { x: 0, y: 0 }}}>
      <div className="page-container">
        <Editor />
        <GameBoard />
      </div>
    </BoardContext.Provider>
  );
}

export default App;
