import express from 'express';
import dotnv from 'dotenv';
import cors from 'cors';
const app = express();

dotnv.config();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    methods:'Post,Get'
}))

app.get('/',(req,res)=>{
    res.send("It's working on port 3000");
})

app.listen(3000,()=>{
    console.log("Server is runnig on 3000")
})