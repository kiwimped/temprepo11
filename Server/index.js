const express = require('express');
const dotenv = require('dotenv').config()
const cors = require('cors')
const {mongoose} = require('mongoose')
const cookieParser = require('cookie-parser')
const app = express();
const appointment = require('./routes/Appointments')
const postreview = require('./routes/posts')
const notificationRoutes = require('./routes/notify'); // Path to your router file
const patientBooking = require('./routes/bookAppointmentRoute')
//database connection
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('database Connected'))
.catch((err)=> console.log('DATABASE not connected',err))

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}))

app.use('/',require('./routes/authRoutes'))
app.use('/', appointment);
app.use('/',postreview)
app.use('/', notificationRoutes); // Ensure this is correct
app.use('/', patientBooking); // Patient booking
const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`))