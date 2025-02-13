import express from 'express';
import DataBase from './db/db.js'
import dotnv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { configDotenv } from 'dotenv';
const app = express();
DataBase()
configDotenv()
//routes
import userRoute from './routes/userroute.js'

dotnv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    methods: 'Post,Get',
    credentials:true
}));
app.use(cookieParser());



app.get('/', (req, res) => {
    res.send("It's working on port 3000");
});

app.use('/users', userRoute)

let Port = 3000
app.listen(Port, (err) => {
    if (err) {
        console.log("One error occured ", err.message)
    } else {
        console.log("Server is runnig on ", Port)
    }

})