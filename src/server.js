const http = require('http');
const app = require('./app');

const port = process.env.port || 3000;

const server = http.createServer();

server.listen(port, ()=>{
    console.log("we are logged in:", port)
});