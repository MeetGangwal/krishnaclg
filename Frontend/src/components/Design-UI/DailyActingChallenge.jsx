import React, { useState } from "react";

const challenges = [
  "🎭 Perform a scene where you go from extreme sadness to happiness in 10 seconds.",
  "🎤 Read a dramatic monologue in 3 different accents.",
  "💃 Express anger, excitement, and fear—without using any words.",
  "🎬 Create a 1-minute scene where you argue with an imaginary character.",
  "🤡 Act like a clown who's trying to be serious but keeps failing.",
  "🔄 Switch between a hero and a villain personality in the same scene.",
  "🎶 Sing a song as if you're in the middle of a dramatic movie scene.",
  "📢 Deliver a powerful speech as if you're leading a revolution.",
];

const DailyActingChallenge = () => {
  const [challenge, setChallenge] = useState(
    challenges[Math.floor(Math.random() * challenges.length)]
  );

  const getNewChallenge = () => {
    const newChallenge = challenges[Math.floor(Math.random() * challenges.length)];
    setChallenge(newChallenge);
  };

  return (
    <div className="max-w-2xl ml-auto mr-6 bg-gray-950 text-white p-6 rounded-lg shadow-lg text-center mb-10">
      <div id="main" className="rounded-lg  bg-cover bg-center bg-no-repeat">

      <h2 className="text-4xl font-bold mb-4  rounded-lg mx-20"> Daily Acting Challenge</h2>
      <span className="mb-10 text-2xl font-semibold">CHALLENGE YOUR SELF  & LEAD YOUR OWN WAY</span>
      <p className="text-3xl italic py-10 bg-transparent rounded-lg font-bold ">{challenge}</p>
      <button
        onClick={getNewChallenge}
        className="mt-4 px-4 py-2 bg-[#6A38C2] hover:bg-[#5833A5] text-white rounded-lg transition"
      >
        New Challenge
      </button>
      </div>
    </div>
  );
};

export default DailyActingChallenge;
