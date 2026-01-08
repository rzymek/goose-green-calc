import { clone } from 'remeda';
import { update } from './update.ts';
import type { HexCoordinates } from '../board/hexCoordinates.ts';
import { UnitOnBoard } from '../board/unitOnBoard.ts';

const initialState = {
  selectedCounter: undefined as (UnitOnBoard | undefined),
  selectedHex: undefined as (HexCoordinates | undefined),
};

export const state: typeof initialState = clone({
  ...initialState,
  ...JSON.parse(localStorage.getItem('state') ?? '{}'),
});

update.onUpdate.push(() => {
  setTimeout(() => {
    localStorage.setItem('state', JSON.stringify(state));
  }, 0);
});

export function resetState() {
  const preserve: Partial<typeof state> = {};
  Object.assign(state, clone(initialState), preserve);
}