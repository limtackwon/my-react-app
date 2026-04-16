import React, { useEffect, useState } from 'react';
import { getScores } from '../api/scoreApi';

const MEDALS = ['🥇', '🥈', '🥉'];

export default function Leaderboard({ refreshKey, currentUsername }) {
  const [scores,  setScores]  = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getScores()
      .then(setScores)
      .catch(() => setScores([]))
      .finally(() => setLoading(false));
  }, [refreshKey]);

  return (
    <div className="leaderboard">
      <p className="panel-label">LEADERBOARD</p>
      {loading ? (
        <div className="lb-loading">Loading…</div>
      ) : scores.length === 0 ? (
        <div className="lb-empty">No scores yet.<br />Be the first!</div>
      ) : (
        <ol className="lb-list">
          {scores.map((s, i) => (
            <li
              key={s.id ?? i}
              className={`lb-row${s.username === currentUsername ? ' lb-row--me' : ''}`}
            >
              <span className="lb-rank">
                {i < 3 ? MEDALS[i] : `#${i + 1}`}
              </span>
              <span className="lb-name">{s.username}</span>
              <span className="lb-score">{s.score.toLocaleString()}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
