
// import React from 'react';
// import { Tabs } from "../ui/tabs.jsx";

// export function TabsDemo() {
//   const tabs = [
//     {
//       // title:  <span className="text-white ">Product</span>,
//       title: "Product",
//       value: 'product',
//       content: (
//         <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
//           <p>Product Tab</p>
//           <DummyContent />
//         </div>
//       ),
//     },
//     {
//       // title: <span className="text-white ">services</span>,
//       title:"Services",
//       value: 'services',
//       content: (
//         <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
//           <p>Services Tab</p>
//           <DummyContent />
//         </div>
//       ),
//     },
//     {
//       // title: <span className="text-white ">Playground</span>,
//       title:"Playground",
//       value: 'playground',
//       content: (
//         <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
//           <p>Playground Tab</p>
//           <DummyContent />
//         </div>
//       ),
//     },
//     {
//       // title: <span className="text-white ">Content</span>,
//       title:"Content",
//       value: 'content',
//       content: (
//         <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
//           <p>Content Tab</p>
//           <DummyContent />
//         </div>
//       ),
//     },
//     {
//       // title: <span className="text-white ">Random</span>,
//       title:"Random",
//       value: 'random',
//       content: (
//         <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
//           <p>Random Tab</p>
//           <DummyContent />
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div className="h-[20rem] md:h-[40rem] [perspective:1000px] text-lg font-semibold relative flex flex-col max-w-5xl mx-auto w-full items-start justify-start my-40">
//       {/* Keeping default text white and making active tab text black */}
//       <Tabs tabs={tabs} />
//    </div>
//   );
// }

// const DummyContent = () => {
//   return (
//     <img
//       src="/Images/CDRoadMap.png"
//       alt="dummy image"
//       width="1000"
//       height="1000"
//       className="object-cover p-2 rounded-xl mx-auto"
//     />
//   );
// };

// export default TabsDemo;
// import React from "react";
// import { Tabs } from "../ui/tabs.jsx";

// export function TabsDemo() {
//   const tabs = [
//     {
//       title: "SIMPLIFY",
//       value: "SIMPLIFY",
//       content: (
//         <TabContent imageSrc="/Images/1.svg" 
//         text="Casting Made Easy"
//          />
//       ),
//     },
//     {
//       title: "DISCOVER",
//       value: "Discover",
//       content: (
//         <TabContent imageSrc="/Images/2.svg" 
//         text="Discover Talent"
//          />
//       ),
//     },
//     {
//       title: "EMPOWER",
//       value: "Empower",
//       content: (
//         <TabContent
//           imageSrc="/Images/3.svg"
//           text="Seamless Hiring"
//         />
//       ),
//     },
//   ];

//   return (
//     <div className="h-[20rem] md:h-[40rem] [perspective:1000px] text-lg font-semibold relative flex flex-col max-w-5xl mx-auto w-full items-start justify-start my-40">
//       <Tabs tabs={tabs} />
//     </div>
//   );
// }

// const TabContent = ({ imageSrc, text }) => {
//   return (
//     <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
//       <p>{text}</p>
//       <img
//         src={imageSrc}
//         alt="Tab Image"
//         width="1000"
//         height="1000"
//         className="object-cover p-2  rounded-xl mx-auto"
//       />
//     </div>
//   );
// };

// export default TabsDemo;
import React from "react";
import { Tabs } from "../ui/tabs.jsx";

export function TabsDemo() {
  const tabs = [
    {
      title: "SIMPLIFY",
      value: "SIMPLIFY",
      content: (
        <TabContent imageSrc="/Images/1.svg" 
        // text="Casting Made Easy" 
        />
      ),
    },
    {
      title: "DISCOVER",
      value: "Discover",
      content: (
        <TabContent imageSrc="/Images/2.svg" 
        // text="Discover Talent" 
        />
      ),
    },
    {
      title: "EMPOWER",
      value: "Empower",
      content: (
        <TabContent imageSrc="/Images/3.svg" 
        // text="Seamless Hiring"
         />
      ),
    },
  ];

  return (
    <div className="h-[20rem] md:h-[40rem] [perspective:1000px] text-lg font-semibold relative flex flex-col max-w-5xl mx-auto w-full items-start justify-start mb-40 text-center">
      <Tabs tabs={tabs} />
    </div>
  );
}

const TabContent = ({ imageSrc, text }) => {
  return (
    <div className="w-full overflow-hidden relative h-full rounded-2xl px-10  text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900 flex flex-col">
      <p className="mb-6">{text}</p> {/* Adds spacing below text */}
      <div className="flex-grow" /> {/* Pushes content upward to create space */}
      <img
        src={imageSrc}
        alt="Tab Image"
        width="1000"
        height="1000"
        className="object-cover p-2 rounded-xl mx-auto mb-10" // Ensures spacing from bottom
      />
    </div>
  );
};


export default TabsDemo;
