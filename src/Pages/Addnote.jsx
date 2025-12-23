import React from 'react'
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import  axios from 'axios';
import { TailSpin } from 'react-loader-spinner';
import Snowfall from 'react-snowfall';

const Addnote = () => {
  const [isloading, setisloading] = useState(false)
  const [values, setvalues] = useState({
    title:"",
    description:"",
    color:""
  });

  // useEffect(()=>{
  //   //post data
  //   postNote();
  // },[])

  const handledata = (e)=>{
    setvalues({...values,[e.target.name]:e.target.value})
    // console.log(values)
  }

  const navigate = useNavigate();
  async function postNote(e) {
    e.preventDefault();
    try {
      setisloading(true)
      //const url = "http://localhost:3002"
      const API_URL = import.meta.env.VITE_API_URL;
      const { data } = await axios.post(`${API_URL}/note`,values)
      //console.log(data)
      
      
      setTimeout(() => {
        setisloading(false)
        if (data?.status === true) {
        toast.success(data.message);
        navigate('/')
        } else {
          toast.error(data.message);
        }
      }, 3000);
      //setisloading(false)
    } catch (error) {
      setisloading(false)
      toast.error(error.message)
    }
  }
  return (
    <>
    <div className='flex justify-center pt-10 bg-black h-screen'>
            <Toaster />
            <Snowfall />
        <div className='bg-black w-120 rounded-lg'>
            <Link to="/">
            <div className='flex items-center gap-4 mx-5'>
                <i className="fa-solid fa-arrow-left capitalize text-2xl text-white"></i>
                <p className='capitalize text-[20px] font-medium text-white'>Back to notes</p>
            </div>
            </Link>

            <form className='w-full mt-10 bg-[#181111] rounded-lg p-5' onSubmit={(e)=>postNote(e)}>
                <h1 className='text-2xl font-semibold capitalize mb-5 text-white'>create new note</h1>

                <label htmlFor="title" className='block text-white text-sm md:text-base font-medium ml-1'>Title</label>
                <input  
                id="title"
                name="title"
                placeholder="Enter note title"
                type="text"
                required
                onChange={(e)=>handledata(e)}
                className='w-full bg-[#0f0a0a] text-white border-2 border-gray-700 rounded-xl px-4 py-3 md:py-4
                   focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                   placeholder:text-gray-500 transition-all duration-200'
                />

                <label htmlFor="title" className='block text-white text-sm md:text-base font-medium ml-1'>Color (Optional)</label>
                <input
                id="color"
                name="color"
                placeholder="Enter color for your note"
                type="text"
                required
                onChange={(e)=>handledata(e)}
                className='w-full bg-[#0f0a0a] text-white border-2 border-gray-700 rounded-xl px-4 py-3 md:py-4
                   focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                   placeholder:text-gray-500 transition-all duration-200'
                />

                <label htmlFor="title" className='block text-white text-sm md:text-base font-medium ml-1 mt-3'>Description</label>
                <textarea 
                id="description"
                name="description"
                rows="4"
                required
                onChange={(e)=>handledata(e)}
                placeholder="Write your note content here..."
                className='w-full bg-[#0f0a0a] text-white border-2 border-gray-700 rounded-xl px-4 py-3 md:py-4
                        focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                        placeholder:text-gray-500 resize-y min-h-37.5 transition-all duration-200'
                ></textarea>
                <div className='flex justify-end'>
                <button 
                type='submit' 
                className='text-white bg-green-500 px-4 py-2 rounded-lg cursor-pointer'>
                  {
                    isloading ?
                    <TailSpin
                    visible={true}
                    height="30"
                    width="100"
                    color="#000000"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                    />
                    :
                   <>Create Note</>
                  }
                  </button>
                </div>
            </form>
        </div>

    </div>
    </>
  )
}

export default Addnote