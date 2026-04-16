/** All 7 Tetromino pieces with 4 rotation states, color, and glow values. */
export const PIECES = {
  I: {
    shapes: [
      [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
      [[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0]],
      [[0,0,0,0],[0,0,0,0],[1,1,1,1],[0,0,0,0]],
      [[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]],
    ],
    color: '#00f5ff',
    glow:  'rgba(0,245,255,0.9)',
  },
  O: {
    shapes: [
      [[1,1],[1,1]],
      [[1,1],[1,1]],
      [[1,1],[1,1]],
      [[1,1],[1,1]],
    ],
    color: '#ffe600',
    glow:  'rgba(255,230,0,0.9)',
  },
  T: {
    shapes: [
      [[0,1,0],[1,1,1],[0,0,0]],
      [[0,1,0],[0,1,1],[0,1,0]],
      [[0,0,0],[1,1,1],[0,1,0]],
      [[0,1,0],[1,1,0],[0,1,0]],
    ],
    color: '#cc44ff',
    glow:  'rgba(204,68,255,0.9)',
  },
  S: {
    shapes: [
      [[0,1,1],[1,1,0],[0,0,0]],
      [[0,1,0],[0,1,1],[0,0,1]],
      [[0,0,0],[0,1,1],[1,1,0]],
      [[1,0,0],[1,1,0],[0,1,0]],
    ],
    color: '#00ff88',
    glow:  'rgba(0,255,136,0.9)',
  },
  Z: {
    shapes: [
      [[1,1,0],[0,1,1],[0,0,0]],
      [[0,0,1],[0,1,1],[0,1,0]],
      [[0,0,0],[1,1,0],[0,1,1]],
      [[0,1,0],[1,1,0],[1,0,0]],
    ],
    color: '#ff4455',
    glow:  'rgba(255,68,85,0.9)',
  },
  J: {
    shapes: [
      [[1,0,0],[1,1,1],[0,0,0]],
      [[0,1,1],[0,1,0],[0,1,0]],
      [[0,0,0],[1,1,1],[0,0,1]],
      [[0,1,0],[0,1,0],[1,1,0]],
    ],
    color: '#4488ff',
    glow:  'rgba(68,136,255,0.9)',
  },
  L: {
    shapes: [
      [[0,0,1],[1,1,1],[0,0,0]],
      [[0,1,0],[0,1,0],[0,1,1]],
      [[0,0,0],[1,1,1],[1,0,0]],
      [[1,1,0],[0,1,0],[0,1,0]],
    ],
    color: '#ff8800',
    glow:  'rgba(255,136,0,0.9)',
  },
};

export const PIECE_TYPES = Object.keys(PIECES);

export const getShape = (type, rotation) =>
  PIECES[type].shapes[rotation % PIECES[type].shapes.length];

export const getRandomPieceType = () =>
  PIECE_TYPES[Math.floor(Math.random() * PIECE_TYPES.length)];

/**
 * 7-bag randomizer: shuffles all 7 types, then repeats.
 * Returns a generator that yields one type at a time.
 */
export function* bagRandomizer() {
  while (true) {
    const bag = [...PIECE_TYPES].sort(() => Math.random() - 0.5);
    for (const t of bag) yield t;
  }
}
