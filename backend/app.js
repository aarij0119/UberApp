import express from 'express';
import dotnv from 'dotenv';
import cors from 'cors';
const app = express();

dotnv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    methods: 'Post,Get',
    credentials:true
}))

app.get('/', (req, res) => {
    res.send("It's working on port 3000");
});

let Port = 3000
app.listen(Port, (err) => {
    if (err) {
        console.log("One error occured ", err.message)
    } else {
        console.log("Server is runnig on ", Port)
    }

})