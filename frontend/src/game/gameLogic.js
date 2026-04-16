import { PIECES, getShape } from './tetrominos';
import { BOARD_WIDTH, BOARD_HEIGHT, SCORE_TABLE } from './constants';

// ── Board ─────────────────────────────────────────────────────
export const createBoard = () =>
  Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(null));

// ── Collision detection ───────────────────────────────────────
export const isValidPosition = (board, pieceType, rotation, pos) => {
  const shape = getShape(pieceType, rotation);
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (!shape[r][c]) continue;
      const br = pos.y + r;
      const bc = pos.x + c;
      if (br < 0 || br >= BOARD_HEIGHT || bc < 0 || bc >= BOARD_WIDTH) return false;
      if (board[br][bc]) return false;
    }
  }
  return true;
};

// ── Spawn position ────────────────────────────────────────────
export const spawnPos = (pieceType) => {
  const shape = PIECES[pieceType].shapes[0];
  return { x: Math.floor((BOARD_WIDTH - shape[0].length) / 2), y: 0 };
};

// ── Lock piece into board ─────────────────────────────────────
export const lockPiece = (board, pieceType, rotation, pos) => {
  const next  = board.map(row => [...row]);
  const shape = getShape(pieceType, rotation);
  shape.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (cell) next[pos.y + r][pos.x + c] = { type: pieceType };
    });
  });
  return next;
};

// ── Line clearing ─────────────────────────────────────────────
export const clearLines = (board) => {
  const clearedRows = [];
  board.forEach((row, i) => {
    if (row.every(cell => cell !== null)) clearedRows.push(i);
  });
  if (clearedRows.length === 0) return { board, clearedRows: [] };

  const kept  = board.filter((_, i) => !clearedRows.includes(i));
  const empty = Array.from({ length: clearedRows.length }, () => Array(BOARD_WIDTH).fill(null));
  return { board: [...empty, ...kept], clearedRows };
};

// ── Ghost piece ───────────────────────────────────────────────
export const ghostPosition = (board, pieceType, rotation, pos) => {
  let gy = pos.y;
  while (isValidPosition(board, pieceType, rotation, { x: pos.x, y: gy + 1 })) gy++;
  return { x: pos.x, y: gy };
};

// ── Rotation (SRS wall-kicks) ─────────────────────────────────
const KICKS_JLSTZ = [
  // state 0→1, 1→2, 2→3, 3→0  (CW)
  [[0,0],[-1,0],[-1,1],[0,-2],[-1,-2]],
  [[0,0],[1,0],[1,-1],[0,2],[1,2]],
  [[0,0],[1,0],[1,1],[0,-2],[1,-2]],
  [[0,0],[-1,0],[-1,-1],[0,2],[-1,2]],
];
const KICKS_I = [
  [[0,0],[-2,0],[1,0],[-2,-1],[1,2]],
  [[0,0],[-1,0],[2,0],[-1,2],[2,-1]],
  [[0,0],[2,0],[-1,0],[2,1],[-1,-2]],
  [[0,0],[1,0],[-2,0],[1,-2],[-2,1]],
];

export const tryRotate = (board, pieceType, rotation, pos, dir = 1) => {
  const newRot  = (rotation + dir + 4) % 4;
  const kicks   = pieceType === 'I' ? KICKS_I[rotation] : KICKS_JLSTZ[rotation];
  for (const [dx, dy] of kicks) {
    const newPos = { x: pos.x + dx, y: pos.y - dy };
    if (isValidPosition(board, pieceType, newRot, newPos)) {
      return { rotation: newRot, pos: newPos };
    }
  }
  return null;
};

// ── Score calculation ─────────────────────────────────────────
export const calcScore = (linesCleared, level) =>
  (SCORE_TABLE[linesCleared] ?? 0) * (level + 1);
