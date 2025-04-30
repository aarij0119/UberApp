import { Server as socketio } from 'socket.io';
import UserModel from './models/usermodel.js';
import captainModel from './models/captainModel.js';
let io;
function initializedSocket(server) {
    io = new socketio(server, {
        cors: {
            origin: "*",
            methods: ['GET', 'POST'],
            credentials:true
        },
    });

    io.on("connection", (socket) => {
        // console.log("Client Connected:", socket.id);

        socket.on("join", async (data) => {
            try {
                const { userId, userType } = data;
                const updateData = { socketid: socket.id };
                if (userType === "user") {
                    await UserModel.findByIdAndUpdate(userId, updateData, { new: true });
                } else if (userType === "captain") {
                    await captainModel.findByIdAndUpdate(userId, { socketId: socket.id }, { new: true });
                }
            } catch (error) {
                console.error("Error updating socket ID:", error);
            }
        });
            socket.on('update-location-captain',async (data)=>{
                const{userId,location} = data
                if(!location || !location.ltd || !location.lng){
                    return socket.emit('error',{message:'Invalid Location data'})
                }
                await captainModel.findByIdAndUpdate(userId,{
                    location:{
                        ltd:location.ltd,
                        lng:location.lng
                    }
                })
            })
        socket.on("disconnect", () => {
            // console.log("Client Disconnected:", socket.id);
        });
    });
}
    function SendMessage(socketId, messageObject) {
        if (!io) {
            console.error("Socket.IO not initialized");
            return false;
        }
    
        if (!socketId) {
            console.error("No socketId provided");
            return false;
        }
    
        try {
            io.to(socketId).emit(messageObject.event, messageObject.data);
            return true;
        } catch (error) {
            console.error("Message sending failed:", error);
            return false;
        }
    }

export {SendMessage}    
export default initializedSocket
