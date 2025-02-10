import React, { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import { GrLanguage } from "react-icons/gr";
import {FaEdit, FaHeart} from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import {MdOutlineDelete} from "react-icons/md";
import axios from "axios";
import { useParams } from 'react-router-dom'
import { useSelector } from "react-redux";


const ViewBookDetails = () => {
    const {id}= useParams();
    
    const [Data, setData] = useState();
    const isLoggedIn= useSelector((state)=> state.auth.isLoggedIn);
    const role= useSelector((state)=> state.auth.role);
    
  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios.get(`http://localhost:1000/api/v1/get-book-by-id/${id}`);
      
      setData(response.data.data);
    };
    fetchBooks();
  }, []); 
  const headers={
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };
  const handleFavourite= async ()=>{
    const response = await axios.put("http://localhost:1000/api/v1/add-book-to-favourite", 
    {},
    {headers}
  )
  alert(response.data.message);
  }
  const handleCart= async()=>{
    const  response = await axios.put("http://localhost:1000/api/v1/add-to-cart",
      {},
      {headers}
    );
    alert(response.data.message);
  }
  return (
   <>
   {Data && <div className='px-8 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-8 items-start'>
      <div className='   w-full  lg:w-3/6 flex  '>
      {" "}
       <div className=" flex flex-col rounded lg:flex-row justify-around bg-zinc-800  py-12">
        {" "}
       <img src={Data.url} 
      alt="/" 
      className=" h-[50vh] md:h-[60vh] lg:h-[70vh] rounded " 
      />
       {isLoggedIn === true && role=== "user" && (
        <div className="flex flex-col md:flex-row lg:flex-col items-cente justify-between lg:justify-start mt-4 lg:mt-0"> 
        <button className="bg-white rounded  lg:rounded-full text-4xl lg:text-3xl p-3 text-red-500 flex items-cenrer justify-center" 
        onClick={handleFavourite}>
          <FaHeart/>  {" "}
          <span className="ms-4 block lg:hidden"> Add to Favourites</span>
        </button>
        <button className="text-white rounded md:mt-0 mt-8 lg:rounded-full text-4xl lg:text-3xl p-3 lg:mt-8 bg-blue-500 flex items-center justify-center"
         onClick={handleCart}
         > 
          <FaShoppingCart/> {" "}
           <span className="ms-4 block lg:hidden"> Add to Cart</span>
        </button>
      </div>
    )}
    {isLoggedIn === true && role=== "admin" && (
        <div className="flex flex-col  md:flex-row lg:flex-col items-cente justify-between lg:justify-start mt-4 lg:mt-0"> 
        <button className="bg-white rounded  lg:rounded-full text-4xl lg:text-3xl p-3  flex items-cenrer justify-center">
          <FaEdit/>  {" "}
          <span className="ms-4 block lg:hidden"> Edit</span>
        </button>
        <button className="text-red-500 rounded  lg:rounded-full text-4xl lg:text-3xl p-3 lg:mt-8 md:mt-0 mt-8 bg-white flex items-center justify-center"> 
          <MdOutlineDelete/> {" "}
           <span className="ms-4 block lg:hidden"> Delete Book</span>
        </button>
      </div>
    )}
       </div>
      
      </div>
      <div className='p-4 lg:w-3/6'>
      <h1 className="text-4xl text-zinc-300 font-semibold">{Data.title}</h1>
      <p className=" text-zinc-400 mt-1">by {Data.author}</p>
      <p className="text-zinc-500 mt-4 text-xl">{Data.desc} </p>
      <p className="flex mt-4 items-center justify-start text-zinc-400">
        <GrLanguage className= "me-3"/> {Data.language}
      </p>
      <p className="mt-4 text-zinc-100 text-3xl font-semibold">
        Price: Rs {Data.price} {" "}
      </p>

      </div>
    </div>}
    {!Data&& <div className="h-screen bg-zinc-900 flex items-center justify-center"><Loader/></div>}
   </>
  );
};

export default ViewBookDetails