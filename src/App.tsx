import { useMemo, useState } from "react";
import Challenge from "./components/Challenge";
import { levels } from "./data/levels";
import { useGameState } from "./hooks/useGameState";
import type { Level } from "./types/game";

type Screen = "intro" | "map" | "level" | "boss" | "complete";

export default function App() {
  const { game, completeLevel, loseLife, addBonus, finishGame, resetGame } = useGameState();
  const [screen, setScreen] = useState<Screen>(game.gameCompleted ? "complete" : "intro");
  const [activeLevel, setActiveLevel] = useState<Level | null>(null);
  const [notice, setNotice] = useState("");

  const unlockedCount = Math.min(levels.length, game.completedLevels.length + 1);
  const allLevelsDone = game.completedLevels.length === levels.length;
  const progress = Math.round((game.completedLevels.length / levels.length) * 100);

  const openLevel = (level: Level) => {
    if (level.id > unlockedCount || game.completedLevels.includes(level.id)) return;
    setActiveLevel(level);
    setNotice("");
    setScreen("level");
  };

  const handleWrong = () => {
    if (game.lives > 0) loseLife();
  };

  const handleLevelSuccess = () => {
    if (!activeLevel) return;
    completeLevel(activeLevel.id, activeLevel.animalName, activeLevel.crystal);
    addBonus(25);
    setNotice(`${activeLevel.animalName} has been rescued!`);
    setScreen("map");
    setActiveLevel(null);
  };

  const startBoss = () => setScreen("boss");

  const bossQuestion = useMemo(() => ({
    question: "What is the most powerful way to protect wildlife?",
    answers: [
      "Protect habitats and make sustainable choices",
      "Keep wild animals as pets",
      "Destroy forests to build more roads"
    ],
    correct: 0
  }), []);

  const [bossAnswer, setBossAnswer] = useState<number | null>(null);

  const checkBoss = () => {
    if (bossAnswer === null) return;
    if (bossAnswer === bossQuestion.correct) {
      finishGame();
      setScreen("complete");
    } else {
      loseLife();
      setBossAnswer(null);
      setNotice("The shadow is still strong. Take a breath and try another answer!");
      setScreen("map");
    }
  };

  const resetAndStart = () => {
    resetGame();
    setActiveLevel(null);
    setNotice("");
    setScreen("intro");
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => setScreen("intro")} aria-label="Go to home">
          <span className="brand-mark">🌎</span>
          <span><strong>WILD<span>QUEST</span></strong><small>ANIMAL KINGDOM RESCUE</small></span>
        </button>
        <div className="top-stats">
          <div className="stat-pill"><span>⭐</span><strong>{game.score}</strong><small>POINTS</small></div>
          <div className="stat-pill"><span>❤️</span><strong>{game.lives}</strong><small>LIVES</small></div>
          <div className="stat-pill"><span>💎</span><strong>{game.crystals.length}</strong><small>CRYSTALS</small></div>
        </div>
      </header>

      <main>
        {screen === "intro" && (
          <section className="hero-screen">
            <div className="hero-copy">
              <div className="eyebrow"><span className="pulse-dot" /> A WORLD NEEDS YOUR HELP</div>
              <h1>Save the<br /><em>Animal</em> Kingdom!</h1>
              <p className="hero-lead">A magical adventure to rescue endangered animals, solve clever puzzles and bring nature back to life.</p>
              <div className="hero-actions">
                <button className="button button-primary big" onClick={() => setScreen("map")}>Start your adventure <span>→</span></button>
                <span className="tiny-note">5 worlds · 5 crystals · 1 big mission</span>
              </div>
              <div className="hero-trust"><span>🌱</span> LEARN · EXPLORE · PROTECT</div>
            </div>
            <div className="hero-art">
              <div className="sun"></div><div className="cloud cloud-one"></div><div className="cloud cloud-two"></div>
              <div className="hill hill-back"></div><div className="hill hill-front"></div>
              <div className="hero-animal tiger">🐯</div><div className="hero-animal elephant">🐘</div><div className="hero-animal turtle">🐢</div>
              <div className="leaf leaf-one">🌿</div><div className="leaf leaf-two">🍃</div>
              <div className="floating-note">OUR PLANET, OUR PROMISE ✨</div>
            </div>
            <div className="intro-bottom">
              <div><strong>5</strong><span>magical worlds</span></div><div><strong>5</strong><span>animals to rescue</span></div><div><strong>1</strong><span>planet to protect</span></div>
            </div>
          </section>
        )}

        {screen === "map" && (
          <section className="map-screen">
            <div className="section-heading">
              <div><div className="eyebrow">YOUR ADVENTURE STARTS HERE</div><h1>Choose your <em>world</em></h1><p>Explore each habitat, solve its mystery and rescue the animal inside.</p></div>
              <div className="progress-card"><div className="progress-top"><strong>YOUR JOURNEY</strong><b>{progress}%</b></div><div className="progress-track"><span style={{ width: `${progress}%` }} /></div><small>{game.completedLevels.length} of 5 worlds restored</small></div>
            </div>
            {notice && <div className="notice">✨ {notice}</div>}
            <div className="world-grid">
              {levels.map((level) => {
                const done = game.completedLevels.includes(level.id);
                const locked = level.id > unlockedCount && !done;
                return (
                  <button key={level.id} className={`world-card ${level.theme} ${locked ? "locked" : ""} ${done ? "done" : ""}`} onClick={() => openLevel(level)} disabled={locked || done}>
                    <div className="world-card-top"><span>WORLD {String(level.id).padStart(2, "0")}</span><span>{done ? "✓ RESTORED" : locked ? "🔒 LOCKED" : "▶ EXPLORE"}</span></div>
                    <div className="world-emoji">{level.emoji}</div>
                    <div className="world-animal">{level.animal}</div>
                    <div className="world-card-info"><small>{level.location}</small><h2>{level.name}</h2><p>{level.subtitle}</p></div>
                    <div className="world-card-bottom"><span>{level.crystal} Crystal</span><span>{done ? "Rescued ✓" : locked ? "Complete previous world" : "Enter world →"}</span></div>
                  </button>
                );
              })}
              <div className={`boss-card ${allLevelsDone ? "available" : ""}`}>
                <div className="boss-icon">🌑</div><div><small>THE FINAL CHALLENGE</small><h2>Extinction Shadow</h2><p>{allLevelsDone ? "All crystals collected. Face the final challenge!" : `${game.crystals.length}/5 crystals collected to unlock.`}</p></div>
                <button className="button button-dark" onClick={startBoss} disabled={!allLevelsDone}> {allLevelsDone ? "Face the shadow →" : "Locked"} </button>
              </div>
            </div>
            <div className="map-footer"><span>🧭 TIP: Complete a world to unlock the next one.</span><button className="text-button" onClick={resetAndStart}>Reset game</button></div>
          </section>
        )}

        {screen === "level" && activeLevel && (
          <section className="level-screen">
            <button className="back-button" onClick={() => setScreen("map")}>← Back to world map</button>
            <div className={`level-banner ${activeLevel.theme}`}>
              <div><div className="eyebrow">WORLD {String(activeLevel.id).padStart(2, "0")} · {activeLevel.location.toUpperCase()}</div><h1>{activeLevel.name}</h1><p>{activeLevel.description}</p></div>
              <div className="level-banner-animal">{activeLevel.animal}</div>
              <span className="banner-emoji">{activeLevel.emoji}</span>
            </div>
            <div className="level-content">
              <div className="mission-side">
                <div className="mission-number">MISSION {activeLevel.id} / 5</div>
                <h2>Rescue mission</h2>
                <p>Complete the challenge to rescue the {activeLevel.animalName.toLowerCase()} and earn a nature crystal.</p>
                <div className="rescue-preview"><span>{activeLevel.animal}</span><div><strong>{activeLevel.animalName}</strong><small>Waiting for your help!</small></div></div>
                <div className="crystal-preview"><span>{activeLevel.crystal}</span><div><strong>Nature crystal</strong><small>Earn it by completing this mission</small></div></div>
              </div>
              <Challenge key={activeLevel.id} challenge={activeLevel.challenge} onSuccess={handleLevelSuccess} onWrong={handleWrong} />
            </div>
          </section>
        )}

        {screen === "boss" && (
          <section className="boss-screen">
            <div className="boss-visual"><div className="boss-orb">🌑</div><span>⚡</span><span>🌪️</span></div>
            <div className="boss-copy">
              <div className="eyebrow">FINAL BOSS · THE LAST TEST</div><h1>Face the <em>Extinction Shadow</em></h1>
              <p>You have restored five habitats and collected all five nature crystals. Use what you learned to bring balance back to the planet.</p>
              <div className="boss-question">
                <small>FINAL QUESTION</small><h2>{bossQuestion.question}</h2>
                {bossQuestion.answers.map((answer, index) => <button key={answer} className={`answer-option ${bossAnswer === index ? "selected" : ""}`} onClick={() => setBossAnswer(index)}>{String.fromCharCode(65 + index)}. {answer}</button>)}
                <button className="button button-primary full" disabled={bossAnswer === null} onClick={checkBoss}>Restore the kingdom <span>→</span></button>
              </div>
              <button className="text-button" onClick={() => setScreen("map")}>← Return to map</button>
            </div>
          </section>
        )}

        {screen === "complete" && (
          <section className="complete-screen">
            <div className="celebration">🎉</div><div className="eyebrow">MISSION COMPLETE</div>
            <h1>You saved the <em>Animal Kingdom!</em></h1>
            <p>Every habitat is shining again. Thanks to you, wildlife has a safer future.</p>
            <div className="completion-stats"><div><strong>{game.score}</strong><span>POINTS</span></div><div><strong>{game.rescuedAnimals.length}</strong><span>ANIMALS RESCUED</span></div><div><strong>{game.crystals.length}</strong><span>CRYSTALS</span></div></div>
            <div className="rescued-row">{levels.map((level) => <span key={level.id} title={level.animalName}>{level.animal}</span>)}</div>
            <button className="button button-primary big" onClick={resetAndStart}>Play again <span>↻</span></button>
          </section>
        )}
      </main>

      <footer className="footer"><span>🌎 WILDQUEST</span><span>Small actions. Big impact.</span><span>MADE FOR CURIOUS EXPLORERS</span></footer>
    </div>
  );
}