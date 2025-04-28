import { Server as socketio } from 'socket.io';
import UserModel from './models/usermodel.js';
import captainModel from './models/captainModel.js';
let io;
function initializedSocket(server) {
    io = new socketio(server, {
        cors: {
            origin: "*",
            methods: ['GET', 'POST'],
        },
    });

    io.on("connection", (socket) => {
        console.log("Client Connected:", socket.id);

        socket.on("join", async (data) => {
            try {
                console.log(data)
                const { userId, userType } = data;
                console.log(userId)
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

        socket.on("disconnect", () => {
            console.log("Client Disconnected:", socket.id);
        });
    });

    function SendMessage(socketId, message) {
        if (io) {
            io.to(socketId).emit('message', message)
        }else{
            console.log("io is not defined")
        }
    }
}

export default initializedSocket;
