/**
 * This file is the starting point that starts the server and connects all parts of the project together.
*/


require('dotenv').config(); //to read the variables from .env

// here loading liberaries and core packages
const express = require('express'); 
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const photoRoutes = require('./routes/photoRoutes');
const {errorHandler , notFound} = require('./middleware/errorHandler');
const commentRoutes = require('./routes/commentRoutes')




// the JWT secret is required to sign and verify tokens, so stop early if it is missing
if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is missing in server/.env');
    process.exit(1);
}

const app = express(); //creating the web server app
const PORT = process.env.PORT || 5000; 

//middleware config
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
})); //let frontend that run on port 5173 to send requests to and recive data from server that run on port 3000
app.use(express.json()); //convert the coming json to request body
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 

//for testing 
app.get('/', (req, res) =>{
    res.send("hiiiiii my creator");
});
app.get('/api/health', (req, res) =>{
    res.json({status: 'ok'});
}); 


app.use('/api/auth', authRoutes);
app.use('/api/photos', photoRoutes);
app.use('/api/photos/:id/comments', commentRoutes);
app.use(notFound);
app.use(errorHandler);





// connect to the database then start the server if connected successfully 
mongoose
    .connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log('connected to mongoDB successfully!'); //display this message if connection sucess
        app.listen(PORT, ()=> console.log(`the server running on port ${PORT}`)); //running the server
    })
    .catch((err)=>{
        console.error('there is mongodb connection error:' , err.message); //display error message if connect with database fail
        process.exit(1);
    }) 
