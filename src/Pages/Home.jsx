import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import Snowfall from 'react-snowfall'
const Home = () => {
      const [Notes, setNotes] = useState([]);
    
      useEffect(()=>{
        //post data
        GetNotes();
      },[])

    
      async function GetNotes() {
        try {
          //const url = "http://localhost:3002"
          const API_URL = import.meta.env.VITE_API_URL;
          const { data } = await axios.get(`${API_URL}/note`)
          setNotes(data.message)
          //console.log(data.message)
          //console.log(Notes)
        } catch (error) {
          toast.error(error.message)
        }
      }

      // Option 1: Basic Border Colors
    const BorderColor = {
    green: 'border-green-500',
    blue: 'border-blue-500',
    red: 'border-red-500',
    yellow: 'border-yellow-500',
    purple: 'border-purple-500',
    pink: 'border-pink-500',
    indigo: 'border-indigo-500',
    gray: 'border-gray-500',
    teal: 'border-teal-500',
    orange: 'border-orange-500',
    black: 'border-black',
    cyan: 'border-cyan-500',
    };

    const navigate = useNavigate();
    function nav(id){
        navigate(`/editnote/${id}`)
        //console.log(id)
    }
   // nav();

   async function DeleteNote(id){
    const confirmdelete = window.confirm('Are You Sure You Want To Delete It')
    if(!confirmdelete) return;
    try {
        // console.log(id)
        // return
        //const url = "http://localhost:3002"
        const API_URL = import.meta.env.VITE_API_URL;
        const { data } = await axios.delete(`${API_URL}/note/${id}`)

         if(data?.status === true){
            toast.success(data.message)
            setTimeout(()=>{
                window.location.reload();
            },2000)
        }else{
            toast.error(data.message)
        }
    } catch (error) {
        toast.error(error.message)
    }
   }


   async function complete(id,currentCompletedStatus){
    try {
        // console.log(id)
        // return
        //const url = "http://localhost:3002"
        const API_URL = import.meta.env.VITE_API_URL;
        const { data } = await axios.put(`${API_URL}/note/${id}`, {
            completed: !currentCompletedStatus // Toggle based on current status
            }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        //console.log(data)

         if(data?.status === true){
            const action = !currentCompletedStatus ? 'completed' : 'marked as incomplete';
            toast.success(`Note ${action} successfully`);
            //toast.success(data.message)
            setTimeout(()=>{
                window.location.reload();
            },2000)
        }else{
            toast.error(data.message)
        }
    } catch (error) {
        toast.error(error.message)
    }
   }

   

  return (
    <>
    <div className=' w-full bg-[#000000]'>
        <Snowfall />
        <Toaster />
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 px-5 py-10'>

        {
            Notes.map((note)=>(

        <div key={note._id} className={`bg-[#181111] text-white rounded-2xl p-5 md:p-6 border-t-5 ${BorderColor[note.color]}`}>
            <h1 className={`capitalize text-3xl font-semibold ${note.completed ? 'line-through opacity-70' : ''}`}>{note.title}</h1>
            <p className={`text-gray-400 text-[18px] ${note.completed ? 'line-through opacity-70' : ''}`}>{note.description}</p>
            <div className='flex justify-between items-center pt-5'>
                <p className={`text-gray-400 capitalize ${note.completed ? 'line-through opacity-70' : ''}`}>{moment(note.createdAt).format('LLL')} </p>
                <div className='flex justify-between items-center gap-3'>
                    <button className='cursor-pointer' onClick={()=> complete(note._id, note.completed)}>
                        <i className="fa-solid fa-check-double text-[19px] text-blue-500"></i>
                    </button>
                    <button className='cursor-pointer' onClick={()=> nav(note._id)}>
                        <i className="fa-regular fa-pen-to-square text-[19px] text-green-500"></i>
                    </button>
                    <button className='cursor-pointer' onClick={()=> DeleteNote(note._id)}>
                        <i className="fa-regular fa-trash-can text-[19px] text-red-500"></i>
                    </button>
                </div>
            </div>
        </div>

           ))}

    </div>
    </div>
    </>
  )
}

export default Home