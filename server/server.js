const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);

const PORT = 5000 || process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
