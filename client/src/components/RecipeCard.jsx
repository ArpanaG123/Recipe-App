import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { green } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function RecipeCard({title,ingredients,image,username,id,isUser}) {
  const navigate = useNavigate()

  const handleEdit = () => {
    navigate(`/recipe-details/${id}`)
  }

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`http://localhost:7800/api/recepieBlogs/delete-recepie/${id}`);
      if (data?.success) {
        alert("Recipe Blog Deleted");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card sx={{
        width: "32%",
        margin: "auto",
        mt: 4,
        padding: 2,
        boxShadow: "5px 5px 10px #ccc",
        ":hover:": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}>
        {
          isUser && (
            <Box display={"flex"}>
              <IconButton sx={{ marginLeft: "auto" ,color:"blue"}} onClick={handleEdit}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={handleDelete} sx={{color:"red"}}>
                <DeleteIcon />
              </IconButton>
            </Box>
          )
        }
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: green[500] }} aria-label="recipe">
            {username}
          </Avatar>
        }
        title={title}
      />
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Ingredients : {ingredients}
        </Typography>
      </CardContent>
    </Card>
  );
}