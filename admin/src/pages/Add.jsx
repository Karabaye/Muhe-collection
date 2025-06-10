import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'

import { toast } from 'react-toastify' // Optional for notifications

const Add = ({token}) => {
  const [image1, setImage1] = useState(null)
  const [image2, setImage2] = useState(null)
  const [image3, setImage3] = useState(null)
  const [image4, setImage4] = useState(null)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("Men")
  const [subcategory, setSubCategory] = useState("Topwear")
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const resetForm = () => {
    setImage1(null)
    setImage2(null)
    setImage3(null)
    setImage4(null)
    setName("")
    setDescription("")
    setPrice("")
    setCategory("Men")
    setSubCategory("Topwear")
    setBestseller(false)
    setSizes([])
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData()

      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subcategory)
      formData.append("bestseller", bestseller)
      formData.append("sizes", JSON.stringify(sizes))

      // Only append images if they exist
      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: {
          token 
        }

        
      })

      console.log(response.data)
      toast.success("Product added successfully!")
      resetForm()
    } catch (error) {
      console.error("Error adding product:", error)
      toast.error(error.response?.data?.message || "Failed to add product")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p>Upload Image</p>
        <div className='flex gap-2'>
          <label htmlFor="image1">
            <img 
              className='w-20 h-20 object-cover' 
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} 
              alt="Upload 1" 
            />
            <input 
              onChange={(e) => setImage1(e.target.files[0])} 
              type="file" 
              id='image1' 
              accept="image/*"
              hidden 
            />
          </label>
          
          <label htmlFor="image2">
            <img 
              className='w-20 h-20 object-cover' 
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} 
              alt="Upload 2" 
            />
            <input 
              onChange={(e) => setImage2(e.target.files[0])} 
              type="file" 
              id='image2' 
              accept="image/*"
              hidden 
            />
          </label>
          
          <label htmlFor="image3">
            <img 
              className='w-20 h-20 object-cover' 
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} 
              alt="Upload 3" 
            />
            <input 
              onChange={(e) => setImage3(e.target.files[0])} 
              type="file" 
              id='image3' 
              accept="image/*"
              hidden 
            />
          </label>
          
          <label htmlFor="image4">
            <img 
              className='w-20 h-20 object-cover' 
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} 
              alt="Upload 4" 
            />
            <input 
              onChange={(e) => setImage4(e.target.files[0])} 
              type="file" 
              id='image4' 
              accept="image/*"
              hidden 
            />
          </label>
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product name</p>
        <input 
          onChange={(e) => setName(e.target.value)} 
          value={name} 
          className='w-full max-w-[500px] px-3 py-2 border rounded' 
          type="text" 
          placeholder='Type here' 
          required 
        />
      </div>
      
      <div className='w-full'>
        <p className='mb-2'>Product description</p>
        <textarea 
          onChange={(e) => setDescription(e.target.value)} 
          value={description} 
          className='w-full max-w-[500px] px-3 py-2 border rounded' 
          placeholder='Write content here' 
          rows={4}
          required 
        />
      </div>
      
      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div className='w-full sm:w-auto'>
          <p className='mb-2'>Product category</p>
          <select 
            onChange={(e) => setCategory(e.target.value)} 
            value={category}
            className='w-full px-3 py-2 border rounded'
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div className='w-full sm:w-auto'>
          <p className='mb-2'>Sub category</p>
          <select 
            onChange={(e) => setSubCategory(e.target.value)} 
            value={subcategory}
            className='w-full px-3 py-2 border rounded'
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div className='w-full sm:w-auto'>
          <p className='mb-2'>Product Price</p>
          <input 
            onChange={(e) => setPrice(e.target.value)} 
            value={price} 
            className='w-full px-3 py-2 border rounded sm:w-[120px]' 
            type="number" 
            placeholder='25' 
            min="0"
            step="0.01"
            required
          />
        </div>
      </div>
      
      <div>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex gap-3'>
          {["S", "M", "L", "XL", "XXL"].map(size => (
            <div 
              key={size} 
              onClick={() => setSizes(prev => 
                prev.includes(size) 
                  ? prev.filter(item => item !== size) 
                  : [...prev, size]
              )}
            >
              <p className={`
                ${sizes.includes(size) ? "bg-pink-100" : "bg-slate-200"} 
                px-3 py-1 cursor-pointer rounded
              `}>
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className='flex gap-2 mt-2 items-center'>
        <input  
          type="checkbox" 
          id='bestseller' 
          checked={bestseller}
          onChange={() => setBestseller(prev => !prev)}
          className='w-4 h-4'
        />
        <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
      </div>

      <button 
        type="submit" 
        className='w-28 py-3 mt-4 bg-black text-white rounded disabled:opacity-50'
        disabled={isLoading}
      >
        {isLoading ? 'Adding...' : 'ADD'}
      </button>
    </form>
  )
}


  export default Add