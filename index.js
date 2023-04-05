const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')


//env file import
dotenv.config()

//router import
const userRoutes = require("./routes/userRoutes")
const recepieRoutes = require('./routes/recepieRoutes')

//mongodbConnection
connectDB();

const app = express()

app.use(cors())
app.use(express.json())

//routes
app.use("/api/users",userRoutes);
app.use("/api/recepieBlogs", recepieRoutes)


const PORT = process.env.PORT || 7800;

app.listen(PORT,() => {
    console.log(`Server is running on port number ${PORT}`);
})