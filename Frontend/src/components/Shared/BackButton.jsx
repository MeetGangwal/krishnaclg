// import { useNavigate } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";

// const BackButton = () => {
//   const navigate = useNavigate();

//   return (
//     <button
//       className="flex items-center gap-2 text-gray-700 hover:text-black transition"
//       onClick={() => navigate(-1)}
//     >
//       <ArrowLeft className="w-5 h-5" />
//       <span>Back</span>
//     </button>
//   );
// };

// export default BackButton;
// import { useNavigate } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";

// const BackButton = () => {
//   const navigate = useNavigate();

//   return (
//     <button
//       className="absolute -top-4 -left-4 w-10 h-10 bg-black text-white flex items-center justify-center rounded-full shadow-lg 
//                  hover:scale-110 transition-transform"
//       onClick={() => navigate(-1)}
//     >
//       <ArrowLeft className="w-5 h-5" />
//     </button>
//   );
// };

// export default BackButton;
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className="flex items-center justify-center w-10 h-10 bg-black rounded-full hover:bg-gray-800 transition"
      onClick={() => navigate(-1)}
    >
      <ArrowLeft className="w-6 h-6 text-white stroke-[3]" /> {/* Bolder Arrow */}
    </button>
  );
};

export default BackButton;

