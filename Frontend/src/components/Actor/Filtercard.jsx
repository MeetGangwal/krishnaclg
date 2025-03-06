import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/Redux/JobSlice";
// import { useDispatch } from 'react-redux'
// import { setSearchedQuery } from '@/redux/jobSlice'

const fitlerData = [
  {
    fitlerType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    fitlerType: "Gener",
    array: [
      "Movie",
      "Web Series",
      "Advertisment",
      "TV Series",
      "Theater",
      "Commercial",
      "Music Video",
    ],
  },
  {
    fitlerType: "Role Type",
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
    fitlerType: "Gender",
    array: ["Male", "Female"],
  },
  {
    fitlerType: "Age Range",
    array: [
      "Kids (0-12 years)",
      "Teens (13-19 years)",
      "Young Adults (20-30 years)",
      "Adults (31-50 years)",
      "Seniors (51+ years)",
    ],
  },
  {
    fitlerType: "Experience Level",
    array: ["Beginner", "Intermediate", "Professional"],
  },
  {
    fitlerType: "Language",
    array: [
      "All Languages",
      "English",
      "Hindi",
      "Marathi",
      "Gujarati",
      "Tamil",
      "Malayalam",
      "Telugu",
      "Kannada",
      "Punjabi",
      "Other",
    ],
  },
];

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    const changeHandler = (value) => {
        setSelectedValue(value);
    }
    useEffect(()=>{
        dispatch(setSearchedQuery(selectedValue));
    },[selectedValue]);

  return (
    <div className="w-full bg-white p-3 rounded-md text-black">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup  value={selectedValue} onValueChange={changeHandler}>
        {" "}
        {/* value={selectedValue} onValueChange={changeHandler}> */}
        {fitlerData.map((data, index) => (
          <div>
            <h1 className="font-bold text-lg">{data.fitlerType}</h1>
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div className="flex items-center space-x-2 my-2">
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlFor={itemId}>{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
