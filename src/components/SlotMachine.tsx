import React, { useState, useRef } from "react";
import "../styles/styles.css";

const symbols: string[] = ["🍒", "7️⃣", "🍋", "🍉", "🍇", "🍓"];

const SlotMachine: React.FC = () => {
  const [reels, setReels] = useState<string[]>([
    symbols[0],
    symbols[1],
    symbols[2],
  ]);
  const [spinning, setSpinning] = useState<boolean>(false);
  const [winning, setWinning] = useState<boolean>(false);
  const stopRef = useRef<boolean>(false); // for stopping
  const spinCount: number = 20;

  const spinReels = () => {
    setSpinning(true);
    stopRef.current = false; // Resetting

    let spins = 0; // tracking spins

    const spinInterval = setInterval(() => {
      const newReels = [
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
      ];
      setReels(newReels);
      spins++;

      // Checking the stop
      if (stopRef.current || spins > spinCount) {
        clearInterval(spinInterval);
        setSpinning(false);

        if (newReels.every((symbol) => symbol === newReels[0])) {
          setWinning(true);
        } else {
          setWinning(false);
        }
      }
    }, 100); // Spinning speed control

    setTimeout(() => {
      stopRef.current = true;
    }, spinCount * 100); // Control spinning duration
  };

  const stopReels = () => {
    stopRef.current = true; // using ref to stop spinning manually
  };

  return (
    <div className="slot-machine">
      {winning && <div className="win-message">You won the Jackpot!</div>}
      <div className="reels">
        {reels.map((symbol, index) => (
          <div
            className={`reel ${spinning ? "spin" : ""} ${
              winning ? "winAnimation" : ""
            } `}
            key={index}
          >
            {symbol}
          </div>
        ))}
      </div>
      <div className="button-container">
        <button className="spin-button" onClick={spinReels} disabled={spinning}>
          {spinning ? "Spinning..." : "Spin"}
        </button>
        <button
          className="stop-button"
          onClick={stopReels}
          disabled={!spinning}
        >
          Stop
        </button>
      </div>
    </div>
  );
};

export default SlotMachine;
