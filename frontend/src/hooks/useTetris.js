import { useReducer, useEffect, useCallback, useRef } from 'react';
import {
  createBoard, isValidPosition, lockPiece, clearLines,
  ghostPosition, spawnPos, tryRotate, calcScore,
} from '../game/gameLogic';
import { bagRandomizer } from '../game/tetrominos';
import {
  GAME_STATES, SPEED_TABLE, LINES_PER_LEVEL,
  HARD_DROP_BONUS, SOFT_DROP_BONUS,
} from '../game/constants';

// ─── Action types ────────────────────────────────────────────
const A = {
  START:           'START',
  TICK:            'TICK',
  MOVE:            'MOVE',
  ROTATE:          'ROTATE',
  HARD_DROP:       'HARD_DROP',
  SOFT_DROP:       'SOFT_DROP',
  PAUSE:           'PAUSE',
  RESUME:          'RESUME',
  END_LINE_ANIM:   'END_LINE_ANIM',
};

// ─── Initial state ───────────────────────────────────────────
const initial = {
  board:       createBoard(),
  piece:       null,   // current piece type string
  rotation:    0,
  pos:         { x: 0, y: 0 },
  nextPiece:   null,
  score:       0,
  level:       0,
  lines:       0,
  combo:       0,
  gameState:   GAME_STATES.IDLE,
  clearedRows: [],     // row indices currently flashing
};

// ─── Shared bag generator (lives outside reducer) ────────────
const bag = bagRandomizer();

// ─── Helper: spawn the next piece, check game-over ───────────
function advancePiece(state, board, score, lines, clearedRows, combo) {
  const level      = Math.floor(lines / LINES_PER_LEVEL);
  const nextType   = state.nextPiece;
  const afterType  = bag.next().value;
  const pos        = spawnPos(nextType);

  if (!isValidPosition(board, nextType, 0, pos)) {
    return {
      ...state, board, score, lines, level, combo,
      piece: nextType, rotation: 0, pos,
      nextPiece:  afterType,
      clearedRows,
      gameState: GAME_STATES.GAME_OVER,
    };
  }

  return {
    ...state, board, score, lines, level, combo,
    piece:    nextType,
    rotation: 0,
    pos,
    nextPiece:  afterType,
    clearedRows,
    gameState: clearedRows.length > 0 ? GAME_STATES.LINE_CLEAR : GAME_STATES.PLAYING,
  };
}

// ─── Reducer ─────────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {

    case A.START: {
      const first  = bag.next().value;
      const second = bag.next().value;
      return {
        ...initial,
        board:     createBoard(),
        piece:     first,
        rotation:  0,
        pos:       spawnPos(first),
        nextPiece: second,
        gameState: GAME_STATES.PLAYING,
      };
    }

    case A.TICK: {
      if (state.gameState !== GAME_STATES.PLAYING) return state;
      const newPos = { ...state.pos, y: state.pos.y + 1 };

      // Still has room: just move down
      if (isValidPosition(state.board, state.piece, state.rotation, newPos)) {
        return { ...state, pos: newPos };
      }

      // Land: lock piece, clear lines, score
      const locked          = lockPiece(state.board, state.piece, state.rotation, state.pos);
      const { board, clearedRows } = clearLines(locked);
      const combo           = clearedRows.length > 0 ? state.combo + 1 : 0;
      const comboBonus      = combo > 1 ? 50 * combo * (state.level + 1) : 0;
      const newScore        = state.score + calcScore(clearedRows.length, state.level) + comboBonus;
      const newLines        = state.lines + clearedRows.length;
      return advancePiece(state, board, newScore, newLines, clearedRows, combo);
    }

    case A.SOFT_DROP: {
      if (state.gameState !== GAME_STATES.PLAYING) return state;
      const newPos = { ...state.pos, y: state.pos.y + 1 };
      if (isValidPosition(state.board, state.piece, state.rotation, newPos)) {
        return { ...state, pos: newPos, score: state.score + SOFT_DROP_BONUS };
      }
      return state;
    }

    case A.MOVE: {
      if (state.gameState !== GAME_STATES.PLAYING) return state;
      const newPos = { ...state.pos, x: state.pos.x + action.dx };
      if (isValidPosition(state.board, state.piece, state.rotation, newPos)) {
        return { ...state, pos: newPos };
      }
      return state;
    }

    case A.ROTATE: {
      if (state.gameState !== GAME_STATES.PLAYING) return state;
      const result = tryRotate(state.board, state.piece, state.rotation, state.pos, action.dir);
      if (!result) return state;
      return { ...state, rotation: result.rotation, pos: result.pos };
    }

    case A.HARD_DROP: {
      if (state.gameState !== GAME_STATES.PLAYING) return state;
      const ghost  = ghostPosition(state.board, state.piece, state.rotation, state.pos);
      const drop   = ghost.y - state.pos.y;
      const locked = lockPiece(state.board, state.piece, state.rotation, ghost);
      const { board, clearedRows } = clearLines(locked);
      const combo  = clearedRows.length > 0 ? state.combo + 1 : 0;
      const comboBonus = combo > 1 ? 50 * combo * (state.level + 1) : 0;
      const newScore = state.score
        + drop * HARD_DROP_BONUS
        + calcScore(clearedRows.length, state.level)
        + comboBonus;
      const newLines = state.lines + clearedRows.length;
      return advancePiece(state, board, newScore, newLines, clearedRows, combo);
    }

    case A.PAUSE:
      if (state.gameState === GAME_STATES.PLAYING)
        return { ...state, gameState: GAME_STATES.PAUSED };
      return state;

    case A.RESUME:
      if (state.gameState === GAME_STATES.PAUSED)
        return { ...state, gameState: GAME_STATES.PLAYING };
      return state;

    case A.END_LINE_ANIM:
      return { ...state, clearedRows: [], gameState: GAME_STATES.PLAYING };

    default:
      return state;
  }
}

