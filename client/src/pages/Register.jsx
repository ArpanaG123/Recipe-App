import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios";

const Register = () => {
  const navigate = useNavigate()

  const[inputs,setInputs] = useState({
    name:'',
    email:'',
    password:''
  })

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:7800/api/users/register", {
        username: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        alert("User Register Successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <>
    <form onSubmit={handleSubmit}>
    <Box maxWidth={450}
        display="flex"
        flexDirection={"column"}
        alignItems="center"
        justifyContent={"center"}
        margin="auto"
        marginTop={10}
        boxShadow="10px 10px 20px #ccc"
        padding={3}
        borderRadius={5}
    >
      <Typography variant="h4" sx={{ textTransform: "uppercase" }} padding={2} textAlign="center">Register</Typography>
      <TextField placeholder="Enter Name" value = {inputs.name} name="name" margin="normal" type={"text"} required  onChange={handleChange}/>
      <TextField placeholder="Enter Email" value = {inputs.email} name="email" margin="normal" type={"email"} required onChange={handleChange} />
      <TextField placeholder="Enter Password" value = {inputs.password} name="password" margin="normal" type={"password"} required  onChange={handleChange} />
      <Button type="submit" sx={{ borderRadius: 3, marginTop: 3, background:"#27E1C1" }} variant="contained">SUBMIT</Button>
      <Button sx={{color:"#27E1C1",borderRadius: 3, marginTop: 3}} 
             onClick={() => navigate("/")}
      >Already Regsitered ? Please Login
      </Button>
    </Box>
    </form>
    </>
  )
}

export default Register