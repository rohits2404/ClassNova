import "dotenv/config";
import express from 'express';
import cors from 'cors'

import { connectDB } from "./config/db.js";

import { errorHandler } from './middlewares/errorHandler.js';

import authRoute from './routes/authRoute.js'
import sessionRoute from './routes/sessionRoute.js'

const app =express();

const PORT = process.env.PORT || 3000;


const corsOption = {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials:true
}

connectDB();

app.use(cors(corsOption));
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/api/health', (req,res) => {
    res.json({
        status: 'OK',
        message:'Live class server is running',
        timestamp:new Date().toISOString()
    })
})
 
//Api routes
app.use('/api/auth',authRoute)
app.use('/api/session',sessionRoute)

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})