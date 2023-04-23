import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import {useDispatch} from 'react-redux'
import {authActions} from '../redux/store'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

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
      const { data } = await axios.post("https://serverrecipe.onrender.com/api/users/login", {
        username: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        localStorage.setItem("userId", data?.user._id);
        dispatch(authActions.login())
        alert("User login Successfully");
        navigate("/recipe");
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
      <Typography variant="h4" sx={{ textTransform: "uppercase" }} padding={2} textAlign="center">Login</Typography>
      <TextField placeholder="Enter Email" value = {inputs.email} name="email" margin="normal" type={"email"} required onChange={handleChange} />
      <TextField placeholder="Enter Password" value = {inputs.password} name="password" margin="normal" type={"password"} required  onChange={handleChange} />
      <Button type="submit" sx={{ borderRadius: 3, marginTop: 3, background:"#27E1C1" }} variant="contained">SUBMIT</Button>
      <Button sx={{color:"#27E1C1",borderRadius: 3, marginTop: 3}} 
             onClick={() => navigate("/register")}
      >Not a User ? Please Register
      </Button>
    </Box>
    </form>
    </>
  )
}

export default Login