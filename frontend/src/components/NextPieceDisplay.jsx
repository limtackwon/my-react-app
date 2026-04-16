import React from 'react';
import { PIECES, getShape } from '../game/tetrominos';

/**
 * 4×4 preview grid for the upcoming piece.
 */
export default function NextPieceDisplay({ pieceType }) {
  if (!pieceType) return <div className="next-wrap" />;

  const piece = PIECES[pieceType];
  const shape = getShape(pieceType, 0);
  const rows  = shape.length;
  const cols  = shape[0].length;

  // Centre piece in 4×4 grid
  const offsetR = Math.floor((4 - rows) / 2);
  const offsetC = Math.floor((4 - cols) / 2);

  const preview = Array.from({ length: 4 }, (_, r) =>
    Array.from({ length: 4 }, (_, c) => {
      const sr = r - offsetR;
      const sc = c - offsetC;
      return sr >= 0 && sr < rows && sc >= 0 && sc < cols && shape[sr][sc];
    }),
  );

  return (
    <div className="next-wrap">
      <p className="panel-label">NEXT</p>
      <div className="next-grid">
        {preview.map((row, ri) =>
          row.map((filled, ci) => (
            <div
              key={`${ri}-${ci}`}
              className="next-cell"
              style={
                filled
                  ? {
                      background: `linear-gradient(135deg, ${piece.color}dd, ${piece.color}88)`,
                      boxShadow: `0 0 8px ${piece.glow}, inset 0 1px 0 rgba(255,255,255,0.25)`,
                      borderColor: piece.color,
                    }
                  : {}
              }
            />
          )),
        )}
      </div>
    </div>
  );
}
