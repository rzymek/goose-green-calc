import './app.css';
import { Board } from './board/board.tsx';
import { update } from './state/update.ts';
import { state } from './state/state.tsx';

export function App() {
  return <div>
    <Board
      selectedHex={state.selectedHex}
      selectedCounter={state.selectedCounter}
      onCounterClicked={update(arg => state.selectedCounter = arg)}
      onHexClicked={update(arg => state.selectedHex = arg)}
    />
  </div>;
}

