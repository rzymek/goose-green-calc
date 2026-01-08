import { Unit } from './unit.ts';
import { HexCoordinates } from './hexCoordinates.ts';

export type UnitOnBoard = HexCoordinates & { unit: Unit }