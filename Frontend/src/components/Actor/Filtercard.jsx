import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/Redux/JobSlice";

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
      "Background/Extra",
      "Voice Acting",
      "Stunt Performer",
      "Editor",
    ],
  },
  {
    filterType: "Genre",
    array: [
      "Movie",
      "Web Series",
      "Advertisement",
      "TV Series",
      "Theater",
      "Commercial",
      "Music Video",
    ],
  },
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
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
      return newFilters;
    });
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedFilters));
  }, [selectedFilters, dispatch]);

  return (
    <div className="w-full bg-white p-3 rounded-md text-black">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />
      {filterData.map((data, index) => (
        <div key={index} className="mt-3">
          <h1 className="font-bold text-lg">{data.filterType}</h1>
          {data.array.map((item, idx) => {
            const itemId = `id${index}-${idx}`;
            return (
              <div key={itemId} className="flex items-center space-x-2 my-2">
                <Checkbox
                  id={itemId}
                  checked={selectedFilters[data.filterType]?.includes(item) || false}
                  onCheckedChange={() => toggleFilter(data.filterType, item)}
                />
                <Label htmlFor={itemId}>{item}</Label>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Filtercard;