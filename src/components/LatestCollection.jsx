import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

const LatestCollection = () => {

  const { products } = useContext(ShopContext);
  const [LatestProducts,setLastProducts] = useState([]);

  useEffect(()=>{
     setLastProducts(products.slice(0,10));
  },[])

  return (
    <div className="my-10">
    <div className='text-center py-8 text-3xl'>
      <Title text1={'LATEST'} text2={'COLLECTION'} />
      <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
      Tailwind CSS works by scanning all of your HTML files, JavaScript components, and any other templates for class names, generating the corresponding styles and then writing them to a static CSS file.
      </p>
    </div>

     {/* Rendering Products */}
     <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
     {LatestProducts.map((item, index) => (
  // Your JSX here
  <div key={index}>
    {/* Render item properties */}
  </div>
))}
     </div>
    </div>
  )
}

export default LatestCollection
