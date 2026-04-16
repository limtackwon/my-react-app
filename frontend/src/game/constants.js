export const BOARD_WIDTH  = 10;
export const BOARD_HEIGHT = 20;

export const GAME_STATES = {
  IDLE:       'idle',
  PLAYING:    'playing',
  PAUSED:     'paused',
  LINE_CLEAR: 'line_clear',
  GAME_OVER:  'game_over',
};

// Drop interval (ms) per level — level index capped at last entry
export const SPEED_TABLE = [800, 720, 630, 550, 470, 380, 300, 220, 130, 100, 80];

// Scoring multipliers per simultaneous line clear × (level + 1)
export const SCORE_TABLE = [0, 100, 300, 500, 800];

export const LINES_PER_LEVEL = 10;

// Hard-drop bonus: 2 pts per cell dropped
export const HARD_DROP_BONUS = 2;
// Soft-drop bonus: 1 pt per cell
export const SOFT_DROP_BONUS = 1;
