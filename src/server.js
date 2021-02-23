const http = require("http");
const app = require("./app");
const logger = require("./logger/log");

const port = process.env.port || 3001;

const server = http.createServer(app);

server.listen(port, () => {
  logger.info("🌅 Good Morning, Contract Butler 🦾🧐 woke up in port:" + port);
});