// ─── Hook ────────────────────────────────────────────────────
export function useTetris() {
  const [state, dispatch] = useReducer(reducer, initial);
  const intervalRef       = useRef(null);

  // Game-tick loop — restarts whenever level or gameState changes
  useEffect(() => {
    clearInterval(intervalRef.current);
    if (state.gameState === GAME_STATES.PLAYING) {
      const speed = SPEED_TABLE[Math.min(state.level, SPEED_TABLE.length - 1)];
      intervalRef.current = setInterval(() => dispatch({ type: A.TICK }), speed);
    }
    return () => clearInterval(intervalRef.current);
  }, [state.gameState, state.level]);

  // Line-clear animation timer (400 ms flash)
  useEffect(() => {
    if (state.gameState === GAME_STATES.LINE_CLEAR) {
      const t = setTimeout(() => dispatch({ type: A.END_LINE_ANIM }), 400);
      return () => clearTimeout(t);
    }
  }, [state.gameState, state.clearedRows]);

  // Keyboard handler
  useEffect(() => {
    const onKey = (e) => {
      switch (e.key) {
        case 'ArrowLeft':  e.preventDefault(); dispatch({ type: A.MOVE, dx: -1 }); break;
        case 'ArrowRight': e.preventDefault(); dispatch({ type: A.MOVE, dx:  1 }); break;
        case 'ArrowDown':  e.preventDefault(); dispatch({ type: A.SOFT_DROP }); break;
        case 'ArrowUp':    e.preventDefault(); dispatch({ type: A.ROTATE, dir:  1 }); break;
        case 'z': case 'Z':                    dispatch({ type: A.ROTATE, dir: -1 }); break;
        case 'x': case 'X':                    dispatch({ type: A.ROTATE, dir:  1 }); break;
        case ' ':          e.preventDefault(); dispatch({ type: A.HARD_DROP }); break;
        case 'p': case 'P': case 'Escape': {
          if (state.gameState === GAME_STATES.PLAYING)       dispatch({ type: A.PAUSE });
          else if (state.gameState === GAME_STATES.PAUSED)   dispatch({ type: A.RESUME });
          break;
        }
        default: break;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [state.gameState]);

  // Ghost position (derived)
  const ghost = state.piece && state.gameState === GAME_STATES.PLAYING
    ? ghostPosition(state.board, state.piece, state.rotation, state.pos)
    : null;

  return {
    ...state,
    ghost,
    startGame:  useCallback(() => dispatch({ type: A.START }),            []),
    pause:      useCallback(() => dispatch({ type: A.PAUSE }),            []),
    resume:     useCallback(() => dispatch({ type: A.RESUME }),           []),
    moveLeft:   useCallback(() => dispatch({ type: A.MOVE, dx: -1 }),     []),
    moveRight:  useCallback(() => dispatch({ type: A.MOVE, dx:  1 }),     []),
    softDrop:   useCallback(() => dispatch({ type: A.SOFT_DROP }),        []),
    rotate:     useCallback((dir=1) => dispatch({ type: A.ROTATE, dir }), []),
    hardDrop:   useCallback(() => dispatch({ type: A.HARD_DROP }),        []),
  };
}
