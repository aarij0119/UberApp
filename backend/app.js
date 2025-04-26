import express from 'express';
import DataBase from './db/db.js'
import dotnv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { configDotenv } from 'dotenv';
import { ExpressValidator } from 'express-validator';
import mapsRoute from './routes/mapsroute.js'
const app = express();
DataBase()
configDotenv()
//routes
import userRoute from './routes/userroute.js'
import captainRoute from './routes/captainroute.js'
import rideRoute from './routes/rideroute.js'

dotnv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin:'http://localhost:5173',
    methods: 'POST,GET',
    credentials:true
}));
app.use(cookieParser());



app.get('/', (req, res) => {
    res.send("It's working on port 3000");
});

app.use('/users', userRoute);
app.use('/captains', captainRoute);
app.use('/maps', mapsRoute);
app.use('/rides',rideRoute)


let Port = 3000
app.listen(Port, (err) => {
    if (err) {
        console.log("One error occured ", err.message)
    } else {
        console.log("Server is runnig on ", Port)
    }

})