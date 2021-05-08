const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
const http = require('http');

//MIDDLE WARE
require("dotenv").config();
const app = express();
app.use(cors({
    exposedHeaders: 'x-access-token'
}));
app.use(express.json());
app.use(morgan('dev',{
    skip: function(req,res){
        return res.statusCode < 400;
    }
}));
app.use(morgan('common',{
    stream: fs.createWriteStream(path.join(__dirname,'/log/access.log'),{flags: 'a'})
}));



//CONSTANTS
const port = process.env.PORT || 5000;

//IMPORT ROUTES
const register = require("./routes/HospitalRegister.route");
const login = require("./routes/HospitalLogin.route");
const hospital_data = require("./routes/HospitalData.route");


//ROUTES
app.get("/", (req,res)=>{
    res.send("hello world");
});
app.use("/admin/register", register);
app.use("/admin/login",login);
app.use("/admin/hospital",hospital_data);

app.use((req, res, next) => {
    //this is the error handler.
    return res.status(404).send({ 
        message: "Prohibited !!, your IP address and Timestamp has been logged and will be sent to Authorities"
     });
});

//create http server for socketio
var server = http.createServer(app);
const io = require('socket.io')(server,{
    cors: {
        origin: '*',
    }
});

io.on('connection', client =>{
    client.on('disconnect',()=>{
        console.log('disconnected');
    })
});

//SERVER STARTING
server.listen(port, ()=>{
    console.log("(+) Server is running in port 5000");
});

