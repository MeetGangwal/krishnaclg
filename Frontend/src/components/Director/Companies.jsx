import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/Redux/CompanySlice";

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

  return (
    <div className="bg-main-bg min-h-screen">
      <div className="bg-overlay-bg min-h-screen">
        <Navbar />
        <div className="max-w-6xl mx-auto my-10 p-8 bg-white rounded-2xl shadow-2xl">
          <div className="flex items-center justify-between my-5">
            <Input
              className="w-1/3 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-main-accent"
              placeholder="Filter by name"
              onChange={(e) => setInput(e.target.value)}
            />
            <Button
              
              onClick={() => navigate("/admin/companies/create")}
            >
              New Company
            </Button>
          </div>
          <CompaniesTable />
        </div>
      </div>
    </div>
  );
};

export default Companies;
