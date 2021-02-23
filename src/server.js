const http = require("http");
const app = require("./app");

const port = process.env.port || 3001;

const server = http.createServer(app);

server.listen(port, () => {
  console.log("🌅 Good Morning, Contract Butler 🦾🧐 woke up in port:", port);
});
