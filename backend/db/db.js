import mongoose from "mongoose";

const dbconnect = async () => {
    try{
        const connect = await mongoose.connect('mongodb://127.0.0.1:27017/uber');
        if(connect){
            console.log("DataBase connected to mongodb");
        }
    }catch(err){
        console.log("Error occured during connected to db ", err.message);
    }

}

export default dbconnect