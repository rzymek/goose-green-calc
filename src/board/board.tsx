import { isDeepEqual } from 'remeda';
import { Counter } from './counter.tsx';
import { Hex } from './hex.tsx';
import { Unit } from './unit.tsx';
import { HexCoordinates } from './hexCoordinates.tsx';
import { UnitOnBoard } from './unitOnBoard.ts';

const hexes: [number, number][] = [
  [2,1],
  [2,2],
  [3,1],
  [3,2],
  [2,3],

];
const counters: [number, number][] = [
  [1, 0],
  [1, 1],
  [1, 2],
  [1, 3],

  [4, 1],
  [4, 2],
  [4, 3],
  [5, 0],
  [5, 1],
  [5, 2],
  [5, 3],
];

export function Board(props: {
  zoom?: number,
  onHexClicked(hex: HexCoordinates): void;
  onCounterClicked(hex: UnitOnBoard): void;
  selectedCounter?: UnitOnBoard,
  selectedHex?: HexCoordinates,
}) {
  const {zoom = 1} = props;
  // const [mode, setMode] = useState<'move' | 'fire'>('move')
  const unit: Unit = {
    mode: 'fire',
    defenceStrength: 5,
    fireStrength: 7,
    id: 'Infantry',
    range: 6,
    steps: 4,
  };
  return <svg
    style={{inset: 0, position: 'absolute'}}
    viewBox={`0 0 ${1000 / zoom} ${1000 / zoom}`}>
    <defs>
      <filter id="solidTextBox" x="0" y="0" width="1" height="1">
        <feFlood flood-color="red" result="bg"/>
        <feMerge>
          <feMergeNode in="bg"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    {hexes.map(([x, y]) =>
      <Hex key={`${x}.${y}`} x={x} y={y}
           onClick={() => props.onHexClicked({x, y})}
           selected={isDeepEqual(props.selectedHex, {x, y})}
      />,
    )}
    {counters.map(([x, y]) =>
      <Counter key={`${x}.${y}`} x={x} y={y} unit={unit}
               selected={isDeepEqual(props.selectedCounter, {x, y, unit})}
               onClick={() => props.onCounterClicked({x, y, unit})}/>,
    )}
  </svg>;
}
