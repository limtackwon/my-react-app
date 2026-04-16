import React, { useState, useCallback } from 'react';
import { useTetris }       from '../hooks/useTetris';
import TetrisBoard         from '../components/TetrisBoard';
import NextPieceDisplay    from '../components/NextPieceDisplay';
import ScorePanel          from '../components/ScorePanel';
import Leaderboard         from '../components/Leaderboard';
import NicknameModal       from '../components/NicknameModal';
import { GAME_STATES }     from '../game/constants';
import { submitScore }     from '../api/scoreApi';

export default function TetrisPage() {
  const game = useTetris();
  const [username,    setUsername]    = useState(null);
  const [lbRefresh,   setLbRefresh]   = useState(0);
  const [submitted,   setSubmitted]   = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Called from NicknameModal
  const handleStart = useCallback((name) => {
    setUsername(name);
    setSubmitted(false);
    setSubmitError('');
    game.startGame();
  }, [game]);

  // Submit score after game over
  const handleSubmit = useCallback(() => {
    if (!username || submitted) return;
    submitScore(username, game.score)
      .then(() => {
        setSubmitted(true);
        setLbRefresh(k => k + 1);
      })
      .catch(err => {
        const msg = err.response?.data?.error ?? 'UNKNOWN';
        if (msg === 'USERNAME_TAKEN')
          setSubmitError('That username is taken by another player.');
        else if (msg === 'IP_ALREADY_REGISTERED')
          setSubmitError(`Your IP is already registered as "${err.response.data.existingUsername}".`);
        else
          setSubmitError('Could not save score. Try again.');
      });
  }, [username, game.score, submitted]);

  // Restart: show nickname modal again
  const handleRestart = useCallback(() => {
    setUsername(null);
    setSubmitted(false);
    setSubmitError('');
  }, []);

  const isPlaying  = game.gameState === GAME_STATES.PLAYING || game.gameState === GAME_STATES.LINE_CLEAR;
  const isPaused   = game.gameState === GAME_STATES.PAUSED;
  const isGameOver = game.gameState === GAME_STATES.GAME_OVER;

  return (
    <div className="tetris-page">
      {/* Nickname entry / start screen */}
      {!username && game.gameState === GAME_STATES.IDLE && (
        <NicknameModal onConfirm={handleStart} />
      )}

      <div className="game-layout">
        {/* ── Left panel ─────────────────────────────── */}
        <div className="panel panel--left">
          <ScorePanel
            score={game.score}
            level={game.level}
            lines={game.lines}
            combo={game.combo}
            username={username}
          />
          <NextPieceDisplay pieceType={game.nextPiece} />
          <div className="controls-hint">
            <p>← → Move</p>
            <p>↑ / X  Rotate</p>
            <p>↓  Soft drop</p>
            <p>⎵  Hard drop</p>
            <p>P  Pause</p>
          </div>
        </div>

        {/* ── Center: game board ──────────────────────── */}
        <div className="board-column">
          <TetrisBoard
            board={game.board}
            piece={game.piece}
            rotation={game.rotation}
            pos={game.pos}
            ghost={game.ghost}
            clearedRows={game.clearedRows}
          />

          {/* Pause overlay */}
          {isPaused && (
            <div className="overlay overlay--pause">
              <span>PAUSED</span>
              <button className="overlay-btn" onClick={game.resume}>▶ RESUME</button>
            </div>
          )}

          {/* Game-over overlay */}
          {isGameOver && (
            <div className="overlay overlay--gameover">
              <span className="go-title">GAME OVER</span>
              <span className="go-score">{game.score.toLocaleString()} pts</span>

              {!submitted && !submitError && (
                <button className="overlay-btn overlay-btn--primary" onClick={handleSubmit}>
                  💾 Save Score
                </button>
              )}
              {submitted && (
                <span className="go-saved">Score saved ✓</span>
              )}
              {submitError && (
                <span className="go-error">{submitError}</span>
              )}

              <button className="overlay-btn" onClick={handleRestart}>
                ↺ Play Again
              </button>
            </div>
          )}
        </div>

        {/* ── Right panel ────────────────────────────── */}
        <div className="panel panel--right">
          <Leaderboard
            refreshKey={lbRefresh}
            currentUsername={username}
          />
        </div>
      </div>
    </div>
  );
}
