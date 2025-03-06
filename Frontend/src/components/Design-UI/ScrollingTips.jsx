import React from "react";

const tips = [
  "💡 Always be prepared for auditions.",
  "🎭 Learn to adapt to different acting styles.",
  "📸 Keep your portfolio updated with professional headshots.",
  "🎤 Work on your voice and diction.",
  "🎬 Study famous actors and learn from them.",
  "📚 Take acting classes and keep learning.",
];

const ScrollingTips = () => {
  return (
    <div className="overflow-hidden whitespace-nowrap  bg-transparent h-10 py-1.5 text-white my-10 shadow-white font-medium">
      <div className="inline-block animate-scroll">
        {tips.map((tip, index) => (
          <span key={index} className="mx-10 text-2xl">
            {tip}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ScrollingTips;
//bg-[#6b38c27e]