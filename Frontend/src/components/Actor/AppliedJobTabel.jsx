// import React from 'react'
// import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
// import { Badge } from '@/components/ui/badge'
// import { useSelector } from 'react-redux'

// const AppliedJobTabel = () => {
//     const {allAppliedJobs}= useSelector(store=>store.job);
//   return (
//     <div className='px-4'>
//          <Table className="backdrop-blur-xl bg-white/45 rounded-2xl">
//             <TableCaption className="py-3 ">A list of your recent applied jobs</TableCaption>
//             <TableHeader>
//                 <TableRow>
//                     <TableHead>Date</TableHead>
//                     <TableHead>Job Role</TableHead>
//                     <TableHead>Company</TableHead>
//                     <TableHead className="text-right">Status</TableHead>    
//                 </TableRow>
//             </TableHeader>
//             <TableBody className="rounded-2xl">
//             {
//                         allAppliedJobs.length <= 0 ? (
//                             <tr>
//                                 <td colSpan="4" className="text-center py-4 ">You haven't applied to any jobs</td>
//                             </tr>
//                         ) : (
//                             allAppliedJobs.map((appliedjob) => (
//                                 <TableRow key={appliedjob._id}>
//                                     <TableCell>{appliedjob?.createdAt?.split("T")[0]}</TableCell>
//                                     <TableCell>{appliedjob.job?.title}</TableCell>
//                                     <TableCell>{appliedjob.job?.company?.name}</TableCell>
//                                     {/* 🔹 Applied dynamic background colors correctly */}
//                                     <TableCell className="text-right">
//                                         <Badge className={`${appliedjob?.status === "rejected" ? 'bg-red-400' : appliedjob.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>
//                                             {appliedjob.status.toUpperCase()}
//                                         </Badge>
//                                     </TableCell>
//                                 </TableRow>
//                             ))
//                         )
//                     }
//             </TableBody>
//         </Table>
//     </div>
//   )
// }

// export default AppliedJobTabel
import React from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useSelector } from "react-redux";

const AppliedJobTabel = () => {
    const { allAppliedJobs } = useSelector((store) => store.job);

    return (
        <div className="px-4">
            <Table className="backdrop-blur-xl bg-white/45 rounded-2xl">
                <TableCaption className="py-3">A list of your recently applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="rounded-2xl">
                    {allAppliedJobs.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan="4" className="text-center py-4">
                                You haven't applied to any jobs
                            </TableCell>
                        </TableRow>
                    ) : (
                        allAppliedJobs.map((appliedjob) => (
                            <TableRow key={appliedjob._id}>
                                <TableCell>{appliedjob?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell>{appliedjob.job?.title}</TableCell>
                                <TableCell>{appliedjob.job?.company?.name}</TableCell>
                                <TableCell className="text-right">
                                    <Badge className={`${appliedjob?.status === "rejected" ? "bg-red-400" : appliedjob.status === "pending" ? "bg-gray-400" : "bg-green-400"}`}>
                                        {appliedjob.status.toUpperCase()}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default AppliedJobTabel;

