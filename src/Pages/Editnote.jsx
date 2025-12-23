import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { TailSpin } from 'react-loader-spinner';
import { Link, useNavigate, useParams } from 'react-router-dom'
import Snowfall from 'react-snowfall';

const Editnote = () => {
      const { id } = useParams();
      const [isloading, setisloading] = useState(false)
      const [Note, setNote] = useState({
           title:"",
           description:"",
           color:""
         });
         //console.log(Note)
        
          useEffect(()=>{
            //put data
            GetNoteById();
          },[])
    
        //get by id note
          async function GetNoteById() {
            try {
              //const url = "http://localhost:3002"
              const API_URL = import.meta.env.VITE_API_URL;
              const { data } = await axios.get(`${API_URL}/note/${id}`)
              setNote(data.message)
              //console.log(data.message)
            } catch (error) {
              toast.error(error.message)
            }
          }

          //handle data
          const HandleValues = (e)=>{
            setNote({...Note,[e.target.name]:e.target.value})
           // console.log(Note)
          }

          const navigate = useNavigate();
          //edit data
            async function Editnote(e) {
              e.preventDefault();
              try {
                const notedata = {
                  title:Note.title,
                  description:Note.description,
                  color:Note.color
                }
                // console.log(notedata)
                // return
                setisloading(true)
                //const url = "http://localhost:3002"
                const API_URL = import.meta.env.VITE_API_URL;
                const { data } = await axios.put(`${API_URL}/note/${id}`,notedata)
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

            <form className='w-full mt-10 bg-[#181111] rounded-lg p-5' onSubmit={(e)=> Editnote(e)}>
                <h1 className='text-2xl font-semibold capitalize mb-5 text-white'>Edit note</h1>

                <label htmlFor="title" className='block text-white text-sm md:text-base font-medium ml-1'>Title</label>
                <input  
                id="title"
                name="title"
                placeholder="Enter note title"
                type="text"
                required
                value={Note.title}
                onChange={(e)=> HandleValues(e)}
                className='w-full bg-[#0f0a0a] text-white border-2 border-gray-700 rounded-xl px-4 py-3 md:py-4
                   focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                   placeholder:text-gray-500 transition-all duration-200'
                />

                <label htmlFor="title" className='block text-white text-sm md:text-base font-medium ml-1'>color (Optional)</label>
                <input  
                id="color"
                name="color"
                placeholder="Enter note title"
                type="text"
                required
                value={Note.color}
                onChange={(e)=> HandleValues(e)}
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
                value={Note.description}
                onChange={(e)=> HandleValues(e)}
                placeholder="Write your note content here..."
                className='w-full bg-[#0f0a0a] text-white border-2 border-gray-700 rounded-xl px-4 py-3 md:py-4
                        focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                        placeholder:text-gray-500 resize-y min-h-37.5 transition-all duration-200'
                ></textarea>
                <div className='flex justify-end'>
                <button 
                type='submit' 
                className='text-white bg-green-500 px-4 py-2 rounded-full cursor-pointer'>
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
                  <>Edit Note</>
                  }
                  </button>
                </div>
            </form>
        </div>

    </div>
    </>
  )
}

export default Editnote