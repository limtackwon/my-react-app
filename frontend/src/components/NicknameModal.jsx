import React, { useState } from 'react';

const RULES = /^[A-Za-z0-9_\-]{2,20}$/;

export default function NicknameModal({ onConfirm }) {
  const [name,  setName]  = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!RULES.test(trimmed)) {
      setError('2–20 chars. Letters, numbers, _ and - only.');
      return;
    }
    onConfirm(trimmed);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h1 className="modal-title">
          <span className="title-t">T</span>
          <span className="title-e">E</span>
          <span className="title-t2">T</span>
          <span className="title-r">R</span>
          <span className="title-i">I</span>
          <span className="title-s">S</span>
        </h1>
        <p className="modal-sub">Enter your nickname to play</p>
        <form className="modal-form" onSubmit={handleSubmit}>
          <input
            className="modal-input"
            type="text"
            placeholder="YourName"
            value={name}
            maxLength={20}
            autoFocus
            onChange={e => { setName(e.target.value); setError(''); }}
          />
          {error && <p className="modal-error">{error}</p>}
          <button
            className="modal-btn"
            type="submit"
            disabled={name.trim().length < 2}
          >
            START GAME
          </button>
        </form>
        <div className="modal-controls">
          <p>← → Move &nbsp;|&nbsp; ↑ / X Rotate CW &nbsp;|&nbsp; Z Rotate CCW</p>
          <p>↓ Soft drop &nbsp;|&nbsp; Space Hard drop &nbsp;|&nbsp; P / Esc Pause</p>
        </div>
      </div>
    </div>
  );
}
