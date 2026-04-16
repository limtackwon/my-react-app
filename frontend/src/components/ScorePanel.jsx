import React from 'react';

function Stat({ label, value, highlight }) {
  return (
    <div className={`stat-block${highlight ? ' stat-block--highlight' : ''}`}>
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
    </div>
  );
}

export default function ScorePanel({ score, level, lines, combo, username }) {
  return (
    <div className="score-panel">
      {username && (
        <div className="player-tag">
          <span className="player-icon">▶</span>
          <span className="player-name">{username}</span>
        </div>
      )}
      <Stat label="SCORE"  value={score.toLocaleString()} highlight />
      <Stat label="LEVEL"  value={level} />
      <Stat label="LINES"  value={lines} />
      {combo > 1 && (
        <div className="combo-badge">
          COMBO x{combo} <span className="combo-fire">🔥</span>
        </div>
      )}
    </div>
  );
}
