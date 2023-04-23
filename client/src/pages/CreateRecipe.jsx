import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";

const CreateRecipe = () => {
    const id = localStorage.getItem("userId");
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
      title: "",
      ingredients: "",
      image: "",
    });
    // input change
    const handleChange = (e) => {
      setInputs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };
    //form
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post("https://serverrecipe.onrender.com/api/recepieBlogs/create-recepie", {
          title: inputs.title,
          ingredients: inputs.ingredients,
          image: inputs.image,
          user: id,
        });
        if (data?.success) {
          alert("Recipe Created");
          navigate("/recipe");
        }
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <>
        <form onSubmit={handleSubmit}>
          <Box
            width={"50%"}
            borderRadius={10}
            padding={3}
            margin="auto"
            boxShadow={"10px 10px 20px #ccc"}
            display="flex"
            flexDirection={"column"}
            marginTop="30px"
          >
            <Typography variant="h3" textAlign={"center"} fontWeight="600"  padding={3} color="green">Create Food Recipe</Typography>
            <InputLabel
              sx={{ mb: 1, mt: 1, fontSize: "20px", fontWeight: "500" }}
            >Title</InputLabel>
            <TextField
              name="title"
              value={inputs.title}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              required
            />
            <InputLabel
              sx={{ mb: 1, mt: 2, fontSize: "20px", fontWeight: "500" }}
            >
              Ingredients
            </InputLabel>
            <TextField
              name="ingredients"
              value={inputs.ingredients}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              required
            />
            <InputLabel
              sx={{ mb: 1, mt: 2, fontSize: "20px", fontWeight: "500" }}
            >
              ImageURL
            </InputLabel>
            <TextField
              name="image"
              value={inputs.image}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              required
            />
            <Button type="submit" sx={{background:"#27E1C1"}} back variant="contained">
              SUBMIT
            </Button>
          </Box>
        </form>
      </>
    );
    
}

export default CreateRecipe