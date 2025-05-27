import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem' // Make sure to import ProductItem

function BestSeller() {
    const { products } = useContext(ShopContext);
    const [bestSellers, setBestSellers] = useState([]);

    useEffect(() => {
        if (products && products.length > 0) {
            const sortedProducts = [...products].sort((a, b) => (b.sold || 0) - (a.sold || 0));
            setBestSellers(sortedProducts.slice(0, 10));
        }
    }, [products]); // Added products to dependency array

    return (
        <div className='my-10'>
            <div className='text-center text-3xl py-8'>
                <Title text1={'BEST'} text2={'SELLERS'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Tailwind CSS works by scanning all of your HTML files, JavaScript components, and any other templates for class names, generating the corresponding styles and then writing them to a static CSS file.
                </p>
            </div>

            {/* Product grid */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {bestSellers.map((item, index) => (
                    <ProductItem 
                        key={index} 
                        id={item._id} 
                        name={item.name} 
                        price={item.price} 
                        image={item.image} 
                    />
                ))}
            </div>
        </div>
    )
}

export default BestSeller