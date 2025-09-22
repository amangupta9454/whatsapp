const dotenv = require('dotenv');
dotenv.config();  // Load .env FIRST - before any other requires

const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

connectDB();  // Now safe to connect DB, as .env is loaded

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/', (req,res)=>{
    res.send("Welcome to AI Coach Backend");
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));