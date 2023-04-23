import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";

const RecipeDetails = () => {
  const [recepieBlog, setRecepieBlog] = useState({});
  const id = useParams().id;
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});

  // get recipe details
  const getBlogDetail = async () => {
    try {
      const { data } = await axios.get(`https://serverrecipe.onrender.com/api/recepieBlogs/get-recepie${id}`);
      if (data?.success) {
        setRecepieBlog(data?.recepieBlog);
        setInputs({
          title: data?.recepieBlog.title,
          ingredients: data?.recepieBlog.ingredients,
          image: data?.recepieBlog.image,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogDetail();
  }, [id]);

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
      const { data } = await axios.put(`https://serverrecipe.onrender.com/api/recepieBlogs/update-recepie/${id}`, {
        title: inputs.title,
        ingredients: inputs.ingredients,
        image: inputs.image,
        username: id,
      });
      if (data?.success) {
        alert("Recipe Updated");
        navigate("/recipe");
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(recepieBlog);
  return (
    <v>
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
          <Typography
            variant="h2"
            textAlign={"center"}
            fontWeight="bold"
            padding={3}
            color="gray"
          >
            Update food Recipe
          </Typography>
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "20px", fontWeight: "500" }}
          >
            Title
          </InputLabel>
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
            sx={{ mb: 1, mt: 2, fontSize: "20px", fontWeight: "500"}}
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
          <Button type="submit" color="warning" variant="contained">
            UPDATE
          </Button>
        </Box>
      </form>
    </v>
  );
}

export default RecipeDetails