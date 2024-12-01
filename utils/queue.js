const Queue = require("bull");
const dotenv = require("dotenv");

dotenv.config();

const fileQueue = new Queue("fileQueue", {
  redis: {
    host: process.env.REDIS_HOST, // Change this if your Redis server is hosted elsewhere
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PSWD,
  },
});

// Listen for the 'ready' event to confirm connection
fileQueue.on("ready", () => {
  console.log("Connected to Redis and the queue is ready to process jobs.");
});

// Listen for the 'error' event to catch connection errors
fileQueue.on("error", (err) => {
  console.error("Failed to connect to Redis:", err);
});

module.exports = fileQueue;
