import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import "./App.css";
import Die from "./components/Die";

function App() {
  function allNewDice() {
    const dice = [];
    for (let i = 0; i < 10; i++) {
      dice.push({
        id: nanoid(),
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
      });
    }
    return dice;
  }

  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  // Function to flip the isHeld property of the clicked die
  const holdDice = (id) => {
    setDice((oldDice) =>
      oldDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  };

  // Function to roll dice, but not roll any that are being held
  const rollDice = () => {
    if (tenzies) {
      setDice(allNewDice()); // Start a new game
      setTenzies(false);
    } else {
      setDice((oldDice) =>
        oldDice.map((die) =>
          die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
        )
      );
    }
  };

  // Check for winning conditions
  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const allSameValue = dice.every((die) => die.value === dice[0].value);
    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log("You won!");
    }
  }, [dice]);

  const dieElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <>
      <main className="bg-[#dfdcdc] h-[94vh] lg:max-w-lg lg:mx-auto flex items-center flex-col justify-center rounded-lg relative px-8">
        {tenzies && <Confetti />} {/* Render Confetti if tenzies is true */}
        <h1 className="text-4xl font-black">Tenzies</h1>
        <p className="text-xl px-20 mt-4 break-all ">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="grid grid-cols-5 grid-rows-2 gap-5 mt-14">
          {dieElements}
        </div>
        <button
          className="mt-16 bg-blue-600 p-5 rounded-xl font-extrabold text-white active:shadow-inset-active cursor-pointer"
          onClick={rollDice}
        >
          {tenzies ? "New Game" : "Roll Dice"}
        </button>
      </main>
    </>
  );
}

export default App;
