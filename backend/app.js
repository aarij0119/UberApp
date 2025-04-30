import express from 'express';
import DataBase from './db/db.js';
import dotnv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { configDotenv } from 'dotenv';
import { ExpressValidator } from 'express-validator';
import mapsRoute from './routes/mapsroute.js';
import initializedSocket from './socket.js';
import http from 'http';

const app = express();
const server = http.createServer(app);
DataBase();
configDotenv();

// Routes
import userRoute from './routes/userroute.js';
import captainRoute from './routes/captainroute.js';
import rideRoute from './routes/rideroute.js';

dotnv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Updated CORS configuration
app.use(
  cors({
    origin: [
      'http://localhost:5173', 
    ],
    methods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  })
);

app.use(cookieParser());

app.get('/', (req, res) => {
  res.send("It's working on port 3000");
});

app.use('/users', userRoute);
app.use('/captains', captainRoute);
app.use('/maps', mapsRoute);
app.use('/rides', rideRoute);

initializedSocket(server);

let Port = 3000;
server.listen(Port, (err) => {
  if (err) {
    console.log('One error occurred ', err.message);
  } else {
    console.log("Server is runnig on ", Port)
  }
});
