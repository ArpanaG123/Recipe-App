import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from "axios";
import './Style.css'
import RecipeCard from '../components/RecipeCard';


function Recipe() {
  const[recipe,setRecipe] = useState()

  const getAllRecipeBlog = async () => {
    try {
      const {data} = await axios.get("http://localhost:7800/api/recepieBlogs/all-recepie")
      if (data?.success){
        setRecipe(data?.recepieBlogs);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllRecipeBlog()
  },[])

  return (
    <>
    <Box sx = {{boxShadow: "10px 5px 10px #ccc"}}>
        <img src="https://images.unsplash.com/photo-1494390248081-4e521a5940db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZCUyMGJsb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60" alt="" className='firstFood' />
        <p className='ourFood'>OUR FOOD BLOG</p>
    </Box>
    <Box sx={{display:'flex',flexWrap:"wrap"}}>
      {
        recipe && recipe.map(rec => (
          <RecipeCard 
          id={rec?._id}
          isUser={localStorage.getItem("userId") === rec?.user?._id}
          title = {rec.title}
          ingredients = {rec.ingredients}
          image = {rec.image}
          username = {rec?.user?.username}
          />
        ))
      }
    </Box>

    </>
  )
}

export default Recipe