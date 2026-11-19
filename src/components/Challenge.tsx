import { useState } from "react";
import type { Challenge as ChallengeData } from "../types/game";

interface Props {
  challenge: ChallengeData;
  onSuccess: () => void;
  onWrong: () => void;
}

export default function Challenge({ challenge, onSuccess, onWrong }: Props) {
  const [selected, setSelected] = useState("");
  const [matched, setMatched] = useState<string[]>([]);
  const [sorting, setSorting] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<"success" | "wrong" | "">("");
  const [showHint, setShowHint] = useState(false);

  const checkQuiz = () => {
    if (challenge.type !== "quiz" || !selected) return;
    if (selected === challenge.answer) {
      setFeedback("success");
    } else {
      setFeedback("wrong");
      onWrong();
    }
  };

  const matchPair = (right: string) => {
    if (challenge.type !== "matching" || matched.includes(right)) return;
    const next = [...matched, right];
    setMatched(next);
    if (next.length === challenge.pairs.length) setFeedback("success");
  };

  const assignSort = (id: string, category: string) => {
    if (challenge.type !== "sorting") return;
    const next = { ...sorting, [id]: category };
    setSorting(next);
    if (Object.keys(next).length === challenge.items.length) {
      const correct = challenge.items.every((item) => next[item.id] === item.category);
      if (correct) setFeedback("success");
      else {
        setFeedback("wrong");
        onWrong();
        setSorting({});
      }
    }
  };

  return (
    <section className="challenge-card">
      <div className="challenge-kicker">YOUR ESCAPE ROOM CHALLENGE</div>
      <h2>{challenge.prompt}</h2>
      <p className="muted">{challenge.description}</p>

      {challenge.type === "quiz" && (
        <div className="option-list">
          {challenge.options.map((option) => (
            <button
              className={`answer-option ${selected === option.id ? "selected" : ""}`}
              key={option.id}
              onClick={() => { setSelected(option.id); setFeedback(""); }}
              disabled={feedback === "success"}
            >
              <span className="option-letter">{option.id.toUpperCase()}</span>
              <span>{option.text}</span>
              <span className="option-check">{selected === option.id ? "✓" : ""}</span>
            </button>
          ))}
          <button className="button button-primary full" onClick={checkQuiz} disabled={!selected || feedback === "success"}>
            Check answer <span>→</span>
          </button>
        </div>
      )}

      {challenge.type === "matching" && (
        <div className="matching-game">
          <p className="mini-label">TAP EACH HABITAT CLUE TO MATCH IT</p>
          {challenge.pairs.map((pair) => (
            <button
              key={pair.right}
              className={`match-row ${matched.includes(pair.right) ? "matched" : ""}`}
              onClick={() => matchPair(pair.right)}
              disabled={matched.includes(pair.right)}
            >
              <span>{pair.left}</span><span className="match-arrow">{matched.includes(pair.right) ? "✓" : "↔"}</span><span>{pair.right}</span>
            </button>
          ))}
          <p className="muted small">For this first version, match the clues in the order shown. A full drag-and-drop matching board can be added in the next iteration.</p>
        </div>
      )}

      {challenge.type === "sorting" && (
        <div className="sorting-game">
          <p className="mini-label">CHOOSE A BIN FOR EACH ITEM</p>
          {challenge.items.map((item) => (
            <div className="sort-row" key={item.id}>
              <strong>{item.label}</strong>
              <div className="sort-actions">
                <button className={sorting[item.id] === "recycle" ? "chosen" : ""} onClick={() => assignSort(item.id, "recycle")}>♻️ Recycle</button>
                <button className={sorting[item.id] === "reduce" ? "chosen" : ""} onClick={() => assignSort(item.id, "reduce")}>🌱 Reduce</button>
              </div>
            </div>
          ))}
          <p className="muted small">{Object.keys(sorting).length} / {challenge.items.length} items sorted</p>
        </div>
      )}

      {showHint && <div className="hint-box">💡 {challenge.hint}</div>}
      <button className="text-button" onClick={() => setShowHint((value) => !value)}>
        {showHint ? "Hide hint" : "Need a hint?"}
      </button>

      {feedback === "wrong" && <div className="feedback wrong">Not quite! Try again. You lost one heart.</div>}
      {feedback === "success" && (
        <div className="success-panel">
          <div className="success-icon">🌟</div>
          <div><strong>Mission accomplished!</strong><p>{challenge.success}</p></div>
          <button className="button button-primary" onClick={onSuccess}>Rescue animal <span>→</span></button>
        </div>
      )}
    </section>
  );
}