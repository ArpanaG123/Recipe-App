import React, { useState } from 'react'
import {AppBar, Box, Button, Tab, Tabs, Toolbar, Typography} from '@mui/material'
import {Link,useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { authActions } from '../redux/store'

const Header = () => {
  const [value,setValue] = useState()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLogin = useSelector(state => state.isLogin)
  console.log(isLogin);

  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      alert("logout successfully")
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    <AppBar position='sticky' sx={{background:"#27E1C1"}}>
        <Toolbar>
            <Typography variant='4' marginLeft={"2vw"}>MY RECIPE</Typography>
            {
              isLogin && (
                <Box display={'flex'} marginLeft="auto" marginRight="auto">
                  <Tabs textColor='inherit' value={value} onChange={(e,val) => setValue(val)}>
                    <Tab label = "FOOD RECIPE"  LinkComponent={Link} to = "/recipe" />
                    <Tab label = "CREATE RECIPE" LinkComponent={Link} to = "/create-recipe" />
                  </Tabs>
                </Box>
              )
            }
            <Box display={'flex'} marginLeft="auto" >
                {
                  !isLogin && (
                    <>
                    <Button sx={{margin:"1" ,color :"white"}} LinkComponent={Link} to = "/">LOGIN</Button>
                    <Button sx={{margin:"1" ,color :"white"}} LinkComponent={Link} to = "/register">REGISTER</Button>
                    </>
                  )
                }
                {isLogin && (
                  <Button sx={{margin:"1" ,color :"white"}} onClick={handleLogout}>LOGOUT</Button>
                )}
            </Box>
        </Toolbar>
    </AppBar>
    </>
  )
}

export default Header