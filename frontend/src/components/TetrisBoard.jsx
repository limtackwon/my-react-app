import React, { useMemo } from 'react';
import { PIECES, getShape } from '../game/tetrominos';
import { BOARD_WIDTH, BOARD_HEIGHT } from '../game/constants';

/**
 * Builds the 20×10 display grid by overlaying ghost → active piece → clear-animation
 * on top of the locked board.
 */
function buildDisplay(board, piece, rotation, pos, ghost, clearedRows) {
  // Deep-copy locked board
  const grid = board.map(row => row.map(cell => cell ? { ...cell, state: 'locked' } : null));

  // Ghost
  if (ghost && piece) {
    const shape = getShape(piece, rotation);
    shape.forEach((row, r) => row.forEach((cell, c) => {
      if (!cell) return;
      const br = ghost.y + r;
      const bc = ghost.x + c;
      if (br >= 0 && br < BOARD_HEIGHT && bc >= 0 && bc < BOARD_WIDTH && !grid[br][bc]) {
        grid[br][bc] = { type: piece, state: 'ghost' };
      }
    }));
  }

  // Active piece (overwrites ghost)
  if (piece) {
    const shape = getShape(piece, rotation);
    shape.forEach((row, r) => row.forEach((cell, c) => {
      if (!cell) return;
      const br = pos.y + r;
      const bc = pos.x + c;
      if (br >= 0 && br < BOARD_HEIGHT && bc >= 0 && bc < BOARD_WIDTH) {
        grid[br][bc] = { type: piece, state: 'active' };
      }
    }));
  }

  // Clear animation rows
  clearedRows.forEach(ri => {
    if (grid[ri]) {
      grid[ri] = grid[ri].map(() => ({ type: 'CLEAR', state: 'clearing' }));
    }
  });

  return grid;
}

function Cell({ cell }) {
  if (!cell) {
    return <div className="t-cell t-cell--empty" />;
  }

  const { type, state } = cell;
  const piece = PIECES[type];
  const color = piece ? piece.color : '#ffffff';
  const glow  = piece ? piece.glow  : 'rgba(255,255,255,0.8)';

  let cls = `t-cell t-cell--${state}`;

  const style =
    state === 'ghost'
      ? { borderColor: color, boxShadow: `inset 0 0 6px ${glow}` }
      : state === 'clearing'
        ? {}
        : {
            background: `linear-gradient(135deg, ${color}dd, ${color}88)`,
            boxShadow: `0 0 8px ${glow}, inset 0 1px 0 rgba(255,255,255,0.3)`,
            borderColor: color,
          };

  return <div className={cls} style={style} />;
}

export default function TetrisBoard({ board, piece, rotation, pos, ghost, clearedRows }) {
  const grid = useMemo(
    () => buildDisplay(board, piece, rotation, pos, ghost, clearedRows),
    [board, piece, rotation, pos, ghost, clearedRows],
  );

  return (
    <div className="t-board-wrap">
      <div className="t-board">
        {grid.map((row, ri) =>
          row.map((cell, ci) => (
            <Cell key={`${ri}-${ci}`} cell={cell} />
          )),
        )}
      </div>
    </div>
  );
}
