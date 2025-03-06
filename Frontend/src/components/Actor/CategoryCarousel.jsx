import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '@/Redux/JobSlice'

const Category =[
    "Television Casting",
    "Movie Casting", 
    "Commercial Casting",
    "Stunt Performer",
    "Theater Casting",
    "Voice-Over Casting",
    "Child Actor"
]
// LOGIC YET TO ADDED what will happen onClicking these Category
const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
     const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
      };
  return (
    <div>
        <Carousel className="w-full max-w-xl mx-auto y-20">
            <CarouselContent>
                {
                    Category.map((cat,index)=>(
                        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                            <Button onClick={()=>searchJobHandler(cat)} className="rounded-full" variant="outline">{cat}</Button>

                        </CarouselItem>
                    ))
                }
               
            </CarouselContent>
            <CarouselPrevious/>
            <CarouselNext/>
        </Carousel>

    </div>
  )
}

export default CategoryCarousel