import { useQuery } from '@tanstack/react-query';
import React from 'react'
import GigCard from '../components/GigCard';
import useTitle from '../hooks/useTitle';
import newRequest from '../utils/newRequest';

const Explore = () => {
  useTitle("• Explore")
 const {isLoading, error, data} = useQuery({
    queryKey : ["randomGigs"],
    queryFn : () => {
      return newRequest(`/gigs/find/randomgig`).then(
        (res) => res.data
      );
    }
   })
  
  return (
    
    <>
    <div className='explore'>
      <div className="explore_section">
      <div className="explore_hero  text-white">
            <h1 className='text-[36px] font-semibold'>Explore Fiverr’s top talent</h1>
            <p className='mt-2 text-xl'>Unreal works made by real Fiverr freelancers</p>
        </div>
      </div>   </div>
    <div className='flex mt-10 items-center justify-center'>
       
      <div className='lg:w-[1400px] w-full flex items-center justify-center lg:justify-between flex-wrap gap-4'>
      {isLoading? "Loading..." : error ? "Something went wrong..." :
        data?.map((item) => {
            return <GigCard key={item._id} item={item} />
        })
      }
      </div>
    </div>
 
    </>
  )
}

export default Explore
