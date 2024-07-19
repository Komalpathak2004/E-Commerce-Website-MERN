import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'

const AllProducts = () => {
  const [openUploadProduct,setOpenUploadProduct] = useState(false)
  const [allProduct,setAllProduct] = useState([])

  const fetchAllProduct = async() =>{
    const response = await fetch(SummaryApi.allProduct.url)
    const dataResponse = await response.json()

    setAllProduct(dataResponse?.data || [])
  }
  useEffect(()=>{
    fetchAllProduct()
  },[])
  return (
    <div>
      <div className='bg-white py-3 px-4 flex justify-between items-center'>
        <h2 font- bold text-lg>All Products</h2>
        <button className='border-2 border-blue-600 text-blue-600 hover:bg-blue-800 hover:text-white py-1 px-3 rounded-full transition-all' onClick={()=>setOpenUploadProduct(true)}>Upload Products</button>
      </div>
      <div className=' flex items-center flex-wrap h-[calac(100vh-190)] gap-5 py-4  overflow-y-scroll'>
  {
      allProduct.map((product,index) => {
        return(
          <AdminProductCard data={product} key={index='allProduct'} fetchdata ={fetchAllProduct}/>
         
        )
      })

    }   
      </div>



      {
        openUploadProduct && (
          <UploadProduct onClose={()=>setOpenUploadProduct(false)} fetchData={fetchAllProduct}/>
        )
      }
      
    
    </div>
  )
}

export default AllProducts