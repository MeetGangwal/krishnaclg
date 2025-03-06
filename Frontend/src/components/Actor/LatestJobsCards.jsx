import React from 'react'
import { Badge } from '@/components/ui/badge'
import { useNavigate } from 'react-router-dom'
import {motion} from 'motion/react'


const LatestJobsCards = ({job}) => {
  const navigate = useNavigate();
  return (
    <motion.div onClick={()=> navigate(`/description/${job._id}`)}   className="p-5  rounded-3xl bg-[#ffffff8c] shadow-white shadow-sm overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-md hover:shadow-white"
>
        <div className='text-center' >
        <h1 className='font-bold text-2xl '>{job?.title} </h1>
        <p className='text-sm text-white'>India </p>
        </div>
        <div className='text-center'>
            <h1 className='font-bold text-lg pt-1'>{job?.company?.name}</h1>
            {/* <p className='text-sm font-medium p-2 text-white '>{job?.description}</p> */}
        </div>
        <div className='flex items-center gap-2 mt-4 justify-center'>
        <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.projectType}</Badge> 
        <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.roleType}</Badge> 
        <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.salaryPerDay}</Badge> 
        </div>
    </motion.div>
  )
}

export default LatestJobsCards