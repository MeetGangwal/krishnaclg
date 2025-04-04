import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal , Trash2} from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { COMPANY_API_END_POINT } from "@/util/constant";
import { toast } from "sonner";
import { setCompanies } from "@/Redux/CompanySlice";
import axios from "axios";
import { useDispatch } from "react-redux";

const CompaniesTable = () => {
  const navigate = useNavigate();
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const [filterCompany, setFilterCompany] = useState(companies);

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  // const handleDeleteCompany = async (companyId) => {
  //   try {
  //     const response = await axios.delete(
  //       `${COMPANY_API_END_POINT}/delete/${companyId}`,
  //       { withCredentials: true }
  //     );

  //     if (response.data.success) {
  //       toast.success("Company and associated jobs deleted successfully!");

  //       // Update the Redux store after deletion
  //       const updatedCompanies = companies.filter(
  //         (company) => company._id !== companyId
  //       );
  //       dispatch(setCompanies(updatedCompanies));
  //     }
  //   } catch (error) {
  //     toast.error("Failed to delete company. Try again.");
  //     console.error(error);
  //   }
  // };
   // Import useDispatch

  const dispatch = useDispatch(); // Add this inside your component
  
  const handleDeleteCompany = async (companyId) => {
    try {
      const response = await axios.delete(
        `${COMPANY_API_END_POINT}/delete/${companyId}`,
        { withCredentials: true }
      );
  
      if (response.data.success) {
        toast.success(response.data.message); // Show success message
  
        // Remove the deleted company from Redux store
        const updatedCompanies = companies.filter(
          (company) => company._id !== companyId
        );
        dispatch(setCompanies(updatedCompanies));
  
        // Update local state immediately to reflect changes in UI
        setFilterCompany(updatedCompanies);
      } else {
        toast.error("Failed to delete company. Try again.");
      }
    } catch (error) {
      console.error("Error deleting company:", error);
  
      if (error.response) {
        toast.error(error.response.data.message || "Failed to delete company. Try again.");
      } else {
        toast.error("Network error. Please check your connection.");
      }
    }
  };
  
  
  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
      <Table>
        <TableCaption className="py-3">
          A list of your recent registered companies
        </TableCaption>
        <TableHeader className=" text-white">
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany?.map((company) => (
            <tr
              key={company._id}
              className="hover:bg-gray-100 transition duration-200"
            >
              <TableCell>
                <Avatar className="">
                  <AvatarImage src={company.logo} alt={company.name} className="" />
                </Avatar>
              </TableCell>
              <TableCell>{company.name}</TableCell>
              <TableCell>{company.createdAt.split("T")[0]}</TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div
                      onClick={() =>
                        navigate(`/admin/companies/${company._id}`)
                      }
                      className="flex items-center gap-2 w-fit cursor-pointer hover:bg-gray-100 p-2 rounded"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                    <div
                      onClick={() => handleDeleteCompany(company._id)}
                      className="flex items-center gap-2 w-fit cursor-pointer text-red-600 mt-2"
                    >
                      <Trash2 className="w-4" />
                      <span>Delete</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
