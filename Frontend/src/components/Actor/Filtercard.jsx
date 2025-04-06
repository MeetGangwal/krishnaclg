// import React, { useEffect, useState } from "react";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
// import { useDispatch } from "react-redux";
// import { setSearchedQuery } from "@/Redux/JobSlice";

// const filterData = [
//   {
//     filterType: "Age Range",
//     array: [
//       "Kids (0-12 years)",
//       "Teens (13-19 years)",
//       "Young Adults (20-30 years)",
//       "Adults (31-50 years)",
//       "Seniors (51+ years)",
//     ],
//   },
//   {
//     filterType: "Gender",
//     array: ["Male", "Female"],
//   },
//   {
//     filterType: "Role Type",
//     array: [
//       "Lead Role",
//       "Supporting Role",
//       "Background/Extra",
//       "Voice Acting",
//       "Stunt Performer",
//       "Editor",
//     ],
//   },
//   {
//     filterType: "Genre",
//     array: [
//       "Movie",
//       "Web Series",
//       "Advertisement",
//       "TV Series",
//       "Theater",
//       "Commercial",
//       "Music Video",
//     ],
//   },
//   {
//     filterType: "Location",
//     array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
//   },
// ];

// const Filtercard = () => {
//   const [selectedFilters, setSelectedFilters] = useState({});
//   const dispatch = useDispatch();

//   const toggleFilter = (category, value) => {
//     setSelectedFilters((prevFilters) => {
//       const newFilters = { ...prevFilters };
//       if (!newFilters[category]) {
//         newFilters[category] = [];
//       }
//       if (newFilters[category].includes(value)) {
//         newFilters[category] = newFilters[category].filter((item) => item !== value);
//       } else {
//         newFilters[category] = [...newFilters[category], value];
//       }
//       return newFilters;
//     });
//   };

//   useEffect(() => {
//     dispatch(setSearchedQuery(selectedFilters));
//   }, [selectedFilters, dispatch]);

//   return (
//     <div className="w-full bg-white p-3 rounded-md text-black">
//       <h1 className="font-bold text-lg">Filter Jobs</h1>
//       <hr className="mt-3" />
//       {filterData.map((data, index) => (
//         <div key={index} className="mt-3">
//           <h1 className="font-bold text-lg">{data.filterType}</h1>
//           {data.array.map((item, idx) => {
//             const itemId = `id${index}-${idx}`;
//             return (
//               <div key={itemId} className="flex items-center space-x-2 my-2">
//                 <Checkbox
//                   id={itemId}
//                   checked={selectedFilters[data.filterType]?.includes(item) || false}
//                   onCheckedChange={() => toggleFilter(data.filterType, item)}
//                 />
//                 <Label htmlFor={itemId}>{item}</Label>
//               </div>
//             );
//           })}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Filtercard;
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/Redux/JobSlice";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const filterData = [
  {
    filterType: "Age Range",
    array: [
      "Kids (0-12 years)",
      "Teens (13-19 years)",
      "Young Adults (20-30 years)",
      "Adults (31-50 years)",
      "Seniors (51+ years)",
    ],
  },
  {
    filterType: "Gender",
    array: ["Male", "Female"],
  },
  {
    filterType: "Role Type",
    array: [
      "Lead Role",
      "Supporting Role",
      "Background Role",
    ],
  },
  {
    filterType: "Genres",
    array: [
      "DRAMA",
      "COMEDY",
      "SCIENCE FICTION",
      "FANTASY",
      "HORROR",
      "THRILLER",
      "WESTERN",
      "MUSICAL",
      "ACTION","ADVENTURE","ROMANCE","MYSTERY","CRIME","HISTORICAL","SUPERHERO","ANIMATION","DOCUMENTARY"
    ],
  },
];

const Filtercard = () => {
  const [selectedFilters, setSelectedFilters] = useState({});
  const dispatch = useDispatch();

  const toggleFilter = (category, value) => {
    setSelectedFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      if (!newFilters[category]) {
        newFilters[category] = [];
      }
      if (newFilters[category].includes(value)) {
        newFilters[category] = newFilters[category].filter((item) => item !== value);
      } else {
        newFilters[category] = [...newFilters[category], value];
      }
      return {...newFilters};
    });
  };

  const clearFilters = () => {
    setSelectedFilters({});
    dispatch(setSearchedQuery({})); // Reset Redux filter state
  };

  useEffect(() => {
    if (JSON.stringify(selectedFilters) !== "{}") {
      dispatch(setSearchedQuery(selectedFilters));
    }
  }, [selectedFilters, dispatch]);
  

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-md text-black max-h-[90vh] overflow-y-auto">
      <h1 className="font-bold text-lg mb-3">Filter Jobs</h1>

      <Accordion type="multiple" className="w-full">
        {filterData.map((data, index) => (
          <AccordionItem key={index} value={data.filterType}>
            <AccordionTrigger className="font-semibold text-base">{data.filterType}</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col space-y-2">
                {data.array.map((item, idx) => {
                  const itemId = `id${index}-${idx}`;
                  return (
                    <div key={itemId} className="flex items-center space-x-2">
                      <Checkbox
                        id={itemId}
                        checked={selectedFilters[data.filterType]?.includes(item) || false}
                        onCheckedChange={() => toggleFilter(data.filterType, item)}
                      />
                      <Label htmlFor={itemId} className="text-sm">{item}</Label>
                    </div>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Button
        variant="destructive"
        className="w-full mt-4"
        onClick={clearFilters}
        disabled={Object.keys(selectedFilters).length === 0}
      >
        Clear Filters
      </Button>
    </div>
  );
};

export default Filtercard;
