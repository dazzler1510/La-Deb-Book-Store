import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios';
import BookCard from '../BookCard/BookCard';
const Favourites = () => {
    const [FavouriteBooks, setFavouriteBooks]= useState([]);
    const headers={
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };
    useEffect(()=>{
        const fetch= async()=>{
            const response = await axios.get(
                "http://localhost:1000/api/v1/get-favourite-books",
                {headers}

            );
            setFavouriteBooks(response.data.data)
        }
        fetch()
    },[FavouriteBooks]);
  return (
    <> 
    {FavouriteBooks.length===0 && 
      <div className='text-5xl font-semibold h-[100%] text-zinc-500 flex items-center justify-center flex-col w-full '>
        No Favourite Books
        <img src="./star.png" alt="star" className='h-[20vh] my-8'/>
        </div> 
        } 
        
        <div className='grid grid-cols-4 gap-4'>
     
        {FavouriteBooks &&
        FavouriteBooks.map((items,i)=>(
            <div key={i}>
            <BookCard data={items} favourite={true}/>
            </div>
        ))}
    </div>
    </>
    
  )
}

export default Favourites