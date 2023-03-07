import React from 'react'
import {Link} from 'react-router-dom';
const CatCard = ({item}) => {
  
  return (
   <Link to={`/gigs/?cat=design`}>
   <div className='w-full lg:w-[252px] h-[344px] text-white rounded-md cursor-pointer relative'>
    <img src={item.img} alt="" className='w-full h-full object-cover' /> 
    <span className='absolute  top-4 left-2 '>{item.desc}</span>
     <span className='font-bold text-xl absolute left-3 top-10'>{item.title}</span>
   </div>
   </Link>
  )
}

export default CatCard;
